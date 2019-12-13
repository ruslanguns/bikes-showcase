import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BikesRoutingModule } from './bikes-routing.module';
import { BikesComponent } from './bikes.component';
import { CreateBikesComponent } from './create-bikes/create-bikes.component';
import { SharedModule } from '../../shared/shared.module';
import { DetailBikesComponent } from './detail-bikes/detail-bikes.component';


@NgModule({
  declarations: [BikesComponent, CreateBikesComponent, DetailBikesComponent],
  imports: [
    CommonModule,
    BikesRoutingModule,
    SharedModule
  ]
})
export class BikesModule { }
