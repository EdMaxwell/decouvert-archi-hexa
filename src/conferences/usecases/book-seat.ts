// src/conferences/usecases/book-seat.ts
import {IConferenceRepository} from "../../conferences/ports/conference-repository.inteface";
import {IBookingRepository} from "../../conferences/ports/booking-repository.interface";
import {User} from "../../user/entities/user.entity";
import {IExecutable} from "../../core/executable.interface";
import {ConferenceNotFoundException} from "../../conferences/exceptions/conference-not-found";
import {ConferenceIsFullException} from "../../conferences/exceptions/conference-is-full";
import {Booking} from "../../conferences/entities/booking.entity";
import Conference from "../../conferences/entities/conference.entity";
import {ConferenceUserAlreadyBookedException} from "../../conferences/exceptions/conference-user-already-book";
import {ConferenceIsTheOrganizerException} from "../../conferences/exceptions/conference-user-is-organizer";
import {ConferenceAlreadyStartedException} from "../../conferences/exceptions/conference-already-started";

type RequestBookSeat = {
    user: User;
    conferenceId: string;
}

type ResponseBookSeat = void

export class BookSeat implements IExecutable<RequestBookSeat, ResponseBookSeat> {
    constructor(
        private readonly repository: IConferenceRepository,
        private readonly bookingsRepository: IBookingRepository
    ) {
    }

    async execute({user, conferenceId}: RequestBookSeat): Promise<ResponseBookSeat> {
        const conference = await this.repository.findById(conferenceId) as Conference;

        if (!conference) throw new ConferenceNotFoundException();

        if (conference.props.startDate < new Date()) throw new ConferenceAlreadyStartedException();

        if (conference.props.organizerId === user.props.id) throw new ConferenceIsTheOrganizerException();

        const bookings = await this.bookingsRepository.findByConferenceId(conferenceId);

        for (const booking of bookings) {
            if (booking.props.userId === user.props.id) throw new ConferenceUserAlreadyBookedException();
        }

        const bookingCount = bookings.length;

        if (conference.isFull(bookingCount)) throw new ConferenceIsFullException();

        const booking = new Booking({
            userId: user.props.id,
            conferenceId: conference.props.id
        });

        await this.bookingsRepository.create(booking);
        await this.repository.update(conference);
    }
}