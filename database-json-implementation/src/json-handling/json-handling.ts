import fs = require('fs');
import { Album, Artist, Category, Playlist, PlaylistCategory, PlaylistSong, Song, User, UserFollowPlaylist, UserSongHistory } from 'music-app-models';

class JsonDBData {
    users: User[] = [];
    artists: Artist[] = [];
    albumSeq: number = 1;
    albums: Album[] = [];
    songSeq: number = 1;
    songs: Song[] = [];
    playlistSeq: number = 1;
    playlists: Playlist[] = [];
    categories: Category[] = [];
    playlistCategories: PlaylistCategory[] = [];
    playlistSongs: PlaylistSong[] = [];
    userFollowPlaylists: UserFollowPlaylist[] = [];
    userSongHistories: UserSongHistory[] = [];
}

class JsonDB extends JsonDBData {
    dbFilePath:string;

    writing: boolean = false;

    constructor(path: string){
        super();
        this.dbFilePath = path;
    }

    data(){
        const data = new JsonDBData();
        data.users = this.users;
        data.artists = this.artists;
        data.albumSeq = this.albumSeq;
        data.albums = this.albums;
        data.songSeq = this.songSeq;
        data.songs = this.songs;
        data.playlistSeq = this.playlistSeq;
        data.playlists = this.playlists;
        data.categories = this.categories;
        data.playlistCategories = this.playlistCategories;
        data.playlistSongs = this.playlistSongs;
        data.userFollowPlaylists = this.userFollowPlaylists;
        data.userSongHistories = this.userSongHistories;

        return data;
    }

    saveChanges(){
        if(this.writing)
            return;
        
        this.writing = true;

        fs.writeFile(this.dbFilePath, JSON.stringify(this.data()), null, () => {this.writing = false});
    }
}

function initDatabase(dbFilePath: string):JsonDB{
    let jsonDatabase:JsonDB;

    if(!fs.existsSync(dbFilePath)){
        jsonDatabase = new JsonDB(dbFilePath);
        let data = new JsonDBData();
        Object.assign(data, jsonDatabase);

        fs.writeFileSync(dbFilePath, JSON.stringify(jsonDatabase.data()));

        return jsonDatabase;
    }

    let data = fs.readFileSync(dbFilePath, {encoding: 'utf-8'});

    jsonDatabase = new JsonDB(dbFilePath);
    
    Object.assign(jsonDatabase, JSON.parse(data));

    return jsonDatabase;
}


export {
    JsonDB,
    initDatabase
}