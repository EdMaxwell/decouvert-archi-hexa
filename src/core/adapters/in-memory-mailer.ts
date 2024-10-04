import {Email, IMailer} from "../../core/ports/mailer.interface";
import {Promise} from "mongoose";

export class InMemoryMailer implements IMailer {
    public readonly data: Email[] = [];

    async send(email: Email): Promise<void> {
        this.data.push(email);
    }

    getSentEmails(): Email[] {
        return this.data;
    }

}