// src/conferences/usecases/book-seat.ts
import {IConferenceRepository} from "../../conferences/ports/conference-repository.inteface";
import {IBookingRepository} from "../../conferences/ports/booking-repository.interface";
import {User} from "../../user/entities/user.entity";
import {IExecutable} from "../../core/executable.interface";
import {ConferenceNotFoundException} from "../../conferences/exceptions/conference-not-found";
import {ConferenceIsFullException} from "../../conferences/exceptions/conference-is-full";
import {Booking} from "../../conferences/entities/booking.entity";
import Conference from "../../conferences/entities/conference.entity";
import {ConferenceUserAlreadyBookedException} from "../../conferences/exceptions/conference-user-already-book";
import {ConferenceIsTheOrganizerException} from "../../conferences/exceptions/conference-user-is-organizer";
import {ConferenceAlreadyStartedException} from "../../conferences/exceptions/conference-already-started";
import {IUserRepository} from "../../user/ports/user-repository.interface";
import {IMailer} from "../../core/ports/mailer.interface";
import {IIdGeneratorInterface} from "../../core/ports/id-generator.interface";

type RequestBookSeat = {
    user: User;
    conferenceId: string;
}

type ResponseBookSeat = { id: string } // il faudrait rajouter un ID

export class BookSeat implements IExecutable<RequestBookSeat, ResponseBookSeat> {
    constructor(
        private readonly repository: IConferenceRepository,
        private readonly bookingsRepository: IBookingRepository,
        private readonly userRepository: IUserRepository,
        private readonly mailer: IMailer,
        private readonly idGenerator: IIdGeneratorInterface
    ) {
    }

    async execute({user, conferenceId}: RequestBookSeat): Promise<ResponseBookSeat> {
        const conference = await this.repository.findById(conferenceId) as Conference;

        if (!conference) throw new ConferenceNotFoundException();

        if (conference.props.startDate < new Date()) throw new ConferenceAlreadyStartedException();

        if (conference.props.organizerId === user.props.id) throw new ConferenceIsTheOrganizerException();

        const bookings = await this.bookingsRepository.findByConferenceId(conferenceId);

        for (const booking of bookings) {
            if (booking.props.userId === user.props.id) throw new ConferenceUserAlreadyBookedException();
        }

        const bookingCount = bookings.length;

        if (conference.isFull(bookingCount)) throw new ConferenceIsFullException();

        const booking = new Booking({
            id: this.idGenerator.generate(),
            userId: user.props.id,
            conferenceId: conference.props.id
        });

        await this.bookingsRepository.create(booking);
        await this.repository.update(conference);

        await this.sendEmailToOrganizer(conference, user);
        await this.sendEmailToUser(conference, user);

        return {id: booking.props.id};
    }


    private async sendEmailToOrganizer(conference: Conference, user: User) {
        const organizer = await this.userRepository.findById(conference.props.organizerId);
        if (!organizer) {
            console.error('Organizer not found');
            return;
        }

        await this.mailer.send({
            from: 'TEDx conference',
            to: organizer.props.emailAdress,
            subject: `${conference.props.title} has a new participant`,
            body: `The user ${user.props.emailAdress} has booked a seat in the conference ${conference.props.title}`
        });
    }

    private async sendEmailToUser(conference: Conference, user: User) {
        await this.mailer.send({
            from: 'TEDx conference',
            to: user.props.emailAdress,
            subject: `You have booked a seat in ${conference.props.title}`,
            body: `You have booked a seat in the conference ${conference.props.title}. The conference will start the ${conference.props.startDate}`
        });
    }

}