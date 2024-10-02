import request from "supertest";
import app from "../infrastructure/express_api/app";
import {addDays, addHours} from "date-fns";
import {User} from "../user/entities/user.entity";
import {InMemoryUserRepository} from "../user/adapters/in-memory-user-repository";
import container from "../infrastructure/express_api/config/dependecy-injection";

describe('Feature: Organize Conference', () => {
    const johndoe = new User({
        id: 'john-doe',
        emailAdress: 'johndoe@gmail.com',
        password: 'azerty'
    })

    let repository: InMemoryUserRepository

    beforeEach(async () => {
        repository = container.resolve('userRepository')
        await repository.create(johndoe)
    })

    it('should organize a conference', async () => {


        const result = await request(app).post('/conference')
            .set('Authorization', 'Basic am9obmRvZUBnbWFpbC5jb206YXplcnR5')
            .send({
                title: 'My first conference',
                startDate: addDays(new Date(), 4).toISOString(),
                endDate: addHours(addDays(new Date(), 4), 1).toISOString(),
                seats: 100
            })
        console.log(result)
        expect(result.status).toBe(201)
        expect(result.body.data).toEqual({
            id: expect.any(String),
        })
    })
})