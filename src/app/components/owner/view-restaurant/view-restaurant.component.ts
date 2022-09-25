import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IHotel } from 'src/app/models/hotel';
import { IRestaurantRequest } from 'src/app/models/restaurant-request';
import { OrderService } from 'src/app/services/order.service';
import { OwnerService } from 'src/app/services/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.css']
})
export class ViewRestaurantComponent implements OnInit {

  public hotels:IHotel[];
  public restaurantOwnerEmail=localStorage.getItem('foodie-email');
  registerRestaurant: {
    restaurantid: string; restaurantname: string; address: string; cuisines: string;
};
  userName: any;
  constructor(private _ownerService:OwnerService,private _orderService:OrderService,private router:Router) { }
  customError = (statusText, statusMessage) => {
    return {
      statusText: statusText,
      message: statusMessage
    }
  }
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
  postRestaurant(hotel){
    this._ownerService.postRestaurant(hotel).subscribe(
      (data)=>{
       
      },
      (error)=>{
        this.showError(error);
      }
    )
  }
  addRestaurant(){
    Swal.fire({
      icon: 'info',
      title: "Restaurant Registration",
      text: "Enter the details",
      html:
      '<input id="restaurantid" type="text" class="swal2-input" autocomplete="on" placeholder="restaurantid" required>' +
      '<input id="restaurantname" type="text" class="swal2-input" autocomplete="on" placeholder="restaurantname" required>' +
      '<input id="address" type="text" class="swal2-input" autocomplete="on" placeholder="address" required>' +
      '<input id="cuisines" type="text" class="swal2-input" autocomplete="off" placeholder="cuisines" required>' +
       '<b>Already have an account?</b>&nbsp' +
      '<a href="/login">Click here to login</a> ',
      focusConfirm: false,
      confirmButtonColor: '#9c27b0',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton:true,
      
      preConfirm: () => {
        this.registerRestaurant = {
          restaurantid:(document.getElementById('restaurantid') as HTMLInputElement).value,
          restaurantname: (document.getElementById('restaurantname') as HTMLInputElement).value,
          address: (document.getElementById('address') as HTMLInputElement).value,
          cuisines: (document.getElementById('cuisines') as HTMLInputElement).value,
          
        }
    }
    }).then((result) => {
      if (result.isConfirmed) {
        if(!this.registerRestaurant.restaurantname || !this.registerRestaurant.address || !this.registerRestaurant.cuisines) {
          const error = this.customError("Missing field found!", "Please enter all the fields");
          this.showError(error);
        }
        else {
          const request:IRestaurantRequest={
            restaurantid: this.registerRestaurant.restaurantid,
            name: this.registerRestaurant.restaurantname,
            address: this.registerRestaurant.address,
            cuisines: this.registerRestaurant.cuisines,
            restaurant_owner_email:this.registerRestaurant.restaurantid ,
            rating: '0',
            reviews: '0',
            feature_image: '',
            thumbnail_image: '',
            isVerified: false,
            menu: []
          }
            this._ownerService.register(request).subscribe(
              (res) => {
                // this._ownerService.getRestaurant().subscribe(
                //   (data)=>{
                //    this.hotels=data
                //    localStorage.setItem('foodie-ownerrestaurrantid',this.hotels[0].restaurantid)
                //   },
                //   (error)=>{
                //     this.showError(error);
                //   }
                // )
              },
              (error) => {
                 this.showError(error);
                })
              
          }
      }
    })
  }
  ngOnInit(): void {
    this.userName = this._ownerService.ownerName;
    this._ownerService.getRestaurant().subscribe(
      (data)=>{
        this.hotels=data;
        localStorage.setItem('foodie-ownerrestaurantid',this.hotels[0].restaurantid)
        this._ownerService.hotel=this.hotels[0];
        this._orderService.getOrder().subscribe(
          (data)=>{
            this._ownerService.order=data;
            if(!this._ownerService.order.length){
              window.location.reload();
            }
          },
          (error)=>{
            this.showError(error);
          }
        )
      },
      (error)=>{
        this.showError(error);
      }
    )
    
   
  }

}
