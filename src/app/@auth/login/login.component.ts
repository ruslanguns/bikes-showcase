import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PnotifyService } from 'src/app/shared';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  PNotify;

  constructor(
    private fb: FormBuilder,
    private pnotifyService: PnotifyService,
    private authService: AuthService
  ) {
    this.PNotify = this.pnotifyService.getPNotify();
  }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', [Validators.required]]
    });
  }

  formSubmitted() {
    if (this.form.invalid) {
      return;
    }
    const { password } = this.form.value;
    return this.authService.login(password).subscribe();
  }
}
