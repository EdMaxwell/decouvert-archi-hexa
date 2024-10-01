import {User} from "../../user/entities/user.entity";
import {ChangeSeats} from "../../conferences/usecases/change-seats";
import Conference from "../../conferences/entities/conference.entity";
import {addDays, addHours} from "date-fns";
import {InMemoryConferenceRepository} from "../../conferences/adapters/in-memory-conference-repository";

describe('Feature: change number of seats', () => {
    const johnDoe = new User({
        id: 'john-doe',
        emailAdress: 'johndoe@gmail.com',
        password: 'azerty'
    });

    const johnTheDow = new User({
        id: 'john-thedow',
        emailAdress: 'johnthedow@gmail.com',
        password: 'azerty'
    });

    const conference = new Conference({
        id: 'id-1',
        organizerId: johnDoe.props.id,
        title: 'My first conference',
        startDate: addDays(new Date(), 4),
        endDate: addDays(addHours(new Date(), 2), 4),
        seats: 100
    })

    let useCase: ChangeSeats;
    let repository: InMemoryConferenceRepository


    beforeEach(async () => {
        repository = new InMemoryConferenceRepository();
        await repository.create(conference); // Add this line
        useCase = new ChangeSeats(repository);
    })

    describe('Scenario: Happy path', () => {
        it('should change the number of seats', async () => {
            await useCase.execute({
                conferenceId: conference.props.id,
                seats: 50,
                user: johnDoe
            })

            const fetchedConference = await repository.findById(conference.props.id);

            expect(fetchedConference).toBeDefined();
            expect(fetchedConference!.props.seats).toBe(50);
        })
    })

    describe('Scenario: Conference not found', () => {
        it('Schould fail', async () => {
            await expect(useCase.execute({
                user: johnDoe,
                conferenceId: 'unknown-id',
                seats: 100
            })).rejects.toThrow('Conference not found')
        })
    })

    describe('Scenario: Update the conference of someone else', () => {
        it('Schould fail', async () => {
            await expect(useCase.execute({
                user: johnTheDow,
                conferenceId: conference.props.id,
                seats: 100
            })).rejects.toThrow('Not allowed to update this conference')
        })
    })

})