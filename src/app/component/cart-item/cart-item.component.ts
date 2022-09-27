import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() public cartItems: any;

  @Output() removeQuantityEvent = new EventEmitter();
  @Output() addQuantityEvent = new EventEmitter(); 
  @Output() removeItemEvent = new EventEmitter(); 

  constructor() { }

  removeQuantity = (cartItem: any) => {
    this.removeQuantityEvent.emit(cartItem);
  }

  addQuantity = (cartItem: any) => {
    this.addQuantityEvent.emit(cartItem);
  }

  removeItem = (cartItem: any) => {
    this.removeItemEvent.emit(cartItem);
  }

  ngOnInit(): void {
  }

}
