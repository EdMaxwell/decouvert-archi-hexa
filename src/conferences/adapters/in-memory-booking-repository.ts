import {IBookingRepository} from "../../conferences/ports/booking-repository.interface";
import {Booking} from "../../conferences/entities/booking.entity";
import {Promise} from "mongoose";

export class InMemoryBookingRepository implements IBookingRepository {
    public data: Booking[] = [];

    async create(booking: Booking): Promise<void> {
        this.data.push(booking);
    }

    async findByConferenceId(conferenceId: string): Promise<Booking[]> {
        return this.data.filter(booking => booking.props.conferenceId === conferenceId);
    }

    async createAll(bookings: Booking[]) {
        for (const booking of bookings) {
            await this.create(booking);
        }
    }

    async findById(id: string): Promise<Booking | null> {
        const booking = this.data.find(booking => booking.props.id === id);
        return booking ? booking : null;
    }
}