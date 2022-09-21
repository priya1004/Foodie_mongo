import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private url: string = 'http://localhost:5217/api/User/RestaurantDetails';
  public orders=[];
  
  

  constructor(private httpClient: HttpClient) { }
  public placeOrder() {
   
  }
}
