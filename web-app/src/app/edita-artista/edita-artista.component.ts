import { Component } from '@angular/core';
import { CadastraArtistaService } from '../cadastra-artista/cadastra-artista.service';
import { Artista } from '../artista/artista';
import { Musica } from '../musicas/musica';
import { Album } from '../album/album';
import { CadastraAlbumService } from '../cadastra-album/cadastra-album.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edita-artista',
  templateUrl: './edita-artista.component.html',
  styleUrls: ['./edita-artista.component.css']
})
export class EditaArtistaComponent {
  id: number = 0;
  musicas: Musica[] = [];
  albums: Album[] = [];
  artista: Artista = new Artista;

  private taURL = 'http://localhost:3000';

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private http: HttpClient,
    private albumService: CadastraAlbumService,
    private artistaService: CadastraArtistaService
  ) {}


  ngOnInit() {
    this.id = + this.route.snapshot.params['id'];
    this.artistaService.getArtistaById(String(this.id)).subscribe(artista => {
      this.artista = artista
    })
    this.albumService.getAlbumsByArtista(String(this.id)).subscribe(albums => {
      this.albums = albums
    })
  }

  editarArtista(artista: Artista) {
    const novoNome = (<HTMLInputElement>document.getElementById("artista-nome")).value;
    const novoGenero = (<HTMLInputElement>document.getElementById("artista-genero_musical")).value;
    const novaImagem = (<HTMLInputElement>document.getElementById("artista-url_foto_artista")).value;
    
    // Requisição PUT para atualizar o artista
    this.http.put(this.taURL + "/artistas/" + String(artista.id), {
      nome: novoNome || this.artista.nome,
      genero_musical: novoGenero || this.artista.genero_musical,
      url_foto_artista: novaImagem || this.artista.url_foto_artista,
    }).subscribe(() => {
      console.log('Artista atualizado com sucesso!');
  
      // Atualização do nome do artista em cada álbum
      this.albums.forEach((album: Album, i: number) => {
        setTimeout(() => {
          this.http.put(this.taURL + "/albums/" + String(album.id), {
            nome: album.nome,
            artistaId: album.artistaId,
            url_foto_album: album.url_foto_album,
            artistaNome: novoNome || this.artista.nome,
            ano_lancamento: album.ano_lancamento
          }).subscribe(() => {
            console.log('Nome do artista atualizado com sucesso no álbum!');
            
            // Requisição GET para buscar todas as músicas do álbum
            this.http.get<any>(this.taURL + "/musicas/?artistaId=" + String(artista.id))
              .subscribe((musicas: Musica[]) => {
                // Atualização do nome do artista em cada música
                musicas.forEach((musica: Musica, j: number) => {
                  setTimeout(() => {
                    this.http.put(this.taURL + "/musicas/" + String(musica.id), {
                      titulo: musica.titulo,
                      albumId: musica.albumId,
                      artistaId: musica.artistaId,
                      capaAlbum: musica.capaAlbum,
                      artistaNome: novoNome || this.artista.nome,
                      tituloAlbum: musica.tituloAlbum
                    }).subscribe(() => {
                      console.log('Nome do artista atualizado com sucesso na música!');
                    }, (error) => {
                      console.error('Ocorreu um erro ao atualizar o nome do artista na música:', error);
                    });
                  }, j * 20);
                });
              }, (error) => {
                console.error('Ocorreu um erro ao buscar as músicas do álbum:', error);
              });
          }, (error) => {
            console.error('Ocorreu um erro ao atualizar o nome do artista no álbum:', error);
          });
        }, i*1000)
      });
  
      this.toastr.success('Artista alterado!');
      // Redirecionamento para a página de detalhes do artista
      window.location.href = "/visualizar-artistas-admin";
    }, (error) => {
      console.error('Ocorreu um erro ao atualizar o artista:', error);
    });
  }  

  cancelEditarArtista() {
    window.history.back();
  }
}
