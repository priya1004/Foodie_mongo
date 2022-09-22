import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from 'src/app/services/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.css']
})
export class ViewRestaurantComponent implements OnInit {

  public hotels;
  constructor(private _ownerService:OwnerService,private router:Router) { }
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
  ngOnInit(): void {
    this._ownerService.getRestaurant().subscribe(
      (data)=>{
        this.hotels=data;
      },
      (error)=>{
        this.showError(error);
      }
    )
  }

}
