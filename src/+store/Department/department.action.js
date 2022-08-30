import axios from 'axios';
import { departmentActions } from './department.reducer';
import { URL, APÏ_TOKEN } from '../../constants/Api.constant';

const REACT_APP_API_DEPARTMENT_FETCH = '/api/resource/Department';
const REACT_APP_API_DEPARTMENT_POST = '/api/resource/Department';

export const fetchAllDepartments = () => {
  return function (dispatch) {
    return axios
      .get(URL + REACT_APP_API_DEPARTMENT_FETCH, {
        headers: {
          Authorization: APÏ_TOKEN,
        },
      })
      .then(({ data }) => {
        dispatch(departmentActions.setDepartmentsArray(data.data));
      })
      .catch((error) => {});
  };
};

export const registerDepartment = (dep) => {
  return function (dispatch) {
    return axios
      .post(URL + REACT_APP_API_DEPARTMENT_POST, dep, {
        headers: {
          Authorization: APÏ_TOKEN,
        },
      })
      .then(() => {
        dispatch(fetchAllDepartments());
      })
      .catch((error) => {});
  };
};

export const fetchAllBranchs = () => {
  return function (dispatch) {
    return axios
      .get(URL + '/api/resource/Branch', {
        headers: {
          Authorization: APÏ_TOKEN,
        },
      })
      .then(({ data }) => {
        dispatch(departmentActions.setBranchArray(data.data));
      })
      .catch((error) => {});
  };
};
