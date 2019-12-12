import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', [Validators.required]]
    });
  }

  formSubmitted() {
    console.log(this.form.value);

    if (this.form.invalid) {
      return;
    }

    this.router.navigate(['admin']);

  }
}
