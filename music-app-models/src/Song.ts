import { Constructable } from "./Constructable";

export class Song extends Constructable{
    album_artist_id: string;
    album_number: number;
    song_number: number;
    name: string;
    length: number;
}