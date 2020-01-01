import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styles: []
})
export class ResetComponent implements OnInit {

  accessToken: string;

  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.route.params.subscribe(params => {
      const { accessToken } = params;
      const decoded = jwt_decode(accessToken);
      (decoded.reset) ? this.authService.setLocalStorageItems({ accessToken }) : this.router.navigate(['/admin']);
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/admin/ajustes/reset']);
    }, 2000);
  }

}
