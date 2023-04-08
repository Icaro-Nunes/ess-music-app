import { Constructable } from "./Constructable";
import { Genre } from "./Genre";

export class Artist extends Constructable {
    id: string;
    name: string;
    nationality: string;
    genre: Genre;
}