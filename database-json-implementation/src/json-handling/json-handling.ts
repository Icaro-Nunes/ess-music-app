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
    data: JsonDBData;

    dbFilePath:string;

    writing: boolean = false;

    constructor(path: string){
        super();
        this.dbFilePath = path;
    }

    saveChanges(){
        if(this.writing)
            return;
        
        this.writing = true;

        fs.writeFile(this.dbFilePath, JSON.stringify(this as JsonDBData), null, () => {this.writing = false});
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