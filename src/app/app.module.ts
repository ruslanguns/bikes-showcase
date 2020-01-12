import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { WindowService, interceptorProviders } from './shared';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

import { MomentModule } from 'ngx-moment';
import 'moment/locale/es';

const config: SocketIoConfig = { url: 'http://localhost:4200/bikes', options: {} };
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
    MomentModule
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
    interceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
