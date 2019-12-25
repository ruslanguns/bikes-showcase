import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BikesRoutingModule } from './bikes-routing.module';
import { BikesComponent } from './bikes.component';
import { CreateBikesComponent } from './create-bikes/create-bikes.component';
import { SharedModule } from '../../shared/shared.module';
import { DetailBikesComponent } from './detail-bikes/detail-bikes.component';
import { BikesService } from './bikes.service';
import { interceptorProviders } from 'src/app/shared/interceptors';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SoldBikesComponent } from './sold-bikes/sold-bikes.component';


@NgModule({
  declarations: [BikesComponent, CreateBikesComponent, DetailBikesComponent, SoldBikesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BikesRoutingModule,
    SharedModule,
  ],
  providers: [BikesService, interceptorProviders],
})
export class BikesModule { }
