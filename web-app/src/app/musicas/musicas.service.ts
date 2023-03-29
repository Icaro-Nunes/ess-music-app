import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Musica } from './musica';

@Injectable()
export class MusicaService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

    create(musica: Musica): Observable<Musica|null> {
    return this.http.post(this.taURL + "/musicas",JSON.stringify(musica), {headers: this.headers, observe: "response"})
      .pipe(map(res => {
        if (res.status === 201) {return musica;} else {return null;}
      }));
  }

  getMusicas(): Observable<Musica[]> {
    return this.http.get(this.taURL + "/musicas", {"observe": "body"})
             .pipe(map(res => res as Musica[]));
  }

  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }
}