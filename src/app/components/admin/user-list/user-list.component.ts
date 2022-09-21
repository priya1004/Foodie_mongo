import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users=[]
  constructor(private _adminService:AdminService,private router:Router) { }
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
  addToUsers=(user)=>{
this._adminService.postUser(user).subscribe(
  (data)=>{ Swal.fire({
    icon: 'success',
    title: ' Updated'
  })},
  (error)=>{
    this.showError(error)
  }
  )}
  ngOnInit(): void {
    this._adminService.getUserList().subscribe(
      (data)=>{
        this.users=data;
      },
      (error)=>{
        this.showError(error);
      }
    )
  }

}
