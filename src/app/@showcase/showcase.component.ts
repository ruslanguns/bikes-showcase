import { Component, OnInit, Inject, PLATFORM_ID, Injector, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { SwiperComponent } from 'ngx-useful-swiper';
import { SwiperOptions } from 'swiper';
import { BikesService, IBikes } from '../@pages/bikes';
import { SocketIoService, WindowService } from '../shared';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css'],
})
export class ShowcaseComponent implements OnInit, AfterViewInit {

  @ViewChild('bikes_swipper', { static: false }) bikes_swipper: SwiperComponent;

  isBrowser: boolean = isPlatformBrowser(this.platformId);
  sockets: SocketIoService;
  bikesService: BikesService;
  data: IBikes[] = [];
  config: SwiperOptions;
  count = 0;
  rightNav = true;

  constructor(
    // tslint:disable-next-line: ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private doc: Document,
    private injector: Injector,
    private windowService: WindowService,
    private cdRef: ChangeDetectorRef,
  ) {
    if (this.isBrowser) {

      this.bikesService = this.injector.get(BikesService);
      this.sockets = this.injector.get(SocketIoService);

      this.fetchData();

      this.config = {
        loop: true, // FIXME: Loop not working with observable fetched data
        lazy: {
          //  tell swiper to load images before they appear
          loadPrevNext: true,
          // amount of images to load
          loadPrevNextAmount: 5,
        },
        effect: 'fade',
        speed: 1000,
        // centeredSlides: true,
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
        on: {
          slideChange: () => {
            this.setViews();
          }
        }
      };
      this.listenChanges();
    }
  }

  fetchData(): void {
    this.bikesService.get()
      .subscribe(bikes => {
        this.data = bikes;
        this.cdRef.detectChanges();
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  listenChanges(): void {
    this.sockets.listen('newChange').subscribe(res => {
      this.fetchData();
      this.bikes_swipper.swiper.update();
      this.bikes_swipper.swiper.updateSlides();
      this.bikes_swipper.swiper.updateProgress();
      this.bikes_swipper.swiper.pagination.update();
    });
  }

  setViews(): void {
    this.sockets.emit('setView');
  }

  getImage(bikeId: string, filename: string): string {
    const timestamp: string = this.getTimestamp().toString();
    return `api/bikes/${bikeId}/image/${filename}`;
  }

  getTimestamp(): number {
    return new Date().valueOf();
  }

  getSlideIndex(): number {
    const idx: number = this.bikes_swipper.swiper.activeIndex;
    return idx;
  }

  slidePrev(): void {
    console.log('Presionado slidePrev()');
    return this.bikes_swipper.swiper.slidePrev();
  }

  slideNext(): void {
    console.log('Presionado slideNext()');
    return this.bikes_swipper.swiper.slideNext();
  }

  refresh(): void {
    this.doc.defaultView.location.reload();
  }


}
