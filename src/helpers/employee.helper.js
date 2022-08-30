export const filterTeamLead = (data) => {
  return data.filter((emp) => {
    return emp.grade === 'Team Lead';
  });
};
export const employeesByName = (data, name) => {
  return data.filter(
    (emp) => emp.employee_name.toLowerCase().indexOf(name.toLowerCase()) > -1
  );
};
export const employeesByRole = (data, role) => {
  if (role === '') {
    return data;
  }
  return data.filter((emp) => emp.grade === role);
};
export const employeesByDepartment = (data, dep) => {
  if (dep === '') {
    return data;
  }
  return data.filter((emp) => emp.department === dep);
};
