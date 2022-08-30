import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedEmployee: {},
  unfiltredEmployees: [],
  employees: [],
  teamLeads: [],
  isLoading: false,
  error: false,
};

export const employeeSlice = createSlice({
  name: 'EMPLOYEE',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setRequest(state, action) {
      state.request = action.payload;
    },
    setTeamLeadsArray(state, action) {
      state.teamLeads = action.payload;
    },
    setEmployeesArray(state, action) {
      state.employees = action.payload;
      state.unfiltredEmployees = action.payload;
      state.isLoading = false;
    },
    setSelectedEmployee(state, action) {
      state.selectedEmployee = action.payload;
    },
    removeSelectedEmployee(state) {
      state.selectedEmployee = {};
    },
    filterEmployees(state, action) {
      state.employees = action.payload;
    },
    unfilterEmployees(state) {
      state.employees = state.unfiltredEmployees;
    },
    RESET(state) {
      Object.assign(state, initialState);
    },
  },
});

export const employeeActions = employeeSlice.actions;

export default employeeSlice.reducer;
