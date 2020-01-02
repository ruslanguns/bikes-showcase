import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BikesComponent } from './bikes.component';
import { AuthGuard } from './@auth/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: BikesComponent },
  {
    path: 'admin',
    loadChildren: () => import('./@pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./@auth/auth.module').then(m => m.AuthModule),
  },
  { path: '**', redirectTo: '/catalogo' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    useHash: false,
    scrollPositionRestoration: 'disabled',
    anchorScrolling: 'disabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
