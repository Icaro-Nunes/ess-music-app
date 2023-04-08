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
                s.artist_id == song.artist_id &&
                s.playlist_number == song.playlist_number &&
                s.song_number == song.song_number
        )
    }

    getAllByGenre(genre: Genre): Song[] {
        let album_id_list = this.jsonDb.albums
            .filter(al => al.genre == genre)
            .map(al => [al.artist_id, al.album_number] as [string, number]);

        return this.jsonDb.songs
            .filter(s => album_id_list.find(i => compareTuples(i, [s.artist_id, s.playlist_number]))).map(copy);
    }

    add(instance: Song): boolean {
        const createdSong = new Song();
        
        Object.assign(createdSong, instance);
        
        let autoIncrementedSongNumber = this.jsonDb.songs.length == 0 ? 1 :
            this.jsonDb.songs
                .filter(s => 
                    s.artist_id == instance.artist_id &&
                    s.playlist_number == instance.playlist_number
                )
                .map(s => s.song_number)
                .reduce((a, b) => a > b ? a : b)
            + 1;

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