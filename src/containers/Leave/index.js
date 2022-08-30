import { Box, Container, Stack } from '@mui/material';
import React from 'react';
import Title from '../../components/Employee/title';
import SearchNav from '../../shared/Search';
import LeaveList from './List';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllLeaveApplication } from '../../+store/Leave/leave.action';
import SharedDrawer from '../../shared/Drawer';
import CalendarDrawer from '../Calendar/CalendarDrawer';
import Calender from '../Calendar/Calendar';
import FilterBar from '../../layout/FilterBar';
import { leaveActions } from '../../+store/Leave/leave.reducer';
import {
  employeesByDepartment,
  employeesByName,
} from '../../helpers/employee.helper';
import DateBar from '../../shared/DateBar';

const drawerWidth = 300;

const LeaveContainer = () => {
  const role = useSelector((state) => state.auth.role);
  const { unfilteredLeaves, allLeaves } = useSelector((state) => state.leave);
  const [view, setView] = React.useState('list');
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const drawerClickHandler = (event) => {
    setOpen(event);
  };

  const handleChange = (event, nextView) => {
    setView(nextView);
  };
  React.useEffect(() => {
    dispatch(fetchAllLeaveApplication(role === 'Team Lead' ? true : false));
  }, [role]);

  const searchHandler = (value) => {
    dispatch(
      leaveActions.filterLeaves(employeesByName(unfilteredLeaves, value))
    );
  };

  const handleChangeDep = (value) => {
    dispatch(
      leaveActions.filterLeaves(employeesByDepartment(unfilteredLeaves, value))
    );
  };
  const getDate = (fDate, sDate) => {};
  return (
    <>
      <Box
        sx={{
          boxShadow:
            '0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1) !important',
          ...(view === 'quilt'
            ? {
                width: `calc(100% - ${drawerWidth}px)`,
              }
            : {
                width: '100%',
              }),
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            padding: '30px',
            ...(view === 'quilt'
              ? {
                  width: `calc(100% - ${drawerWidth}px)`,
                }
              : {
                  width: '100%',
                }),
          }}
        >
          {view === 'list' && (
            <Title
              Header={'Leave Manager'}
              Sub={`${allLeaves.length} - Leaves Requests`}
            />
          )}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{
              ...(view === 'quilt'
                ? {
                    width: `calc(100% - ${drawerWidth}px)`,
                  }
                : {
                    width: '100%',
                  }),
            }}
          >
            <SearchNav onInputHandler={searchHandler} />
            <Box>
              <ToggleButtonGroup value={view} exclusive onChange={handleChange}>
                <ToggleButton value="list" aria-label="list">
                  <ViewListIcon />
                </ToggleButton>
                <ToggleButton value="quilt" aria-label="quilt">
                  <ViewQuiltIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Stack>
        </Container>
      </Box>
      <FilterBar onDepChange={handleChangeDep}>
        <DateBar getDate={getDate} />
      </FilterBar>
      <Box
        sx={{
          backgroundColor: '#F1F5F9',
        }}
      >
        {view === 'list' && (
          <Container maxWidth="xl" sx={{ p: 5, pb: 3 }}>
            <LeaveList />
          </Container>
        )}
        {view === 'quilt' && (
          <Box>
            <SharedDrawer
              drawerWidth={drawerWidth}
              drawerClick={drawerClickHandler}
              openDraw={view === 'quilt' ? true : false}
              drawerPos={'right'}
            >
              <CalendarDrawer />
            </SharedDrawer>
            <Box
              sx={{
                bgcolor: '#F1F5F9',
                ...(view === 'quilt'
                  ? {
                      width: `calc(100% - ${drawerWidth}px)`,
                    }
                  : {
                      width: '100%',
                    }),
              }}
            >
              <Calender />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default LeaveContainer;
