import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HotelService } from '../../services/hotel.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginUser;

  constructor(private router: Router, private _authService: AuthService, private _hotelService: HotelService) { }

  customError = (statusText, statusMessage) => {
    return {
      statusText: statusText,
      message: statusMessage
    }
  }

  openLoginModal = async() => {
    await Swal.fire({
      title: 'Login into your account',
      html:
      '<input id="email" type="email" class="swal2-input" autocomplete="off" placeholder="email" required>' +
      '<input id="password" type="password" class="swal2-input" autocomplete="off" placeholder="password" required>' +
      '<input id="usertype" type="text" class="swal2-input" autocomplete="off" placeholder="usertype:customer/owner" required>' +
      '<b>New User?</b>&nbsp' +
      '<a href="/register">Click here to register</a> ',
      focusConfirm: false,
      confirmButtonColor: '#9c27b0',
      allowOutsideClick: false,
      allowEscapeKey: false,
      preConfirm: () => {
          this.loginUser = {
            email: (document.getElementById('email') as HTMLInputElement).value,
            password: (document.getElementById('password') as HTMLInputElement).value,
            usertype:(document.getElementById('usertype') as HTMLInputElement).value
          }
      }
    }).then((result) => {
      
      if (result.isConfirmed) {
        if(!this.loginUser.email || !this.loginUser.password || !this.loginUser.usertype) {
          const error = this.customError("Missing username ,usertype or password!", "Please enter all the fields");
          this.showError(error);
        }
        else if(this.loginUser.email=="admin" && this.loginUser.password=="admin" && this.loginUser.usertype=="admin")
        {
          this.router.navigateByUrl("/admin/restaurant-requests")
        }
        else {
          this._authService.login(this.loginUser).subscribe(
            (res) => {
              //this._authService.userName=res.username;
              this.redirectToHomePage()
              localStorage.setItem('foodie-token', res.token);
              localStorage.setItem('foodie-username', res.username);
              localStorage.setItem('foodie-email', res.email);
              //localStorage.setItem('order-my-food-userId', res.userId);
              localStorage.setItem('foodie-usertype',res.usertype)
              if(res.usertype=="customer"){
              this.router.navigateByUrl("/hotels");
            }
              else if(res.usertype=="owner"){
              this.router.navigateByUrl("/owner/view-restaurant");
            }
            else{
              const error1 = this.customError("Invalid credentials", "Please try again");
              this.showError(error1);
            }
            },
            (error) => {
              const error1 = this.customError("Invalid Username or Password", "Please enter valid credentials");
              this.showError(error1);
            
              
            }
          )
        }
      }
    })
  }

  redirectToHomePage = () => {
    Swal.fire({
      icon: 'success',
      title: 'Logged in successfully',
      html: 'Redirecting to the dashboard...',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    })
  }

  showError = (error) => {
    Swal.fire({
      icon: 'error',
      title: error.statusText,
      text: error.message,
      showConfirmButton: true,
      confirmButtonText: "Try Again",
      confirmButtonColor: '#9c27b0',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.openLoginModal();
      }
    })
  }

  ngOnInit(): void {
    this.openLoginModal();
  }

}