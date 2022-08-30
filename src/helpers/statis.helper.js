var _ = require('lodash');

//Group Employee By Month
export const groupEmpByMonth = (data) => {
  return _.groupBy(data, function (item) {
    return item.date_of_joining.substring(0, 7);
  });
};
export const groupEmpByDepartment = (data) => {
  return _.groupBy(data, function (item) {
    return item.department;
  });
};
export const groupLeaveByDate = (data) => {
  return _.groupBy(data, function (item) {
    return new Date(item.from_date).getMonth();
  });
};

export const groupLeaveByGender = (data) => {
  const finalArray = [];
  const groupedArray = _.groupBy(data, function (item) {
    return item.gender;
  });
  Object.keys(groupedArray).map((key) => {
    return finalArray.push(groupedArray[key].length);
  });
  return finalArray;
};
export const groupEmpByContract = (data) => {
  const cntKey = [];
  const cntData = [];
  const groupArray = _.groupBy(data, function (item) {
    return item.employment_type;
  });
  Object.keys(groupArray).map((key) => {
    cntKey.push(key);
    cntData.push(groupArray[key].length);
  });
  return {
    key: cntKey,
    data: cntData,
  };
};
export const groupEmpByDep = (data) => {
  const cntKey = [];
  const cntData = [];
  const groupArray = _.groupBy(data, function (item) {
    return item.department;
  });
  Object.keys(groupArray).map((key) => {
    cntKey.push(key);
    cntData.push(groupArray[key].length);
  });
  return {
    key: cntKey,
    data: cntData,
  };
};
export const groupEmpByGrade = (data) => {
  const finalArray = [];
  const groupedArray = _.groupBy(data, function (item) {
    return item.grade;
  });
  Object.keys(groupedArray).map((key) => {
    return finalArray.push(groupedArray[key].length);
  });
  return finalArray;
};
