export class SeatsBelowCurrentBookingsException extends Error {
    constructor() {
        super("The number seats must be greater than the number of bookings");
    }
}