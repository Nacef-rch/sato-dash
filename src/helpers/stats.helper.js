export const filterEmployesArrayByDate = (data, period) => {
  const today = new Date();
  let fDate;
  let lDate;
  switch (period) {
    case 'week':
      fDate = new Date(today.setDate(today.getDate() - today.getDay()));
      lDate = new Date(today.setDate(today.getDate() - today.getDay() + 6));
      break;
    case 'month':
      fDate = new Date(today.getFullYear(), today.getMonth(), 1);

      lDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      break;
    default:
      fDate = new Date();
  }

  if (period === 'day') {
    return data.filter(
      (emp) => emp.date_of_joining === today.toISOString().split('T')[0]
    );
  }
  return data.filter(
    (emp) =>
      emp.date_of_joining >= fDate.toISOString().split('T')[0] &&
      emp.date_of_joining <= lDate.toISOString().split('T')[0]
  );
};

export const filterLeavesArrayByDate = (data, period) => {
  const today = new Date();
  let fDate;
  let lDate;
  switch (period) {
    case 'week':
      fDate = new Date(today.setDate(today.getDate() - today.getDay()));
      lDate = new Date(today.setDate(today.getDate() - today.getDay() + 6));
      break;
    case 'month':
      fDate = new Date(today.getFullYear(), today.getMonth(), 1);

      lDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      break;
    default:
      fDate = new Date();
  }

  if (period === 'day') {
    return data.filter(
      (emp) => emp.from_date === today.toISOString().split('T')[0]
    );
  }
  return data.filter(
    (emp) =>
      emp.from_date >= fDate.toISOString().split('T')[0] &&
      emp.from_date <= lDate.toISOString().split('T')[0]
  );
};
export const filterEmpOnLeave = (arr) => {
  const today = new Date();

  return arr.filter(
    (emp) =>
      emp.from_date <= today.toISOString().split('T')[0] &&
      emp.to_date >= today.toISOString().split('T')[0]
  );
};
