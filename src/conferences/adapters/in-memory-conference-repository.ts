import Conference from "../entities/conference.entity";
import {IConferenceRepository} from "../../conferences/ports/conference-repository.inteface";

export class InMemoryConferenceRepository implements IConferenceRepository {
    databases: Conference[] = [];

    async create(conference: Conference) {
        this.databases.push(conference);
    }

    async get() {
        return this.databases;
    }

    async findById(id: string) {
        const conference = this.databases.find(conference => conference.props.id === id);
        return conference ?? null;
    }
}
