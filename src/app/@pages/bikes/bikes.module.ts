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

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ActionsViewComponent } from './config/actions';
import { ProductIdViewComponent } from './config/productId';
import { SoldActionsViewComponent } from './config/soldActions';


@NgModule({
  declarations: [
    BikesComponent,
    CreateBikesComponent,
    DetailBikesComponent,
    SoldBikesComponent,
    ActionsViewComponent,
    ProductIdViewComponent,
    SoldActionsViewComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }), // TODO: Support for using the ngModel input property and ngModelChange event with reactive form directives has been deprecated in Angular v6 and will be removed in Angular v7.
    BikesRoutingModule,
    SharedModule,
    Ng2SmartTableModule,
  ],
  providers: [BikesService, interceptorProviders],
  entryComponents: [
    ActionsViewComponent,
    ProductIdViewComponent,
    SoldActionsViewComponent
  ],
})
export class BikesModule { }
