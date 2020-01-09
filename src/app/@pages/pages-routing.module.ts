import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../@auth/guards/auth.guard';

export const PAGES_ROUTES: Routes = [
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'bicicletas', loadChildren: () => import('./bikes/bikes.module').then(m => m.BikesModule) },
  { path: 'ajustes', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
];


const routes: Routes = [
  { path: '', component: PagesComponent, children: PAGES_ROUTES, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
