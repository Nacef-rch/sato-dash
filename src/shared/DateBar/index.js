import { Stack, TextField } from '@mui/material';
import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const DateBar = ({ getDate }) => {
  const [firstDate, setFirstDate] = React.useState(new Date());
  const [secondDate, setSecondDate] = React.useState(new Date());
  const handleChangeFd = (date) => {
    setFirstDate(date);
    getDate(date, secondDate);
  };
  const handleChangeSd = (date) => {
    setSecondDate(date);
    getDate(firstDate, date);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction="row" spacing={3}>
        <DesktopDatePicker
          label="First Date"
          inputFormat="MM/dd/yyyy"
          value={firstDate}
          onChange={handleChangeFd}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDatePicker
          label="Second Date"
          inputFormat="MM/dd/yyyy"
          value={secondDate}
          onChange={handleChangeSd}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DateBar;
