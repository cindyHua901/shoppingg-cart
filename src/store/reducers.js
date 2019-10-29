import { combineReducers } from 'redux';

import orderForm from './OrderFormState'
import products from './ProductsState'
import shopCar from './ShopCarState'
import Message from './MessageState'
//  合并reducers
export default combineReducers({
    orderForm,
    products,
    shopCar,
    Message
});