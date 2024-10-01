import {User} from "../../user/entities/user.entity";
import {IConferenceRepository} from "../../conferences/ports/conference-repository.inteface";

type RequestChangeSeats = {
    conferenceId: string;
    seats: number;
    user: User
}

type ResponseChangeSeats = void

export class ChangeSeats {
    constructor(private readonly repository: IConferenceRepository) {
    }

    async execute({conferenceId, seats, user}: RequestChangeSeats): Promise<ResponseChangeSeats> {
        const conference = await this.repository.findById(conferenceId);
        if (!conference) {
            throw new Error('Conference not found');
        }
        if (conference.props.organizerId !== user.props.id) {
            throw new Error('Not allowed to update this conference');
        }
        conference.update({seats});
    }
}