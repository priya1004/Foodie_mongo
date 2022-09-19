import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IHotel } from '../models/hotel';
@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private url: string = 'https://localhost:5212/api/Admin/MainRestaurants'
  public hasUserName = false;
  public userName = '';
  public email = '';
  public userId = '';
  public cartItems = [];
  public orderHistory = [];
  public customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }


  constructor(private httpClient: HttpClient) { }
  public getHotels = (): Observable<IHotel[]> => {
    return this.httpClient.get<IHotel[]>(this.url).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
}
