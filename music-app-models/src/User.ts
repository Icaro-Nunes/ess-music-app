import { Constructable } from "./Constructable";

export class User extends Constructable {
    email: string;
    name: string;
    password: string;
    role: UserRole = UserRole.User;
}

export enum UserRole {
    User,
    Admin
}