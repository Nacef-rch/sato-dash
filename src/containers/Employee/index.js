import { useEffect, useState } from 'react';

import { Container, Box, Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import Title from '../../components/Employee/title';
import SearchNav from '../../shared/Search';
import EmployeeList from './List';
import SharedDrawer from '../../shared/Drawer';
import EmployeePanel from './Form';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllDepartments,
  fetchAllBranchs,
} from '../../+store/Department/department.action';
import { employeeActions } from '../../+store/Employee/employee.reducer';

import { fetchAllEmployees } from '../../+store/Employee/employee.action';
import { fetchAllLeaveApplication } from '../../+store/Leave/leave.action';
import {
  employeesByDepartment,
  employeesByName,
  employeesByRole,
} from '../../helpers/employee.helper';
import FilterBar from '../../layout/FilterBar';

const drawerWidth = 500;

const employeesMocks = {
  data: [
    { employee_name: 'Nacef Racheh', branch: 'Full Stack Developer' },
    { employee_name: 'Wahid Racheh', branch: 'Front End Developer' },
    { employee_name: 'Sheima Zouai', branch: 'Back End Developer' },
    { employee_name: 'Ela Zouai', branch: 'Devops Developer' },
  ],
};

const HResource = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    dispatch(fetchAllEmployees());
    dispatch(fetchAllDepartments());
    dispatch(fetchAllBranchs());
  }, []);
  useEffect(() => {
    dispatch(fetchAllLeaveApplication(role === 'Team Lead' ? true : false));
  }, [role]);
  const selectedEmployee = useSelector(
    (state) => state.employee.selectedEmployee
  );
  const { employees, isLoading, unfiltredEmployees } = useSelector(
    (state) => state.employee
  );

  useEffect(() => {
    if (Object.keys(selectedEmployee).length !== 0) {
      setOpen(true);
    }
  }, [selectedEmployee]);

  const openDrawer = () => {
    dispatch(employeeActions.removeSelectedEmployee());
    setOpen(true);
  };

  const drawerClickHandler = (event) => {
    dispatch(employeeActions.removeSelectedEmployee());
    setOpen(event);
  };
  const searchHandler = (value) => {
    dispatch(
      employeeActions.filterEmployees(
        employeesByName(unfiltredEmployees, value)
      )
    );
  };

  const handleChangeRole = (value) => {
    dispatch(
      employeeActions.filterEmployees(
        employeesByRole(unfiltredEmployees, value)
      )
    );
  };
  const handleChangeDep = (value) => {
    dispatch(
      employeeActions.filterEmployees(
        employeesByDepartment(unfiltredEmployees, value)
      )
    );
  };
  return (
    <>
      <SharedDrawer
        drawerWidth={drawerWidth}
        drawerClick={drawerClickHandler}
        openDraw={open}
        drawerPos={'right'}
      >
        <EmployeePanel />
      </SharedDrawer>
      <Box
        sx={{
          boxShadow:
            '0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1) !important',
          ...(open
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
          }}
        >
          <Title
            Header={'Employees Manager'}
            Sub={`${employees.length} - employees`}
          />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <SearchNav onInputHandler={searchHandler} />

            <Button
              disableElevation
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ borderRadius: '25px' }}
              onClick={openDrawer}
            >
              Add
            </Button>
          </Stack>
        </Container>
      </Box>
      <FilterBar
        onRoleChange={handleChangeRole}
        onDepChange={handleChangeDep}
      />
      <Box
        sx={{
          backgroundColor: '#F1F5F9',
          ...(open
            ? {
                width: `calc(100% - ${drawerWidth}px)`,
              }
            : {
                width: '100%',
              }),
        }}
      >
        <Container maxWidth="xl">
          {!isLoading && <EmployeeList employees={employees} />}
        </Container>
      </Box>
    </>
  );
};

export default HResource;
