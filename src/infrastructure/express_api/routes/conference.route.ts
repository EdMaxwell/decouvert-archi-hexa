import express from "express";
import {createConference} from "../../../infrastructure/express_api/controllers/conference.controller";
import {isAuthenticated} from "../../../infrastructure/express_api/middlewares/authentication.middleware";
import container from "../../../infrastructure/express_api/config/dependecy-injection";

const router = express.Router();

router.use(isAuthenticated)
router.post('/conference', createConference(container))

export default router;