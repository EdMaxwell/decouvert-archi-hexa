import {User} from "../entities/user.entity";

export class InMemoryUserRepository {
    private users: User[] = []

    async create(user: User): Promise<void> {
        this.users.push(user)
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.props.emailAdress === email)
        return user ?? null
    }
}