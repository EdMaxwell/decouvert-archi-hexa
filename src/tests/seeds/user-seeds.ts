import {UserFixture} from "../../tests/utils/user-fixture";
import {User} from "../../user/entities/user.entity";

export const e2eUsers = {
    johnDoe: new UserFixture(new User({
        id: 'john-doe',
        emailAdress: 'johndoe@gmail.com',
        password: 'azerty'
    })),
}