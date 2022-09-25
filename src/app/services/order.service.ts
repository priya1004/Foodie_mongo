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
  public restaurantid=localStorage.getItem('foodie-ownerrestaurantid')
  public customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }
  
  

  constructor(private httpClient: HttpClient) { }
  // public placeOrder=(cartItems,customer):Observable<IOrder> => {
  //   const order:IOrder ={
  //     cart: cartItems,
  //     customer: customer,
  //     orderid: '4567',
  //     restaurantid: '456',
  //     restaurantname: 'lame restaurant',
  //     status: 'pending'
  //   }
  //   return this.httpClient.post<IOrder>(this.url,order).pipe(
  //     catchError((err: HttpErrorResponse) => {
  //       return throwError(err || this.customError);
  //     })
  //   );
  // }
  public getOrder = (): Observable<IOrder[]> => {
    console.log("http://localhost:5212/api/RestaurantOwner/ViewOrderDetails/"+this.restaurantid)
    return this.httpClient.get<IOrder[]>("http://localhost:5212/api/RestaurantOwner/ViewOrderDetails/"+this.restaurantid).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

}
