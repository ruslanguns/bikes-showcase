import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { PasswordComponent } from './password/password.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { interceptorProviders } from '../../shared/interceptors';
import { RecoveryEmailComponent } from './recovery-email';
import { ResetPasswordComponent } from './reset-password';


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
    SettingsService,
    interceptorProviders
  ]
})
export class SettingsModule { }
