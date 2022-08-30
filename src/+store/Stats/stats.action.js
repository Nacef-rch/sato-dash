import {
  groupEmpByMonth,
  groupEmpByDepartment,
  groupLeaveByGender,
  groupEmpByContract,
  groupEmpByDep,
  groupEmpByGrade,
} from '../../helpers/statis.helper';
import { statsActions } from './stats.reducer';
export const setStatsEmp = (data) => {
  return function (dispatch) {
    dispatch(statsActions.setEmpByYearArray(groupEmpByMonth(data)));
    dispatch(statsActions.setEmpByDepartment(groupEmpByDepartment(data)));
    dispatch(statsActions.setEmpByGender(groupLeaveByGender(data)));
    dispatch(statsActions.setEmpByContract(groupEmpByContract(data)));
    dispatch(statsActions.setEmpByDep(groupEmpByDep(data)));
    dispatch(statsActions.setEmpByGrade(groupEmpByGrade(data)));
  };
};
