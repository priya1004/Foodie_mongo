import { ICartItem } from "./cart-item";
import { ICustomer } from "./customer";

export interface IOrder {
    cart:ICartItem[],
    customer:ICustomer,
    orderid:string
    restaurantid:string
    restaurantname:string
    status:string
}