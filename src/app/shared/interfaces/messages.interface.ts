import { Files } from "./file.interface"

export interface Messages {
    date: string,
    dateForCheck: string,
    file: string | Files,
    text: string,
    time: string,
    user: string,
    userIcon: string
}