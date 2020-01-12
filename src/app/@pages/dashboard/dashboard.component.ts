import { Component, OnInit, Inject, PLATFORM_ID, Injector } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { WindowService, SocketIoService } from 'src/app/shared';
import { BikesService } from '../bikes/bikes.service';
import { IBikes } from '../bikes/bikes.interface';

interface IData {
  cantidad?: number;
  unidades?: number;
  asdf?: number;
}

interface IStatistics {
  visitas?: number;
  enVenta?: IData;
  carga?: {
    general?: IData;
    cargaMesAnterior?: IData;
    cargaEsteMes?: IData;
    ultimasCargas?: IBikes[];
  };
  ventas?: {
    general?: IData;
    ventasMesAnterior?: IData;
    ventasEsteMes?: IData;
    ultimasVentas?: IBikes[];
  };
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isBrowser: boolean = isPlatformBrowser(this.platformId);
  sockets: SocketIoService;
  bikesService: BikesService;
  data: IStatistics = {};
  visits = 0;
  ultimasCargas: IBikes[] = [];
  ultimasVentas: IBikes[] = [];

  constructor(
    // tslint:disable-next-line: ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private doc,
    private injector: Injector,
    private windowService: WindowService,
  ) {
    if (this.isBrowser) {

      this.bikesService = this.injector.get(BikesService);
      this.sockets = this.injector.get(SocketIoService);

      this.fetchData();
      this.getViews();
      this.listenNewChanges();

    }
  }

  fetchData() {
    this.bikesService.getStats()
      .subscribe(res => {
        this.data = res;
        this.ultimasCargas = this.data && this.data.carga && this.data.carga.ultimasCargas || [];
        this.ultimasVentas = this.data && this.data.ventas && this.data.ventas.ultimasVentas || [];
      });
  }

  ngOnInit() {
  }

  getViews() {
    this.sockets.listen('getViews').subscribe(res => this.data.visitas = res as number);
  }

  listenNewChanges() {
    this.sockets.listen('newChange').subscribe(res => this.fetchData());
  }


}
