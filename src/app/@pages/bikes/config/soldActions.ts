import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-actions-view',
  template: `
    <div class="d-flex flex-nowrap text-white">
      <a (click)="OnToSale()" class="btn btn-info btn-sm cursor">
        <i class="fas fa-check"></i>
      </a>
      <a (click)="OnDelete()" class="btn btn-danger btn-sm ml-2 cursor">
        <i class="fas fa-trash-alt"></i>
      </a>
    </div>
  `,
})
export class SoldActionsViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() toSale: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  OnToSale() {
    this.toSale.emit(this.rowData);
  }

  OnDelete() {
    console.log('Eliminando');
    this.delete.emit(this.rowData);
  }
}
