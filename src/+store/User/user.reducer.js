import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: [],
  allUsers: [],
  isLoading: false,
  error: false,
};

export const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setUsersArray(state, action) {
      state.allUsers = action.payload;
      state.isLoading = false;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isLoading = false;
    },
    RESET(state) {
      Object.assign(state, initialState);
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
