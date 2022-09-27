import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelComponent } from './component/hotel/hotel.component';
import { HotelsComponent } from './component/hotels/hotels.component';

const routes: Routes = [
  { path:'', redirectTo: '/hotels', pathMatch: 'full'},
  { path: 'hotels', component: HotelComponent},
  { path: 'hotels/:id', component: HotelsComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
