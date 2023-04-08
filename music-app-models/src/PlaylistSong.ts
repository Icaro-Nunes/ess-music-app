import { Constructable } from "./Constructable";

export class PlaylistSong extends Constructable{
    playlist_owner_email: string;
    playlist_number: number;
    song_album_artist_id: string;
    song_album_number: number;
    song_number: number;
}