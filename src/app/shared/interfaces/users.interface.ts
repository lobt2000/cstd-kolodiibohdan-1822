// import { mesUser } from "./mesUser.interface";

import { contacts } from "./contacts.interface";

export interface Users {
    id?: string,
    email: string,
    icon: string,
    password: string
    firstname: string,
    secondname: string,
    userPos: string,
    contacts?: Array<contacts>,
    kinderId?: string,
    phone?: string,
    username?: string,
    url?: string,
}