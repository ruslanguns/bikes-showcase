import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck, catchError, map, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { IBikes } from './bikes.interface';
import { Bike } from './bike.class';

interface ApiResponse {
  message: string;
  data: IBikes;
}

@Injectable({
  providedIn: 'root'
})
export class BikesService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  fetchById(id: string): Observable<IBikes> {
    const URL = `api/bikes/${id}`;
    const http$ = this.http.get<ApiResponse>(URL);

    return http$
      .pipe(
        pluck('data'),
        catchError(err => {
          console.log({ text: err.error.error.message || err.error.message });
          return throwError(err);
        })
      );
  }

  fetch(): Observable<IBikes[]> {
    const URL = `api/bikes`;
    const http$ = this.http.get<ApiResponse>(URL);

    return http$
      .pipe(
        pluck('data'),
        map((bikes: any) => bikes.filter((bike: IBikes) => bike.status !== 'vendido')),
        // tap(bikes => console.log(bikes)),
        catchError(err => {
          console.log({ text: err.error.error.message || err.error.message });
          return throwError(err);
        })
      );
  }

  fetchSold(): Observable<IBikes[]> {
    const URL = `api/bikes`;
    const http$ = this.http.get<ApiResponse>(URL);

    return http$
      .pipe(
        pluck('data'),
        map((bikes: any) => bikes.filter((bike: IBikes) => bike.status !== 'a la venta')),
        // tap(bikes => console.log(bikes)),
        catchError(err => {
          console.log({ text: err.error.error.message || err.error.message });
          return throwError(err);
        })
      );
  }

  create(data: Bike): Observable<IBikes> {

    const URL = `api/bikes`;

    const http$ = this.http.post<ApiResponse>(URL, data);

    return http$
      .pipe(
        pluck('data'),
        catchError(err => {
          console.log({ text: err.error.error.message || err.error.message });
          return throwError(err);
        })
      );
  }

  update(id: string, data: Bike): Observable<IBikes> {

    const URL = `api/bikes/${id}`;

    const http$ = this.http.put<ApiResponse>(URL, data);

    return http$
      .pipe(
        pluck('data'),
        catchError(err => {
          console.log({ text: err.error.error.message || err.error.message });
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

  editImage(id: string, image: FormData) {
    const URL = `api/bikes/${id}/image`;
    return this.http.patch<ApiResponse>(URL, image, {
      reportProgress: true,
      observe: 'events'
    });
  }

  delete(id: string) {
    const URL = `api/bikes/${id}`;
    const http$ = this.http.delete<ApiResponse>(URL);

    return http$
      .pipe(
        pluck('data'),
        catchError(err => {
          console.log({ text: err.error.error.message || err.error.message });
          return throwError(err);
        })
      );
  }

  toSold(id: string) {
    const URL = `api/bikes/${id}`;
    const data = { status: 'vendido' };
    const http$ = this.http.put<ApiResponse>(URL, data);

    return http$
      .pipe(
        pluck('data'),
        // tap(res => console.log(res)),
        catchError(err => {
          console.log({ text: err.error.error.message || err.error.message });
          return throwError(err);
        })
      );
  }

  toSale(id: string) {
    const URL = `api/bikes/${id}`;
    const data = { status: 'a la venta' };
    const http$ = this.http.put<ApiResponse>(URL, data);

    return http$
      .pipe(
        pluck('data'),
        // tap(res => console.log(res)),
        catchError(err => {
          console.log({ text: err.error.error.message || err.error.message });
          return throwError(err);
        })
      );
  }
}

