import { notificationActions } from './notification.reducer';
import { URL, APÏ_TOKEN } from '../../constants/Api.constant';
import axios from 'axios';

const REACT_APP_API_NOTIFCATION_COUNT =
  '/api/method/frappe.desk.reportview.get_count';

export const fetchNotificationCount = () => {
  return function (dispatch, getState) {
    const stateBefore = getState();
    const status = stateBefore.auth.role !== 'Employee' ? 'Open' : 'Approved';

    return axios
      .post(
        URL + REACT_APP_API_NOTIFCATION_COUNT,
        {
          doctype: 'Leave Application',
          filters: { status },
          fields: [],
          distinct: false,
        },
        {
          headers: {
            Authorization:
              stateBefore.auth.role !== 'HR'
                ? stateBefore.auth.token
                : APÏ_TOKEN,
          },
        }
      )
      .then(({ data }) => {
       
        dispatch(notificationActions.setNotificationCount(data.message));
      })
      .catch((error) => {
 
      });
  };
};
