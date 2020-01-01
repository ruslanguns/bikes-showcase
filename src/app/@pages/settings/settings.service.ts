import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeEmail } from './recovery-email';
import { ChangePassword } from './password';
import { catchError, retry, pluck } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ISettings } from './settings.interface';
import { ResetPassword } from './reset-password';

interface ApiResponse {
  message: string;
  data: ISettings;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  constructor(
    private readonly http: HttpClient,
  ) { }

  fetch(): Observable<ISettings> {
    const URL = `api/settings`;
    const http$ = this.http.get<ApiResponse>(URL);

    return http$
      .pipe(
        pluck('data'),
        catchError(err => {
          console.log({ text: err.error.message });
          return throwError(err);
        })
      );
  }

  changeEmail(data: ChangeEmail): Observable<ApiResponse> {
    const URL = `api/settings`;
    const http$ = this.http.put<ApiResponse>(URL, data);

    return http$
      .pipe(
        retry(1),
        catchError(err => {
          console.log({ text: err.error.message });
          return throwError(err);
        })
      );
  }

  changePassword(data: ChangePassword): Observable<ApiResponse> {
    const URL = `api/settings`;
    const http$ = this.http.put<ApiResponse>(URL, data);

    return http$
      .pipe(
        retry(1),
        catchError(err => {
          console.log({ text: err.error.message });
          return throwError(err);
        })
      );
  }

  resetPassword(data: ResetPassword) {
    const URL = `api/auth/reset`;
    const http$ = this.http.patch<ApiResponse>(URL, data);

    return http$
      .pipe(
        retry(1),
        catchError(err => {
          console.log({ text: err.error.message });
          return throwError(err);
        })
      );
  }
}
