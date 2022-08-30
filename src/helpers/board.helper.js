export const formatBoardArray = (arr) => {
  return arr.map((data) => {
    const dayNb = getNumberOfDays(new Date(), data.date_of_joining);
    let board_status = 'open';
    let board_alert = false;
    if (data.final_confirmation_date) {
      board_status = 'close';
    }
    if (data.scheduled_confirmation_date && !data.final_confirmation_date) {
      board_status = 'delay';
    }
    // if (!data.final_confirmation_date) {

    if (dayNb >= 0 && dayNb <= 4) {
      board_alert = true;
    }
    // }
    return {
      ...data,
      board_status,
      board_alert,
    };
  });
};
export const filterBoardByDate = (arr) => {
  const today = new Date();
  return arr.filter(
    (data) => data.date_of_joining >= today.toISOString().split('T')[0]
  );
};
export const filterBoardByStatus = (arr, status) => {
  if (status === '') {
    return arr;
  }
  return arr.filter((data) => data.board_status === status);
};
function getNumberOfDays(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
}
