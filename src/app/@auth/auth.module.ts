import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared';
import { interceptorProviders } from '../shared/interceptors';
import { RecoveryComponent } from './recovery/recovery.component';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  declarations: [LoginComponent, RecoveryComponent, ResetComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    AuthService,
    interceptorProviders
  ]
})
export class AuthModule { }
