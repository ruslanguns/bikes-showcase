import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as validator from 'validator';
import { RecoveryClass } from './recovery';

interface ApiResponse {
  message: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accessToken = '';
  id = '';
  helper = new JwtHelperService();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) { }

  /**
   * Inicio de sesión
   */
  login(password: string) {

    const URL = `api/auth`;

    return this.http.post(URL, { password })
      .pipe(
        map(async (res: any) => {
          await this.setLocalStorageItems(res.data);
          console.log({ text: 'Login exitoso.' });
          this.router.navigate(['/admin']);
        }),
        catchError(error => throwError(error))
      );
  }

  /**
   * Sign Out.
   */
  logout(): Promise<void> {
    this.id = null;
    this.accessToken = '';
    const items = ['accessToken'];
    this.removeLocalStorageItems(items);
    this.router.navigate(['/login']);
    return;
  }

  recovery(data: RecoveryClass) {
    const URL = `api/auth/recuperar`;
    const http$ = this.http.post<ApiResponse>(URL, data);

    return http$
      .pipe(
        retry(1),
        catchError(err => {
          console.log({ text: err.error.message });
          return throwError(err);
        })
      );
  }

  /**
   * Valida si token JWT está expirado
   */
  expiredToken(): boolean {
    const token = this.getToken();
    if (!token) { return true; }
    (validator.isJWT(token || '')) ? this.helper.isTokenExpired(token) : false;
  }

  /**
   * Obtener Token desde LocalStorage
   */
  getToken(): string {
    const accessToken: string = localStorage.getItem('accessToken');
    return (!accessToken) ? null : accessToken;
  }

  /**
   * API Login output to LocalStorage
   */
  setLocalStorageItems(data: any): Promise<void> {
    for (const k in data) {
      if (!!k) {
        localStorage.setItem(k.toString(), data[k].toString());
      }
    }
    this.accessToken = data.accessToken;
    this.id = data.id;
    return;
  }

  /**
   * Remove Elements by LocalStorage's keys.
   */
  removeLocalStorageItems(items: string[]): Promise<void> {
    for (const item of items) {
      localStorage.removeItem(item);
    }
    return;
  }


}
