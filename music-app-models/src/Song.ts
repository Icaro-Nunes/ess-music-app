import { Constructable } from "./Constructable";

export class Song extends Constructable{
    artist_id: string;
    playlist_number: number;
    song_number: number;
    name: string;
    length: number;
}