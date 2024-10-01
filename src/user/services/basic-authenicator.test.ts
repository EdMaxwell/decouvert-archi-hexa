import {BasicAuthenticator} from "./basic-authenticator";
import {InMemoryUserRepository} from "../adapters/in-memory-user-repository";
import {User} from "../entities/user.entity";

describe('Authenticator', () => {
    let repository: InMemoryUserRepository
    let authenticator: BasicAuthenticator

    beforeEach(async () => {
        repository = new InMemoryUserRepository()
        await repository.create(new User({
            id: 'john-doe',
            emailAdress: 'johndoe@gmail.com',
            password: 'azerty'
        }))
        authenticator = new BasicAuthenticator(repository)
    })

    describe('Scenario: token is valid', () => {
        it('should return a user', async () => {


            const payload = Buffer.from('johndoe@gmail.com:azerty').toString('base64')

            const user = await authenticator.authenticate(payload)


            expect(user.props).toEqual({
                id: 'john-doe',
                emailAdress: 'johndoe@gmail.com',
                password: 'azerty'
            })
        })
    })
    describe('Scenario: email is not valid', () => {
        it('should throw an error', async () => {

            const payload = Buffer.from('johntoe@gmail.com:azerty').toString('base64')
            await expect(authenticator.authenticate(payload)).rejects.toThrowError('Wrong credentials')
        })
    })

    describe('Scenario: password is not valid', () => {
        it('should throw an error', async () => {

            const payload = Buffer.from('johndoe@gmail.com:aterty').toString('base64')
            await expect(authenticator.authenticate(payload)).rejects.toThrowError('Wrong credentials')
        })
    })
})