import {User} from "../../user/entities/user.entity";
import {IConferenceRepository} from "../../conferences/ports/conference-repository.inteface";
import {IExecutable} from "../../core/executable.interface";
import {ConferenceNotFoundException} from "../../conferences/exceptions/conference-not-found";
import {ConferenceUpdateForbiddenException} from "../../conferences/exceptions/conference-update-forbidden";
import {DomainException} from "../../core/exceptions/domain-exception";

type RequestChangeSeats = {
    conferenceId: string;
    seats: number;
    user: User
}

type ResponseChangeSeats = void

export class ChangeSeats implements IExecutable<RequestChangeSeats, ResponseChangeSeats> {
    constructor(private readonly repository: IConferenceRepository) {
    }

    async execute({conferenceId, seats, user}) {
        const conference = await this.repository.findById(conferenceId);
        if (!conference) throw new ConferenceNotFoundException()
        if (conference.props.organizerId !== user.props.id) throw new ConferenceUpdateForbiddenException()

        conference.update({seats});

        if (conference.asNotEnoughSeats() || conference.asTooManySeats()) {
            throw new DomainException('Conference must have at least 20 seats and at most 1000 seats');
        }

        await this.repository.update(conference);
    }
}