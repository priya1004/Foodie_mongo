import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, Subject } from 'rxjs';
import { IHotel } from '../models/hotel';
import { IOrder } from '../models/order';
import { ICartItem } from '../models/cart-item';
import { IMenu } from '../models/menu';
@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private url: string = 'https://localhost:7101/api/Admin/MainRestaurants'
  private orderURL: string = 'api/order';

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
  orderHistoryChange: Subject<any> = new Subject<any>();

  userNameChange: Subject<string> = new Subject<string>();

  emailChange: Subject<string> = new Subject<string>();

  userIdChange: Subject<string> = new Subject<string>();

  cartItemsChange: Subject<ICartItem[]> = new Subject<ICartItem[]>();

  constructor(private httpClient: HttpClient) { }
  public getHotels = (): Observable<IHotel[]> => {
    return this.httpClient.get<IHotel[]>(this.url).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
  public getHotel = (hotelId: string): Observable<IHotel> => {
    return this.httpClient.get<IHotel>(`${this.url}/${hotelId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
  public getOrders = (userId: string): Observable<IOrder[]> => {
    return this.httpClient.get<IOrder[]>(`${this.orderURL}/${userId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
  public saveOrder = (orders:any, userId:any): Observable<any> => {
    this.clearAllCartItems();
    return this.httpClient.post<any>(`${this.orderURL}/${userId}`, orders).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
  public setOrderHistory = (orderHist: IOrder[]) => {
    this.orderHistoryChange.next(orderHist)
  }
  public setCartItem = (item: any) => {
    this.cartItemsChange.next(item);
  }

  public removeCartItem = (item:ICartItem) => {
    this.cartItems = this.cartItems.filter((menu:IMenu) => menu.id != item.id);
  }

  public clearAllCartItems = () => {
    this.cartItems = [];
  }
}
