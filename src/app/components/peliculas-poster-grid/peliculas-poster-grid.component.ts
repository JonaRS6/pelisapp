import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/now-playing-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() movies: Movie[];
  constructor( private router: Router ) { }
  onMovieClick( movie: Movie): void {
    this.router.navigate(['/pelicula', movie.id]);
  }

  ngOnInit(): void {
    console.log(this.movies);
  }

}
