import { IMenu } from "./menu";

export interface IRestaurantRequest{
    restaurantid:string,
    name:string,
    address:string,
    cuisines:string,
    restaurant_owner_email:string
    rating:string,
    reviews:string,
    feature_image:string,
    thumbnail_image:string,
    isVerified:boolean,
    menu:IMenu[]
}