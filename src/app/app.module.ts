import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'ngx-avatar';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RestaurantRequestsComponent } from './components/admin/restaurant-requests/restaurant-requests.component';
import { RestaurantListComponent } from './components/admin/restaurant-list/restaurant-list.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';

import { OrdersComponent } from './components/owner/orders/orders.component';
import { ViewItemsComponent } from './components/owner/view-items/view-items.component';
import { ViewRestaurantComponent } from './components/owner/view-restaurant/view-restaurant.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HotelsComponent,
    HotelCardComponent,
    HotelComponent,
    DropdownComponent,
    CartItemComponent,
    MenuItemComponent,
    SearchBarComponent,
    LoginComponent,
    RegisterComponent,
    RestaurantRequestsComponent,
    RestaurantListComponent,
    UserListComponent,
    ViewRestaurantComponent,
    ViewItemsComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AvatarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatSidenavModule,
    MatBadgeModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
