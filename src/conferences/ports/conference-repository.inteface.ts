import Conference from "../entities/conference.entity";

export interface IConferenceRepository {
    create(conference: Conference): Promise<void>;

    get(): Promise<Conference[]>

    findById(id: string): Promise<Conference | null>
}