import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
} from '@mui/material';
import React from 'react';
import BoardCard from '../../components/onBoard/card';
import PageTitle from '../../layout/Title';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAllEmployees } from '../../+store/Employee/employee.action';
import {
  filterBoardByDate,
  filterBoardByStatus,
  formatBoardArray,
} from '../../helpers/board.helper';

const OnBoardContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [unfBoardArray, setUnfBoardArray] = useState([]);
  const [boardArray, setBoardArray] = useState([]);
  const [checked, setChecked] = React.useState(true);
  const [status, setStatus] = React.useState('');

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);
  const collab = useSelector((state) => state.profile.collab[0]);

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, []);

  useEffect(() => {
    if (employees.length === 0) {
      return;
    }
    setBoardArray(filterBoardByDate(formatBoardArray(employees)));
    setUnfBoardArray(filterBoardByDate(formatBoardArray(employees)));
    setIsLoading(false);
  }, [employees]);

  const handleChecked = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      setBoardArray(filterBoardByDate(formatBoardArray(employees)));
      setUnfBoardArray(filterBoardByDate(formatBoardArray(employees)));
      setStatus('');
    } else {
      setBoardArray(formatBoardArray(employees));
      setUnfBoardArray(formatBoardArray(employees));
      setStatus('');
    }
  };

  const handleStatChange = (event) => {
    setStatus(event.target.value);
    setBoardArray(filterBoardByStatus(unfBoardArray, event.target.value));
  };

  return (
    <>
      <PageTitle
        mainText={`Welcome back, ${collab.employee_name}`}
        secondaryText={`You have ${employees.length} new task`}
      />
      <Box
        sx={{
          backgroundColor: '#F1F5F9',
        }}
      >
        <Container maxWidth="xl" sx={{ p: 5, pb: 3 }}>
          <Stack
            direction="row"
            sx={{ pb: 4 }}
            justifyContent="space-between"
            alignItems="center"
          >
            <FormControl sx={{ width: 100 }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleStatChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'open'}>Open</MenuItem>
                <MenuItem value={'delay'}>Delay</MenuItem>
                <MenuItem value={'close'}>Close</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChecked} />}
              label="Hide Outdated"
            />
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1 }}
            justifyContent="flex-start"
            alignItems="center"
            sx={{ flexWrap: 'wrap' }}
          >
            {!isLoading &&
              boardArray.map((item) => (
                <BoardCard
                  key={item.name}
                  id={item.name}
                  department={item.department}
                  name={item.employee_name}
                  join_date={item.date_of_joining}
                  bStatus={item.board_status}
                  alertBoard={item.board_alert}
                />
              ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default OnBoardContainer;
