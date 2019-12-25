import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BikesComponent } from './bikes.component';
import { CreateBikesComponent } from './create-bikes/create-bikes.component';
import { DetailBikesComponent } from './detail-bikes/detail-bikes.component';
import { SoldBikesComponent } from './sold-bikes/sold-bikes.component';


const routes: Routes = [
  { path: '', component: BikesComponent },
  { path: 'vendidas', component: SoldBikesComponent },
  { path: 'crear', component: CreateBikesComponent },
  { path: ':bikeId', component: DetailBikesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BikesRoutingModule { }
