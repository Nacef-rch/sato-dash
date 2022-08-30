import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import CircleIcon from '@mui/icons-material/Circle';
import { useDispatch, useSelector } from 'react-redux';
import { leaveActions } from '../../+store/Leave/leave.reducer';
import { filterByStatus } from '../../helpers/calendar.helper';

const CalendarDrawer = () => {
  const dispatch = useDispatch();
  const Leaves = useSelector((state) => state.leave.unfilteredLeaves);
  const [state, setState] = React.useState({
    Open: false,
    Approved: false,
    Rejected: false,
  });

  const handleChange = (event) => {
    if (event.target.checked) {
      dispatch(
        leaveActions.filterLeaves(filterByStatus(Leaves, event.target.name))
      );
    } else {
      dispatch(leaveActions.unfilterLeaves());
    }

    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { Open, Approved, Rejected } = state;
  return (
    <Box sx={{ height: '100%', p: 5, paddingTop: '150px' }}>
      <Typography variant="h4">
        <b>Calendar</b>
      </Typography>
      <Typography variant="h6" sx={{ mt: 5 }}>
        <TurnedInNotIcon sx={{ marginBottom: '-7px', marginRight: '5px' }} />
        <b>Labels</b>
      </Typography>
      <FormGroup sx={{ mt: 2 }}>
        <Stack direction="row" spacing={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={Open}
                onChange={handleChange}
                name="Open"
                color="default"
              />
            }
          />
          <CircleIcon
            sx={{
              width: '20px',
              height: '20px',
              mt: '12px !important',
              ml: '-20px !important',
              color: '#F9966C',
            }}
          />
          <Typography variant="subtitle1" sx={{ mt: '10px !important' }}>
            <b>Open</b>
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={Approved}
                onChange={handleChange}
                name="Approved"
                color="default"
              />
            }
          />
          <CircleIcon
            sx={{
              width: '20px',
              height: '20px',
              mt: '12px !important',
              ml: '-20px !important',
              color: '#82C49B',
            }}
          />
          <Typography variant="subtitle1" sx={{ mt: '10px !important' }}>
            <b>Approved</b>
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={Rejected}
                onChange={handleChange}
                name="Rejected"
                color="default"
              />
            }
          />
          <CircleIcon
            sx={{
              width: '20px',
              height: '20px',
              mt: '12px !important',
              ml: '-20px !important',
              color: '#EC645E',
            }}
          />
          <Typography variant="subtitle1" sx={{ mt: '10px !important' }}>
            <b>Rejected</b>
          </Typography>
        </Stack>
      </FormGroup>
    </Box>
  );
};

export default CalendarDrawer;
