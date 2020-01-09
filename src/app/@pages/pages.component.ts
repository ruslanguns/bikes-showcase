import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare function init_jquery();

@Component({
  selector: 'app-pages',
  template: `
    <div class="dash">
    <app-sidebar></app-sidebar>
      <div class="dash-app">
        <app-header></app-header>
        <main class="dash-content">
          <div class="container-fluid">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: []
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
