import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IHotel } from 'src/app/models/hotel';
import { HotelService } from 'src/app/service/hotel.service';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent implements OnInit {

  @Input() public hotelName: any;
  // @Input() public hotelThumbnail;
  // @Input() public hotelImage;
   @Input() public description:any;
  @Input() public rating:any;
  @Input() public review:any;

  public math = Math;

  constructor(private _hotelService: HotelService, private router: Router) { }

  ngOnInit(): void {
   
  }
}
