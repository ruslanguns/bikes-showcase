import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule } from 'ngx-socket-io';
import { WindowService } from './shared';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

import { MomentModule } from 'ngx-moment';
import 'moment/locale/es';

import { interceptorProviders } from './shared/interceptors/interceptors';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment.prod';

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
    SocketIoModule.forRoot(environment.socketConfig),
    HttpClientModule,
    NoopAnimationsModule,
    AppRoutingModule,
    MomentModule,
    ToastrModule.forRoot(),
    SharedModule
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
