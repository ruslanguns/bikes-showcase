import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BikesComponent } from './bikes.component';

const routes: Routes = [
  { path: '', component: BikesComponent },
  { path: 'login', loadChildren: () => import('./@auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./@pages/pages.module').then(m => m.PagesModule) },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
