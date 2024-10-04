import {IFixture} from "./fixture.inteface";
import {AwilixContainer} from "awilix";
import Conference from "../../conferences/entities/conference.entity";
import {IConferenceRepository} from "../../conferences/ports/conference-repository.inteface";

export class ConferenceFixture implements IFixture {
    constructor(public entity: Conference) {
    }

    async load(container: AwilixContainer): Promise<void> {
        const repository = container.resolve('conferenceRepository') as IConferenceRepository
        await repository.create(this.entity)
    }

}