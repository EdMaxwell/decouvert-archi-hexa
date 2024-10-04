import request from "supertest";
import container from "../infrastructure/express_api/config/dependecy-injection";
import {IConferenceRepository} from "../conferences/ports/conference-repository.inteface";
import {TestApp} from "../tests/utils/test-app";
import {Application} from "express";
import {e2eUsers} from "../tests/seeds/user-seeds";
import {e2eConferences} from "../tests/seeds/conference-seeds";

describe('Feature: Change number of seats in a conference', () => {
    let testApp: TestApp
    let app: Application

    beforeEach(async () => {
        testApp = new TestApp()
        await testApp.setup()
        await testApp.loadAllFixtures([e2eUsers.johnDoe, e2eConferences.valideConference])
        app = testApp.expressApp
    })
    afterAll(async () => {
        await testApp.teardown()
    })

    describe('Scenario: Happy path', () => {
        it('should change the number of seats in a conference', async () => {
            const result = await request(app).patch(`/conference/${e2eConferences.valideConference.entity.props.id}/seats`)
                .set('Authorization', e2eUsers.johnDoe.createAuthorizationToken())
                .send({
                    title: e2eConferences.valideConference.entity.props.title,
                    startDate: e2eConferences.valideConference.entity.props.startDate,
                    endDate: e2eConferences.valideConference.entity.props.endDate,
                    seats: 50
                })

            expect(result.status).toBe(200)

            const conferenceRepository = container.resolve('conferenceRepository') as IConferenceRepository
            const fetchedConference = await conferenceRepository.findById(e2eConferences.valideConference.entity.props.id)

            expect(fetchedConference).toBeDefined()
            expect(fetchedConference?.props).toEqual({
                id: e2eConferences.valideConference.entity.props.id,
                organizerId: e2eUsers.johnDoe.entity.props.id,
                title: e2eConferences.valideConference.entity.props.title,
                startDate: e2eConferences.valideConference.entity.props.startDate,
                endDate: e2eConferences.valideConference.entity.props.endDate,
                seats: 50
            })
        })
    })

    describe('Scenario: User is not authorized', () => {
        it('should change the number of seats in a conference', async () => {
            const result = await request(app).patch(`/conference/${e2eConferences.valideConference.entity.props.id}/seats`)
                .send({
                    title: e2eConferences.valideConference.entity.props.title,
                    startDate: e2eConferences.valideConference.entity.props.startDate,
                    endDate: e2eConferences.valideConference.entity.props.endDate,
                    seats: 50
                })

            expect(result.status).toBe(403)

        })

    })


})