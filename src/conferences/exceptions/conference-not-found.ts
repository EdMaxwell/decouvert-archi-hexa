import {Error} from "mongoose";

export class ConferenceNotFoundException extends Error {
    constructor() {
        super(`Conference not found`);
    }
}