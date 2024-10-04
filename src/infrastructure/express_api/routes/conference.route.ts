import express from "express";
import {
    bookASeat,
    createConference,
    updateConferenceDate,
    updateConferenceSeats
} from "../../../infrastructure/express_api/controllers/conference.controller";
import {isAuthenticated} from "../../../infrastructure/express_api/middlewares/authentication.middleware";
import container from "../../../infrastructure/express_api/config/dependecy-injection";

const router = express.Router();

router.use(isAuthenticated)
router.post('/conference', createConference(container))
router.patch('/conference/:id/seats', updateConferenceSeats(container))
router.patch('/conference/:id/date', updateConferenceDate(container))
router.post('/conference/:id/book', bookASeat(container))

export default router;