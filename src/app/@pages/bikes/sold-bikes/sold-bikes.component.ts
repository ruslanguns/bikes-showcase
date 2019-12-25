import { Component, OnInit } from '@angular/core';
import { PnotifyService } from 'src/app/shared';
import Swal from 'sweetalert2';
import { IBikes } from '../bikes.interface';
import { BikesService } from '../bikes.service';

@Component({
  selector: 'app-sold-bikes',
  templateUrl: './sold-bikes.component.html',
  styles: []
})
export class SoldBikesComponent implements OnInit {

  bikes: IBikes[] = [];
  PNotify;

  constructor(
    private readonly bikesService: BikesService,
    private readonly pnotifyService: PnotifyService,
  ) {
    this.PNotify = this.pnotifyService.getPNotify();
    this.fetchData();
  }

  ngOnInit() { }


  fetchData() {
    this.bikesService.fetchSold()
      .subscribe(
        res => this.bikes = res,
        error => console.log('HTTP error', error),
      );
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
              console.log(res);
              this.fetchData();
              this.PNotify.success('Bicicleta eliminada');
            },
            error => console.log('HTTP error', error),
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
              this.PNotify.success('Puesta a la venta');
            },
            error => console.log('HTTP error', error),
          );
      }
    });
  }

}
