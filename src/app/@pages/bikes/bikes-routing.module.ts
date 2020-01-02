import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BikesComponent } from './bikes.component';
import { CreateBikesComponent } from './create-bikes/create-bikes.component';
import { DetailBikesComponent } from './detail-bikes/detail-bikes.component';
import { SoldBikesComponent } from './sold-bikes/sold-bikes.component';
import { AuthGuard } from '../../@auth/guards/auth.guard';


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
