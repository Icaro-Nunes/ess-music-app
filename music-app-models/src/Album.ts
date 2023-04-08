import { Constructable } from "./Constructable";
import { Genre } from "./Genre";

export class Album extends Constructable {
    artist_id: string;
    album_number: number;
    genre: Genre;
    name: number;
    release_year: number;
}