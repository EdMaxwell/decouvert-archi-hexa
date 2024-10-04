import {User} from "../../user/entities/user.entity";
import {IExecutable} from "../../core/executable.interface";
import {IConferenceRepository} from "../../conferences/ports/conference-repository.inteface";
import {IDateGeneratorInterface} from "../../core/ports/date-generator.interface";
import {IBookingRepository} from "../../conferences/ports/booking-repository.interface";
import {IMailer} from "../../core/ports/mailer.interface";
import {IUserRepository} from "../../user/ports/user-repository.interface";
import Conference from "../../conferences/entities/conference.entity";
import {ConferenceNotFoundException} from "../../conferences/exceptions/conference-not-found";
import {ConferenceUpdateForbiddenException} from "../../conferences/exceptions/conference-update-forbidden";
import {DomainException} from "../../core/exceptions/domain-exception";

type RequestChangeDate = {
    user: User;
    conferenceId: string;
    startDate: Date;
    endDate: Date;
}

type ResponseChangeDate = void

export class ChangeDates implements IExecutable<RequestChangeDate, ResponseChangeDate> {
    constructor(
        private readonly repository: IConferenceRepository,
        private readonly dateGenerator: IDateGeneratorInterface,
        private readonly bookingRepository: IBookingRepository,
        private readonly mailer: IMailer,
        private readonly userRepository: IUserRepository
    ) {
    }

    async execute({user, conferenceId, startDate, endDate}) {
        const conference = await this.repository.findById(conferenceId);

        if (!conference) throw new ConferenceNotFoundException()
        if (conference.props.organizerId !== user.props.id) throw new ConferenceUpdateForbiddenException()

        conference?.update({startDate, endDate});

        if (conference.isTooClose(this.dateGenerator.generate())) {
            throw new DomainException('Conference must be organized at least 3 days in advance');
        }

        if (conference.isTooLong()) {
            throw new DomainException('Conference must be less than 3 hours long');
        }
        await this.repository.update(conference);
        await this.sendEmailsToParticipants(conference);

    }

    async sendEmailsToParticipants(conference: Conference): Promise<void> {
        const bookings = await this.bookingRepository.findByConferenceId(conference.props.id);

        const users = await Promise.all(
            bookings.map(async booking => {
                const user = await this.userRepository.findById(booking.props.userId);
                return user ? user : null;
            })
        ).then(users => users.filter(user => user !== null)) as User[];

        await Promise.all(
            users.map(user => {
                return this.mailer.send({
                    from: 'TEDx conference',
                    to: user.props.emailAdress,
                    subject: `${conference.props.title} dates have changed`,
                    body: `The conference ${conference.props.title} has been rescheduled to ${conference.props.startDate} - ${conference.props.endDate}`,
                })
            })
        )
    }
}