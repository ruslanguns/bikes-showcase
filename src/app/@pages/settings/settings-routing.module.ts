import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordComponent } from './password/password.component';
import { RecoveryEmailComponent } from './recovery-email/recovery-email.component';


const routes: Routes = [
  { path: 'password', component: PasswordComponent },
  { path: 'recovery', component: RecoveryEmailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
