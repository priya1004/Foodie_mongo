import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from '../../services/side-nav.service';
import { OrderService } from 'src/app/services/order.service';
import { ICapability } from 'selenium-webdriver';
import { ICartItem } from 'src/app/models/cart-item';
import { ICustomer } from 'src/app/models/customer';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav', {static: true}) public sidenav: MatSidenav;

  public hotels = [];
  public hotel;
  public cartItems = [];
  public order;
  
 public customeremail:string=localStorage.getItem('foodie-email');
 public customername=localStorage.getItem('foodie-username');
  public totalAmount = 0;
  public isFetched: boolean = false;
  public toggleMode = "over";
  public userName = localStorage.getItem('foodie-username');
  public isSideNavShowing: boolean = false;
  customer:ICustomer ={
    email: this.customeremail,
    name: this.customername,
    phone: '98765432',
    address: 'High tech city'
  }

  constructor(private _hotelService: HotelService, private _orderService:OrderService ,private route: ActivatedRoute, 
    private router: Router, private _sidenavService: SideNavService) { 
      
    }

  scrollTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  getHotel = (id: number) => {
    try {
      return this.hotels.filter((hotel) => hotel.restaurantid == id);
    }
    catch(e) {
      console.log(e);
    }
  }

  addToMyCart = (menu) => {
    const newItem = {
      "id": menu.dishid,
      "name": menu.name,
      "price": menu.price,
      "quantity": 1
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

  addItemToMyCart = (newItem) => {
    this._hotelService.setCartItem(newItem);
    this.cartItems = this._hotelService.cartItems;
  }

  isItemAlreadyExist = (newItem) => {
    return this._hotelService.cartItems.find((cartItem) => cartItem.id == newItem.id);
  }

  itemAddedModal = (newItem) => {
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
        this.toggleSideNav();
      }
    });
  }
//find({"restaurantid":77})
  toggleSideNav = () => {
    this.scrollTop();
    this._sidenavService.toggle();
  }

  itemAlreadyExistModal = (newItem) => {
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
        this.toggleSideNav();
      }
    });
  }

  removeItem = (cartItem) => {
    this._hotelService.removeCartItem(cartItem);
    this.cartItems = this._hotelService.cartItems;
    this.calculateAmount();
  }

  addQuantity = (cartItem) => {
    this.cartItems.forEach((item,index)=>{
      if(item.id == cartItem.id)
        this.cartItems[index].quantity = Number(this.cartItems[index].quantity)  + 1; 
   });
   this.calculateAmount();
  }

  removeQuantity = (cartItem) => {
    this.cartItems.forEach((item,index)=>{
      if(item.id == cartItem.id) {
        if (this.cartItems[index].quantity > 0)
          this.cartItems[index].quantity -= 1;
      }
   });
   this.calculateAmount();
  }

  calculateAmount = () => {
    this.totalAmount = 0; 
    this.cartItems.map((item) => {
      this.totalAmount = this.totalAmount + (item.quantity*item.price)
    });
  }

  openPaymentMethod = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to place order?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9c27b0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, place order!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Order Successfully Placed!',
          //text: "Your order is cooking",
          showConfirmButton: true,
          confirmButtonColor: '#9c27b0'
        }).then((result)=>{
          this.order={
            cart:this.cartItems,
            customer:{
              email:this.customeremail,
              name:this.customername,
              phone:"995251900",
              address:"Hitech City"
            },
            orderid:"123",
            restaurantid:this.hotel.restaurantid,
            restaurantname:this.hotel.name,
            status:"Pending"
          }
          this._hotelService.postOrder(this.order).subscribe((data) => {
         
            window.location.reload();
          },
          (error)=>{
            window.location.reload();
          });
        }
        )

      }
  
    })
  }

  ngAfterViewInit(): void {
    this._sidenavService.setSidenav(this.sidenav);
  }

  ngOnInit(): void {
    this.scrollTop();
    this._hotelService.getHotelsList().subscribe((data) => {
      this.hotels = data;
      this.route.paramMap.subscribe((params: ParamMap) => {
        [this.hotel] =  this.getHotel(parseInt(params.get('id')));
      })
    });
   // this._hotelService.setUserName(localStorage.getItem('foodie-username'))
    this.userName = localStorage.getItem('foodie-username')
    this.cartItems = this._hotelService.cartItems;
    this.calculateAmount();
  }
}
