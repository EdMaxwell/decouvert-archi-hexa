import request from "supertest";

import {addDays, addHours} from "date-fns";
import container from "../infrastructure/express_api/config/dependecy-injection";
import {IConferenceRepository} from "../conferences/ports/conference-repository.inteface";
import {TestApp} from "../tests/utils/test-app";
import {Application} from "express";
import {e2eUsers} from "../tests/seeds/user-seeds";

describe('Feature: Organize Conference', () => {


    let testApp: TestApp
    let app: Application

    beforeEach(async () => {
        testApp = new TestApp()
        await testApp.setup()
        await testApp.loadAllFixtures([e2eUsers.johnDoe])
        app = testApp.expressApp

    })
    afterAll(async () => {
        await testApp.teardown()
    })
    describe('Scenario: Happy path', () => {
        it('should organize a conference', async () => {
            const startDate = addDays(new Date(), 4)
            const endDate = addHours(addDays(new Date(), 4), 1)

            const result = await request(app).post('/conference')
                .set('Authorization', e2eUsers.johnDoe.createAuthorizationToken())
                .send({
                    title: 'My first conference',
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    seats: 100
                })

            expect(result.status).toBe(201)
            expect(result.body.data).toEqual({
                id: expect.any(String),
            })

            const conferenceRepository = container.resolve('conferenceRepository') as IConferenceRepository
            const fetchedConference = await conferenceRepository.findById(result.body.data.id)

            expect(fetchedConference).toBeDefined()
            expect(fetchedConference?.props).toEqual({
                id: result.body.data.id,
                organizerId: e2eUsers.johnDoe.entity.props.id,
                title: 'My first conference',
                startDate: startDate,
                endDate: endDate,
                seats: 100
            })
        })

    })

    describe('Scenario: User is not authorized', () => {
        it('should organize a conference', async () => {
            const startDate = addDays(new Date(), 4)
            const endDate = addHours(addDays(new Date(), 4), 1)

            const result = await request(app).post('/conference')
                .send({
                    title: 'My first conference',
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    seats: 100
                })

            expect(result.status).toBe(403)

        })

    })


})