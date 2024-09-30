import {OrganizeConference} from "../usecases/organize-conference";
import {InMemoryConferenceRepository} from "../adapters/in-memory-conference-repository";


describe('Feature: Organize a conference', () => {
    it('should create a conference', async () => {

        // Create a new instance of the repository
        const repository = new InMemoryConferenceRepository();

        // Create a new instance of the use case
        const useCase = new OrganizeConference(repository);

        // Execute the use case
        const conference = await useCase.execute({
            title: 'My first conference',
            startDate: new Date('2021-01-01T10:00:00'),
            endDate: new Date('2021-01-02T11:00:00'),
            seats: 100
        });

        // Check if the conference was created
        const createdConference = repository.databases[0];

        // Check if the conference has the correct title
        expect(repository.databases.length).toBe(1);
        expect(createdConference.title).toBe('My first conference');
    });
});