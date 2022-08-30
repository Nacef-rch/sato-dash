import { useEffect, useState } from 'react';
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import { useSelector } from 'react-redux';

const gradeArray = ['Team Lead', 'Employee', 'HR'];

const FilterBar = ({ children, onRoleChange, onDepChange }) => {
  const [grade, setGrade] = useState('');
  const [departments, setDepartments] = useState([]);
  const [selectedDep, setSelectedDep] = useState('');
  const unfiltredEmployees = useSelector(
    (state) => state.employee.unfiltredEmployees
  );

  useEffect(() => {
    const depArray = [
      ...new Set(unfiltredEmployees.map((item) => item.department)),
    ];
    setDepartments(depArray);
  }, [unfiltredEmployees]);

  const handleChangeRole = (event) => {
    setGrade(event.target.value);
    onRoleChange(event.target.value);
  };
  const handleChangeDep = (event) => {
    setSelectedDep(event.target.value);
    onDepChange(event.target.value);
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: '15px',
        height: '90px',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <Stack direction="row" spacing={2}>
        {onRoleChange && (
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel id="demo-multiple-name-label">Role</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={grade}
              onChange={handleChangeRole}
              sx={{ borderRadius: '20px' }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {gradeArray.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel id="demo-multiple-name-label">Department</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={selectedDep}
            onChange={handleChangeDep}
            sx={{ borderRadius: '20px' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {departments.map((dep) => (
              <MenuItem key={dep} value={dep}>
                {dep}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {children}
      </Stack>
    </Container>
  );
};

export default FilterBar;
