import {DomainException} from "../../core/exceptions/domain-exception";

export class ConferenceIsTheOrganizerException extends DomainException {
    constructor() {
        super(`User is the organizer of the conference`);
    }
}