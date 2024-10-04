import {TestApp} from "../../../tests/utils/test-app";
import {Model} from "mongoose";
import {MongoUser} from "../../../user/adapters/mongo/mongo-user";
import {MongoUserRepository} from "../../../user/adapters/mongo/mongo-user-repository";
import {testUsers} from "../../../user/utils/user-seeds";

describe('MongoUserRepository', () => {
    let app: TestApp
    let model: Model<MongoUser.UserDocument>
    let repository: MongoUserRepository

    beforeAll(async () => {
        app = new TestApp()
        await app.setup()
        model = MongoUser.UserModel
        await model.deleteMany({})
        repository = new MongoUserRepository(model)

        const record = new model({
            _id: testUsers.johnDoe.props.id,
            email: testUsers.johnDoe.props.emailAdress,
            password: testUsers.johnDoe.props.password
        })

        await record.save()
    })

    afterAll(async () => {
        await app.teardown()
    })

    describe('Scenario: find user by email', () => {
        it('should: Given an email, it should return the user with that email', async () => {
            const user = await repository.findByEmail(testUsers.johnDoe.props.emailAdress)
            expect(user).toEqual(testUsers.johnDoe)
            expect(user?.props).toEqual(testUsers.johnDoe.props)
        })

        it('should: return null if user not found ', async () => {
            const user = await repository.findByEmail('non-existing@gmail.com')
            expect(user).toBeNull()
        });
    })

    describe('Scenario: create user', () => {
        it('should: create a new user', async () => {
            await repository.create(testUsers.johnTheDow)
            const fetchedUser = await model.findOne({_id: testUsers.johnTheDow.props.id})

            expect(fetchedUser).not.toBeNull()
            expect(fetchedUser?.toObject()).toEqual({
                _id: testUsers.johnTheDow.props.id,
                email: testUsers.johnTheDow.props.emailAdress,
                password: testUsers.johnTheDow.props.password,
                __v: 0
            })
        })
    })

    describe('Scenario: find user by id', () => {
        it('should: Given an id, it should return the user with that id', async () => {
            const user = await repository.findById(testUsers.johnDoe.props.id)

            expect(user?.props).toEqual(testUsers.johnDoe.props)
        })

        it('should: return null if user not found ', async () => {
            const user = await repository.findById('non-existing-id')
            expect(user).toBeNull()
        });
    })
})