import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRestaurantRequest } from 'src/app/models/restaurant-request';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restaurant-requests',
  templateUrl: './restaurant-requests.component.html',
  styleUrls: ['./restaurant-requests.component.css']
})
export class RestaurantRequestsComponent implements OnInit {

  public hotelRequests:IRestaurantRequest[]=[]
  constructor(private _adminService:AdminService,private router:Router) { }
  showError = (error) => {
    Swal.fire({
      icon: 'error',
      title: error.status,
      text: error.message,
      showConfirmButton: false,
      allowOutsideClick: true,
      allowEscapeKey: false,
    });
    
  }
  addToMainRestaurants=(request)=>{
this._adminService.postRestaurantRequest(request).subscribe(
  (data)=>{ Swal.fire({
    icon: 'success',
    title: data
  })},
  (error)=>{

    this.showError(error)
  }
  
  )
  window.location.reload();}
  removeFromMainRestaurants=(request)=>{
    this._adminService.removeRestaurantRequest(request).subscribe(
      (data)=>{ Swal.fire({
        icon: 'success',
        title: data
      })},
      (error)=>{
        this.showError(error)
      }
      )
      window.location.reload();}
  ngOnInit(): void {
    this._adminService.getRestaurantRequestList().subscribe(
      (data)=>{
        this.hotelRequests=data;
       console.log(this.hotelRequests[0].address)
      
      },
      (error)=>{
        this.showError(error);
      }
    )
  }

}
