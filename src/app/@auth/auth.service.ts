import { Injectable, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as validator from 'validator';
import { RecoveryClass } from './recovery';
import { WindowService } from '../shared';
import { ToastrService } from 'ngx-toastr';

interface ApiResponse {
  message: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  accessToken: string;
  helper = new JwtHelperService();
  isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(
    // tslint:disable-next-line: ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private doc,
    private windowService: WindowService,
    private readonly http: HttpClient,
    private readonly router: Router,
    private toastr: ToastrService
  ) {
    if (this.isBrowser) {
      this.accessToken = localStorage.getItem('accessToken');
    }
  }

  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit() {
    this.getToken();
  }

  /**
   * Valida si token JWT está expirado
   */
  expiredToken(): boolean {
    const token = this.getToken();

    if (!token) {
      return true;
    }

    if (validator.isJWT(token)) {
      return this.helper.isTokenExpired(token);
    } else {
      return true;
    }
  }

  /**
   * Obtener Token desde LocalStorage
   */
  getToken(): string {
    return this.accessToken || localStorage.getItem('accessToken');
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
          this.router.navigate(['/admin']);
          this.toastr.success('Login exitoso');
        })
      );
  }

  /**
   * Sign Out.
   */
  logout(): Promise<void> {
    this.accessToken = '';
    const items = ['accessToken'];
    this.removeLocalStorageItems(items);
    this.router.navigate(['login']);
    return;
  }

  recovery(data: RecoveryClass) {
    const URL = `api/auth/recuperar`;
    const http$ = this.http.post<ApiResponse>(URL, data);

    return http$;
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
