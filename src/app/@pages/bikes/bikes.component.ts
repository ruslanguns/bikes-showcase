import { Component, OnInit } from '@angular/core';
import { DatePipe, UpperCasePipe, TitleCasePipe, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SocketIoService } from '../../shared';
import { ActionsViewComponent, ProductIdViewComponent } from './components';
import { IBikes } from './bikes.interface';
import { BikesService } from './bikes.service';
import { DateFormatComponent } from './components/date-format';
import { ToastrService } from 'ngx-toastr';

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
    private bikesService: BikesService,
    private datePipe: DatePipe,
    private upperCasePipe: UpperCasePipe,
    private titleCasePipe: TitleCasePipe,
    private currencyPipe: CurrencyPipe,
    private router: Router,
    private sockets: SocketIoService,
    private toastr: ToastrService
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
          type: 'custom',
          renderComponent: ProductIdViewComponent,
          onComponentInitFunction: (instance) => {
            instance.edit.subscribe(v => this.router.navigate(['/admin/bicicletas/detalle', v._id]));
          }
        },
        brand: {
          title: 'Marca',
          valuePrepareFunction: (brand) => this.upperCasePipe.transform(brand),
        },
        price: {
          title: 'Precio',
          valuePrepareFunction: (price) => this.currencyPipe.transform(price, 'EUR'),
        },
        state: {
          title: 'Estado',
          valuePrepareFunction: (state) => this.titleCasePipe.transform(state),
        },
        updatedAt: {
          title: 'Última edición',
          class: 'anchoFijo',
          type: 'custom',
          renderComponent: DateFormatComponent,
          onComponentInitFunction: (instance) => {
            instance.date.subscribe(v => console.log(v));
          }

        },
        createdAt: {
          title: 'Fecha creación',
          sortDirection: 'desc',
          class: 'anchoFijo',
          filter: false,
          type: 'custom',
          renderComponent: DateFormatComponent,
          onComponentInitFunction: (instance) => {
            instance.date.subscribe(v => console.log(v));
          }

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
    this.listenNewChanges();
  }

  listenNewChanges() {
    this.sockets.listen('newChange').subscribe(res => this.fetchData());
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
          .subscribe(res => this.toastr.success('Bicicleta eliminada', 'Petición correcta'));
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
          .subscribe(res => this.toastr.success('Marcada como vendida', 'Petición correcta'));
      }
    });
  }

}
