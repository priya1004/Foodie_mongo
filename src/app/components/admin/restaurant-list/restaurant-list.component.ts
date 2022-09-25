import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

  public hotels=[]
  public Admin="Admin"
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
  addToMainRestaurants=(restaurant)=>{
this._adminService.postRestaurant(restaurant).subscribe(
  (data)=>{ Swal.fire({
    icon: 'success',
    title: ' Updated'
  })},
  (error)=>{
    this.showError(error)
  }
  )}
  ngOnInit(): void {
    this._adminService.getRestaurantList().subscribe(
      (data)=>{
        this.hotels=data;
      },
      (error)=>{
        this.showError(error);
      }
    )
  }

}
