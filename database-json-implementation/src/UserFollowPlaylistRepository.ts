import { IUserFollowPlaylistRepository } from 'database-abstraction-layer';
import { copy, UserFollowPlaylist } from 'music-app-models';
import { JsonDB } from './json-handling/json-handling';
import { negatePredicate } from './utils/predicate-ops';

export class UserFollowPlaylistRepository implements IUserFollowPlaylistRepository {
    jsonDb: JsonDB;

    constructor(jsonDb: JsonDB){
        this.jsonDb = jsonDb;
    }

    equivalentUserFollowPlaylistQuery(ufp: UserFollowPlaylist){
        return (
            (u: UserFollowPlaylist) =>
                u.playlist_owner_email == ufp.playlist_owner_email &&
                u.playlist_number == ufp.playlist_number &&
                u.follower_email == ufp.follower_email
        );
    }

    getAllByUserEmail(email: string): UserFollowPlaylist[] {
        return this.jsonDb.userFollowPlaylists.filter(
            ufp => ufp.follower_email == email
        ).map(copy);
    }

    add(instance: UserFollowPlaylist): boolean {
        if(this.jsonDb.userFollowPlaylists.find(this.equivalentUserFollowPlaylistQuery(instance)))
            return false;

        const newUfp = new UserFollowPlaylist();
        Object.assign(newUfp, instance);

        this.jsonDb.userFollowPlaylists.push(newUfp);
        this.jsonDb.saveChanges();

        return true;
    }

    update(instance: UserFollowPlaylist): boolean {
        return false;
    }

    delete(instance: UserFollowPlaylist): boolean {
        const ufp = this.jsonDb.userFollowPlaylists.find(this.equivalentUserFollowPlaylistQuery(instance));

        if(!ufp)
            return false;
        
        this.jsonDb.userFollowPlaylists = this.jsonDb.userFollowPlaylists
            .filter(negatePredicate(this.equivalentUserFollowPlaylistQuery(ufp)));

        this.jsonDb.saveChanges();

        return true;
    }

    getAll(): UserFollowPlaylist[] {
        return this.jsonDb.userFollowPlaylists.map(copy);
    }
}