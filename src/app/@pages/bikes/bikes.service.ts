import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck, catchError, map, tap } from 'rxjs/operators';
import { throwError, Observable, Subject } from 'rxjs';
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

  // public bikes$: Observable<IBikes[]>;
  // private bikesData = new Subject<IBikes[]>();

  constructor(
    private http: HttpClient,
  ) {
  }

  getById(id: string): Observable<IBikes> {
    const URL = `api/bikes/${id}`;
    const http$ = this.http.get<ApiResponse>(URL);

    return http$
      .pipe(
        pluck('data'),
        catchError(err => throwError(err))
      );
  }

  get(): Observable<IBikes[]> {
    const URL = `api/bikes`;
    const http$ = this.http.get<ApiResponse>(URL);

    return http$
      .pipe(
        pluck('data'),
        map((bikes: any) => bikes.filter((bike: IBikes) => bike.status !== 'vendido')),
        catchError(err => throwError(err))
      );
  }

  getSold(): Observable<IBikes[]> {
    const URL = `api/bikes`;
    const http$ = this.http.get<ApiResponse>(URL);

    return http$
      .pipe(
        pluck('data'),
        map((bikes: any) => bikes.filter((bike: IBikes) => bike.status !== 'a la venta')),
        catchError(err => throwError(err))
      );
  }

  create(data: Bike): Observable<IBikes> {

    const URL = `api/bikes`;

    const http$ = this.http.post<ApiResponse>(URL, data);

    return http$
      .pipe(
        pluck('data'),
        catchError(err => throwError(err))
      );
  }

  update(id: string, data: Bike): Observable<IBikes> {

    const URL = `api/bikes/${id}`;
    const http$ = this.http.put<ApiResponse>(URL, data);

    return http$
      .pipe(
        pluck('data'),
        catchError(err => throwError(err))
      );
  }

  uploadImage(id: string, image: FormData) {
    const URL = `api/bikes/${id}/image`;
    const http$ = this.http.post<ApiResponse>(URL, image, {
      reportProgress: true,
      observe: 'events'
    });

    return http$
      .pipe(
        catchError(err => throwError(err))
      );
  }

  editImage(id: string, image: FormData) {
    const URL = `api/bikes/${id}/image`;
    const http$ = this.http.patch<ApiResponse>(URL, image, {
      reportProgress: true,
      observe: 'events'
    });

    return http$
      .pipe(
        catchError(err => throwError(err))
      );
  }

  delete(id: string) {
    const URL = `api/bikes/${id}`;
    const http$ = this.http.delete<ApiResponse>(URL);

    return http$
      .pipe(
        pluck('data'),
        catchError(err => throwError(err))
      );
  }

  toSold(id: string) {
    const URL = `api/bikes/${id}`;
    const data = { status: 'vendido' };
    const http$ = this.http.put<ApiResponse>(URL, data);

    return http$
      .pipe(
        pluck('data'),
        catchError(err => throwError(err))
      );
  }

  toSale(id: string) {
    const URL = `api/bikes/${id}`;
    const data = { status: 'a la venta' };
    const http$ = this.http.put<ApiResponse>(URL, data);

    return http$
      .pipe(
        pluck('data'),
        catchError(err => throwError(err))
      );
  }
}

