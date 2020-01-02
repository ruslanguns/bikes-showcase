import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BikesComponent } from './bikes.component';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

@NgModule({
  declarations: [
    AppComponent,
    BikesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    NoopAnimationsModule,
    AppRoutingModule,
    NgxUsefulSwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
