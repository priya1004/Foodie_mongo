import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HotelComponent } from './component/hotel/hotel.component';
import { HotelCardComponent } from './component/hotel-card/hotel-card.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { HotelsComponent } from './component/hotels/hotels.component';
import { CartItemComponent } from './component/cart-item/cart-item.component';
import { MenuItemComponent } from './component/menu-item/menu-item.component';
//import { AvatarModule, AvatarSource } from 'ngx-avatar';



@NgModule({
  declarations: [
    AppComponent,
    HotelComponent,
    HotelCardComponent,
    NavBarComponent,
    HotelsComponent,
    CartItemComponent,
    MenuItemComponent
  ],  

  
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatSidenavModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
