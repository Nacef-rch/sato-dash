import { authActions } from '../Auth/auth.reducer';
import { profileActions } from './profile.reducer';
import { URL, APÏ_TOKEN } from '../../constants/Api.constant';
import axios from 'axios';
import { generateKey } from '../Auth/auth.action';

// const REACT_APP_API_DEPARTMENT_FETCH = '/api/resource/User';
const REACT_APP_API_PROFILE_FETCH = '/api/resource/Employee?';

export const fetchProfileInfo = (id) => {
  return function (dispatch) {
    dispatch(authActions.setLoadingMessage('Fetching Collaborater Data'));
    return axios
      .get(
        URL +
          REACT_APP_API_PROFILE_FETCH +
          `filters=[["user_id", "=", ${JSON.stringify(id)}]]&fields=["*"]`,
        {
          headers: {
            Authorization: APÏ_TOKEN,
          },
        }
      )
      .then(({ data }) => {
        const { name, grade } = data.data[0];
        dispatch(profileActions.setCollab(data.data));
        dispatch(authActions.setRole(grade));
        dispatch(generateKey(id, name));
      })
      .catch((error) => {
        dispatch(authActions.setError(true));
        dispatch(authActions.setIsLogged(false));

        dispatch(authActions.setIsLoading(false));
      });
  };
};
