import Conference from "../../conferences/entities/conference.entity";
import {addDays, addHours} from "date-fns";
import {testUsers} from "../../user/utils/user-seeds";

export const testConference = {
    conference1: new Conference({
        id: 'id-1',
        organizerId: testUsers.johnDoe.props.id,
        title: 'My first conference',
        startDate: addDays(new Date(), 4),
        endDate: addDays(addHours(new Date(), 2), 4),
        seats: 100
    }),
    conference2: new Conference({
        id: 'id-2',
        organizerId: testUsers.johnDoe.props.id,
        title: 'My second conference',
        startDate: addDays(new Date(), 4),
        endDate: addDays(addHours(new Date(), 2), 4),
        seats: 25,
    }),
    conferenceAlreadyStarted: new Conference({
        id: 'id-3',
        organizerId: testUsers.johnDoe.props.id,
        title: 'My third conference',
        startDate: new Date('2023-01-01T09:00:00Z'),
        endDate: new Date('2023-01-01T12:00:00Z'),
        seats: 1000,
    }),
}