import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { BikesService } from './@pages/bikes/bikes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.css'],
})

export class BikesComponent implements OnInit {

  config: SwiperOptions = {
    effect: 'flip',
    loop: true,
    initialSlide: 0,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  };

  bicicletas$: Observable<any>;

  constructor(
    private readonly bikesService: BikesService,
  ) {
    this.bicicletas$ = this.bikesService.bikes$;

  }

  ngOnInit() {
  }

}
