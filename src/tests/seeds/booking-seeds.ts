import {BookingFixture} from "../../tests/utils/booking-fixture";
import {Booking} from "../../conferences/entities/booking.entity";

export const e2eBooking = {
    johnTheDow: new BookingFixture(
        new Booking({
            userId: 'johnTheDow',
            conferenceId: 'conference1',
        })
    ),
    janeTheDow: new BookingFixture(
        new Booking({
            userId: 'janeTheDow',
            conferenceId: 'conference1',
        })
    )
}