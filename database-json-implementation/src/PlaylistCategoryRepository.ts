import { IPlaylistCategoryRepository } from 'database-abstraction-layer';
import { copy, PlaylistCategory } from 'music-app-models';
import { JsonDB } from './json-handling/json-handling';
import { negatePredicate } from './utils/predicate-ops';

export class PlaylistCategoryRepository implements IPlaylistCategoryRepository {
    jsonDb: JsonDB;

    constructor(jsonDb: JsonDB){
        this.jsonDb = jsonDb;
    }

    equivalentPlaylistCategory(playlistCategory: PlaylistCategory){
        return (
            (pc: PlaylistCategory) =>
                pc.playlist_owner_email == playlistCategory.playlist_owner_email &&
                pc.playlist_number == playlistCategory.playlist_number &&
                pc.category_name == playlistCategory.category_name
        );
    }

    getAllByPlaylist(playlist_owner: string, playlist_number: number): PlaylistCategory[] {
        return this.jsonDb.playlistCategories.filter(
            pc => 
                pc.playlist_owner_email == playlist_owner &&
                pc.playlist_number == playlist_number
        ).map(copy);
    }

    getAllByCategory(category_name: string): PlaylistCategory[] {
        return this.jsonDb.playlistCategories.filter(
            pc => 
                pc.category_name == category_name
        ).map(copy);
    }

    add(instance: PlaylistCategory): boolean {
        if(this.jsonDb.playlistCategories.find(this.equivalentPlaylistCategory(instance)))
            return false;
        
        const newPc = new PlaylistCategory();
        Object.assign(newPc, instance);

        this.jsonDb.playlistCategories.push(newPc);
        this.jsonDb.saveChanges();

        return true;
    }

    update(instance: PlaylistCategory): boolean {
        return false;
    }

    delete(instance: PlaylistCategory): boolean {
        const playlistCategory = this.jsonDb.playlistCategories.find(this.equivalentPlaylistCategory(instance));

        if(!playlistCategory)
            return false;
        
        this.jsonDb.playlistCategories = this.jsonDb.playlistCategories.filter(negatePredicate(this.equivalentPlaylistCategory(playlistCategory)));
        this.jsonDb.saveChanges();

        return true;
    }

    getAll(): PlaylistCategory[] {
        return this.jsonDb.playlistCategories.map(copy);
    }
}