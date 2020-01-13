import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recovery-email',
  templateUrl: './recovery-email.component.html',
  styles: []
})
export class RecoveryEmailComponent implements OnInit {

  form: FormGroup;
  email: string;
  currentPassword = '';
  emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  constructor(
    private readonly settingsService: SettingsService,
    private toastr: ToastrService
  ) {

    this.form = new FormGroup({
      currentPassword: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });

  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.settingsService.fetch()
      .subscribe(res => this.email = res.email);
  }

  onSubmit() {
    if (this.form.invalid) { return; }
    return this.settingsService.changeEmail(this.form.value)
      .subscribe(
        res => {
          this.toastr.success('Correo de recuperación cambiado', 'Petición correcta');
          this.form.reset();
          this.fetchData();
        },
      );
  }
}
