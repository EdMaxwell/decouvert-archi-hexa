import {testUsers} from "../../user/utils/user-seeds";
import {testConference} from "../../conferences/utils/conference-seeds";
import {Booking} from "../../conferences/entities/booking.entity";

export const testBooking = {
    johnTheDowBooking: new Booking({
        userId: testUsers.johnTheDow.props.id,
        conferenceId: testConference.conference1.props.id
    }),

    janeTheDowBooking: new Booking({
        userId: testUsers.janeTheDow.props.id,
        conferenceId: testConference.conference1.props.id
    })
}