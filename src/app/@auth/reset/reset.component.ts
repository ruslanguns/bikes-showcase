import { Component, OnInit, Inject, PLATFORM_ID, Injector } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { WindowService } from 'src/app/shared';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styles: []
})
export class ResetComponent implements OnInit {

  isBrowser: boolean = isPlatformBrowser(this.platformId);
  accessToken: string;

  constructor(
    // tslint:disable-next-line: ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private doc,
    private injector: Injector,
    private windowService: WindowService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.route.params.subscribe(params => {
      this.accessToken = params.accessToken;
    });

    if (this.isBrowser) {
      this.authService.setLocalStorageItems({ accessToken: this.accessToken });
      this.redirection();
    }

  }

  ngOnInit() {
  }

  redirection() {
    setTimeout(() => {
      this.router.navigate(['/admin/ajustes/reset']);
    }, 3000);
  }
}
