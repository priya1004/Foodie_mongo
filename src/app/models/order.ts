import { ICartItem } from "./cart-item";
import { ICustomer } from "./customer";

export interface IOrder {
    cartitems:ICartItem[],
    customer:ICustomer,
    order_id:string
    restaurant_id:string
}