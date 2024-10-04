import {IConferenceRepository} from "../../../conferences/ports/conference-repository.inteface";
import Conference from "../../../conferences/entities/conference.entity";
import {MongoConference} from "../../../conferences/adapters/mongo/mongo-conference";
import {Model, Promise} from "mongoose";

class ConferenceMapper {
    toCore(conference: MongoConference.ConferenceDocument): Conference {
        return new Conference({
            id: conference._id,
            organizerId: conference.organizerId,
            title: conference.title,
            startDate: conference.startDate,
            endDate: conference.endDate,
            seats: conference.seats
        })
    }

    toPersistence(conference: Conference): MongoConference.ConferenceDocument {
        return new MongoConference.ConferenceModel({
            _id: conference.props.id,
            organizerId: conference.props.organizerId,
            title: conference.props.title,
            startDate: conference.props.startDate,
            endDate: conference.props.endDate,
            seats: conference.props.seats
        })
    }
}

export class MongoConferenceRepository implements IConferenceRepository {
    private readonly mapper = new ConferenceMapper()

    constructor(
        private readonly model: Model<MongoConference.ConferenceDocument>
    ) {

    }

    async create(conference: Conference): Promise<void> {
        const record = this.mapper.toPersistence(conference)

        await record.save()
    }

    async findById(id: string): Promise<Conference | null> {
        const conference = this.model.findOne({_id: id})
        return conference.then(conference => {
            if (!conference) {
                return null
            }

            return this.mapper.toCore(conference)
        })
    }

    async get(): Promise<Conference[]> {
        const conferences = await this.model.find()
        return conferences.map(conference => this.mapper.toCore(conference))
    }

    async update(conference: Conference): Promise<void> {
        const record = this.mapper.toPersistence(conference)
        await this.model.updateOne({_id: conference.props.id}, record)
    }
}