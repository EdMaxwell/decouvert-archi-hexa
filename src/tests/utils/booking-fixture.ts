import {IFixture} from "../../tests/utils/fixture.inteface";
import {Booking} from "../../conferences/entities/booking.entity";
import {AwilixContainer} from "awilix";
import {IBookingRepository} from "../../conferences/ports/booking-repository.interface";

export class BookingFixture implements IFixture {
    constructor(public entity: Booking) {

    }

    async load(container: AwilixContainer): Promise<void> {
        const repository = container.resolve('bookingRepository') as IBookingRepository;
        await repository.create(this.entity);
    }
}