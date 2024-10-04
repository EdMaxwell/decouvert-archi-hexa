import {DomainException} from "../../core/exceptions/domain-exception";

export class ConferenceIsFullException extends DomainException {
    constructor() {
        super(`Conference is full`);
    }
}