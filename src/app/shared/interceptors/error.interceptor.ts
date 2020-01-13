import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const toastr = this.injector.get(ToastrService);
          let errorMessage = '';
          let errorCode = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
            toastr.error(errorMessage, 'Ha ocurrido algo');
          } else {
            // server-side error
            errorCode = `${error.status}`;
            errorMessage = `${error.error.message}`;
          }
          toastr.error(errorMessage, errorCode);
          return throwError(error);
        })
      );
  }
}
