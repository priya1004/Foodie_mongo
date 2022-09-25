import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RestaurantRequestsComponent } from './components/admin/restaurant-requests/restaurant-requests.component';
import { RestaurantListComponent } from './components/admin/restaurant-list/restaurant-list.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { ViewRestaurantComponent } from './components/owner/view-restaurant/view-restaurant.component';
import { ViewItemsComponent } from './components/owner/view-items/view-items.component';
import { OrdersComponent } from './components/owner/orders/orders.component';

const routes: Routes = [
  { path:'', redirectTo: '/hotels', pathMatch: "full"},
  { path:'register', component: RegisterComponent },
  { path:'login', component: LoginComponent },
  { path: 'hotels', component: HotelsComponent },
  { path: 'hotels/:id', component: HotelComponent },
  {path:'admin/restaurant-requests',component:RestaurantRequestsComponent },
  {path: 'admin/restaurant-list',component:RestaurantListComponent},
  {path: 'admin/user-list',component:UserListComponent},
  {path:'owner/view-restaurant',component:ViewRestaurantComponent},
  {path:'owner/view-items',component:ViewItemsComponent},
  {path:'owner/orders',component:OrdersComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
