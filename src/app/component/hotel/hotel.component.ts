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
export class HotelComponent implements OnInit {
  public hotels:IHotel[] = [];
  public hotelsConstant:IHotel[] = [];
  public userName = '';


  constructor(private _hotelService: HotelService, private router: Router) { }
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
      (data) => {
        this.hotelsConstant = this.hotels = data;
        this.userName = this._hotelService.userName;
      },
      (error) => {
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

}
