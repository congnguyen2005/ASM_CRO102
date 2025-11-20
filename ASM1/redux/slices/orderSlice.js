import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
    },
  },
});

export const { addOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;
