import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import ordersReducer from './slices/orderSlice';
import customersReducer from './slices/customerSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    orders: ordersReducer,
    customers: customersReducer,
  },
});

export default store;
