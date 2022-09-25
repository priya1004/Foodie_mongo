import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IHotel } from 'src/app/models/hotel';
import { IMenu } from 'src/app/models/menu';
import { OrderService } from 'src/app/services/order.service';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {
  public items: IMenu[]
  public hotel:IHotel
  userName: any;

  constructor(private _ownerService:OwnerService,private router:Router) { }

  ngOnInit(): void {
    this.userName = this._ownerService.ownerName;
    this.hotel=this._ownerService.hotel;
    this.items=this.hotel.menu
  
  }

}
