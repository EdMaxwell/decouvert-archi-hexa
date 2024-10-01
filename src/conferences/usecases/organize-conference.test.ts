import {OrganizeConference} from "./organize-conference";
import {InMemoryConferenceRepository} from "../adapters/in-memory-conference-repository";
import {FixedIdGenerator} from "../../core/adapters/fixed-id-generator";
import Conference from "../entities/conference.entity";
import {FixedDateGenerator} from "../../core/adapters/fixed-date-generator";
import {User} from "../../user/entities/user.entity";


describe('Feature: Organize a conference', () => {
    function expectConferenceToEqual(conference: Conference) {
        expect(conference.props).toEqual({
            id: "id-1",
            organizerId: johnDoe.props.id,
            title: 'My first conference',
            startDate: new Date('2024-01-05T10:00:00'),
            endDate: new Date('2024-01-05T11:00:00'),
            seats: 100
        });
    }

    let johnDoe = new User({
        id: 'john-doe',
        emailAdress: 'johndoe@gmail.com', password: 'azerty'
    });
    let repository: InMemoryConferenceRepository;
    let fixedIdGenerator: FixedIdGenerator;
    let useCase: OrganizeConference;
    let dateGenerator: FixedDateGenerator;

    beforeEach(() => {
        repository = new InMemoryConferenceRepository();
        fixedIdGenerator = new FixedIdGenerator()
        dateGenerator = new FixedDateGenerator();
        useCase = new OrganizeConference(repository, fixedIdGenerator, dateGenerator);
    });

    describe('Scenario: Happy path', () => {
        const payload = {
            user: johnDoe,
            title: 'My first conference',
            startDate: new Date('2024-01-05T10:00:00'),
            endDate: new Date('2024-01-05T11:00:00'),
            seats: 100
        }

        it('should return the ID', async () => {
            const conference = await useCase.execute(payload);
            expect(conference.id).toBe('id-1');
        });

        it('should insert the conference into the database', async () => {
            await useCase.execute(payload);

            // Check if the conference was created
            const createdConference = repository.databases[0];

            // Check if the conference has the correct title
            expect(repository.databases.length).toBe(1);
            expectConferenceToEqual(createdConference);
        })
    });

    describe('Scenario: Conference happens to soon', () => {
        const payload = {
            user: johnDoe,
            title: 'My first conference',
            startDate: new Date('2024-01-02T10:00:00'),
            endDate: new Date('2024-01-02T11:00:00'),
            seats: 100
        }

        it('should throw an error', async () => {
            await expect(useCase.execute(payload)).rejects.toThrow('Conference must be organized at least 3 days in advance');
        });

        it('should not insert the conference into the database', async () => {
            try {
                await useCase.execute(payload);
            } catch (e) {
                // Check if the conference was created
                expect(repository.databases.length).toBe(0);
            }
        })
    })

    describe('Scenario: Conference has to many seats', () => {
        const payload = {
            user: johnDoe,
            title: 'My first conference',
            startDate: new Date('2024-01-05T10:00:00'),
            endDate: new Date('2024-01-05T11:00:00'),
            seats: 1001
        }

        it('should throw an error', async () => {
            await expect(useCase.execute(payload)).rejects.toThrow('Conference must have less than 1000 seats');
        });

        it('should not insert the conference into the database', async () => {
            try {
                await useCase.execute(payload);
            } catch (e) {
                // Check if the conference was created
                expect(repository.databases.length).toBe(0);
            }
        })
    })

    describe('Scenario: Conference don\'t have enough seats', () => {
        const payload = {
            user: johnDoe,
            title: 'My first conference',
            startDate: new Date('2024-01-05T10:00:00'),
            endDate: new Date('2024-01-05T11:00:00'),
            seats: 15
        }

        it('should throw an error', async () => {
            await expect(useCase.execute(payload)).rejects.toThrow('Conference must have at least 20 seats');
        });

        it('should not insert the conference into the database', async () => {
            try {
                await useCase.execute(payload);
            } catch (e) {
                // Check if the conference was created
                expect(repository.databases.length).toBe(0);
            }
        })
    })

    describe('Scenario: is too long', () => {
        const payload = {
            user: johnDoe,
            title: 'My first conference',
            startDate: new Date('2024-01-05T10:00:00'),
            endDate: new Date('2024-01-05T18:00:00'),
            seats: 100
        }

        it('should throw an error', async () => {
            await expect(useCase.execute(payload)).rejects.toThrow('Conference must be less than 3 hours long');
        });

        it('should not insert the conference into the database', async () => {
            try {
                await useCase.execute(payload);
            } catch (e) {
                // Check if the conference was created
                expect(repository.databases.length).toBe(0);
            }
        })
    })
});