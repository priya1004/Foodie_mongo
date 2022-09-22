import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IHotel } from '../models/hotel';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private url: string = 'http://localhost:5217/api/User/RestaurantDetails';
  public orders:IOrder
  public customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }
  
  

  constructor(private httpClient: HttpClient) { }
  public placeOrder=(cartItems):Observable<IOrder> => {
    const order:IOrder ={
      cartitems: cartItems,
      customer: null,
      order_id: '',
      restaurant_id: ''
    }
    return this.httpClient.post<IOrder>(this.url,order).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

}
