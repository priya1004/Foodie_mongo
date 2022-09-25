import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IHotel } from '../models/hotel';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private url: string = 'http://localhost:5212/api/RestaurantOwner/';
  ownerMailId:string=localStorage.getItem('foodie-email');
  ownerName:string=localStorage.getItem('foodie-username');
  ownerrestaurantid:string
 
  public customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }
  hotel: IHotel;
  order:IOrder[];

  constructor(private httpClient: HttpClient) { }
  public getRestaurant=(): Observable<IHotel[]> => {
    return this.httpClient.get<IHotel[]>(this.url+"GetRestaurant/"+this.ownerMailId).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
  public postRestaurant=(hotel): Observable<IHotel> => {
    return this.httpClient.post<IHotel>("http://localhost:5212/api/RestaurantOwner/PostRestaurantRequest",hotel).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
  public register=(hotel): Observable<any> => {
    return this.httpClient.post("http://localhost:5212/api/RestaurantOwner/PostRestaurantRequest",hotel,{responseType:'text'}).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
   
}
