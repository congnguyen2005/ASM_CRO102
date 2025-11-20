import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null, // Lưu thông tin người dùng
  isAuthenticated: false, // Trạng thái đăng nhập
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem('user'); // Xóa khỏi AsyncStorage
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
