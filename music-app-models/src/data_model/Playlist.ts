import { User } from "./User";

export class Playlist {
    owner_email: string;
    number: number;
    name: string;
    description: string;
    privacy: Privacy
}

export enum Privacy {
    Public,
    Private
}