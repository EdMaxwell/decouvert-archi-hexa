type UserProps = {
    id: string,
    emailAdress: string,
    password: string
}

export class User {
    constructor(public props: UserProps) {

    }


}