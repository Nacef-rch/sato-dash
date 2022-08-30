import axios from 'axios';

import { employeeActions } from './employee.reducer';
import { URL, APÏ_TOKEN } from '../../constants/Api.constant';
import { filterTeamLead } from '../../helpers/employee.helper';
import { leavePolicy } from '../Leave/leave.action';
import { profileActions } from '../Profile/profile.reducer';

import { setStatsEmp } from '../Stats/stats.action';

const REACT_APP_API_EMPLOYEE_FETCH =
  '/api/resource/Employee?fields=["user_id","name", "employee_name","first_name","last_name","employment_type","company","date_of_birth","gender","date_of_joining","status","department","grade","branch","shift_request_approver","final_confirmation_date","scheduled_confirmation_date","image"]&order_by=date_of_joining%20desc&limit_page_length=50';
const REACT_APP_API_EMPLOYEE_POST = '/api/resource/Employee';

export const fetchAllEmployees = () => {
  return function (dispatch) {
    return axios
      .get(URL + REACT_APP_API_EMPLOYEE_FETCH, {
        headers: {
          Authorization: APÏ_TOKEN,
        },
      })
      .then(({ data }) => {
        dispatch(employeeActions.setEmployeesArray(data.data));
        dispatch(employeeActions.setTeamLeadsArray(filterTeamLead(data.data)));
        dispatch(setStatsEmp(data.data));
      })
      .catch((error) => {
        dispatch(employeeActions.setError(true));
      });
  };
};

export const fetchAllTeamLeads = () => {
  return function (dispatch) {
    return axios
      .get(
        URL +
          REACT_APP_API_EMPLOYEE_POST +
          '?filters=[["grade", "=", "Team Lead"]]&fields=["*"]',
        {
          headers: {
            Authorization: APÏ_TOKEN,
          },
        }
      )
      .then(({ data }) => {
        dispatch(employeeActions.setTeamLeadsArray(data.data));
      })
      .catch((error) => {
        dispatch(employeeActions.setError(true));
      });
  };
};

export const registerEmployee = (emp) => {
  return function (dispatch) {
    dispatch(employeeActions.setIsLoading(true));
    return axios
      .post(URL + REACT_APP_API_EMPLOYEE_POST, emp, {
        headers: {
          Authorization: APÏ_TOKEN,
        },
      })
      .then(({ data }) => {
        dispatch(leavePolicy(data.data.name));
        dispatch(fetchAllEmployees());
      })
      .catch((error) => {
        dispatch(employeeActions.setError(true));
        dispatch(employeeActions.setIsLoading(false));
      });
  };
};

export const updateEmployee = (emp, id) => {
  return function (dispatch) {
    return axios
      .put(URL + REACT_APP_API_EMPLOYEE_POST + '/' + id, emp, {
        headers: {
          Authorization: APÏ_TOKEN,
        },
      })
      .then(({ data }) => {
        dispatch(fetchAllEmployees());
        dispatch(employeeActions.removeSelectedEmployee());
        dispatch(profileActions.setCollab([data.data]));
      })
      .catch((error) => {});
  };
};

export const deleteEmployee = (id) => {
  return function (dispatch) {
    return axios
      .delete(URL + REACT_APP_API_EMPLOYEE_POST + '/' + id, {
        headers: {
          Authorization: APÏ_TOKEN,
        },
      })
      .then(() => {
        dispatch(fetchAllEmployees());
        dispatch(employeeActions.removeSelectedEmployee());
      })
      .catch((error) => {});
  };
};

export const uploadImage = (file, id) => {
  return function (dispatch) {
    return axios
      .post(URL + '/api/method/upload_file', file, {
        headers: {
          Authorization: APÏ_TOKEN,
        },
      })
      .then(({ data }) => {
        const img = {
          image: data.message.file_url,
        };
        dispatch(updateEmployee(img, id));
      })
      .catch((error) => {});
  };
};
