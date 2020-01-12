import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-actions-view',
  template: `
    <div class="d-flex flex-nowrap text-white">
      <a title="Marcar como vendido" (click)="onMarkSold()" class="btn btn-success btn-sm cursor">
        <i class="fas fa-check"></i>
      </a>
      <a title="Editar bicicleta" (click)="OnEdit()" class="btn btn-secondary btn-sm ml-2 cursor">
        <i class="fas fa-edit"></i>
      </a>
      <a title="Eliminar bicicleta" (click)="OnDelete()" class="btn btn-danger btn-sm ml-2 cursor">
        <i class="fas fa-trash-alt"></i>
      </a>
    </div>
  `,
})
export class ActionsViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() markSold: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onMarkSold() {
    this.markSold.emit(this.rowData);
  }

  OnEdit() {
    this.edit.emit(this.rowData);
  }

  OnDelete() {
    this.delete.emit(this.rowData);
  }
}
