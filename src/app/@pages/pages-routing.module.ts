import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';
import { AuthGuard } from '../@auth/guards/auth.guard';


const routes: Routes = [
  { path: '', component: PagesComponent, children: PAGES_ROUTES, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
