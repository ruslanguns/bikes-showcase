import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BikesComponent } from './bikes.component';
import { CreateBikesComponent } from './create-bikes';
import { DetailBikesComponent } from './detail-bikes';
import { SoldBikesComponent } from './sold-bikes';
import { AuthGuard } from '../../@auth';


const routes: Routes = [
  { path: '', component: BikesComponent, canActivate: [AuthGuard] },
  { path: 'vendidas', component: SoldBikesComponent, canActivate: [AuthGuard] },
  { path: 'crear', component: CreateBikesComponent, canActivate: [AuthGuard] },
  { path: 'detalle/:bikeId', component: DetailBikesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BikesRoutingModule { }
