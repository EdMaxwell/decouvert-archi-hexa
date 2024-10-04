export class ConferenceUpdateForbiddenException extends Error {
    constructor() {
        super(`User is not the organizer of the conference`);
    }
}