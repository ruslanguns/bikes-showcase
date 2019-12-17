import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PnotifyService } from '../shared/services/pnotify.service';
import { of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as validator from 'validator';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accessToken = '';
  id = '';
  PNotify;
  helper = new JwtHelperService();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private pnotifyService: PnotifyService,
  ) {
    this.PNotify = this.pnotifyService.getPNotify();
  }

  /**
   * Inicio de sesión
   */
  login(password: string) {

    const URL = `api/auth`;

    return this.http.post(URL, { password })
      .pipe(
        map(async (res: any) => {
          await this.setLocalStorageItems(res.data);
          this.PNotify.success({ text: 'Login exitoso.' });
          this.router.navigate(['/admin']);
        }),
        catchError(error => this.PNotify.error({ text: 'Login incorrecto.' }) && of(false))
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

  /**
   * Valida si token JWT está expirado
   */
  expiredToken(): boolean {
    const token = this.getToken();

    if (!token) { return true; }

    if (validator.isJWT(token || '')) {
      return this.helper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  /**
   * Obtener Token desde LocalStorage
   */
  getToken(): string {
    return localStorage.getItem('accessToken');
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
