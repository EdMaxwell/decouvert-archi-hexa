import express from "express";
import {createConference} from "../../../infrastructure/express_api/controllers/conference.controller";

const router = express.Router();

router.post('/conference', createConference)

export default router;