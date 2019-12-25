import { Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { pluck, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-bikes',
  templateUrl: './detail-bikes.component.html',
  styles: [],
})
export class DetailBikesComponent implements OnInit, OnDestroy {


  private OnKeyEscapeClose: Subscription;
  keyup$ = (keyCode: string) => {
    return fromEvent<KeyboardEvent>(document, 'keyup')
      .pipe(
        pluck('key'),
        filter(val => val === keyCode)
      );
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.OnKeyEscapeClose = this.keyup$('Escape')
      .subscribe(res => this.router.navigate(['/admin/bicicletas']));
  }

  ngOnDestroy() {
    this.OnKeyEscapeClose.unsubscribe();
  }
}
