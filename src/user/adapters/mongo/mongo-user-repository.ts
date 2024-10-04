import {IUserRepository} from "../../../user/ports/user-repository.interface";
import {User} from "../../../user/entities/user.entity";
import {Model, Promise} from "mongoose";
import {MongoUser} from "../../../user/adapters/mongo/mongo-user";


class UserMapper {
    toCore(user: MongoUser.UserDocument): User {
        return new User({
            id: user._id,
            emailAdress: user.email,
            password: user.password
        })
    }

    toPersistence(user: User): MongoUser.UserDocument {
        return new MongoUser.UserModel({
            _id: user.props.id,
            email: user.props.emailAdress,
            password: user.props.password
        })
    }
}

export class MongoUserRepository implements IUserRepository {
    private readonly mapper = new UserMapper()

    constructor(
        private readonly model: Model<MongoUser.UserDocument>
    ) {

    }

    async create(user: User): Promise<void> {
        const record = this.mapper.toPersistence(user)

        await record.save()
    }


    async findByEmail(email: string): Promise<User | null> {
        const user = await this.model.findOne({email})

        if (!user) {
            return null
        }

        return this.mapper.toCore(user)
    }

    async findById(id: string): Promise<User | null> {
        const user = this.model.findOne({_id: id})
        return user.then(user => {
            if (!user) {
                return null
            }

            return this.mapper.toCore(user)
        })
    }
}