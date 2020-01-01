import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../@auth/auth.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: []
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;

  constructor(
    private readonly settingsService: SettingsService,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {

    this.form = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password2: new FormControl(null, Validators.required)
    }, this.passwordsShouldMatch);

  }

  ngOnInit() {
    // Si no es un TOKEN tipo Reset vuelta pa tras
    const decoded = jwt_decode(this.authService.getToken());
    if (!decoded.reset) { return this.router.navigate(['/admin']); }
  }

  private passwordsShouldMatch(group: FormGroup) {
    return group.get('password').value === group.get('password2').value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.form.invalid) { return; }
    delete this.form.value.password2;
    return this.settingsService.resetPassword(this.form.value)
      .subscribe(
        res => {
          console.log('Contraseña cambiada.');
          this.form.reset();
          this.router.navigate(['/admin']);
        },
        error => console.log('HTTP error', error)
      );
  }

}
