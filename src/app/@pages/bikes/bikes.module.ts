import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BikesRoutingModule } from './bikes-routing.module';
import { BikesComponent } from './bikes.component';


@NgModule({
  declarations: [BikesComponent],
  imports: [
    CommonModule,
    BikesRoutingModule
  ]
})
export class BikesModule { }
