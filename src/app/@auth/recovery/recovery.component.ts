import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PnotifyService } from 'src/app/shared';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styles: []
})
export class RecoveryComponent implements OnInit {

  form: FormGroup;
  PNotify;

  constructor(
    private fb: FormBuilder,
    private pnotifyService: PnotifyService
  ) {
    this.PNotify = this.pnotifyService.getPNotify();
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required]]
    });
  }

  formSubmitted() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }

}
