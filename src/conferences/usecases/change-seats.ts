import {User} from "../../user/entities/user.entity";
import {IConferenceRepository} from "../../conferences/ports/conference-repository.inteface";
import {IExecutable} from "../../core/executable.interface";
import {ConferenceNotFoundException} from "../../conferences/exceptions/conference-not-found";
import {ConferenceUpdateForbiddenException} from "../../conferences/exceptions/conference-update-forbidden";
import {ConferenceBetween20And1000SeatsException} from "../../conferences/exceptions/conference-between-20-1000-seats";
import {IBookingRepository} from "../../conferences/ports/booking-repository.interface";
import {SeatsBelowCurrentBookingsException} from "../exceptions/conference-seats-less-than-booking";

type RequestChangeSeats = {
    conferenceId: string;
    seats: number;
    user: User
}

type ResponseChangeSeats = void

export class ChangeSeats implements IExecutable<RequestChangeSeats, ResponseChangeSeats> {
    constructor(
        private readonly repository: IConferenceRepository,
        private readonly bookingRepository: IBookingRepository,
    ) {
    }

    async execute({conferenceId, seats, user}) {
        const conference = await this.repository.findById(conferenceId);
        const bookings = await this.bookingRepository.findByConferenceId(conferenceId);

        if (!conference) throw new ConferenceNotFoundException()

        if (conference.props.organizerId !== user.props.id) throw new ConferenceUpdateForbiddenException()

        if (bookings.length >= seats) throw new SeatsBelowCurrentBookingsException()

        conference.update({seats});

        if (conference.asNotEnoughSeats() || conference.asTooManySeats()) throw new ConferenceBetween20And1000SeatsException()

        await this.repository.update(conference);
    }
}