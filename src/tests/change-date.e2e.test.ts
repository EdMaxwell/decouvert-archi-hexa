import {Application} from "express";
import {TestApp} from "../tests/utils/test-app";
import {e2eConferences} from "../tests/seeds/conference-seeds";
import {e2eUsers} from "../tests/seeds/user-seeds";
import request from "supertest";
import {addDays, addHours} from "date-fns";
import container from "../infrastructure/express_api/config/dependecy-injection";
import {e2eBooking} from "../tests/seeds/booking-seeds";

describe('Feature: Change date of a conference', () => {
    let testApp: TestApp
    let app: Application

    beforeEach(async () => {
        testApp = new TestApp()
        await testApp.setup()
        await testApp.loadAllFixtures([
            e2eUsers.johnDoe,
            e2eUsers.janeTheDow,
            e2eUsers.johnTheDow,
            e2eConferences.valideConference,
            e2eBooking.johnTheDow,
            e2eBooking.janeTheDow
        ])
        app = testApp.expressApp
    })

    afterAll(async () => {
        await testApp.teardown()
    })

    describe('Scenario: Happy path', () => {
        it('should change the date of a conference', async () => {
            const startDate = addDays(new Date(), 8);
            const endDate = addDays(addHours(new Date(), 2), 8)
            const id = e2eConferences.valideConference.entity.props.id

            const result = await request(app).patch(`/conference/${id}/date`)
                .set('Authorization', e2eUsers.johnDoe.createAuthorizationToken())
                .send({
                    startDate: startDate,
                    endDate: endDate
                })

            expect(result.status).toBe(200)

            const fetchedConference = await container.resolve('conferenceRepository').findById(id)
            expect(fetchedConference).toBeDefined()
            expect(fetchedConference?.props.startDate).toEqual(startDate.toISOString())
            expect(fetchedConference?.props.endDate).toEqual(endDate.toISOString())

        })
    })
    describe('Scenario: User is not authorized', () => {
        it('should return 403', async () => {
            const startDate = addDays(new Date(), 8);
            const endDate = addDays(addHours(new Date(), 2), 8)
            const result = await request(app).patch(`/conference/${e2eConferences.valideConference.entity.props.id}/date`)
                .send({
                    startDate: startDate,
                    endDate: endDate
                })
            expect(result.status).toBe(403)
        })
    })
})