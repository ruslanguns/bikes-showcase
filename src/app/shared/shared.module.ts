import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AutoFocusDirective } from './directives/auto-focus.directive';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    AutoFocusDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    AutoFocusDirective
  ]
})
export class SharedModule { }
