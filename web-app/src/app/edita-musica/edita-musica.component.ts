import { Component, OnInit } from '@angular/core';
import { Musica } from '../musicas/musica';
import { MusicaService } from '../musicas/musicas.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edita-musica',
  templateUrl: './edita-musica.component.html',
  styleUrls: ['./edita-musica.component.css']
})
export class EditaMusicaComponent implements OnInit {
  id: number = 0;
  musicaAntiga: Musica = new Musica;
  private taURL = 'http://localhost:3000';

  constructor(
    private route: ActivatedRoute,
    private musicaService: MusicaService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.musicaService.getMusicaById(String(this.id)).subscribe(musica => {
      this.musicaAntiga = musica;
    });
  }

  editarMusica(musica: Musica) {
    const novoTitulo = (<HTMLInputElement>document.getElementById("musica-titulo")).value;
    
    if(novoTitulo == ''){
      this.toastr.error('Campo inválido!');
      return;
    }

    this.http.put(this.taURL + "/musicas/" + String(this.id),
    { titulo: novoTitulo,
      albumId: this.musicaAntiga.albumId,
      artistaId: this.musicaAntiga.artistaId,
      capaAlbum: this.musicaAntiga.capaAlbum,
      artistaNome: this.musicaAntiga.artistaNome,
      tituloAlbum: this.musicaAntiga.tituloAlbum
    }).subscribe(() => {
      this.toastr.success('Música atualizada!');
      console.log('Título atualizado com sucesso!');
      setTimeout(() => {
        window.history.back();
      }, 3000);
    }, (error) => {
      console.error('Ocorreu um erro ao atualizar o título da música:', error);
    });
  }
  
  cancelEditarMusica() {
    window.history.back();
  }
}
