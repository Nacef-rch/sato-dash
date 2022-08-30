import axios from 'axios';

//Reducers
import { authActions } from './auth.reducer';
import { departmentActions } from '../Department/department.reducer';
import { employeeActions } from '../Employee/employee.reducer';
import { leaveActions } from '../Leave/leave.reducer';
import { profileActions } from '../Profile/profile.reducer';
import { userActions } from '../User/user.reducer';
import { notificationActions } from '../Notification/notification.reducer';

//Actions
import { fetchProfileInfo } from '../Profile/profile.action';
import { fetchOneLeaveSolde } from '../Leave/leave.action';
import { fetchNotificationCount } from '../Notification/notification.action';

import { URL, APÏ_TOKEN } from '../../constants/Api.constant';

// const REACT_APP_API_DEPARTMENT_FETCH = '/api/resource/User';
const REACT_APP_API_USER_FETCH = '/api/resource/User';
const REACT_APP_API_AUTH_POST = '/api/method/login';
const REACT_APP_API_KEY =
  '/api/method/frappe.core.doctype.user.user.generate_keys?user=';

export const authUser = (user) => {
  return function (dispatch) {
    dispatch(authActions.setIsLoading(true));
    return axios
      .post(URL + REACT_APP_API_AUTH_POST, user)
      .then(({ data }) => {
        dispatch(authActions.setUser(data));
        dispatch(authActions.setIsLogged(true));
        dispatch(fetchLoggedUser(user.usr));
      })
      .catch((error) => {
        dispatch(authActions.setError(true));
        dispatch(authActions.setIsLogged(false));
        dispatch(authActions.setIsLoading(false));
      });
  };
};
export const LogoutUser = () => {
  return function (dispatch) {
    dispatch(authActions.RESET());
    dispatch(departmentActions.RESET());
    dispatch(employeeActions.RESET());
    dispatch(leaveActions.RESET());
    dispatch(profileActions.RESET());
    dispatch(userActions.RESET());
    dispatch(notificationActions.RESET());
  };
};

export const fetchLoggedUser = (id) => {
  return function (dispatch) {
    dispatch(authActions.setLoadingMessage('Fetching User Data'));
    return axios
      .get(URL + REACT_APP_API_USER_FETCH + '/' + id, {
        headers: {
          Authorization: APÏ_TOKEN,
        },
      })
      .then(({ data }) => {
        dispatch(authActions.setLoggedUser(data.data));
        dispatch(fetchProfileInfo(id));
      })
      .catch((error) => {
        dispatch(authActions.setError(true));
        dispatch(authActions.setIsLogged(false));
        dispatch(authActions.setIsLoading(false));
      });
  };
};

export const generateKey = (id, name) => {
  return function (dispatch, getState) {
    const stateBefore = getState();
    dispatch(authActions.setLoadingMessage('Generating user key'));
    return axios
      .post(URL + REACT_APP_API_KEY + id, null, {
        headers: {
          Authorization: APÏ_TOKEN,
        },
      })
      .then(({ data }) => {
        dispatch(authActions.setToken(data.message.api_secret));
        dispatch(fetchNotificationCount());
        if (stateBefore.auth.role !== 'HR') {
          dispatch(fetchOneLeaveSolde(name));
        } else {
          dispatch(authActions.setIsInit(true));
        }

        dispatch(authActions.setIsLoading(false));
      })
      .catch((error) => {
        dispatch(authActions.setError(true));
        dispatch(authActions.setIsLogged(false));
        dispatch(authActions.setIsLoading(false));
      });
  };
};
