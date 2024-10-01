import express from "express";
import {createConference} from "../../../infrastructure/express_api/controllers/conference.controller";
import {isAuthenticated} from "../../../infrastructure/express_api/middlewares/authentication.middleware";

const router = express.Router();

router.use(isAuthenticated)
router.post('/conference', createConference)

export default router;