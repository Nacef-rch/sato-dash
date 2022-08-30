export const formatLeaveArray = (arr) => {
  return arr.map((data) => {
    let color;

    switch (data.status) {
      case 'Rejected':
        color = '#EC645E';
        break;
      case 'Approved':
        color = '#82C49B';
        break;
      default:
        color = '#F9966C';
    }

    return {
      title: data.leave_type + ' | ' + data.employee_name,
      startDate: data.from_date,
      endDate: data.to_date,
      leave_approver: data.leave_approver,
      owner: data.employee_name,
      department: data.department,
      color,
    };
  });
};
export const filterLeavesByStatus = (arr, fStatus, sStatus) => {
  return arr.filter((item) => {
    if (sStatus === undefined) {
      return item.status === fStatus;
    } else {
      return item.status === fStatus || item.status === sStatus;
    }
  });
};
