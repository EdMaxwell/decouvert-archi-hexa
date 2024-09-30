import {IConferenceRepository} from "../ports/conference-repository.inteface";
import Conference from "../entities/conference.entity";


export class OrganizeConference {

    constructor(private readonly repository: IConferenceRepository) {

    }

    async execute(data: { title: string, startDate: Date, endDate: Date, seats: number }) {
        await this.repository.create(new Conference('id-1', data.title, data.startDate, data.endDate, data.seats));
    }
}