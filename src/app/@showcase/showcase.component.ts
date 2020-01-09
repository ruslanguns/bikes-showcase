import { Component, OnInit, Inject, PLATFORM_ID, Injector, ViewChild } from '@angular/core';
import { SocketIoService } from '../@pages/bikes/services/socket-io.service';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { WindowService } from '../shared/services/windows.service';
import { IBikes } from '../@pages/bikes/bikes.interface';
import { SwiperOptions } from 'swiper';
import { BikesService } from '../@pages/bikes/bikes.service';
import { SwiperComponent } from 'ngx-useful-swiper';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {

  @ViewChild('bikes_swipper', { static: false }) bikes_swipper: SwiperComponent;

  isBrowser: boolean = isPlatformBrowser(this.platformId);
  sockets: SocketIoService;
  bikesService: BikesService;
  data: IBikes[];
  config: SwiperOptions;

  constructor(
    // tslint:disable-next-line: ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private doc,
    private injector: Injector,
    private windowService: WindowService,
  ) {
    if (this.isBrowser) {
      this.bikesService = this.injector.get(BikesService);
      this.sockets = this.injector.get(SocketIoService);
      this.bikesService.get().subscribe((res: IBikes[]) => this.data = res);
      this.config = {
        effect: 'flip',
        loop: true,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      };
      this.listenChanges();
    }
  }

  fetchData() {
    this.bikesService.get()
      .subscribe((res: IBikes[]) => this.data = res);
  }

  ngOnInit() { }

  listenChanges() {
    this.sockets.listen('newChange').subscribe(res => {
      this.fetchData();
      this.bikes_swipper.swiper.update();
      this.bikes_swipper.swiper.updateSlides();
      this.bikes_swipper.swiper.updateProgress();
    });
  }

}
