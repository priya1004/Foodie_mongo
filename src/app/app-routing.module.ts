import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RestaurantRequestsComponent } from './components/admin/restaurant-requests/restaurant-requests.component';
import { RestaurantListComponent } from './components/admin/restaurant-list/restaurant-list.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';

const routes: Routes = [
  { path:'', redirectTo: '/admin/restaurant-requests', pathMatch: "full"},
  { path:'register', component: RegisterComponent },
  { path:'login', component: LoginComponent },
  { path: 'hotels', component: HotelsComponent },
  { path: 'hotels/:id', component: HotelComponent },
  {path:'admin/restaurant-requests',component:RestaurantRequestsComponent },
  {path: 'admin/restaurant-list',component:RestaurantListComponent},
  {path: 'admin/user-list',component:UserListComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
