import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    const authenticated = !(this.authService.expiredToken());
    // console.log('AUTH GUARD ', authenticated);
    if (!authenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
