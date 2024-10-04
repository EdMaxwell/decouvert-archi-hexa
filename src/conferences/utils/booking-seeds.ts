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
    }),

    // Nouvelles réservations
    user1Booking: new Booking({
        userId: testUsers.user1.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user2Booking: new Booking({
        userId: testUsers.user2.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user3Booking: new Booking({
        userId: testUsers.user3.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user4Booking: new Booking({
        userId: testUsers.user4.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user5Booking: new Booking({
        userId: testUsers.user5.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user6Booking: new Booking({
        userId: testUsers.user6.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user7Booking: new Booking({
        userId: testUsers.user7.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user8Booking: new Booking({
        userId: testUsers.user8.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user9Booking: new Booking({
        userId: testUsers.user9.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user10Booking: new Booking({
        userId: testUsers.user10.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user11Booking: new Booking({
        userId: testUsers.user11.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user12Booking: new Booking({
        userId: testUsers.user12.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user13Booking: new Booking({
        userId: testUsers.user13.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user14Booking: new Booking({
        userId: testUsers.user14.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user15Booking: new Booking({
        userId: testUsers.user15.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user16Booking: new Booking({
        userId: testUsers.user16.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user17Booking: new Booking({
        userId: testUsers.user17.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user18Booking: new Booking({
        userId: testUsers.user18.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user19Booking: new Booking({
        userId: testUsers.user19.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user20Booking: new Booking({
        userId: testUsers.user20.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user21Booking: new Booking({
        userId: testUsers.user21.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user22Booking: new Booking({
        userId: testUsers.user22.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user23Booking: new Booking({
        userId: testUsers.user23.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user24Booking: new Booking({
        userId: testUsers.user24.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user25Booking: new Booking({
        userId: testUsers.user25.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user26Booking: new Booking({
        userId: testUsers.user26.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user27Booking: new Booking({
        userId: testUsers.user27.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user28Booking: new Booking({
        userId: testUsers.user28.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user29Booking: new Booking({
        userId: testUsers.user29.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user30Booking: new Booking({
        userId: testUsers.user30.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user31Booking: new Booking({
        userId: testUsers.user31.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user32Booking: new Booking({
        userId: testUsers.user32.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user33Booking: new Booking({
        userId: testUsers.user33.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user34Booking: new Booking({
        userId: testUsers.user34.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user35Booking: new Booking({
        userId: testUsers.user35.props.id,
        conferenceId: testConference.conference1.props.id
    }),
};
