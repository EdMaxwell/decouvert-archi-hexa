import Conference from "../entities/conference.entity";

export class InMemoryConferenceRepository {
    databases: Conference[] = [];

    async create(conference: Conference) {
        this.databases.push(conference);
    }

    async get() {
        return this.databases;
    }
}
