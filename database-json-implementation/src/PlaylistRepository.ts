import { IPlaylistRepository } from 'database-abstraction-layer';
import { copy, Playlist } from 'music-app-models';
import { JsonDB } from './json-handling/json-handling';
import { negatePredicate } from './utils/predicate-ops';

export class PlaylistRepository implements IPlaylistRepository {
    jsonDb: JsonDB;

    constructor(jsonDb: JsonDB){
        this.jsonDb = jsonDb;
    }

    equivalentPlaylistQuery(playlist: Playlist){
        return (
            (p: Playlist) =>
                p.owner_email == playlist.owner_email &&
                p.number == playlist.number
        );
    }

    getAllByOwnerEmail(email: string): Playlist[] {
        return this.jsonDb.playlists.filter(p => p.owner_email == email).map(copy);
    }

    add(instance: Playlist): boolean {
        const newPlaylist = new Playlist();
        Object.assign(newPlaylist, instance);
        
        let autoIncrementedPlaylistNumber = this.jsonDb.playlists.length == 0 ? 1 :
            this.jsonDb.playlists
                .filter(p => p.owner_email == instance.owner_email)
                .map(a => a.number)
                .reduce((a, b) => a > b ? a : b)
            + 1;

        newPlaylist.number = autoIncrementedPlaylistNumber;

        this.jsonDb.playlists.push(newPlaylist);
        this.jsonDb.saveChanges();

        return true;
    }

    update(instance: Playlist): boolean {
        const playlist = this.jsonDb.playlists.find(this.equivalentPlaylistQuery);

        if(!playlist)
            return false;
        
        Object.assign(playlist, instance);
        this.jsonDb.saveChanges();

        return true;
    }

    delete(instance: Playlist): boolean {
        const playlist = this.jsonDb.playlists.find(this.equivalentPlaylistQuery);

        if(!playlist)
            return false;
        
        this.jsonDb.playlists = this.jsonDb.playlists.filter(negatePredicate(this.equivalentPlaylistQuery(playlist)));
        this.jsonDb.saveChanges();

        return true;
    }

    getAll(): Playlist[] {
        return this.jsonDb.playlists.map(copy);
    }
}
