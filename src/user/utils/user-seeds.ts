import {User} from "../../user/entities/user.entity";

export const testUsers = {
    johnDoe: new User({
        id: 'john-doe',
        emailAdress: 'johndoe@gmail.com',
        password: 'azerty'
    }),

    johnTheDow: new User({
        id: 'john-thedow',
        emailAdress: 'johnthedow@gmail.com',
        password: 'azerty'
    })
}