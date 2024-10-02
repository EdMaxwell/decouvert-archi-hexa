import express, {Application} from "express";
import {jsonResponseMiddleware} from "../../infrastructure/express_api/middlewares/json-response.middleware";
import conferenceRoute from "../../infrastructure/express_api/routes/conference.route";
import {errorHandlerMiddleware} from "../../infrastructure/express_api/middlewares/error-handler.middleware";
import {IFixture} from "./fixture.inteface";
import {AwilixContainer} from "awilix";
import container from "../../infrastructure/express_api/config/dependecy-injection";

export class TestApp {
    private app: Application
    private container: AwilixContainer

    constructor() {
        this.app = express()
        this.container = container
    }

    async setup() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(jsonResponseMiddleware)
        this.app.use(conferenceRoute)
        this.app.use(errorHandlerMiddleware)
    }

    async loadAllFixtures(fixtures: IFixture[]) {
        return Promise.all(fixtures.map(fixture => fixture.load(this.container)))
    }

    get expressApp() {
        return this.app
    }
}