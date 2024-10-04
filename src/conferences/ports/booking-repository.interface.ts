import {Booking} from "../../conferences/entities/booking.entity";

export interface IBookingRepository {
    create(booking: Booking): Promise<void>;

    findByConferenceId(conferenceId: string): Promise<Booking[]>;
}