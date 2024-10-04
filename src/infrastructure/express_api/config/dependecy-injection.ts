import {asClass, asValue, createContainer} from "awilix";
import {InMemoryConferenceRepository} from "../../../conferences/adapters/in-memory-conference-repository";
import {RandomIdGenerator} from "../../../core/adapters/random-id-generator";
import {CurrentDateGenerator} from "../../../core/adapters/current-date-generator";
import {MongoUserRepository} from "../../../user/adapters/mongo/mongo-user-repository";
import {OrganizeConference} from "../../../conferences/usecases/organize-conference";
import {BasicAuthenticator} from "../../../user/services/basic-authenticator";
import {ChangeSeats} from "../../../conferences/usecases/change-seats";
import {MongoUser} from "../../../user/adapters/mongo/mongo-user";
import {IUserRepository} from "../../../user/ports/user-repository.interface";
import {ChangeDates} from "../../../conferences/usecases/change-date";
import {InMemoryMailer} from "../../../core/adapters/in-memory-mailer";
import {InMemoryBookingRepository} from "../../../conferences/adapters/in-memory-booking-repository";
import {IBookingRepository} from "../../../conferences/ports/booking-repository.interface";
import {IMailer} from "../../../core/ports/mailer.interface";
import {BookSeat} from "../../../conferences/usecases/book-seat";

const container = createContainer()

container.register({
    conferenceRepository: asClass(InMemoryConferenceRepository).singleton(),
    idGenerator: asClass(RandomIdGenerator).singleton(),
    dateProvider: asClass(CurrentDateGenerator).singleton(),
    userRepository: asValue(new MongoUserRepository(MongoUser.UserModel)),
    mailer: asClass(InMemoryMailer).singleton(),
    bookingRepository: asClass(InMemoryBookingRepository).singleton()
})

const conferenceRepository = container.resolve<InMemoryConferenceRepository>('conferenceRepository')
const idGenerator = container.resolve<RandomIdGenerator>('idGenerator')
const dateProvider = container.resolve<CurrentDateGenerator>('dateProvider')
const userRepository = container.resolve<IUserRepository>('userRepository')
const bookingRepository = container.resolve<IBookingRepository>('bookingRepository')
const mailer = container.resolve<IMailer>('mailer')

container.register({
    organizeConferenceUseCase: asValue(
        new OrganizeConference(conferenceRepository, idGenerator, dateProvider)
    ),
    changeSeatsUseCase: asValue(new ChangeSeats(conferenceRepository, bookingRepository)),
    authenticator: asValue(new BasicAuthenticator(userRepository)),
    userRepository: asValue(new MongoUserRepository(MongoUser.UserModel)),
    changeDatesUseCase: asValue(new ChangeDates(conferenceRepository, dateProvider, bookingRepository, mailer, userRepository)),
    bookSeatUseCase: asValue(new BookSeat(conferenceRepository, bookingRepository, userRepository, mailer, idGenerator))
})

export default container