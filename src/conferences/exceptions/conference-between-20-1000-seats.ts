import {DomainException} from "../../core/exceptions/domain-exception";

export class ConferenceBetween20And1000SeatsException extends DomainException {
    constructor() {
        super('Conference must have at least 20 seats and at most 1000 seats');
    }
}