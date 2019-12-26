import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordComponent } from './password';
import { RecoveryEmailComponent } from './recovery-email';
import { ResetPasswordComponent } from './reset-password';


const routes: Routes = [
  { path: 'password', component: PasswordComponent },
  { path: 'recovery', component: RecoveryEmailComponent },
  { path: 'reset', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
