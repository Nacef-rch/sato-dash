import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  leave: [],
  unfilteredLeaves: [],
  allLeaves: [],
  leaveType: [],
  isLoading: false,
  error: false,
};

export const leaveSlice = createSlice({
  name: 'LEAVE',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLeavesArray(state, action) {
      state.allLeaves = action.payload;
      state.unfilteredLeaves = action.payload;
      state.isLoading = false;
    },
    addToLeavesArray(state, action) {
      state.allLeaves = state.allLeaves.concat(action.payload);
    },
    setLeave(state, action) {
      state.leave = action.payload;
      state.isLoading = false;
    },
    setLeaveTypes(state, action) {
      state.leaveType = action.payload;
      state.isLoading = false;
    },
    updateOneLeave(state, action) {
      const newArr = state.allLeaves.map((object) => {
        if (object.name === action.payload.name) {
          return action.payload;
        }
        return object;
      });
      state.allLeaves = newArr;
    },
    filterLeaves(state, action) {
      state.allLeaves = action.payload;
    },
    unfilterLeaves(state) {
      state.allLeaves = state.unfilteredLeaves;
    },
    RESET(state) {
      Object.assign(state, initialState);
    },
  },
});

export const leaveActions = leaveSlice.actions;

export default leaveSlice.reducer;
