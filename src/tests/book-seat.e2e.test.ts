import {Application} from "express";
import {TestApp} from "../tests/utils/test-app";
import {e2eUsers} from "../tests/seeds/user-seeds";
import {e2eConferences} from "../tests/seeds/conference-seeds";
import {e2eBooking} from "../tests/seeds/booking-seeds";
import {IFixture} from "../tests/utils/fixture.inteface";
import request from "supertest";
import container from "../infrastructure/express_api/config/dependecy-injection";

describe('Feature: Book a seat in a conference', () => {
    let testApp: TestApp
    let app: Application

    beforeEach(async () => {
        testApp = new TestApp()
        await testApp.setup()
        const fixtures: IFixture[] = [
            ...Object.values(e2eUsers),
            ...Object.values(e2eConferences),
            ...Object.values(e2eBooking)
        ];
        await testApp.loadAllFixtures(fixtures);
        app = testApp.expressApp
    })

    afterAll(async () => {
        await testApp.teardown()
    })

    describe('Scenario: Happy path', () => {
        it('should book a seat in a conference', async () => {
            const result = await request(app).post(`/conference/${e2eConferences.valideConference.entity.props.id}/book`)
                .set('Authorization', e2eUsers.bobTheDow.createAuthorizationToken())
                .send({})

            expect(result.status).toBe(201)

            const bookingRepository = container.resolve('bookingRepository')
            const fetchedBooking = await bookingRepository.findById(result.body.data.id)

            expect(fetchedBooking).toBeDefined()
            expect(fetchedBooking?.props).toEqual({
                id: result.body.data.id,
                userId: e2eUsers.bobTheDow.entity.props.id,
                conferenceId: e2eConferences.valideConference.entity.props.id
            })

        })
    })
})