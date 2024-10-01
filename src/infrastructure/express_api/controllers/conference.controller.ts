import {RandomIdGenerator} from "../../../adapters/random-id-generator";
import {CurrentDateGenerator} from "../../../adapters/current-date-generator";
import {InMemoryConferenceRepository} from "../../../adapters/in-memory-conference-repository";
import {OrganizeConference} from "../../../usecases/organize-conference";
import {RequestHandler} from "express";
import {User} from "../../../entities/user.entity";
import {CreateConferenceInput} from "../../../infrastructure/express_api/dto/conference.dto";
import {ValidateRequest} from "../../../infrastructure/express_api/utils/validate-request";

const idGenerator = new RandomIdGenerator()
const currentDateGenerator = new CurrentDateGenerator()
const repository = new InMemoryConferenceRepository()
const useCase = new OrganizeConference(repository, idGenerator, currentDateGenerator)


export const createConference: RequestHandler = async (req, res, next) => {
    try {
        const body = req.body;

        const {errors, input} = await ValidateRequest(CreateConferenceInput, body)

        if (errors) {
            return res.status(400).json({errors});
        }


        const result = await useCase.execute({
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


