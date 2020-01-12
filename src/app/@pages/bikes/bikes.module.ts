import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { SharedModule, interceptorProviders } from '../../shared';
import { ActionsViewComponent, ProductIdViewComponent, SoldActionsViewComponent } from './components';
import { CreateBikesComponent } from './create-bikes';
import { DetailBikesComponent } from './detail-bikes';
import { SoldBikesComponent } from './sold-bikes';
import { BikesRoutingModule } from './bikes-routing.module';
import { BikesComponent } from './bikes.component';


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
  providers: [],
  entryComponents: [
    ActionsViewComponent,
    ProductIdViewComponent,
    SoldActionsViewComponent
  ],
})
export class BikesModule { }
