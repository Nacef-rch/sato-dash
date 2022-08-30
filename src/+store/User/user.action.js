import { userActions } from './user.reducer';
import { URL, APÏ_TOKEN } from '../../constants/Api.constant';
import axios from 'axios';
import { registerEmployee } from '../Employee/employee.action';
const REACT_APP_API_USER_FETCH = '/api/resource/User';
const REACT_APP_API_USER_POST = '/api/resource/User';

// export const fetchAllUSERs = () => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       const response = await fetch(URL + REACT_APP_API_USER_FETCH, {
//         method: 'GET',
//         headers: new Headers({
//           Authorization: APÏ_TOKEN,
//         }),
//       });
//       if (!response.ok) {
//         throw new Error('Could not fetch USERs data!');
//       }
//       const data = await response.json();
//       return data;
//     };
//     try {
//       const depData = await fetchData();
//       dispatch(USERActions.setUSERsArray(depData.data));
//     } catch (error) {
//     }
//   };
// };

export const registerUser = (user, emp) => {
  return function (dispatch) {
    dispatch(userActions.setIsLoading(true));
    return axios
      .post(URL + REACT_APP_API_USER_POST, user, {
        headers: {
          Authorization: APÏ_TOKEN,
        },
      })
      .then(({ data }) => {
        dispatch(registerEmployee(emp));
        dispatch(userActions.setUser(data.data));
      })
      .catch((error) => {
        dispatch(userActions.setError(true));
        dispatch(userActions.setIsLoading(false));
      });
  };
};
