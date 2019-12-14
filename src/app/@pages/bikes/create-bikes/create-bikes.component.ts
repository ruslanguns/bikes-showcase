import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { pluck, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-bikes',
  templateUrl: './create-bikes.component.html',
  styleUrls: ['./create-bikes.component.css']
})
export class CreateBikesComponent implements OnInit, OnDestroy {

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
