import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  empByYear: [],
  empByDepartment: [],
  empByGender: [],
  empByContract: [],
  empByDep: [],
  empByGrade: [],
  isLoading: false,
  error: false,
};

export const statsSlice = createSlice({
  name: 'STATS',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setEmpByYearArray(state, action) {
      state.empByYear = action.payload;
    },
    setEmpByContract(state, action) {
      state.empByContract = action.payload;
    },
    setEmpByDep(state, action) {
      state.empByDep = action.payload;
    },
    setEmpByGrade(state, action) {
      state.empByGrade = action.payload;
    },
    setEmpByDepartment(state, action) {
      state.empByDepartment = action.payload;
    },
    setEmpByGender(state, action) {
      state.empByGender = action.payload;
    },
    RESET(state) {
      Object.assign(state, initialState);
    },
  },
});

export const statsActions = statsSlice.actions;

export default statsSlice.reducer;
