import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() public userName;

  constructor(private router: Router,private authService:AuthService) { }

  goToHome = () => {
    this.router.navigateByUrl("/hotels");
  }
  goToLogin = ()=>{
    this.router.navigate(['/login'])
    
  }
  goToLogout = ()=>{

    this.authService.logoutUser();
  }
  ngOnInit(): void {
  }

}
