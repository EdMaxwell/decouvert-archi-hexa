import {ChangeSeats} from "../usecases/change-seats";
import {InMemoryConferenceRepository} from "../adapters/in-memory-conference-repository";
import {testConference} from "../utils/conference-seeds";
import {testUsers} from "../../user/utils/user-seeds";
import {InMemoryBookingRepository} from "../adapters/in-memory-booking-repository";
import {testBooking} from "../utils/booking-seeds";

describe('Feature: change number of seats', () => {
    let useCase: ChangeSeats;
    let repository: InMemoryConferenceRepository
    let bookingsRepository: InMemoryBookingRepository

    const bookings = [
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

    async function expectSeatsUnchanged() {
        const fetchedConference = await repository.findById(testConference.conference1.props.id);
        expect(fetchedConference!.props.seats).toBe(100);
    }

    beforeEach(async () => {
        repository = new InMemoryConferenceRepository();
        bookingsRepository = new InMemoryBookingRepository();
        await repository.create(testConference.conference1);
        await bookingsRepository.createAll(bookings);
        useCase = new ChangeSeats(repository, bookingsRepository);
    })

    describe('Scenario: Happy path', () => {
        it('should change the number of seats', async () => {
            await useCase.execute({
                conferenceId: testConference.conference1.props.id,
                seats: 50,
                user: testUsers.johnDoe
            })

            const fetchedConference = await repository.findById(testConference.conference1.props.id);

            expect(fetchedConference).toBeDefined();
            expect(fetchedConference!.props.seats).toBe(50);
        })
    })

    describe('Scenario: Conference not found', () => {
        it('Schould fail', async () => {
            await expect(useCase.execute({
                user: testUsers.johnDoe,
                conferenceId: 'unknown-id',
                seats: 100
            })).rejects.toThrow('Conference not found')

            await expectSeatsUnchanged();
        })
    })

    describe('Scenario: Update the conference of someone else', () => {
        it('Schould fail', async () => {
            await expect(useCase.execute({
                user: testUsers.johnTheDow,
                conferenceId: testConference.conference1.props.id,
                seats: 50
            })).rejects.toThrow('User is not the organizer of the conference')

            await expectSeatsUnchanged();
        })
    })

    describe('Scenario: number of seats <= 20', () => {
        it('Schould fail', async () => {
            await expect(useCase.execute({
                user: testUsers.johnDoe,
                conferenceId: testConference.conference1.props.id,
                seats: 15
            })).rejects.toThrow('Conference must have at least 20 seats and at most 1000 seats')

            await expectSeatsUnchanged();
        })
    })

    describe('Scenario: number of seats >= 1000', () => {
        it('Schould fail', async () => {
            await expect(useCase.execute({
                user: testUsers.johnDoe,
                conferenceId: testConference.conference1.props.id,
                seats: 1001
            })).rejects.toThrow('Conference must have at least 20 seats and at most 1000 seats')

            await expectSeatsUnchanged();
        })
    })

    describe('Scenario: number of seats < number of bookings', () => {
        it('Schould fail', async () => {
            await expect(useCase.execute({
                user: testUsers.johnDoe,
                conferenceId: testConference.conference1.props.id,
                seats: 25
            })).rejects.toThrow('The number seats must be greater than the number of bookings')

        })
    })
})