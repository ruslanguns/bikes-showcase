import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./app.component.css']
})
/** TODO: Mejorar arquitectura */
export class BikesComponent implements OnInit, AfterViewInit {

  @ViewChild('usefulSwiper', { static: false }) usefulSwiper: SwiperComponent;

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

  bicicletas = [];

  constructor() {
  }

  ngOnInit() {
    this.bicicletas = [
      {
        productId: 'E201123-0',
        brand: 'ORBEA',
        details: 'Información adicional',
        category: 'Montañera',
        image: 'https://images6.alphacoders.com/549/thumb-1920-549198.jpg',
        price: '99,00',
        size: 'S',
        style: 'A la venta',
        status: 'Como nueva',
      },
      {
        productId: 'E189232-0',
        brand: 'Cannondale',
        details: 'Información adicional',
        category: 'Carretera',
        image: 'https://s1.1zoom.me/b5050/427/Men_Bicycle_Uniform_Wheel_552213_1920x1080.jpg',
        price: '249,00',
        size: 'L',
        style: 'A la venta',
        status: 'usada',
      },
      {
        productId: 'E189232-0',
        brand: 'Orbea',
        details: 'Información adicional',
        category: 'Montañera',
        image: 'https://www.bimbimbikes.es/uploads/location/bike/image/5812240ec1867_Children%20Bike%20Orbea%20Abilio%20Bikes%20Shop%20Tavira.jpg',
        price: '49,00',
        size: 'L',
        style: 'A la venta',
        status: 'usada',
      },
      {
        productId: 'E189123-0',
        brand: 'Marca 1',
        details: 'Información adicional',
        category: 'Montañera',
        image: 'https://www.bimbimbikes.es/uploads/location/bike/image/581224a5bf326_Hybrid%20bicycle%20Cycle%20Hire%20abilio%20Bikes%20Shop%20Algarve%20Tavira.jpg',
        price: '129,00',
        size: 'L',
        style: 'A la venta',
        status: 'nueva',
      },
      {
        productId: 'E199123-0',
        brand: 'BMX',
        details: 'Información adicional',
        category: 'Montañera',
        image: 'https://www.elsetge.cat/myimg/f/52-524000_bicycle-racing-image-hd-wallpaper-bicicletas-para-fondos.jpg',
        price: '129,00',
        size: 'L',
        style: 'A la venta',
        status: 'nueva',
      },
    ];
  }

  ngAfterViewInit() {

  }

}
