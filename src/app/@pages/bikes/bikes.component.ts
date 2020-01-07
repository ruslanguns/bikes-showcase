import { Component, OnInit } from '@angular/core';
import { DatePipe, UpperCasePipe, TitleCasePipe, CurrencyPipe } from '@angular/common';
import { BikesService } from './bikes.service';
import { IBikes } from './bikes.interface';
import Swal from 'sweetalert2';
import { ActionsViewComponent } from './config/actions';
import { Router } from '@angular/router';
import { ProductIdViewComponent } from './config/productId';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styles: [],
  providers: [DatePipe, UpperCasePipe, TitleCasePipe, CurrencyPipe]
})
export class BikesComponent implements OnInit {

  data: IBikes[];
  settings: any;

  constructor(
    private readonly bikesService: BikesService,
    private readonly datePipe: DatePipe,
    private readonly upperCasePipe: UpperCasePipe,
    private readonly titleCasePipe: TitleCasePipe,
    private readonly currencyPipe: CurrencyPipe,
    private readonly router: Router,
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
        updatedAt: {
          title: 'Última edición',
          class: 'anchoFijo',
          width: 'auto',
          filter: false,
          valuePrepareFunction: (updatedAt) => this.datePipe.transform(updatedAt, 'short', 'UTC'),
        },
        createdAt: {
          title: 'Fecha creación',
          class: 'anchoFijo',
          sortDirection: 'desc',
          width: 'auto',
          filter: false,
          valuePrepareFunction: (createdAt) => this.datePipe.transform(createdAt, 'short', 'UTC'),
        },
        acciones: {
          title: 'Acciones',
          filter: false,
          sort: false,
          type: 'custom',
          renderComponent: ActionsViewComponent,
          onComponentInitFunction: (instance) => {
            instance.markSold.subscribe(v => this.markSold(v._id));
            instance.edit.subscribe(v => this.router.navigate(['/admin/bicicletas/detalle', v._id]));
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
    this.bikesService.get().subscribe((res: IBikes[]) => this.data = res);
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
            error => console.log('HTTP error', error),
          );

      }
    });
  }

  markSold(id: string) {
    Swal.fire({
      title: 'Marcar como vendida',
      text: `Esta acción es revertible después.`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, marcar vendido!',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.value) {
        this.bikesService.toSold(id)
          .subscribe(
            res => {
              this.fetchData();
              console.log('Marcada como vendida');
            },
            error => console.log('HTTP error', error),
          );
      }
    });
  }

}
