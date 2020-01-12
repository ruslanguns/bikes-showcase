import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/@auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Hemos aplicado el interceptor');

    if (!this.auth.expiredToken()) {

      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.auth.getToken()}`),
      });
      // console.log('Está autenticado.');

    } else {
      // no ocurre nada...
    }

    return next.handle(request);
  }
}
