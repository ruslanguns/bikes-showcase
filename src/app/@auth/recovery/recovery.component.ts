import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PnotifyService } from 'src/app/shared';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styles: []
})
export class RecoveryComponent implements OnInit {

  form: FormGroup;
  PNotify;

  constructor(
    private readonly fb: FormBuilder,
    private readonly pnotifyService: PnotifyService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.PNotify = this.pnotifyService.getPNotify();
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }

  formSubmitted() {
    if (this.form.invalid) {
      return;
    }
    this.authService.recovery(this.form.value)
      .subscribe(
        res => {
          this.router.navigate(['/login']);
          this.PNotify.alert('Correo de recuperación enviado.');
        },
        error => console.log('HTTP Error', error),
      );
  }

}
