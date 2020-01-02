import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BikesService } from '../bikes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sold-bikes',
  templateUrl: './sold-bikes.component.html',
  styles: []
})
export class SoldBikesComponent implements OnInit {

  bicicletas$: Observable<any>;

  constructor(
    private readonly bikesService: BikesService,
  ) {
    this.bicicletas$ = this.bikesService.soldBikes$;
  }

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    this.bikesService.fetchData();
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
              this.updateData();
              console.log('Bicicleta eliminada');
            },
            error => {
              this.updateData();
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
              this.updateData();
              console.log('Puesta a la venta');
            },
            error => console.log('HTTP error', error),
          );
      }
    });
  }

}
