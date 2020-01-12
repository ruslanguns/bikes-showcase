import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { WindowService, SharedModule } from '../../shared';

import { MomentModule } from 'ngx-moment';
import 'moment/locale/es';

// For AoT compilation:
export function getWindow() {
  return window;
}

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MomentModule
  ],
  providers: [
    {
      provide: WindowService,
      useFactory: getWindow,
    },
  ],
  exports: [DashboardComponent],
})
export class DashboardModule { }
