import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cast } from '../../interfaces/cast-response.interface';
import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slideshow',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: ['./cast-slideshow.component.css']
})
export class CastSlideshowComponent implements OnInit, AfterViewInit {

  @Input() cast: Cast[];
  mySwiper: Swiper;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: false,
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 15
    });
  }

}
