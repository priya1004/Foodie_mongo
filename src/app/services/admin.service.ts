import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IHotel } from '../models/hotel';
import { ILoginUser } from '../models/login-user';
import { IRestaurantRequest } from '../models/restaurant-request';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
 
  private url: string = 'https://localhost:7101/api/Admin/';
  public customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }

  constructor(private httpClient: HttpClient) { }
  public postUser= (user): Observable<ILoginUser> => {
    return this.httpClient.post<ILoginUser>(this.url,user).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
  public getUserList=(): Observable<IUser[]> => {
  return this.httpClient.get<IUser[]>("https://localhost:7101/api/Admin/UserDetails").pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
  public postRestaurant= (hotel): Observable<IHotel> => {
    return this.httpClient.post<IHotel>(this.url,hotel).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
  public getRestaurantList=(): Observable<IHotel[]> => {
    return this.httpClient.get<IHotel[]>(this.url+"MainRestaurants").pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
  public getRestaurantRequestList = (): Observable<IRestaurantRequest[]> => {
    return this.httpClient.get<IRestaurantRequest[]>(this.url+"RestaurantRequest").pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
  public postRestaurantRequest=(request): Observable<IRestaurantRequest> => {
    return this.httpClient.put<IRestaurantRequest>(this.url+"verified/"+request.restaurantid+"/1",request).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
  public removeRestaurantRequest=(request): Observable<IRestaurantRequest> => {
    return this.httpClient.put<IRestaurantRequest>(this.url+"verified/"+request.restaurantid+"/0",request).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
}
