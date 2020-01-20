import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IBikes } from './bikes.interface';
import { Bike } from './bike.class';

interface ApiResponse<T> {
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class BikesService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getById(id: string): Observable<IBikes> {
    const URL = `api/bikes/${id}`;
    const http$ = this.http.get<ApiResponse<IBikes>>(URL);

    return http$
      .pipe(
        pluck('data')
      );
  }

  get(): Observable<IBikes[]> {
    const URL = `api/bikes`;
    const http$ = this.http.get<ApiResponse<IBikes[]>>(URL);

    return http$
      .pipe(
        pluck('data'),
        map(bikes => bikes.filter(bike => bike.status !== 'vendido')),
      );
  }

  getSold(): Observable<IBikes[]> {
    const URL = `api/bikes`;
    const http$ = this.http.get<ApiResponse<IBikes[]>>(URL);

    return http$
      .pipe(
        pluck('data'),
        map(bikes => bikes.filter(bike => bike.status !== 'a la venta'))
      );
  }

  create(data: Bike): Observable<IBikes> {

    const URL = `api/bikes`;
    const http$ = this.http.post<ApiResponse<IBikes>>(URL, data);

    return http$
      .pipe(
        pluck('data'),
      );
  }

  update(id: string, data: Bike): Observable<IBikes> {

    const URL = `api/bikes/${id}`;
    const http$ = this.http.put<ApiResponse<IBikes>>(URL, data);

    return http$
      .pipe(
        pluck('data'),
      );
  }

  uploadImage(id: string, image: FormData) {
    const URL = `api/bikes/${id}/image`;
    const http$ = this.http.post<ApiResponse<any>>(URL, image, {
      reportProgress: true,
      observe: 'events'
    });

    return http$;
  }

  editImage(id: string, image: FormData) {
    const URL = `api/bikes/${id}/image`;
    const http$ = this.http.patch<ApiResponse<any>>(URL, image, {
      reportProgress: true,
      observe: 'events'
    });

    return http$;
  }

  delete(id: string) {
    const URL = `api/bikes/${id}`;
    const http$ = this.http.delete<ApiResponse<IBikes>>(URL);

    return http$
      .pipe(
        pluck('data'),
      );
  }

  toSold(id: string) {
    const URL = `api/bikes/${id}`;
    const data = { status: 'vendido' };
    const http$ = this.http.put<ApiResponse<IBikes>>(URL, data);

    return http$
      .pipe(
        pluck('data'),
      );
  }

  toSale(id: string) {
    const URL = `api/bikes/${id}`;
    const data = { status: 'a la venta' };
    const http$ = this.http.put<ApiResponse<IBikes>>(URL, data);

    return http$
      .pipe(
        pluck('data'),
      );
  }

  getStats() {
    const URL = `api/bikes/stats/all`;
    const http$ = this.http.get<ApiResponse<any>>(URL);

    return http$
      .pipe(
        pluck('data'),
      );
  }

  setView() {
    const URL = `api/bikes/newview`;
    const http$ = this.http.patch(URL, {});

    return http$
      .pipe(
        pluck('data'),
      );
  }
}

