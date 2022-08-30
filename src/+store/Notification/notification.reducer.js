import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  notificationCount: 0,
  isLoading: true,
};

export const notificationSlice = createSlice({
  name: 'NOTIFICATION',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setNotificationsArray(state, action) {
      state.notifications = action.payload;
      state.notificationCount = action.payload.length;
      state.isLoading = false;
    },
    setNotificationCount(state, action) {
      state.notificationCount = action.payload;
      state.isLoading = false;
    },
    RESET(state) {
      Object.assign(state, initialState);
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
