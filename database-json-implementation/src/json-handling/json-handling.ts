import fs = require('fs');
import { Album, Artist, Category, Playlist, PlaylistCategory, PlaylistSong, Song, User, UserFollowPlaylist, UserSongHistory } from 'music-app-models';


class JsonDB {
    users: User[] = [];
    artists: Artist[] = [];
    albums: Album[] = [];
    songs: Song[] = [];
    playlists: Playlist[] = [];
    categories: Category[] = [];
    playlistCategories: PlaylistCategory[] = [];
    playlistSongs: PlaylistSong[] = [];
    userFollowPlaylists: UserFollowPlaylist[] = [];
    userSongHistories: UserSongHistory[] = [];

    dbFilePath:string;

    writing: boolean = false;

    constructor(path: string){
        this.dbFilePath = path;
    }

    saveChanges(){
        if(this.writing)
            return;
        
        this.writing = true;

        fs.writeFile(this.dbFilePath, JSON.stringify(this), null, () => {this.writing = false});
    }
}

function initDatabase(dbFilePath: string):JsonDB{
    let jsonDatabase:JsonDB;

    if(!fs.existsSync(dbFilePath)){
        jsonDatabase = new JsonDB(dbFilePath);

        fs.writeFileSync(dbFilePath, JSON.stringify(jsonDatabase));

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