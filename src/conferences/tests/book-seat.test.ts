import {InMemoryBookingRepository} from "../../conferences/adapters/in-memory-booking-repository";
import {InMemoryConferenceRepository} from "../../conferences/adapters/in-memory-conference-repository";
import {testBooking} from "../../conferences/utils/booking-seeds";
import {testConference} from "../../conferences/utils/conference-seeds";
import {testUsers} from "../../user/utils/user-seeds";
import {BookSeat} from "../../conferences/usecases/book-seat";
import {InMemoryMailer} from "../../core/adapters/in-memory-mailer";
import {InMemoryUserRepository} from "../../user/adapters/in-memory-user-repository";
import {RandomIdGenerator} from "../../core/adapters/random-id-generator";

describe('Feature: Book a seat', () => {
    let useCase: BookSeat;
    let repository: InMemoryConferenceRepository
    let bookingsRepository: InMemoryBookingRepository
    let mailer: InMemoryMailer
    let idGenerator: RandomIdGenerator
    let userRepository: InMemoryUserRepository

    const bookingsFortestConference1 = [
        // Bookings pour conference1
        testBooking.johnTheDowBooking,
        testBooking.janeTheDowBooking,
        testBooking.user1Booking,
        testBooking.user2Booking,
        testBooking.user3Booking,
        testBooking.user4Booking,
        testBooking.user5Booking,
        testBooking.user6Booking,
        testBooking.user7Booking,
        testBooking.user8Booking,
        testBooking.user9Booking,
        testBooking.user10Booking,
        testBooking.user11Booking,
        testBooking.user12Booking,
        testBooking.user13Booking,
        testBooking.user14Booking,
        testBooking.user15Booking,
        testBooking.user16Booking,
        testBooking.user17Booking,
        testBooking.user18Booking,
        testBooking.user19Booking,
        testBooking.user20Booking,
        testBooking.user21Booking,
        testBooking.user22Booking,
        testBooking.user23Booking,
        testBooking.user24Booking,
        testBooking.user25Booking,
        testBooking.user26Booking,
        testBooking.user27Booking,
        testBooking.user28Booking,
        testBooking.user29Booking,
        testBooking.user30Booking,
        testBooking.user31Booking,
        testBooking.user32Booking,
        testBooking.user33Booking,
        testBooking.user34Booking,
        testBooking.user35Booking,
    ];
    const bookingsFortestConference2 = [
        testBooking.user1Conference2Booking,
        testBooking.user2Conference2Booking,
        testBooking.user3Conference2Booking,
        testBooking.user4Conference2Booking,
        testBooking.user5Conference2Booking,
        testBooking.user6Conference2Booking,
        testBooking.user7Conference2Booking,
        testBooking.user8Conference2Booking,
        testBooking.user9Conference2Booking,
        testBooking.user10Conference2Booking,
        testBooking.user11Conference2Booking,
        testBooking.user12Conference2Booking,
        testBooking.user13Conference2Booking,
        testBooking.user14Conference2Booking,
        testBooking.user15Conference2Booking,
        testBooking.user16Conference2Booking,
        testBooking.user17Conference2Booking,
        testBooking.user18Conference2Booking,
        testBooking.user19Conference2Booking,
        testBooking.user20Conference2Booking,
        testBooking.user21Conference2Booking,
        testBooking.user22Conference2Booking,
        testBooking.user23Conference2Booking,
        testBooking.user24Conference2Booking,
        testBooking.user25Conference2Booking,
    ];

    async function expectSeatsUnchanged() {
        const fetchedConference = await repository.findById(testConference.conference1.props.id);
        expect(fetchedConference!.props.seats).toBe(100);
    }

    beforeEach(async () => {
        repository = new InMemoryConferenceRepository();
        bookingsRepository = new InMemoryBookingRepository();
        mailer = new InMemoryMailer();
        userRepository = new InMemoryUserRepository();
        idGenerator = new RandomIdGenerator();

        await userRepository.create(testUsers.johnDoe);
        await userRepository.create(testUsers.bobTheDow);
        await userRepository.create(testUsers.johnTheDow);
        await userRepository.create(testUsers.janeTheDow);
        await repository.create(testConference.conference1);
        await repository.create(testConference.conference2);
        await repository.create(testConference.conferenceAlreadyStarted);
        await bookingsRepository.createAll(bookingsFortestConference1);
        await bookingsRepository.createAll(bookingsFortestConference2);

        useCase = new BookSeat(repository, bookingsRepository, userRepository, mailer, idGenerator);
    })


    describe('Scenario: Happy path', () => {
        const payload = {
            user: testUsers.bobTheDow,
            conferenceId: testConference.conference1.props.id
        }

        it('should book a seat', async () => {
            await useCase.execute(payload);
            const fetchedBookings = await bookingsRepository.findByConferenceId(testConference.conference1.props.id);

            expect(fetchedBookings.length).toBe(bookingsFortestConference1.length + 1);
        })

        it('should send an email to the participants', async () => {
            await useCase.execute(payload);
            console.log(mailer.getSentEmails());
            expect(mailer.getSentEmails()).toContainEqual({
                from: 'TEDx conference',
                to: testUsers.johnDoe.props.emailAdress,
                subject: `${testConference.conference1.props.title} has a new participant`,
                body: `The user ${testUsers.bobTheDow.props.emailAdress} has booked a seat in the conference ${testConference.conference1.props.title}`
            });
            expect(mailer.getSentEmails()).toContainEqual({
                from: 'TEDx conference',
                to: testUsers.bobTheDow.props.emailAdress,
                subject: `You have booked a seat in ${testConference.conference1.props.title}`,
                body: `You have booked a seat in the conference ${testConference.conference1.props.title}. The conference will start the ${testConference.conference1.props.startDate}`,
            });
        });


    })

    describe('Scenario: conference not exist', () => {
        const payload = {
            user: testUsers.bobTheDow,
            conferenceId: 'not-existing-conference'
        }

        it('should throw an error', async () => {
            await expect(useCase.execute(payload)).rejects.toThrow('Conference not found');
        })
    })

    describe('Scenario: conference is full', () => {
        const payload = {
            user: testUsers.user35,
            conferenceId: testConference.conference2.props.id
        }

        it('should throw an error', async () => {
            await expect(useCase.execute(payload)).rejects.toThrow("Conference is full");
        })
    })

    describe('Scenario: user already booked', () => {
        const payload = {
            user: testUsers.johnTheDow,
            conferenceId: testConference.conference1.props.id
        }

        it('should throw an error', async () => {
            await expect(useCase.execute(payload)).rejects.toThrow("User already booked");
        })
    })

    describe('Scenario: user is the organizer', () => {
        const payload = {
            user: testUsers.johnDoe,
            conferenceId: testConference.conference1.props.id
        }

        it('should throw an error', async () => {
            await expect(useCase.execute(payload)).rejects.toThrow("User is the organizer of the conference");
        })
    })

    describe('Scenario: conference already started', () => {
        const payload = {
            user: testUsers.bobTheDow,
            conferenceId: testConference.conferenceAlreadyStarted.props.id
        }

        it('should throw an error', async () => {
            await expect(useCase.execute(payload)).rejects.toThrow("Conference has already started");
        })
    })
})