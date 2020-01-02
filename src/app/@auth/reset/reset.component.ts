import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

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
      this.accessToken = params.accessToken;
    });
  }

  ngOnInit() {
    this.authService.setLocalStorageItems({ accessToken: this.accessToken });
    this.router.navigate(['/admin/ajustes/reset']);
  }
}
