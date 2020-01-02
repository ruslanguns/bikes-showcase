import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'recuperar', component: RecoveryComponent },
  { path: 'reset/:accessToken', component: ResetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
