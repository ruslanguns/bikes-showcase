import { Routes } from '@angular/router';

export const PAGES_ROUTES: Routes = [
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'bicicletas', loadChildren: () => import('./bikes/bikes.module').then(m => m.BikesModule) },
  { path: 'ajustes', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
];
