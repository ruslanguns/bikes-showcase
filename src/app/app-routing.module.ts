import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./@showcase').then(m => m.ShowcaseModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./@pages').then(m => m.PagesModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./@auth').then(m => m.AuthModule),
  },
  { path: '**', redirectTo: '' },
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
