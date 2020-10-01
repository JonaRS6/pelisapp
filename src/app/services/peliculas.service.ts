import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NowPlayingResponse, Movie } from '../interfaces/now-playing-response.interface';
import { MovieResponse } from '../interfaces/movie-response.interface';
import { CastResponse, Cast } from '../interfaces/cast-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseURL = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  cargando = false;
  constructor( private http: HttpClient ) { }

  get params() {
    return {
      api_key: 'e3816b3ed6303d34cdbdc8b355d0cda9',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    };
  }
  reset(): void {
    this.carteleraPage = 1;
  }
  getCartelera(): Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }
    this.cargando = true;
    return this.http.get<NowPlayingResponse>(`${this.baseURL}/movie/now_playing`, { params: this.params } )
    .pipe(
      map( (resp) => resp.results ),
      tap( () => {
      this.carteleraPage += 1;
      this.cargando = false;
    }));
  }
  buscarPeliculas( texto: string ): Observable<Movie[]> {
    const params = {...this.params, query: texto, page: '1', include_adult: 'true'};
    return this.http.get<NowPlayingResponse>(`${this.baseURL}/search/movie`, { params } )
    .pipe(
      map( (resp) => resp.results )
      );
  }
  getMovie( id: string ): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseURL}/movie/${id}`, { params: this.params }).pipe(
      catchError( err => of(null))
    );
  }
  getCast( id: string ): Observable<Cast[]> {
    return this.http.get<CastResponse>(`${this.baseURL}/movie/${id}/credits`, { params: this.params })
    .pipe(
      map( resp => resp.cast),
      catchError( err => of(null))
    );
  }
}
