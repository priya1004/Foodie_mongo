import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restaurant-requests',
  templateUrl: './restaurant-requests.component.html',
  styleUrls: ['./restaurant-requests.component.css']
})
export class RestaurantRequestsComponent implements OnInit {

  public hotelRequests=[]
  constructor(private _adminService:AdminService,private router:Router) { }
  showError = (error) => {
    Swal.fire({
      icon: 'error',
      title: error.status,
      text: error.message,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }
  addToMainRestaurants=(request)=>{
this._adminService.postRestaurantRequest(request).subscribe(
  (data)=>{ Swal.fire({
    icon: 'success',
    title: ' Added to the verified Restaurant List'
  })},
  (error)=>{
    this.showError(error)
  }
  )}
  ngOnInit(): void {
    this._adminService.getRestaurantRequestList().subscribe(
      (data)=>{
        this.hotelRequests=data;
      },
      (error)=>{
        this.showError(error);
      }
    )
  }

}
