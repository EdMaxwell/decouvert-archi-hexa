import {IConferenceRepository} from "../ports/conference-repository.inteface";
import Conference from "../entities/conference.entity";
import {IIdGeneratorInterface} from "../ports/id-generator.interface";
import {IDateGeneratorInterface} from "../ports/date-generator.interface";
import {User} from "../entities/user.entity";


export class OrganizeConference {


    constructor(
        private readonly repository: IConferenceRepository,
        private readonly idGenerator: IIdGeneratorInterface,
        private readonly dateGenerator: IDateGeneratorInterface
    ) {
    }

    async execute(data: { user: User, title: string, startDate: Date, endDate: Date, seats: number }) {
        const id = this.idGenerator.generate();
        const conference = new Conference({
            id,
            organizerId: data.user.props.id,
            title: data.title,
            startDate: data.startDate,
            endDate: data.endDate,
            seats: data.seats
        })


        if (conference.isTooClose(this.dateGenerator.generate())) {
            throw new Error('Conference must be organized at least 3 days in advance');
        }

        if (conference.asTooManySeats()) {
            throw new Error('Conference must have less than 1000 seats');
        }

        if (conference.asNotEnoughSeats()) {
            throw new Error('Conference must have at least 20 seats');
        }

        if (conference.isTooLong()) {
            throw new Error('Conference must be less than 3 hours long');
        }

        await this.repository.create(conference);
        return {id: id};
    }
}