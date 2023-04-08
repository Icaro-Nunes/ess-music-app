import { IArtistRepository } from 'database-abstraction-layer';
import { copy, Genre, Artist } from 'music-app-models';
import { JsonDB } from './json-handling/json-handling';
import { randomUUID } from 'crypto';
import { negatePredicate } from './utils/predicate-ops';

export class ArtistRepository implements IArtistRepository {
    jsonDb: JsonDB;

    constructor(jsonDb: JsonDB){
        this.jsonDb = jsonDb;
    }

    equivalentArtistsQuery(artist: Artist) {
        return (
            (a: Artist) =>
                a.id == artist.id
        )
    }

    add(instance: Artist): boolean {
        if(this.jsonDb.artists.find(this.equivalentArtistsQuery(instance)))
            return false;
        
        const newArtist = new Artist();

        Object.assign(newArtist, instance);

        newArtist.id = randomUUID();

        this.jsonDb.artists.push(newArtist);
        this.jsonDb.saveChanges();

        return true;
    }
    
    update(instance: Artist): boolean {
        const artist = this.jsonDb.artists.find(this.equivalentArtistsQuery(instance));
        if(!artist)
            return false;

        Object.assign(artist, instance);
        this.jsonDb.saveChanges();
        return true;
    }
    
    delete(instance: Artist): boolean {
        const artist = this.jsonDb.artists.find(this.equivalentArtistsQuery(instance));
        if(!artist)
            return false;

        this.jsonDb.artists = this.jsonDb.artists.filter(
            negatePredicate(this.equivalentArtistsQuery(artist))
        );
        
        return true;
    }
    
    getAll(): Artist[] {
        return this.jsonDb.artists.map(copy);
    }
}