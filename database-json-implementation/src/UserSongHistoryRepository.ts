import { IUserSongHistoryRepository } from 'database-abstraction-layer';
import { copy, UserSongHistory } from 'music-app-models';
import { JsonDB } from './json-handling/json-handling';
import { negatePredicate } from './utils/predicate-ops';

export class UserSongHistoryRepository implements IUserSongHistoryRepository {
    jsonDb: JsonDB;

    constructor(jsonDb: JsonDB){
        this.jsonDb = jsonDb;
    }

    equivalentUserSongHistoryQuery(ush: UserSongHistory) {
        return (
            (u: UserSongHistory) =>
                u.user_email == ush.user_email &&
                u.song_album_artist_id == ush.song_album_artist_id &&
                u.song_album_number == ush.song_album_number &&
                u.song_number == ush.song_number &&
                u.timestamp == ush.timestamp
        );
    }

    getAllByUserEmail(email: string): UserSongHistory[] {
        return this.jsonDb.userSongHistories.filter(
            h => h.user_email == email
        ).map(copy);
    }

    add(instance: UserSongHistory): boolean {
        if(this.jsonDb.userSongHistories.find(this.equivalentUserSongHistoryQuery(instance)))
            return false;

        const newUsh = new UserSongHistory();
        Object.assign(newUsh, instance);

        newUsh.timestamp = new Date();

        this.jsonDb.userSongHistories.push(newUsh);
        this.jsonDb.saveChanges();

        return true;
    }

    update(instance: UserSongHistory): boolean {
        return false;
    }

    delete(instance: UserSongHistory): boolean {
        const usHistory = this.jsonDb.userSongHistories.find(this.equivalentUserSongHistoryQuery(instance));

        if(!usHistory)
            return false;
        
        this.jsonDb.userSongHistories = this.jsonDb.userSongHistories.filter(negatePredicate(this.equivalentUserSongHistoryQuery(instance)));
        this.jsonDb.saveChanges();

        return true;
    }

    getAll(): UserSongHistory[] {
        return this.jsonDb.userSongHistories.map(copy);
    }
}