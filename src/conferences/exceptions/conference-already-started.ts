import {DomainException} from "../../core/exceptions/domain-exception";

export class ConferenceAlreadyStartedException extends DomainException {
    constructor() {
        super(`Conference has already started`);
    }
}