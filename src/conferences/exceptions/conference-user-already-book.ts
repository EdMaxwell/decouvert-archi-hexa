import {DomainException} from "../../core/exceptions/domain-exception";

export class ConferenceUserAlreadyBookedException extends DomainException {
    constructor() {
        super(`User already booked`);
    }
}