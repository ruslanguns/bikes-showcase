import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { PnotifyService } from '../../../shared/services/pnotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: []
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  PNotify;

  constructor(
    private readonly settingsService: SettingsService,
    private readonly pnotifyService: PnotifyService,
    private readonly router: Router,
  ) {

    this.PNotify = this.pnotifyService.getPNotify();

    this.form = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password2: new FormControl(null, Validators.required)
    }, this.passwordsShouldMatch);

  }

  ngOnInit() {
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
          this.PNotify.success('Contraseña cambiada.');
          this.form.reset();
          this.router.navigate(['/admin']);
        },
        error => console.log('HTTP error', error)
      );
  }

}
