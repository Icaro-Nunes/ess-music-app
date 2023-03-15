export class Song{
    id: number;
    name: string;
    length: number;
    artist: string;
    year: number;
    genre: Genre;
}

export enum Genre {
    MPB,
    Rap,
    Pop,
    Funk
}