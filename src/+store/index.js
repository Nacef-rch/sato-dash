import { configureStore } from '@reduxjs/toolkit';

import employeeSlice from './Employee/employee.reducer';
import departmentSlice from './Department/department.reducer';
import userSlice from './User/user.reducer';
import authSlice from './Auth/auth.reducer';
import leaveSlice from './Leave/leave.reducer';
import profileSlice from './Profile/profile.reducer';
import notificationSlice from './Notification/notification.reducer';
import statsSlice from './Stats/stats.reducer';
const store = configureStore({
  reducer: {
    department: departmentSlice,
    employee: employeeSlice,
    user: userSlice,
    auth: authSlice,
    leave: leaveSlice,
    profile: profileSlice,
    notification: notificationSlice,
    stats: statsSlice,
  },
});

export default store;
