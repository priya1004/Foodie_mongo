import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRegisterUser } from '../models/register-user';
import { ILoginUser } from '../models/login-user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';
import { HotelService } from './hotel.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerURL: string = (environment.baseURL) ? `${environment.baseURL}api/User` : 'api/User';
  private loginURL: string = (environment.baseURL) ? `${environment.baseURL}api/Login/Login` : 'api/Login/Login';
  private isUserLoggedIn: boolean = false;
  public userName='';
  private usertype:string

  userLogStatusChange: Subject<boolean> = new Subject<boolean>();

  public customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }

  constructor(private httpClient: HttpClient, private _router: Router,private hotelservice:HotelService) {
    this.userLogStatusChange.subscribe((value) => {
      this.isUserLoggedIn = value;
    })
  }

  public register = (user: IRegisterUser): Observable<any> => {
    return this.httpClient.post<any>("http://localhost:5217/api/User", user).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public login = (user: ILoginUser): Observable<IUser> => {
    return this.httpClient.post<IUser>(this.loginURL, user).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public userLoggedIn = () => {
    this.userLogStatusChange.next(true);
  }

  public userLoggedOut = () => {
    this.userLogStatusChange.next(false);
  }

  public isAuthenticatedUser = () => {
    return !!localStorage.getItem('foodie-token');
  }

  public getAuthToken = () => {
    return localStorage.getItem('foodie-token');
  }

  public logoutUser = () => {
    if(localStorage.getItem('foodie-usertype')!="customer")
    {
      
      this._router.navigateByUrl("login")
      return
    }
   
    localStorage.removeItem('foodie-token');
    localStorage.removeItem('foodie-username');
    localStorage.removeItem('foodie-email');
    localStorage.removeItem('foodie-userId');
    localStorage.removeItem('foodie-usertype')
    localStorage.removeItem('foodie-ownerrestaurantid');
    this.hotelservice.setUserName("")    
    this._router.navigateByUrl("login");
   
  }

}
