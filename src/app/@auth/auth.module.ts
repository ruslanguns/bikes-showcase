import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule, interceptorProviders } from '../shared';
import { RecoveryComponent } from './recovery';
import { ResetComponent } from './reset';
import { LoginComponent } from './login';
import { AuthService } from './auth.service';

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
    AuthService
  ]
})
export class AuthModule { }
