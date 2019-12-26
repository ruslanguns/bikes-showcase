import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';
import { HttpClient } from '@angular/common/http';
import { pluck, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IBikes } from './@pages/bikes/bikes.interface';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.css'],
})

export class BikesComponent implements OnInit {

  @ViewChild('usefulSwiper', { static: false }) usefulSwiper: SwiperComponent;

  config: SwiperOptions = {
    effect: 'flip',
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  };

  bicicletas = [];

  constructor(
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    const URL = `/api/bikes`;
    return this.http.get<IBikes[]>(URL)
      .pipe(
        pluck('data'),
        map((bikes: any) => bikes.filter((bike: IBikes) => bike.status !== 'vendido')),
        catchError(err => throwError(err)),
      ).subscribe(
        (res: IBikes[]) => this.bicicletas = res,
        error => console.log(error),
      );
  }

}
