import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordComponent } from './password';
import { RecoveryEmailComponent } from './recovery-email';
import { ResetPasswordComponent } from './reset-password';
import { AuthGuard } from '../../@auth/guards/auth.guard';

const routes: Routes = [
  { path: 'password', component: PasswordComponent, canActivate: [AuthGuard] },
  { path: 'recovery', component: RecoveryEmailComponent, canActivate: [AuthGuard] },
  { path: 'reset', component: ResetPasswordComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
