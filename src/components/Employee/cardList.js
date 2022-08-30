import List from '@mui/material/List';

import { Box, Typography } from '@mui/material';
import Card from './card';

import { useDispatch } from 'react-redux';
import { employeeActions } from '../../+store/Employee/employee.reducer';
const CardList = ({ employees, department }) => {
  const dispatch = useDispatch();
  const onClickHandler = (id) => {
    dispatch(employeeActions.setSelectedEmployee(employees[id]));
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', padding: '0' }}>
      <Box
        sx={{
          bgcolor: '#F1F5F9',
          borderTop: '1px solid #d6dadf',
          borderBottom: '1px solid #d6dadf',
        }}
      >
        <Typography sx={{ padding: '5px 20px', color: '#7c8890' }}>
          {department}
        </Typography>
      </Box>
      {employees.map((emp, index) => {
        if (emp.department === department) {
          return (
            <Card
              key={emp.name}
              grade={emp.grade}
              name={emp.employee_name}
              job={emp.branch}
              id={index}
              image={emp.image}
              onClickHandler={onClickHandler}
            />
          );
        }
      })}
    </List>
  );
};

export default CardList;
