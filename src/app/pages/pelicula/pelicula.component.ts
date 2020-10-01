import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response.interface';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/cast-response.interface';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: [
  ]
})
export class PeliculaComponent implements OnInit {

  movie: MovieResponse;
  cast: Cast[];

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService,
               public location: Location,
               private router: Router ) { }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.peliculasService.getMovie( id ).subscribe( resp => {
      if (!resp) {
        this.router.navigateByUrl('/home')
        return;
      }
      this.movie = resp;
      console.log(this.movie);
    });
    this.peliculasService.getCast( id ).subscribe( resp => {
      this.cast = resp.filter( actor => actor.profile_path !== null);
    });
  }

}
