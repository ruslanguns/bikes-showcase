import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SharedModule } from './shared';
import { WindowService } from './shared/services/windows.service';

const config: SocketIoConfig = { url: 'http://localhost:4200/ws', options: {} };
// For AoT compilation:
export function getWindow() {
  return window;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    NoopAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es'
    },
    {
      provide: WindowService,
      useFactory: getWindow,
    },
    SharedModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
