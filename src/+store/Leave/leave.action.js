import { leaveActions } from './leave.reducer';
import { profileActions } from '../Profile/profile.reducer';
import { URL, APÏ_TOKEN } from '../../constants/Api.constant';
import axios from 'axios';
import { authActions } from '../Auth/auth.reducer';
import { filterLeavesByStatus } from '../../helpers/leave.helper';
import { notificationActions } from '../Notification/notification.reducer';

const REACT_APP_API_LEAVE_FETCH_TYPES = '/api/resource/Leave Type';
const REACT_APP_API_LEAVE_POLICY_POST = '/api/resource/Leave Policy Assignment';
const REACT_APP_API_LEAVE_APPLICATION = '/api/resource/Leave Application';
const REACT_APP_API_LEAVE_SOLDE =
  '/api/method/erpnext.hr.doctype.leave_application.leave_application.get_leave_details';

export const leavePolicy = (id) => {
  const EMPLOYEE = {
    employee: id,
    leave_policy: 'HR-LPOL-2022-00002',
    effective_from: new Date().toISOString().split('T')[0],
    effective_to: new Date(new Date().getFullYear(), 11, 31)
      .toISOString()
      .split('T')[0],
    docstatus: 1,
  };
  return function (dispatch) {
    dispatch(leaveActions.setIsLoading(true));

    return axios
      .post(URL + REACT_APP_API_LEAVE_POLICY_POST, EMPLOYEE, {
        headers: {
          Authorization: APÏ_TOKEN,
        },
      })
      .then(({ data }) => {
        dispatch(leaveActions.setIsLoading(false));
      })
      .catch((error) => {
        dispatch(leaveActions.setError(true));
        dispatch(leaveActions.setIsLoading(false));
      });
  };
};

export const fetchAllLeaveTypes = () => {
  return function (dispatch) {
    dispatch(leaveActions.setIsLoading(true));
    return axios
      .get(URL + REACT_APP_API_LEAVE_FETCH_TYPES, {
        headers: {
          Authorization: APÏ_TOKEN,
        },
      })
      .then(({ data }) => {
        dispatch(leaveActions.setLeaveTypes(data.data));
        dispatch(leaveActions.setIsLoading(false));
      })
      .catch((error) => {
        dispatch(leaveActions.setIsLoading(false));
        dispatch(leaveActions.setError(true));
      });
  };
};

export const fetchLeaveTypes = (id) => {
  return function (dispatch, getState) {
    dispatch(leaveActions.setIsLoading(true));
    return axios
      .get(URL + REACT_APP_API_LEAVE_FETCH_TYPES, {
        headers: {
          Authorization: APÏ_TOKEN,
        },
      })
      .then(({ data }) => {
        dispatch(leaveActions.setLeaveTypes(data.data));
        dispatch(leaveActions.setIsLoading(false));
      })
      .catch((error) => {
        dispatch(leaveActions.setIsLoading(false));
        dispatch(leaveActions.setError(true));
      });
  };
};

//////////////////////////////////////
//USE USER TOOKEN !!!!!
/////////////////////////////////////
export const fetchOneLeaveSolde = (id) => {
  const soldePost = {
    date: new Date().toISOString().split('T')[0],
    employee: id,
  };

  return function (dispatch, getState) {
    dispatch(
      authActions.setLoadingMessage('Fetching Collaborater leave balance Data')
    );
    const stateBefore = getState();

    return axios
      .post(URL + REACT_APP_API_LEAVE_SOLDE, soldePost, {
        headers: {
          Authorization: stateBefore.auth.token,
        },
      })
      .then(({ data }) => {
        dispatch(profileActions.setLeaveSolde(data.message));
        dispatch(authActions.setIsInit(true));
      })
      .catch((error) => {
        dispatch(leaveActions.setError(true));
      });
  };
};

export const leaveApplication = (app) => {
  return function (dispatch, getState) {
    const stateBefore = getState();
    dispatch(leaveActions.setIsLoading(true));
    return axios
      .post(URL + REACT_APP_API_LEAVE_APPLICATION, app, {
        headers: {
          Authorization: stateBefore.auth.token,
        },
      })
      .then(({ data }) => {
        dispatch(leaveActions.setIsLoading(false));
        dispatch(fetchAllLeaveApplication(true));
      })
      .catch((error) => {
        dispatch(leaveActions.setError(true));
        dispatch(leaveActions.setIsLoading(false));
      });
  };
};
export const fetchAllLeaveApplication = (EMP) => {
  return function (dispatch, getState) {
    const stateBefore = getState();
    dispatch(leaveActions.setIsLoading(true));
    return axios
      .get(URL + REACT_APP_API_LEAVE_APPLICATION + '?fields=["*"]', {
        headers: {
          Authorization: EMP ? stateBefore.auth.token : APÏ_TOKEN,
        },
      })
      .then(({ data }) => {
        dispatch(leaveActions.setLeavesArray(data.data));
        dispatch(leaveActions.setIsLoading(false));
        stateBefore.auth.role === 'Employee'
          ? dispatch(
              notificationActions.setNotificationsArray(
                filterLeavesByStatus(data.data, 'Approved', 'Rejected')
              )
            )
          : dispatch(
              notificationActions.setNotificationsArray(
                filterLeavesByStatus(data.data, 'Open')
              )
            );
      })
      .catch((error) => {
        dispatch(leaveActions.setError(true));
        dispatch(leaveActions.setIsLoading(false));
      });
  };
};

export const UpdateLeaveStatus = (leaveId, status) => {
  return function (dispatch, getState) {
    const stateBefore = getState();

    const leave = stateBefore.leave.allLeaves.filter(
      (item) => item.name === leaveId
    );

    const statusReq = {
      status,
      docstatus: 1,
      _unsaved: 1,
      leave_approver: leave[0].leave_approver,
    };

    dispatch(leaveActions.setIsLoading(true));
    return axios
      .put(URL + REACT_APP_API_LEAVE_APPLICATION + '/' + leaveId, statusReq, {
        headers: {
          Authorization: APÏ_TOKEN,
        },
      })
      .then(({ data }) => {
        dispatch(leaveActions.setIsLoading(false));
        dispatch(leaveActions.updateOneLeave(data.data));
      })
      .catch((error) => {
        dispatch(leaveActions.setError(true));
        dispatch(leaveActions.setIsLoading(false));
      });
  };
};
