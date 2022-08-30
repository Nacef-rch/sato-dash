import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  departments: [],
  branch: [],
  isLoading: true,
};

export const departmentSlice = createSlice({
  name: 'DEPARTMENT',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setDepartmentsArray(state, action) {
      state.departments = action.payload;
      state.isLoading = false;
    },
    setBranchArray(state, action) {
      state.branch = action.payload;
      state.isLoading = false;
    },
    RESET(state) {
      Object.assign(state, initialState);
    },
  },
});

export const departmentActions = departmentSlice.actions;

export default departmentSlice.reducer;
