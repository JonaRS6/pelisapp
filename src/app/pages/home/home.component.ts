import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/now-playing-response.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  moviesSlideshow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos = ( document.documentElement.scrollTop || document.body.scrollTop ) + 1300;
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight );

    if( pos > max ){
      if (this.peliculasService.cargando) {
        return;
      }
      this.peliculasService.getCartelera().subscribe( resp => {
        this.movies.push(...resp);
      });
    }
  }

  constructor( private peliculasService: PeliculasService ) {}

  ngOnInit(): void {
    this.peliculasService.getCartelera().subscribe( resp => {
      this.movies = resp;
      this.moviesSlideshow = resp;
    });
  }
  ngOnDestroy(): void {
    this.peliculasService.reset();
  }


}
