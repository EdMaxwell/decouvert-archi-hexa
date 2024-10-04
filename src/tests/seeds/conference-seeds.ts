import Conference from "../../conferences/entities/conference.entity";
import {addDays, addHours} from "date-fns";
import {e2eUsers} from "../../tests/seeds/user-seeds";
import {ConferenceFixture} from "../../tests/utils/conference-fixture";

export const e2eConferences = {
    valideConference: new ConferenceFixture(new Conference({
        id: 'id-1',
        organizerId: e2eUsers.johnDoe.entity.props.id,
        title: 'My first conference',
        startDate: addDays(new Date(), 4),
        endDate: addDays(addHours(new Date(), 2), 4),
        seats: 50
    }))

}