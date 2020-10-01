import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/now-playing-response.interface';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  query: string;

  constructor( private peliculasService: PeliculasService, private routerActive: ActivatedRoute ) { }

  ngOnInit(): void {
    this.routerActive.params.subscribe( params => {
      this.query = params.texto;
      this.peliculasService.buscarPeliculas(params.texto).subscribe( resp => {
        this.movies = resp;
      });
    });
  }
  ngOnDestroy(): void {
    this.peliculasService.reset();
  }
}
