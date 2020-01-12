
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-date-format',
  template: `
    <div>
    <time title="{{ value | amLocale:'es' | amDateFormat:'LLL'}}">
      {{ value | amTimeAgo | capitalize}}
    </time>
    </div>
  `,
})

export class DateFormatComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string;
  @Input() rowData: any;

  @Output() date: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  result() {
    this.date.emit(this.rowData);
  }
}
