
import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { OwnerService } from 'src/app/services/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
public orders: IOrder[];
  userName: any;
  constructor(private _service: OrderService,private _ownerService:OwnerService) { }
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
    this.userName = this._ownerService.ownerName;
    this.orders=this._ownerService.order;
  }

}
