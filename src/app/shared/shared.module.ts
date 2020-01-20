import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { AsyncSrcDirective } from './directives/async-src.directive';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    AutoFocusDirective,
    AsyncSrcDirective,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    AutoFocusDirective,
    AsyncSrcDirective,
    CapitalizePipe
  ],
  providers: []
})
export class SharedModule { }
