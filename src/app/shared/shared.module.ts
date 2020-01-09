import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { HttpClientModule } from '@angular/common/http';
import { AsyncSrcDirective } from './directives/async-src.directive';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    AutoFocusDirective,
    AsyncSrcDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    AutoFocusDirective,
    AsyncSrcDirective
  ],
  providers: []
})
export class SharedModule { }
