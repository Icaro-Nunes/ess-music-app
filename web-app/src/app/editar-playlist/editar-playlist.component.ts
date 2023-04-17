import { Component } from '@angular/core';
import { Playlist } from '../playlist-admin/playlist';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../playlist-admin/playlist.service';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../criar-categoria/categoria';

@Component({
  selector: 'app-editar-playlist',
  templateUrl: './editar-playlist.component.html',
  styleUrls: ['./editar-playlist.component.css']
})
export class EditarPlaylistComponent {
  id: number = 0;
  playlist: Playlist = new Playlist();
  private taURL = 'http://localhost:3000';

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private http: HttpClient
  ) {}
  categorias: Categoria[] = [];


  ngOnInit() {
    this.id = + this.route.snapshot.params['id'];
    this.playlistService.getPlaylistById(String(this.id)).subscribe(playlist => {
      this.playlist = playlist;
    });
    this.http.get<any[]>('http://localhost:3000/categorias').subscribe(
      (categorias) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Erro ao carregar categorias:', error);
      }
    );
  }

  editarPlaylist() {
    const novoTitulo = (<HTMLInputElement>document.getElementById("playlist-nome")).value;
    const novaPrivacidade = (<HTMLInputElement>document.getElementById("playlist-privacidade")).value;
    const novaUrl = (<HTMLInputElement>document.getElementById("playlist-url_foto_playlist")).value;

    this.http.put(this.taURL + "/playlists/" + String(this.id),
    { titulo: novoTitulo || this.playlist.titulo,
      privacidade: novaPrivacidade || this.playlist.privacidade,
      url_foto_playlist: novaUrl || this.playlist.url_foto_playlist
    }).subscribe(() => {
      console.log('Título atualizado com sucesso!');
      window.history.back();
    }, (error) => {
      console.error('Ocorreu um erro ao atualizar o título da música:', error);
    });
  }
  
  cancelarEditarPlaylist() {
    window.history.back();
  }
}
