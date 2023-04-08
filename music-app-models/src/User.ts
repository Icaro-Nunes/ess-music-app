import { Constructable } from "./Constructable";

export class User extends Constructable {
    email: string;
    nome: string;
    senha: string;
    role: UserRole = UserRole.User;
}

export enum UserRole {
    User,
    Admin
}