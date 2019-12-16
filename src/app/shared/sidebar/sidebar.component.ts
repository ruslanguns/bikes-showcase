import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../@auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
