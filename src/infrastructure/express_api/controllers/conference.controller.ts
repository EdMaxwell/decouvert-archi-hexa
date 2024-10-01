import {RandomIdGenerator} from "../../../adapters/random-id-generator";
import {CurrentDateGenerator} from "../../../adapters/current-date-generator";
import {InMemoryConferenceRepository} from "../../../adapters/in-memory-conference-repository";
import {OrganizeConference} from "../../../usecases/organize-conference";
import {RequestHandler} from "express";
import {User} from "../../../entities/user.entity";

const idGenerator = new RandomIdGenerator()
const currentDateGenerator = new CurrentDateGenerator()
const repository = new InMemoryConferenceRepository()
const useCase = new OrganizeConference(repository, idGenerator, currentDateGenerator)


export const createConference: RequestHandler = async (req, res, next) => {
    try {
        const {title, startDate, endDate, seats} = req.body;
        const result = await useCase.execute({
            user: new User({id: 'john-doe'}),
            title,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            seats
        });

        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};


