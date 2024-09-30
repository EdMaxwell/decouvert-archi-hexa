import * as request from "supertest";
import app from "../infrastructure/express_api/app";
import {addDays, addHours} from "date-fns";

describe('Feature: Organize Conference', () => {
    it('should organize a conference', async () => {
        const result = await request(app).post('/conference').send({
            title: 'My first conference',
            startDate: addDays(new Date(), 4).toISOString(),
            endDate: addHours(addDays(new Date(), 4), 1).toISOString(),
            seats: 100
        }).expect(201)

        expect(result.body).toEqual({
            id: "id-1",
        })
    })
})