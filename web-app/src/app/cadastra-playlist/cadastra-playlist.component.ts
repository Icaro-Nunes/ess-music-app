import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../playlist-admin/playlist.service';
import { Playlist } from '../playlist-admin/playlist';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../criar-categoria/categoria';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastra-playlist',
  templateUrl: './cadastra-playlist.component.html',
  styleUrls: ['./cadastra-playlist.component.css']
})

export class CadastraPlaylistComponent implements OnInit {
  constructor(
    private playlistService: PlaylistService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
  playlist: Playlist = new Playlist();
  categorias: Categoria[] = [];
  categoriasSelecionadas: Categoria[] = [];

  cadastraPlaylist() {
    console.log(this.playlist);
    if(
      this.playlist.titulo == '' ||
      this.playlist.url_foto_playlist == '' ||
      this.playlist.categoria == ''
    ){
      this.toastr.error('Campo inválido!');
      return;
    }
    this.playlistService.createPlaylist(this.playlist)
    .subscribe({
      next: (result: Playlist | null) => {
        if (result) {
          this.toastr.success('Playlist cadastrada!');
          this.playlist = new Playlist();
        }
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {
        console.log("Fluxo de dados concluído.");
      }
    });
  }

  ngOnInit(){
    this.http.get<any[]>('http://localhost:3000/categorias').subscribe(
      (categorias) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Erro ao carregar categorias:', error);
      }
    );
  }

  cancelarCadastrarPlaylist() {
    window.history.back()
  }
}
