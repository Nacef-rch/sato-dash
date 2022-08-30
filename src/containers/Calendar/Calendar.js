import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  ConfirmationDialog,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from '@devexpress/dx-react-scheduler';

import MoreIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from 'react-redux';
import { leaveApplication } from '../../+store/Leave/leave.action';
import { formatLeaveArray } from '../../helpers/leave.helper';
import Appointment from '../../components/Calendar/Appointment';
import { BasicLayout, TextEditor } from '../../components/Calendar/Form';
import { Stack, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BusinessIcon from '@mui/icons-material/Business';

const Content = ({ children, appointmentData, ...restProps }) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <Stack direction="row" spacing={2} sx={{ m: 1, ml: 3 }}>
        <PersonOutlineIcon />
        <Typography variant="body1" sx={{ fontWeight: '500' }}>
          {appointmentData.owner}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ m: 1, ml: 3 }}>
        <BusinessIcon />
        <Typography variant="body1" sx={{ fontWeight: '500' }}>
          {appointmentData.department}
        </Typography>
      </Stack>
    </Grid>
  </AppointmentTooltip.Content>
);

const Calender = () => {
  const appointments = useSelector((state) => state.leave.allLeaves);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const [currentViewName, setCurrentViewName] = React.useState('Month');

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      dispatch(
        leaveApplication({
          leave_type: added.title,
          from_date: new Date(added.startDate).toISOString().split('T')[0],
          to_date: new Date(added.endDate).toISOString().split('T')[0],
          leave_approver: added.leave_approver,
        })
      );
    }
    if (changed) {
      dispatch(
        leaveApplication({
          leave_type: added.title,
          from_date: added.startDate,
          to_date: added.endDate,
          leave_approver: added.leave_approver,
        })
      );
    }
    if (deleted !== undefined) {
      alert('deleted');
    }
  };
  const currentViewNameChange = (currentView) => {
    setCurrentViewName(currentView);
  };
  return (
    <Paper sx={{ bgcolor: '#F1F5F9', height: 'calc(100vh - 64px)!important' }}>
      <Scheduler data={formatLeaveArray(appointments)}>
        <ViewState
          defaultCurrentDate={new Date().toISOString().split('T')[0]}
          currentViewName={currentViewName}
          onCurrentViewNameChange={currentViewNameChange}
        />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <WeekView startDayHour={9} endDayHour={16} />
        <MonthView />
        <DayView />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <Appointments appointmentComponent={Appointment} />
        <AppointmentTooltip
          contentComponent={Content}
          showCloseButton
          showOpenButton={role !== 'Employee'}
          showDeleteButton={role !== 'Employee'}
        />

        <ConfirmationDialog />
        <AppointmentForm
          basicLayoutComponent={BasicLayout}
          textEditorComponent={TextEditor}
        />
      </Scheduler>
    </Paper>
  );
};
export default Calender;
