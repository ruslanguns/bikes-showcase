import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { WindowService } from '../shared';
import { ShowcaseComponent } from './showcase.component';

const routes: Routes = [
  { path: '', component: ShowcaseComponent },
];
// For AoT compilation:
export function getWindow() {
  return window;
}

@NgModule({
  declarations: [ShowcaseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxUsefulSwiperModule,
  ],
  providers: [
    {
      provide: WindowService,
      useFactory: getWindow,
    },
  ]
})
export class ShowcaseModule { }
