import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IHotel } from '../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
 
  private url: string = 'https://localhost:5212/api/owner/';
  restaurantid:string="71679"
  public customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }

  constructor(private httpClient: HttpClient) { }
  public getRestaurant=(): Observable<IHotel> => {
    return this.httpClient.get<IHotel>(this.url+"RestaurantDetails/"+this.restaurantid).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
   
}
