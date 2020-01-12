
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-actions-view',
  template: `
    <div class="negritas">
        <i (click)="OnEdit()" class="fas fa-eye cursor mr-2"></i> {{ value }}
    </div>
  `,
})
export class ProductIdViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() edit: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  OnEdit() {
    this.edit.emit(this.rowData);
  }
}
