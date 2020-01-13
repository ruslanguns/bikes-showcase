import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { PasswordComponent } from './password/password.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecoveryEmailComponent } from './recovery-email';
import { ResetPasswordComponent } from './reset-password';
import { HttpErrorInterceptor } from 'src/app/shared/interceptors/error.interceptor';


@NgModule({
  declarations: [PasswordComponent, RecoveryEmailComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SettingsRoutingModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ]
})
export class SettingsModule { }
