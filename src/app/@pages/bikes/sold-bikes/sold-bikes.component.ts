import { Component, OnInit } from '@angular/core';
import { DatePipe, UpperCasePipe, TitleCasePipe, CurrencyPipe } from '@angular/common';
import { BikesService } from '../bikes.service';
import { SoldActionsViewComponent } from '../config/soldActions';
import { ProductIdViewComponent } from '../config/productId';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IBikes } from '../bikes.interface';

@Component({
  selector: 'app-sold-bikes',
  templateUrl: './sold-bikes.component.html',
  styles: [],
  providers: [DatePipe, UpperCasePipe, TitleCasePipe, CurrencyPipe],
})
export class SoldBikesComponent implements OnInit {

  data: IBikes[];
  settings: any;

  constructor(
    private readonly bikesService: BikesService,
    private readonly router: Router,
    private readonly datePipe: DatePipe,
    private readonly upperCasePipe: UpperCasePipe,
    private readonly titleCasePipe: TitleCasePipe,
    private readonly currencyPipe: CurrencyPipe,
  ) {
    this.settings = {
      noDataMessage: 'No hay bicicletas para mostrar',
      pager: {
        display: true,
        perPage: 10,
      },
      actions: [],
      columns: {
        productId: {
          title: 'Cod. Producto',
          class: 'anchoFijo negritas',
          width: '180px',
          type: 'custom',
          renderComponent: ProductIdViewComponent,
          onComponentInitFunction: (instance) => {
            instance.edit.subscribe(v => this.router.navigate(['/admin/bicicletas/detalle', v._id]));
          }
        },
        brand: {
          title: 'Marca',
          class: 'anchoFijo',
          width: 'auto',
          valuePrepareFunction: (brand) => this.upperCasePipe.transform(brand),
        },
        price: {
          title: 'Precio',
          class: 'anchoFijo',
          valuePrepareFunction: (price) => this.currencyPipe.transform(price, 'EUR'),
        },
        state: {
          title: 'Estado',
          class: 'anchoFijo',
          width: '160px',
          valuePrepareFunction: (state) => this.titleCasePipe.transform(state),
        },
        soldAt: {
          title: 'Fecha venta',
          class: 'anchoFijo',
          width: '140px',
          filter: false,
          valuePrepareFunction: (soldAt) => this.datePipe.transform(soldAt, 'short', 'UTC'),
        },
        createdAt: {
          title: 'Fecha creación',
          class: 'anchoFijo',
          sortDirection: 'desc',
          width: '140px',
          filter: false,
          valuePrepareFunction: (createdAt) => this.datePipe.transform(createdAt, 'short', 'UTC'),
        },
        acciones: {
          title: 'Acciones',
          filter: false,
          sort: false,
          type: 'custom',
          renderComponent: SoldActionsViewComponent,
          onComponentInitFunction: (instance) => {
            instance.toSale.subscribe(v => this.markSale(v._id));
            instance.delete.subscribe(v => this.deleteBike(v._id));
          }
        }
      },
    };
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.bikesService.getSold().subscribe((res: IBikes[]) => this.data = res);
  }

  deleteBike(id: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar?',
      text: `No podrás revertir esto luego.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, elimínalo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.bikesService.delete(id)
          .subscribe(
            res => {
              this.fetchData();
              console.log('Bicicleta eliminada');
            },
            error => {
              console.log('HTTP error', error);
            },
          );

      }
    });
  }

  markSale(id: string) {
    Swal.fire({
      title: 'Ponerlo a la venta',
      text: `¿Realmente desea volver a ponerlo a la venta?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this.bikesService.toSale(id)
          .subscribe(
            res => {
              this.fetchData();
              console.log('Puesta a la venta');
            },
            error => console.log('HTTP error', error),
          );
      }
    });
  }

}
