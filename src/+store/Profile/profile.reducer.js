import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collab: {},
  leaveSolde: {},
  isLoading: false,
  error: false,
};

export const profileSlice = createSlice({
  name: 'PROFILE',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },

    setCollab(state, action) {
      state.collab = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    updateCollab(state, action) {
      state.collab = { ...state.collab[0], ...action.payload };
    },
    setLeaveSolde(state, action) {
      state.leaveSolde = action.payload;
    },
    RESET(state) {
      Object.assign(state, initialState);
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice.reducer;
