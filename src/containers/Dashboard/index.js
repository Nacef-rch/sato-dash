import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PageTitle from '../../layout/Title';
import EmployeeList from '../Employee/List';
import CardStat from './CardStat';
import CardStepper from './CardStepper';
import HailIcon from '@mui/icons-material/Hail';
import GroupsIcon from '@mui/icons-material/Groups';
import { fetchAllEmployees } from '../../+store/Employee/employee.action';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDepartments } from '../../+store/Department/department.action';

import {
  filterEmployesArrayByDate,
  filterLeavesArrayByDate,
} from '../../helpers/stats.helper';
import LeaveCard from '../../components/Dashboard/LeaveCard';
import { fetchAllLeaveApplication } from '../../+store/Leave/leave.action';

const StatDash = () => {
  const [employeesArray, setEmployeesArray] = useState([]);
  const [leavesArray, setLeavesArray] = useState([]);
  const [empList, setEmpList] = useState(true);
  const [filterEmpBy, setFilterEmpBy] = useState('month');
  const [filterLeaveBy, setFilterLeaveBy] = useState('month');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllEmployees());
    dispatch(fetchAllDepartments());
    dispatch(fetchAllLeaveApplication(false));
  }, []);
  const { employees, teamLeads } = useSelector((state) => state.employee);
  const collab = useSelector((state) => state.profile.collab[0]);

  const appointments = useSelector((state) => state.leave.allLeaves);
  useEffect(() => {
    setEmployeesArray(filterEmployesArrayByDate(employees, filterEmpBy));
  }, [employees, setEmployeesArray, filterEmpBy]);
  useEffect(() => {
    setLeavesArray(filterLeavesArrayByDate(appointments, filterLeaveBy));
  }, [appointments, setEmployeesArray, filterLeaveBy]);
  const changeListVue = () => {
    setEmpList((prevState) => !prevState);
  };
  const getPeriodHandlerEmp = (value) => {
    setFilterEmpBy(value);
    // setEmployeesArray(filterEmployesArrayByDate(employees, value));
  };
  const getPeriodHandlerLeave = (value) => {
    setFilterLeaveBy(value);
    // setLeavesArray(filterLeavesArrayByDate(appointments, value));
  };
  return (
    <>
      <PageTitle
        mainText={`Welcome back, ${collab.employee_name} !`}
        secondaryText={`You have ${employees.length} new updates`}
      />
      <Box
        sx={{
          backgroundColor: '#F1F5F9',
        }}
      >
        <Container maxWidth="xl" sx={{ p: 5, pb: 3 }}>
          <Stack direction="row" spacing={2} sx={{ textAlign: 'center' }}>
            <Grid container spacing={4}>
              <Grid item xs={6} md={4}>
                <CardStat
                  num={employees.length}
                  title="All Collaborators"
                  subNum={employeesArray.length}
                  subTitle="New Employee"
                  colorCode="#2196F3"
                  selected={empList}
                  onGetRange={getPeriodHandlerEmp}
                  onViewClick={changeListVue}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <CardStat
                  num={appointments.length}
                  title="All Leaves"
                  subNum={leavesArray.length}
                  subTitle="New Leaves"
                  selected={!empList}
                  colorCode="#F44336"
                  onGetRange={getPeriodHandlerLeave}
                  onViewClick={changeListVue}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <CardStat
                  num="25"
                  title="All Departments"
                  colorCode="#FFC107"
                  cardTitle="Department"
                />
              </Grid>
              {empList ? (
                <>
                  <Grid item xs={12} md={8}>
                    <Paper
                      sx={{
                        borderRadius: '20px',
                        overflow:
                          employeesArray.length > 4 ? 'scroll' : 'hidden',
                        maxHeight: '500px',
                      }}
                    >
                      <Box sx={{ textAlign: 'left', p: 1.5, pl: 3 }}>
                        <Typography variant="subtitle2">
                          Employees joined this {filterEmpBy}
                        </Typography>
                        <Typography variant="body2" sx={{ pt: 1, pb: 1 }}>
                          {employeesArray.length} employees
                        </Typography>
                      </Box>
                      <EmployeeList employees={employeesArray} />
                    </Paper>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Paper
                      sx={{
                        backgroundColor: '#F1416C',
                        borderRadius: '20px',
                      }}
                    >
                      <Box sx={{ p: 3, textAlign: 'left', color: 'white' }}>
                        <GroupsIcon
                          sx={{ height: 40, width: 40, mb: 1.5, opacity: 0.9 }}
                        />
                        <Typography variant="h5" sx={{ fontWeight: 500 }}>
                          Employees
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                          {employees.length}
                        </Typography>
                      </Box>
                    </Paper>

                    <Paper
                      sx={{
                        mt: 4,
                        backgroundColor: '#009EF7',
                        borderRadius: '20px',
                      }}
                    >
                      <Box sx={{ p: 3, textAlign: 'left', color: 'white' }}>
                        <HailIcon
                          sx={{ height: 40, width: 40, mb: 1.5, opacity: 0.9 }}
                        />
                        <Typography variant="h5" sx={{ fontWeight: 500 }}>
                          Team Leads
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                          {teamLeads.length}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                </>
              ) : (
                <Grid item xs={12} md={12}>
                  <Paper
                    sx={{
                      borderRadius: '20px',
                      overflow: leavesArray.length > 4 ? 'scroll' : 'hidden',
                      maxHeight: '500px',
                    }}
                  >
                    <Box sx={{ textAlign: 'left', p: 1.5, pl: 3 }}>
                      <Typography variant="subtitle2">
                        Leaves from this {filterLeaveBy}
                      </Typography>
                      <Typography variant="body2" sx={{ pt: 1, pb: 1 }}>
                        {leavesArray.length} Leaves.
                      </Typography>
                    </Box>
                    {leavesArray.map((item) => {
                      return (
                        <LeaveCard
                          status={item.status}
                          type={item.leave_type}
                          name={item.employee_name}
                          fromDate={item.from_date}
                          toDate={item.to_date}
                        />
                      );
                    })}
                  </Paper>
                </Grid>
              )}
            </Grid>

            <Paper>
              <CardStepper />
            </Paper>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default StatDash;
