import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/now-playing-response.interface';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: [
    './slideshow.component.css'
  ]
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];
  mySwiper: Swiper;

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true
    });
  }

  backgroundImage( movie: Movie): any {
    return {
      'background-size': 'cover',
      'background-image': 'url:(https://image.tmdb.org/t/p/w500' + movie.backdrop_path + ')'
    };
  }


}
