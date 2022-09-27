import { AfterViewInit, Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

import { HotelService } from 'src/app/service/hotel.service';
import { SideNavService } from 'src/app/service/side-nav.service';
import { ICartItem } from 'src/app/models/cart-item';
import { IMenu } from 'src/app/models/menu';
import { IOrder } from 'src/app/models/order';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav', {static: true}) public sidenav: MatSidenav | undefined;

  public hotels = [];
  public hotel:any;
  public hotelId:any;
  public ordersHistory:any;
  public showOrderHistory = false;
  public cartItems:ICartItem[] = [];
  public totalAmount = 0;
  public isFetched: boolean = false;
  public toggleMode = "over" as MatDrawerMode;
  public userName = '';
  public email = '';
  public userId = '';
  public isSideNavShowing: boolean = false;

  constructor(private _hotelService: HotelService, private route: ActivatedRoute, 
    private router: Router, private _sidenavService: SideNavService, private ref: ChangeDetectorRef) { }

  scrollTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  addToMyCart = (menu:IMenu) => {
    const newItem = {
      "id": menu.id,
      "name": menu.name,
      "price": menu.price,
      "quantity": 1,
      "hotel": this.hotel.name
    }

    if(this.isItemAlreadyExist(newItem)) {
      this.itemAlreadyExistModal(newItem);
    }
    else {
      this.addItemToMyCart(newItem);
      this.itemAddedModal(newItem);
      this.calculateAmount();
    }
  }

  addItemToMyCart = (newItem:ICartItem) => {
    this._hotelService.setCartItem(newItem);
    this.cartItems = this._hotelService.cartItems;
  }

  isItemAlreadyExist = (newItem:ICartItem) => {
    return this._hotelService.cartItems.find((cartItem:ICartItem) => cartItem.id == newItem.id);
  }

  itemAddedModal = (newItem:ICartItem) => {
    Swal.fire({
      icon: 'success',
      title: `${newItem.name} added to your basket!`,
      text: "Click on 'View My Basket' button below to view your basket or click on the basket icon at the top of the page",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#9c27b0',
      confirmButtonText: 'View My Basket',
      cancelButtonText: 'Close',
      cancelButtonColor: '#e23c3c'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toggleSideNav(true);
      }
    });
  }

  toggleSideNav = (isShoppingCart: boolean) => {
    if(isShoppingCart) {
      this.showOrderHistory = false;
    }
    else {
      this.showOrderHistory = true;
    }
    this.scrollTop();
    this._sidenavService.toggle();
  }

  itemAlreadyExistModal = (newItem:ICartItem) => {
    Swal.fire({
      icon: 'warning',
      title: `${newItem.name} is already exist in your basket!`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#9c27b0',
      confirmButtonText: 'View My Basket',
      cancelButtonText: 'Close',
      cancelButtonColor: '#e23c3c'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toggleSideNav(true);
      }
    });
  }

  removeItem = (cartItem:ICartItem) => {
    this._hotelService.removeCartItem(cartItem);
    this.cartItems = this._hotelService.cartItems;
    this.calculateAmount();
  }

  addQuantity = (cartItem:ICartItem) => {
    this.cartItems.forEach((item,index)=>{
      if(item.id == cartItem.id)
        this.cartItems[index].quantity = Number(this.cartItems[index].quantity)  + 1; 
   });
   this.calculateAmount();
  }

  removeQuantity = (cartItem:ICartItem) => {
    this.cartItems.forEach((item:ICartItem,index)=>{
      if(item.id == cartItem.id) {
        if (this.cartItems[index].quantity > 0)
          this.cartItems[index].quantity -= 1;
      }
   });
   this.calculateAmount();
  }

  calculateAmount = () => {
    this.totalAmount = 0; 
    this.cartItems.map((item:ICartItem) => {
      this.totalAmount = this.totalAmount + (item.quantity*item.price)
    });
    return this.totalAmount;
  }

  openPaymentMethod = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "It's just a sample confirmation message!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9c27b0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, pay bill!'
    }).then((result) => {
      if (result.isConfirmed) {
        const order = {
          menu: this.cartItems,
          amountPaid: this.calculateAmount(),
          orderDate: new Date()
        }
        this._hotelService.saveOrder(order, this.userId).subscribe(
          (success) => {
            Swal.fire({
              icon: 'success',
              title: 'Payment Successfull!',
              text: "It's just a sample success message. We can integrate real time UPI service!",
              showConfirmButton: true,
              confirmButtonColor: '#9c27b0'
            });
          },
          (err) => {
            Swal.fire({
              icon: 'warning',
              title: 'Payment not successfull!',
              text: "Sorry, something went wrong :(!",
              showConfirmButton: true,
              confirmButtonColor: '#9c27b0'
            });
          }
        )
        this.cartItems = this._hotelService.cartItems;
      }
    })
  }

  getOrderFromService = async() => {
    this.ordersHistory = await this._hotelService.getOrders(this.userId).toPromise();
    this.ordersHistory.orders = this.ordersHistory.orders.sort((a:IOrder,b:IOrder) => {
      let c = <any>new Date(b.orderDate);
      let d = <any>new Date(a.orderDate);
      return c-d;
    });
    return this.ordersHistory;
  }

  getOrderHistory = async() => {
    this.toggleSideNav(false);
    this.ordersHistory = await this.getOrderFromService();
  }

  ngAfterViewInit(): void {
    this._sidenavService.setSidenav(this.sidenav!);
  }

  async ngOnInit() {
    this.scrollTop();

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.hotelId =  parseInt(params.get('id') as string);
    });

    this._hotelService.getHotel(this.hotelId).subscribe((data) => {
      this.hotel = data;
    });

    this.userName = this._hotelService.userName;
    this.email = this._hotelService.email;
    this.userId = this._hotelService.userId;
    this.cartItems = this._hotelService.cartItems;
    this.calculateAmount();
    

    if(!this.userName) {
      this.router.navigateByUrl("/hotels");
    }

    this._hotelService.getOrders(this.userId).subscribe(
      (data) => {
        this._hotelService.setOrderHistory(data);
        this.ordersHistory = this._hotelService.orderHistory;
      },
      (err) => {
        console.log(err);
      }
    );

    this.ordersHistory = await this.getOrderFromService();
  }
}
