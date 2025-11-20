import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customers: [],
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
    removeCustomer: (state, action) => {
      state.customers = state.customers.filter(customer => customer.id !== action.payload);
    },
  },
});

export const { setCustomers, addCustomer, removeCustomer } = customerSlice.actions;
export default customerSlice.reducer;
