import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styles: []
})
export class RecoveryComponent implements OnInit {

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

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
          console.log('Correo de recuperación enviado.');
        },
        error => console.log('HTTP Error', error),
      );
  }

}
