import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare function init_jquery();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      init_jquery();
    }
  }

}
