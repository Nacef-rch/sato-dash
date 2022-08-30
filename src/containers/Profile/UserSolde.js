import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import DateRangeIcon from '@mui/icons-material/DateRange';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { useDispatch, useSelector } from 'react-redux';
import { leaveActions } from '../../+store/Leave/leave.reducer';
import { useNavigate } from 'react-router-dom';
import { fetchAllTeamLeads } from '../../+store/Employee/employee.action';
import { leaveApplication } from '../../+store/Leave/leave.action';

function isAfter(date1, date2) {
  return date1 > date2;
}

const UserSolde = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const leaveBalance = useSelector(
    (state) => state.profile.leaveSolde.leave_allocation['Casual Leave']
  );
  const leave_approver = useSelector(
    (state) => state.profile.leaveSolde.leave_approver
  );
  const [sendReq, setSendReq] = useState(false);
  const [type, setType] = React.useState('Casual Leave');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchAllTeamLeads());
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fDate = new Date(data.get('fDate'));
    const lDate = new Date(data.get('lDate'));
    if (isAfter(lDate, fDate)) {
      const newSch = {
        from_date: data.get('fDate'),
        to_date: data.get('lDate'),
        leave_type: type,
        leave_approver,
      };
      dispatch(leaveApplication(newSch));
      navigate('/calendar');
    }
  };
  const handleClick = () => {
    setSendReq(!sendReq);
  };
  return (
    <Paper elevation={2} sx={{ borderRadius: '10px', mb: 10 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={7}
        sx={{ p: 5 }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: '40px', mb: 2 }}>
            <WorkOffIcon sx={{ width: '50px', height: '50px', mb: '-10px' }} />{' '}
            {leaveBalance.remaining_leaves} Days
          </Typography>
          <Typography variant="subtitle1">Leave balances available</Typography>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: '40px', mb: 2 }}>
            <DateRangeIcon
              sx={{ width: '50px', height: '50px', mb: '-10px' }}
            />{' '}
            {leaveBalance.leaves_taken} Days
          </Typography>
          <Typography variant="subtitle1">Leaves taken</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: '40px', mb: 2 }}>
            <HourglassBottomOutlinedIcon
              sx={{ width: '50px', height: '50px', mb: '-10px' }}
            />{' '}
            30H
          </Typography>
          <Typography variant="subtitle1">hours taken</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Button variant="outlined" sx={{ m: 2 }} onClick={handleClick}>
            Request
          </Button>
          <Typography variant="subtitle1">Ask for a leave</Typography>
        </Box>
      </Stack>
      {sendReq && (
        <>
          <Divider />
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ pl: 5, pt: 2, pb: 1 }}
          >
            <TextField
              margin="normal"
              required
              id="fDate"
              label="date start"
              name="fDate"
              autoComplete="fDate"
              helperText="YYYY/MM/DD"
              autoFocus
              sx={{ mr: 5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InsertInvitationIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              id="lDate"
              label="finish start"
              name="lDate"
              autoComplete="lDate"
              helperText="YYYY/MM/DD"
              autoFocus
              sx={{ mr: 5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InsertInvitationIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl sx={{ pt: 2, pb: 1, mr: 5 }}>
              <InputLabel id="demo-simple-select-label" sx={{ pt: 3 }}>
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={handleChange}
              >
                <MenuItem value={'Casual Leave'}>Casual Leave</MenuItem>
                <MenuItem value={'Sick Leave'}>Sick Leave</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Send
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default UserSolde;
