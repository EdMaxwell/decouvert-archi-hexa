import {Entity} from "../../core/entities/entity";

export interface BookingProps {
    id: string;
    userId: string;
    conferenceId: string;

}

export class Booking extends Entity<BookingProps> {

}