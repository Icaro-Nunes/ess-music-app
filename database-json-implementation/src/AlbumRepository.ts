import { IAlbumRepository } from 'database-abstraction-layer';
import { copy, Genre, Album } from 'music-app-models';
import { JsonDB } from './json-handling/json-handling';
import { negatePredicate } from './utils/predicate-ops';

export class AlbumRepository implements IAlbumRepository {
    jsonDb: JsonDB;

    constructor(jsonDb: JsonDB){
        this.jsonDb = jsonDb;
    }

    equivalentAlbumQuery(album: Album){
        return (
            (a: Album) =>
                a.artist_id == album.artist_id &&
                a.album_number == album.album_number
        )
    }

    add(instance: Album): boolean {
        const createdAlbum = new Album();

        Object.assign(createdAlbum, instance);

        let autoIncrementedAlbumNumber = this.jsonDb.albums.length == 0 ? 1 :
            this.jsonDb.albums
                .filter(a => 
                    a.artist_id == instance.artist_id
                )
                .map(a => a.album_number)
                .reduce((a, b) => a > b ? a : b)
            + 1;

        createdAlbum.album_number = autoIncrementedAlbumNumber;

        this.jsonDb.albums.push(createdAlbum);
        this.jsonDb.saveChanges();

        return true;
    }

    update(instance: Album): boolean {
        const album = this.jsonDb.albums.find(
            this.equivalentAlbumQuery(instance)
        );

        if(!album)
            return false;
        
        Object.assign(album, instance);
        this.jsonDb.saveChanges();
        
        return true;
    }
    
    delete(instance: Album): boolean {
        const album = this.jsonDb.albums.find(this.equivalentAlbumQuery(instance));

        if(!album)
            return false;
        
        this.jsonDb.albums = this.jsonDb.albums.filter(
            negatePredicate(this.equivalentAlbumQuery(album))
        );
        
        this.jsonDb.saveChanges();

        return true;
    }
    getAll(): Album[] {
        return this.jsonDb.albums.map(copy);
    }

}