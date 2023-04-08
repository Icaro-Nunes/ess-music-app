import { ISongRepository } from 'database-abstraction-layer';
import { copy, Genre, Song } from 'music-app-models';
import { JsonDB } from './json-handling/json-handling';
import { compareTuples } from './utils/tuple';
import { negatePredicate } from './utils/predicate-ops';

export class SongRepository implements ISongRepository {
    jsonDb: JsonDB;

    constructor(jsonDb: JsonDB){
        this.jsonDb = jsonDb;
    }

    equivalentSongQuery(song: Song) {
        return (
            (s: Song) =>
                s.album_artist_id == song.album_artist_id &&
                s.album_number == song.album_number &&
                s.song_number == song.song_number
        )
    }

    getAllByGenre(genre: Genre): Song[] {
        let album_id_list = this.jsonDb.albums
            .filter(al => al.genre == genre)
            .map(al => [al.artist_id, al.album_number] as [string, number]);

        return this.jsonDb.songs
            .filter(s => album_id_list.find(i => compareTuples(i, [s.album_artist_id, s.album_number]))).map(copy);
    }

    add(instance: Song): boolean {
        if(!this.jsonDb.albums.find(al => al.artist_id == instance.album_artist_id && al.album_number == instance.album_number))
            return false;
        
        const createdSong = new Song();
        Object.assign(createdSong, instance);
        
        const autoIncrementedSongNumber = this.jsonDb.songSeq++;

        createdSong.song_number = autoIncrementedSongNumber;

        this.jsonDb.songs.push(createdSong);
        this.jsonDb.saveChanges();

        return true;
    }

    update(instance: Song): boolean {
        const song = this.jsonDb.songs.find(
            this.equivalentSongQuery(instance)
        );

        if(!song)
            return false;
        
        Object.assign(song, instance);
        this.jsonDb.saveChanges();
        
        return true;
    }

    delete(instance: Song): boolean {
        const song = this.jsonDb.songs.find(this.equivalentSongQuery(instance));

        if(!song)
            return false;
        
        this.jsonDb.songs = this.jsonDb.songs.filter(
            negatePredicate(this.equivalentSongQuery(song))
        );
        
        this.jsonDb.saveChanges();

        return true;
    }

    getAll(): Song[] {
        return this.jsonDb.songs.map(copy);
    }

}