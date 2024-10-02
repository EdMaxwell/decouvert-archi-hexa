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
    })
}