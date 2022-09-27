import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IHotel } from 'src/app/models/hotel';
import { HotelService } from 'src/app/service/hotel.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class 
HotelComponent implements OnInit {
  public hotels:IHotel[] = [];
  public hotelsConstant:IHotel[] = [];
  public userName='';
  

  
  constructor(private _hotelService: HotelService, private router: Router) { }
  inputName = async() => {
    await Swal.fire({
      title: 'Your name?',
      text: "We keep your name confidential!",
      input: 'text',
      confirmButtonColor: '#9c27b0',
      allowOutsideClick: false,
      allowEscapeKey: false,
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter your name!'
        }
        else {
          this._hotelService.userName=value;
          this.userName = this._hotelService.userName;
          return 'done'
        }
      }
    });
  }

  showError = (error: { status: any; message: any; }) => {

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
    this._hotelService.getHotels().subscribe(
      (data: IHotel[]) => {
        this.hotelsConstant = this.hotels = data;
        this.userName = this._hotelService.userName;
      },
      (error:any) => {
        if(error.status === 401) {
          this.router.navigateByUrl('/login');
        }
        else {
          console.log(error);
          this.showError(error);
        }
      }
    );
  }
  goToHotel = (hotel:IHotel) => {
    this.router.navigate(['/hotels', hotel.restaurantId])
  }

}
