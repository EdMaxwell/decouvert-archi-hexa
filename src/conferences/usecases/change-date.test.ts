import {addDays, addHours} from "date-fns";
import {testUsers} from "../../user/utils/user-seeds";
import {testConference} from "../../conferences/utils/conference-seeds";
import {InMemoryConferenceRepository} from "../../conferences/adapters/in-memory-conference-repository";
import {ChangeDates} from "../../conferences/usecases/change-date";
import {CurrentDateGenerator} from "../../core/adapters/current-date-generator";
import {InMemoryBookingRepository} from "../../conferences/adapters/in-memory-booking-repository";
import {InMemoryMailer} from "../../core/adapters/in-memory-mailer";
import {InMemoryUserRepository} from "../../user/adapters/in-memory-user-repository";
import {testBooking} from "../../conferences/utils/booking-seeds";

describe('Feature: Change date of a conference', () => {
    function expectDateRemainUnchanged(conference) {
        expect(conference.props.startDate).toEqual(testConference.conference1.props.startDate);
        expect(conference.props.endDate).toEqual(testConference.conference1.props.endDate);
    }

    let userCase: ChangeDates;
    let repository: InMemoryConferenceRepository
    let dateGenerator: CurrentDateGenerator
    let bookingRepository: InMemoryBookingRepository
    let mailer: InMemoryMailer
    let userRepository: InMemoryUserRepository

    beforeEach(async () => {
        repository = new InMemoryConferenceRepository();
        dateGenerator = new CurrentDateGenerator();
        bookingRepository = new InMemoryBookingRepository();
        mailer = new InMemoryMailer();
        userRepository = new InMemoryUserRepository();

        await repository.create(testConference.conference1);
        await userRepository.create(testUsers.johnTheDow)
        await bookingRepository.create(testBooking.johnTheDowBooking);
        await bookingRepository.create(testBooking.janeTheDowBooking);

        userCase = new ChangeDates(repository, dateGenerator, bookingRepository, mailer, userRepository);

    });

    describe('Scenario: happy path', () => {
        const startDate = addDays(new Date(), 8);
        const endDate = addDays(addHours(new Date(), 2), 8)

        const payload = {
            user: testUsers.johnDoe,
            conferenceId: testConference.conference1.props.id,
            startDate: startDate,
            endDate: endDate
        }

        it('should change the date of a conference', async () => {
            await userCase.execute(payload);
            const fetchedConference = await repository.findById(testConference.conference1.props.id);
            expect(fetchedConference?.props.startDate).toEqual(payload.startDate);
        })

        it('should send an email to the participants', async () => {
            await userCase.execute(payload);

            expect(mailer.getSentEmails()).toContainEqual({
                from: 'TEDx conference',
                to: testUsers.johnTheDow.props.emailAdress,
                subject: `${testConference.conference1.props.title} dates have changed`,
                body: `The conference ${testConference.conference1.props.title} has been rescheduled to ${startDate} - ${endDate}`,
            });
        })
    })

    describe('Scenario: conference not exist', () => {
        const startDate = addDays(new Date(), 8);
        const endDate = addDays(addHours(new Date(), 2), 8)

        const payload = {
            user: testUsers.johnDoe,
            conferenceId: 'id-not-exist',
            startDate: startDate,
            endDate: endDate
        }

        it('should throw an error', async () => {
            await expect(userCase.execute(payload)).rejects.toThrow('Conference not found');
            expectDateRemainUnchanged(await repository.findById(testConference.conference1.props.id));
        })
    })

    describe('Scenario: User is not the owner of the conference', () => {
        const startDate = addDays(new Date(), 8);
        const endDate = addDays(addHours(new Date(), 2), 8)

        const payload = {
            user: testUsers.johnTheDow,
            conferenceId: testConference.conference1.props.id,
            startDate: startDate,
            endDate: endDate
        }

        it('should throw an error', async () => {
            await expect(userCase.execute(payload)).rejects.toThrow('User is not the organizer of the conference');
            expectDateRemainUnchanged(await repository.findById(testConference.conference1.props.id));
        })
    })

    describe('Scenario: Start date is to close from the creation date', () => {
        const startDate = addDays(new Date(), 1);
        const endDate = addDays(addHours(new Date(), 2), 1)

        const payload = {
            user: testUsers.johnDoe,
            conferenceId: testConference.conference1.props.id,
            startDate: startDate,
            endDate: endDate
        }

        it('should throw an error', async () => {
            await expect(userCase.execute(payload)).rejects.toThrow('Conference must be organized at least 3 days in advance');
            expectDateRemainUnchanged(await repository.findById(testConference.conference1.props.id));
        })
    })

    describe('Scenario: updated conference is too long', () => {
        const startDate = addDays(new Date(), 5);
        const endDate = addDays(addHours(new Date(), 7), 5)

        const payload = {
            user: testUsers.johnDoe,
            conferenceId: testConference.conference1.props.id,
            startDate: startDate,
            endDate: endDate
        }

        it('should throw an error', async () => {
            await expect(userCase.execute(payload)).rejects.toThrow('Conference must be less than 3 hours long');
            expectDateRemainUnchanged(await repository.findById(testConference.conference1.props.id));
        })
    })
})