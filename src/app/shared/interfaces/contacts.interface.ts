import { Messages } from "./messages.interface";

export interface contacts {
    id?: string,
    icon: string,
    username: string,
    time: string,
    missing: number,
    text: string,
    url: string,
    messages?: Array<Messages>
}