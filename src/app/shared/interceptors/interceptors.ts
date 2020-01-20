import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { WindowService } from '../services/windows.service';
import { HttpErrorInterceptor } from './error.interceptor';

export const interceptorProviders =
  [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
    { provide: WindowService, useClass: WindowService }
  ];
