import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { SharedModule, WindowService } from '../../shared';
import { ActionsViewComponent, ProductIdViewComponent, SoldActionsViewComponent } from './components';
import { CreateBikesComponent } from './create-bikes';
import { DetailBikesComponent } from './detail-bikes';
import { SoldBikesComponent } from './sold-bikes';
import { BikesRoutingModule } from './bikes-routing.module';
import { BikesComponent } from './bikes.component';
import { DateFormatComponent } from './components/date-format';

import { MomentModule } from 'ngx-moment';
import 'moment/locale/es';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// For AoT compilation:
export function getWindow() {
  return window;
}

@NgModule({
  declarations: [
    BikesComponent,
    CreateBikesComponent,
    DetailBikesComponent,
    SoldBikesComponent,
    ActionsViewComponent,
    ProductIdViewComponent,
    SoldActionsViewComponent,
    DateFormatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }), // TODO: Support for using the ngModel input property and ngModelChange event with reactive form directives has been deprecated in Angular v6 and will be removed in Angular v7.
    BikesRoutingModule,
    SharedModule,
    Ng2SmartTableModule,
    MomentModule,
    NgbModule
  ],
  providers: [
    {
      provide: WindowService,
      useFactory: getWindow,
    },
  ],
  entryComponents: [
    ActionsViewComponent,
    ProductIdViewComponent,
    SoldActionsViewComponent,
    DateFormatComponent
  ],
})
export class BikesModule { }
