import { IPlaylistSongRepository } from 'database-abstraction-layer';
import { copy, PlaylistSong } from 'music-app-models';
import { JsonDB } from './json-handling/json-handling';
import { negatePredicate } from './utils/predicate-ops';

export class PlaylistSongRepository implements IPlaylistSongRepository {
    jsonDb: JsonDB;

    constructor(jsonDb: JsonDB){
        this.jsonDb = jsonDb;
    }

    equivalentPlaylistSongQuery(playlistSong: PlaylistSong){
        return (
            (ps: PlaylistSong) =>
                ps.playlist_owner_email == playlistSong.playlist_owner_email &&
                ps.playlist_number == playlistSong.playlist_number &&
                ps.song_album_artist_id == playlistSong.song_album_artist_id &&
                ps.song_album_number == playlistSong.song_album_number &&
                ps.song_number == playlistSong.song_number
        );
    }

    getAllByPlaylist(owner_email: string, playlist_number: number): PlaylistSong[] {
        return this.jsonDb.playlistSongs.filter(
            ps =>
                ps.playlist_owner_email == owner_email &&
                ps.playlist_number == playlist_number
        ).map(copy);
    }

    add(instance: PlaylistSong): boolean {
        if(this.jsonDb.playlistSongs.find(this.equivalentPlaylistSongQuery(instance)))
            return false;

        const newPs = new PlaylistSong();
        Object.assign(newPs, instance);

        this.jsonDb.playlistSongs.push(newPs);
        this.jsonDb.saveChanges();

        return true;
    }
    
    update(instance: PlaylistSong): boolean {
        return false;
    }

    delete(instance: PlaylistSong): boolean {
        const playlistSong = this.jsonDb.playlistSongs.find(this.equivalentPlaylistSongQuery(instance));

        if(!playlistSong)
            return false;
        
        this.jsonDb.playlistSongs = this.jsonDb.playlistSongs.filter(negatePredicate(this.equivalentPlaylistSongQuery(playlistSong)));
        this.jsonDb.saveChanges();

        return true;
    }

    getAll(): PlaylistSong[] {
        return this.jsonDb.playlistSongs.map(copy);
    }
}