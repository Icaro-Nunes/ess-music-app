import { Constructable } from "./Constructable";

export class UserSongHistory extends Constructable {
    user_email: string;
    song_album_artist_id: string;
    song_album_number: number;
    song_number: number;
    timestamp: Date;
}