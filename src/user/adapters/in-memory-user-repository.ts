import {User} from "../entities/user.entity";
import {IUserRepository} from "../../user/ports/user-repository.interface";
import {Promise} from "mongoose";

export class InMemoryUserRepository implements IUserRepository {
    private users: User[] = []

    async create(user: User): Promise<void> {
        this.users.push(user)
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.props.emailAdress === email)
        return user ?? null
    }

    async findById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.props.id === id)
        return user ?? null
    }

}