import {ChangeSeats} from "../../conferences/usecases/change-seats";
import {InMemoryConferenceRepository} from "../../conferences/adapters/in-memory-conference-repository";
import {testConference} from "../../conferences/utils/conference-seeds";
import {testUsers} from "../../user/utils/user-seeds";

describe('Feature: change number of seats', () => {
    let useCase: ChangeSeats;
    let repository: InMemoryConferenceRepository

    async function expectSeatsUnchanged() {
        const fetchedConference = await repository.findById(testConference.conference1.props.id);
        expect(fetchedConference!.props.seats).toBe(100);
    }

    beforeEach(async () => {
        repository = new InMemoryConferenceRepository();
        await repository.create(testConference.conference1); // Add this line
        useCase = new ChangeSeats(repository);
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

})