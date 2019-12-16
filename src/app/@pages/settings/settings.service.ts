import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PnotifyService } from 'src/app/shared';
import { ChangePasswordClass } from './password/change-password.class';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  PNotify;

  constructor(
    private readonly http: HttpClient,
    private pnotifyService: PnotifyService,
  ) {
    this.PNotify = this.pnotifyService.getPNotify();
  }

  changePassword(data: ChangePasswordClass) {
    const URL = `api/settings`;
    const http$ = this.http.put(URL, data);

    return http$
      .pipe(
        retry(1),
        catchError(err => {
          this.PNotify.error({ text: err.error.message });
          return throwError(err);
        })
      );
  }
}
