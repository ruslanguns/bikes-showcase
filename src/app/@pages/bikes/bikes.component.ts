import { Component, OnInit } from '@angular/core';
import { BikesService } from './bikes.service';
import { IBikes } from './bikes.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styles: []
})
export class BikesComponent implements OnInit {

  bikes: IBikes[] = [];

  constructor(
    private readonly bikesService: BikesService,
  ) {
    this.fetchData();
  }

  ngOnInit() { }


  fetchData() {
    this.bikesService.fetch()
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
