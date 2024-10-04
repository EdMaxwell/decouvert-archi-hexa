import {testUsers} from "../../user/utils/user-seeds";
import {testConference} from "../../conferences/utils/conference-seeds";
import {Booking} from "../../conferences/entities/booking.entity";

export const testBooking = {
    johnTheDowBooking: new Booking({
        id: 'booking1',
        userId: testUsers.johnTheDow.props.id,
        conferenceId: testConference.conference1.props.id
    }),

    janeTheDowBooking: new Booking({
        id: 'booking2',
        userId: testUsers.janeTheDow.props.id,
        conferenceId: testConference.conference1.props.id
    }),

    // Nouvelles réservations avec champ `id` ajouté
    user1Booking: new Booking({
        id: 'booking3',
        userId: testUsers.user1.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user2Booking: new Booking({
        id: 'booking4',
        userId: testUsers.user2.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user3Booking: new Booking({
        id: 'booking5',
        userId: testUsers.user3.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user4Booking: new Booking({
        id: 'booking6',
        userId: testUsers.user4.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user5Booking: new Booking({
        id: 'booking7',
        userId: testUsers.user5.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user6Booking: new Booking({
        id: 'booking8',
        userId: testUsers.user6.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user7Booking: new Booking({
        id: 'booking9',
        userId: testUsers.user7.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user8Booking: new Booking({
        id: 'booking10',
        userId: testUsers.user8.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user9Booking: new Booking({
        id: 'booking11',
        userId: testUsers.user9.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user10Booking: new Booking({
        id: 'booking12',
        userId: testUsers.user10.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user11Booking: new Booking({
        id: 'booking13',
        userId: testUsers.user11.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user12Booking: new Booking({
        id: 'booking14',
        userId: testUsers.user12.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user13Booking: new Booking({
        id: 'booking15',
        userId: testUsers.user13.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user14Booking: new Booking({
        id: 'booking16',
        userId: testUsers.user14.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user15Booking: new Booking({
        id: 'booking17',
        userId: testUsers.user15.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user16Booking: new Booking({
        id: 'booking18',
        userId: testUsers.user16.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user17Booking: new Booking({
        id: 'booking19',
        userId: testUsers.user17.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user18Booking: new Booking({
        id: 'booking20',
        userId: testUsers.user18.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user19Booking: new Booking({
        id: 'booking21',
        userId: testUsers.user19.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user20Booking: new Booking({
        id: 'booking22',
        userId: testUsers.user20.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user21Booking: new Booking({
        id: 'booking23',
        userId: testUsers.user21.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user22Booking: new Booking({
        id: 'booking24',
        userId: testUsers.user22.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user23Booking: new Booking({
        id: 'booking25',
        userId: testUsers.user23.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user24Booking: new Booking({
        id: 'booking26',
        userId: testUsers.user24.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user25Booking: new Booking({
        id: 'booking27',
        userId: testUsers.user25.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user26Booking: new Booking({
        id: 'booking28',
        userId: testUsers.user26.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user27Booking: new Booking({
        id: 'booking29',
        userId: testUsers.user27.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user28Booking: new Booking({
        id: 'booking30',
        userId: testUsers.user28.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user29Booking: new Booking({
        id: 'booking31',
        userId: testUsers.user29.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user30Booking: new Booking({
        id: 'booking32',
        userId: testUsers.user30.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user31Booking: new Booking({
        id: 'booking33',
        userId: testUsers.user31.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user32Booking: new Booking({
        id: 'booking34',
        userId: testUsers.user32.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user33Booking: new Booking({
        id: 'booking35',
        userId: testUsers.user33.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user34Booking: new Booking({
        id: 'booking36',
        userId: testUsers.user34.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    user35Booking: new Booking({
        id: 'booking37',
        userId: testUsers.user35.props.id,
        conferenceId: testConference.conference1.props.id
    }),

    // Réservations pour conference2 avec champ `id` ajouté
    user1Conference2Booking: new Booking({
        id: 'booking38',
        userId: testUsers.user1.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user2Conference2Booking: new Booking({
        id: 'booking39',
        userId: testUsers.user2.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user3Conference2Booking: new Booking({
        id: 'booking40',
        userId: testUsers.user3.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user4Conference2Booking: new Booking({
        id: 'booking41',
        userId: testUsers.user4.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user5Conference2Booking: new Booking({
        id: 'booking42',
        userId: testUsers.user5.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user6Conference2Booking: new Booking({
        id: 'booking43',
        userId: testUsers.user6.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user7Conference2Booking: new Booking({
        id: 'booking44',
        userId: testUsers.user7.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user8Conference2Booking: new Booking({
        id: 'booking45',
        userId: testUsers.user8.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user9Conference2Booking: new Booking({
        id: 'booking46',
        userId: testUsers.user9.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user10Conference2Booking: new Booking({
        id: 'booking47',
        userId: testUsers.user10.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user11Conference2Booking: new Booking({
        id: 'booking48',
        userId: testUsers.user11.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user12Conference2Booking: new Booking({
        id: 'booking49',
        userId: testUsers.user12.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user13Conference2Booking: new Booking({
        id: 'booking50',
        userId: testUsers.user13.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user14Conference2Booking: new Booking({
        id: 'booking51',
        userId: testUsers.user14.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user15Conference2Booking: new Booking({
        id: 'booking52',
        userId: testUsers.user15.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user16Conference2Booking: new Booking({
        id: 'booking53',
        userId: testUsers.user16.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user17Conference2Booking: new Booking({
        id: 'booking54',
        userId: testUsers.user17.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user18Conference2Booking: new Booking({
        id: 'booking55',
        userId: testUsers.user18.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user19Conference2Booking: new Booking({
        id: 'booking56',
        userId: testUsers.user19.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user20Conference2Booking: new Booking({
        id: 'booking57',
        userId: testUsers.user20.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user21Conference2Booking: new Booking({
        id: 'booking58',
        userId: testUsers.user21.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user22Conference2Booking: new Booking({
        id: 'booking59',
        userId: testUsers.user22.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user23Conference2Booking: new Booking({
        id: 'booking60',
        userId: testUsers.user23.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user24Conference2Booking: new Booking({
        id: 'booking61',
        userId: testUsers.user24.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    user25Conference2Booking: new Booking({
        id: 'booking62',
        userId: testUsers.user25.props.id,
        conferenceId: testConference.conference2.props.id
    }),
};
