import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import userSlice from './slices/userSlice';
import productSlice from './slices/productSlice';
import orderSlice from './slices/orderSlice';

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod') : 'Stripe';

const initialState = {
  cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage, paymentMethod: paymentMethodFromStorage },
  user: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
    products: productSlice,
    orders: orderSlice,
  },
  preloadedState: initialState,
});

export default store;
