import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';
import { AuthGuard } from '../@auth/guards/auth.guard';


const routes: Routes = [
  { path: '', component: PagesComponent, canActivate: [AuthGuard], children: PAGES_ROUTES },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
