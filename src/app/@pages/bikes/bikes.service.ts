import { Injectable } from '@angular/core';
import { PnotifyService } from '../../shared/services/pnotify.service';
import { HttpClient } from '@angular/common/http';
import { pluck, catchError, map, tap, concatMap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { IBikes } from './bikes.interface';
import { Bike } from './bike.class';

interface ApiResponse {
  message: string;
  data: IBikes | IBikes[];
}

@Injectable({
  providedIn: 'root'
})
export class BikesService {

  PNotify;

  constructor(
    private readonly http: HttpClient,
    private readonly pnotifyService: PnotifyService,
  ) {
    this.PNotify = this.pnotifyService.getPNotify();
  }

  fetch(): Observable<IBikes[]> {
    const URL = `api/bikes`;
    const http$ = this.http.get<ApiResponse>(URL);

    return http$
      .pipe(
        pluck('data'),
        map((bikes: IBikes[]) => bikes.filter(bike => bike.status !== 'vendido')),
        // tap(bikes => console.log(bikes)),
        catchError(err => {
          this.PNotify.error({ text: err.error.error.message || err.error.message });
          return throwError(err);
        })
      );
  }

  create(data: Bike) {

    const URL = `api/bikes`;

    const http$ = this.http.post<any>(URL, data);

    return http$
      .pipe(
        pluck('data'),
        catchError(err => {
          this.PNotify.error({ text: err.error.error.message || err.error.message });
          return throwError(err);
        })
      );
  }

  uploadImage(id: string, image: FormData) {
    const URL = `api/bikes/${id}/image`;
    return this.http.post<ApiResponse>(URL, image, {
      reportProgress: true,
      observe: 'events'
    });
  }

  delete(id: string) {
    const URL = `api/bikes/${id}`;
    const http$ = this.http.delete<any>(URL);

    return http$
      .pipe(
        pluck('data'),
        catchError(err => {
          this.PNotify.error({ text: err.error.error.message || err.error.message });
          return throwError(err);
        })
      );
  }
}

