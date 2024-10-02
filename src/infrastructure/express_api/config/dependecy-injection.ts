import {asClass, asValue, createContainer} from "awilix";
import {InMemoryConferenceRepository} from "../../../conferences/adapters/in-memory-conference-repository";
import {RandomIdGenerator} from "../../../core/adapters/random-id-generator";
import {CurrentDateGenerator} from "../../../core/adapters/current-date-generator";
import {InMemoryUserRepository} from "../../../user/adapters/in-memory-user-repository";
import {OrganizeConference} from "../../../conferences/usecases/organize-conference";
import {BasicAuthenticator} from "../../../user/services/basic-authenticator";
import {ChangeSeats} from "../../../conferences/usecases/change-seats";

const container = createContainer()

container.register({
    conferenceRepository: asClass(InMemoryConferenceRepository).singleton(),
    idGenerator: asClass(RandomIdGenerator).singleton(),
    dateProvider: asClass(CurrentDateGenerator).singleton(),
    userRepository: asClass(InMemoryUserRepository).singleton()
})

const conferenceRepository = container.resolve<InMemoryConferenceRepository>('conferenceRepository')
const idGenerator = container.resolve<RandomIdGenerator>('idGenerator')
const dateProvider = container.resolve<CurrentDateGenerator>('dateProvider')
const userRepository = container.resolve<InMemoryUserRepository>('userRepository')

container.register({
    organizeConferenceUseCase: asValue(
        new OrganizeConference(conferenceRepository, idGenerator, dateProvider)
    ),
    changeSeatsUseCase: asValue(new ChangeSeats(conferenceRepository)),
    authenticator: asValue(new BasicAuthenticator(userRepository))

})

export default container