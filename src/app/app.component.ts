import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    effect: 'cube',
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  images = [
    'https://images6.alphacoders.com/549/thumb-1920-549198.jpg',
    'https://s1.1zoom.me/b5050/427/Men_Bicycle_Uniform_Wheel_552213_1920x1080.jpg',
    'https://www.bimbimbikes.es/uploads/location/bike/image/5812240ec1867_Children%20Bike%20Orbea%20Abilio%20Bikes%20Shop%20Tavira.jpg',
    // tslint:disable-next-line: max-line-length
    'https://www.bimbimbikes.es/uploads/location/bike/image/581224a5bf326_Hybrid%20bicycle%20Cycle%20Hire%20abilio%20Bikes%20Shop%20Algarve%20Tavira.jpg',
    'https://www.elsetge.cat/myimg/f/52-524000_bicycle-racing-image-hd-wallpaper-bicicletas-para-fondos.jpg'
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
