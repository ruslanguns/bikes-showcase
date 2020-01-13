import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeEmail } from './recovery-email';
import { ChangePassword } from './password';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
        pluck('data')
      );
  }

  changeEmail(data: ChangeEmail): Observable<ApiResponse> {
    const URL = `api/settings`;
    const http$ = this.http.put<ApiResponse>(URL, data);

    return http$;
  }

  changePassword(data: ChangePassword): Observable<ApiResponse> {
    const URL = `api/settings`;
    const http$ = this.http.put<ApiResponse>(URL, data);

    return http$;
  }

  resetPassword(data: ResetPassword) {
    const URL = `api/auth/reset`;
    const http$ = this.http.patch<ApiResponse>(URL, data);

    return http$;
  }
}
