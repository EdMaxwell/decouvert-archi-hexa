import {IConferenceRepository} from "../ports/conference-repository.inteface";
import Conference from "../entities/conference.entity";
import {User} from "../../user/entities/user.entity";
import {IIdGeneratorInterface} from "../../core/ports/id-generator.interface";
import {IDateGeneratorInterface} from "../../core/ports/date-generator.interface";
import {IExecutable} from "../../core/executable.interface";
import {DomainException} from "../../core/exceptions/domain-exception";

type RequestOrganizeConference = {
    user: User;
    title: string;
    startDate: Date;
    endDate: Date;
    seats: number;
}

type ResponseOrganizeConference = {
    id: string;
}


export class OrganizeConference implements IExecutable<RequestOrganizeConference, ResponseOrganizeConference> {

    constructor(
        private readonly repository: IConferenceRepository,
        private readonly idGenerator: IIdGeneratorInterface,
        private readonly dateGenerator: IDateGeneratorInterface
    ) {
    }

    async execute({
                      user,
                      title,
                      startDate,
                      endDate,
                      seats
                  }) {
        const id = this.idGenerator.generate();
        const conference = new Conference({
            id,
            organizerId: user.props.id,
            title: title,
            startDate: startDate,
            endDate: endDate,
            seats: seats
        })


        if (conference.isTooClose(this.dateGenerator.generate())) {
            throw new DomainException('Conference must be organized at least 3 days in advance');
        }

        if (conference.asTooManySeats()) {
            throw new DomainException('Conference must have less than 1000 seats');
        }

        if (conference.asNotEnoughSeats()) {
            throw new DomainException('Conference must have at least 20 seats');
        }

        if (conference.isTooLong()) {
            throw new DomainException('Conference must be less than 3 hours long');
        }

        await this.repository.create(conference);
        return {id: id};
    }
}