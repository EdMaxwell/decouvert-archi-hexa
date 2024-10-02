import {RequestHandler} from "express";
import {User} from "../../../user/entities/user.entity";
import {CreateConferenceInput} from "../../../infrastructure/express_api/dto/conference.dto";
import {ValidateRequest} from "../../../infrastructure/express_api/utils/validate-request";
import {AwilixContainer} from "awilix";


// After
export const createConference = (container: AwilixContainer): RequestHandler => {
    return async (req, res, next) => {
        try {
            const body = req.body;
            const {errors, input} = await ValidateRequest(CreateConferenceInput, body)

            if (errors) {
                return res.status(400).json({errors});
            }

            const result = await container.resolve('organizeConferenceUseCase').execute({
                user: req.user as User,
                title: input.title,
                startDate: new Date(input.startDate),
                endDate: new Date(input.endDate),
                seats: input.seats
            });

            res.jsonSuccess({id: result.id}, 201);
        } catch (err) {
            next(err);
        }
    };
};


