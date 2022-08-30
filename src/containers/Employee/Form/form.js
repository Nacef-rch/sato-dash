import { useEffect, useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Divider,
  Autocomplete,
  Checkbox,
  Box,
  IconButton,
  OutlinedInput,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import CakeIcon from '@mui/icons-material/Cake';
import MailIcon from '@mui/icons-material/Mail';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ApprovalIcon from '@mui/icons-material/Approval';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DeleteIcon from '@mui/icons-material/Delete';

import FormDialog from '../../../shared/Dialog';
import PasswordForm from './passwordForm';
import DepForm from './depform';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateEmployee,
  deleteEmployee,
} from '../../../+store/Employee/employee.action';
import { registerUser } from '../../../+store/User/user.action';

const dateRegexExp =
  /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/gi;

const schema = yup.object().shape({
  first_name: yup.string().required('You must enter First Name'),
  last_name: yup.string().required('You must enter Last Name'),
  user_id: yup.string().email().required('You must enter an Email'),
  gender: yup.string().required('You must select a gender'),
  date_of_birth: yup.string().required('You must enter a date'),
  company: yup.string().required('You must choose a company'),
  employment_type: yup.string().required('You must select employment type'),
  date_of_joining: yup.string().required('You must enter a date'),
  department: yup.string().required('You must choose a department'),
  branch: yup.string().required('You must enter job title'),
  leave_approver: yup.string(),
  grade: yup.string().required('You must select a Grade'),
});

const EmpTypes = [
  'Apprentice',
  'Commission',
  'Contract',
  'Full-time',
  'Intern',
  'Part-time',
  'Piecework',
  'Probation',
];
const companies = ['Satoripop', 'QuickText'];
const gradeArray = ['Team Lead', 'Employee', 'HR'];
const initialData = {
  first_name: '',
  last_name: '',
  gender: '',
  user_id: '',
  date_of_birth: '',
  branch: '',
  grade: '',
  leave_approver: '',
  company: 'Satoripop',
  employment_type: 'Contract',
  department: '',
  date_of_joining: new Date().toISOString().split('T')[0],
};

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState('');
  const [updateEmp, setUpdateEmp] = useState(false);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [employeeData, setemployeeData] = useState(initialData);
  const selectedEmployee = useSelector(
    (state) => state.employee.selectedEmployee
  );
  const depData = useSelector((state) => state.department.departments);
  const teamLeadsArray = useSelector((state) => state.employee.teamLeads);
  const jobData = useSelector((state) => state.department.branch);
  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onChange',
    defaultValues: employeeData,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (Object.keys(selectedEmployee).length !== 0) {
      setUpdateEmp(true);
      reset(selectedEmployee);
    } else {
      setUpdateEmp(false);
      reset(initialData);
    }
  }, [selectedEmployee, setUpdateEmp, initialData]);

  const onSetUser = (data) => {
    setUser(data);
  };
  const onCancelHandler = () => {
    reset(initialData);
    setChecked(false);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleDialogClick = () => {
    setOpen(!open);
  };

  const onRemoveHandler = () => {
    dispatch(deleteEmployee(selectedEmployee.name));
  };

  const onSubmit = (data) => {
    if (isValid) {
      if (!updateEmp) {
        dispatch(registerUser(user, data));
        // dispatch(registerEmployee(data));
      } else {
        dispatch(updateEmployee(data, selectedEmployee.name));
      }
    }
  };

  return (
    <>
      <FormDialog
        title={'Department'}
        openDiag={open}
        handleDialogClick={handleDialogClick}
      >
        <DepForm handleDialogClick={handleDialogClick} />
      </FormDialog>
      <form onSubmit={handleSubmit(onSubmit)}>
        {updateEmp && (
          <Tooltip title="Delete">
            <IconButton onClick={onRemoveHandler}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        <Typography
          variant="subtitle2"
          sx={{ marginLeft: '24px', color: '#7c8890' }}
        >
          Personal Info
        </Typography>
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.first_name}
              helperText={errors?.first_name?.message}
              label="First Name *"
              autoFocus
              sx={{
                width: '42% !important',
                marginRight: '0px !important',
                marginBottom: '0px !important',
              }}
              id="first_name"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          name="last_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.last_name}
              helperText={errors?.last_name?.message}
              label="Last Name *"
              autoFocus
              sx={{ width: '42% !important', marginBottom: '0px !important' }}
              id="last_name"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          name="user_id"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.user_id}
              helperText={errors?.user_id?.message}
              label="Email *"
              autoFocus
              sx={{ marginBottom: '0px !important' }}
              id="user_id"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl sx={{ width: '90%', margin: '24px' }}>
              <InputLabel id="demo-simple-select-label">Gender *</InputLabel>
              <Select
                value={value}
                fullWidth
                label="Gender *"
                onChange={(event) => {
                  onChange(event.target.value);
                }}
                error={!!errors.gender}
              >
                <MenuItem value={'Female'}>Female</MenuItem>
                <MenuItem value={'Male'}>Male</MenuItem>
              </Select>
              <FormHelperText error>{errors?.gender?.message}</FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="date_of_birth"
          control={control}
          defaultValue=""
          rules={{
            pattern: {
              value: dateRegexExp,
              message: 'Date format is invalid',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.date_of_birth}
              helperText="YYYY/MM/DD"
              label="Birthday *"
              autoFocus
              sx={{
                marginTop: '0px !important',
                marginBottom: '0px !important',
              }}
              id="date_of_birth"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CakeIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Divider sx={{ margin: '24px' }} />
        <Typography
          variant="subtitle2"
          sx={{ marginLeft: '24px', color: '#7c8890' }}
        >
          Job Info
        </Typography>
        <Controller
          name="company"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              freeSolo
              id="company"
              disableClearable
              options={companies.map((option) => option)}
              onChange={(event, newValue) => {
                onChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  value={value}
                  id="company"
                  error={!!errors.company}
                  helperText={errors?.company?.message}
                  {...params}
                  label="Company *"
                  sx={{
                    marginBottom: '0px !important',
                  }}
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    startAdornment: (
                      <InputAdornment position="start">
                        <ApartmentIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          )}
        />
        <Controller
          name="employment_type"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl
              sx={{
                width: '42% !important',
                margin: '24px',
                marginRight: '0px !important',
                marginBottom: '0px !important',
              }}
            >
              <InputLabel id="demo-simple-select-label">
                Employment Type *
              </InputLabel>
              <Select
                value={value}
                fullWidth
                label="Employment Type *"
                onChange={(event) => {
                  onChange(event.target.value);
                }}
                error={!!errors.employment_type}
              >
                {EmpTypes.map((emp) => (
                  <MenuItem value={emp}>{emp}</MenuItem>
                ))}
              </Select>
              <FormHelperText error>
                {errors?.employment_type?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="date_of_joining"
          control={control}
          defaultValue=""
          rules={{
            pattern: {
              value: dateRegexExp,
              message: 'Date format is invalid',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.date_of_joining}
              helperText="YYYY/MM/DD"
              label="Join Date *"
              autoFocus
              sx={{ width: '42% !important', marginBottom: '0px !important' }}
              id="date_of_joining"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InsertInvitationIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          name="grade"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              freeSolo
              id="grade"
              disableClearable
              options={gradeArray.map((option) => option)}
              onChange={(event, newValue) => {
                onChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  value={value}
                  id="grade"
                  error={!!errors.grade}
                  helperText={errors?.grade?.message}
                  sx={{
                    marginBottom: '0px !important',
                  }}
                  {...params}
                  label="Grade *"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountTreeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          )}
        />
        <Controller
          name="department"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              freeSolo
              id="department"
              disableClearable
              options={depData.map((option) => option.name)}
              onChange={(event, newValue) => {
                onChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  value={value}
                  id="department"
                  error={!!errors.department}
                  helperText={errors?.department?.message}
                  sx={{
                    marginBottom: '0px !important',
                  }}
                  {...params}
                  label="Department *"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          )}
        />
        <Button
          size="small"
          startIcon={<AddCircleIcon />}
          sx={{
            color: '#111827',
            marginLeft: '24px',
            marginTop: '10px',
            textTransform: 'none',
          }}
          onClick={handleDialogClick}
        >
          Add a department
        </Button>
        <Controller
          name="branch"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              freeSolo
              id="branch"
              value={value}
              disableClearable
              options={jobData.map((option) => option.name)}
              onChange={(event, newValue) => {
                onChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  value={value}
                  id="branch"
                  error={!!errors.branch}
                  helperText={errors?.branch?.message}
                  sx={{
                    marginBottom: '0px !important',
                  }}
                  {...params}
                  label="Job *"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          )}
        />
        <Button
          size="small"
          startIcon={<AddCircleIcon />}
          sx={{
            color: '#111827',
            marginLeft: '24px',
            textTransform: 'none',
          }}
        >
          Add a job title
        </Button>
        <Controller
          name="leave_approver"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              freeSolo
              id="leave_approver"
              disableClearable
              value={value}
              options={teamLeadsArray.map((option) => option.user_id)}
              onChange={(event, newValue) => {
                onChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  value={value}
                  id="leave_approver"
                  error={!!errors.leave_approver}
                  helperText={errors?.leave_approver?.message}
                  sx={{
                    marginBottom: '24px',
                  }}
                  {...params}
                  label="Rapport To *"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    startAdornment: (
                      <InputAdornment position="start">
                        <ApprovalIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          )}
        />
        {!updateEmp && (
          <Typography variant="subtitle2" sx={{ color: '#111827' }}>
            <Checkbox
              sx={{
                marginLeft: '24px',
                paddingLeft: '0px !important',
                color: '#111827',
                '&.Mui-checked': {
                  color: '#111827',
                },
              }}
              size="small"
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            you want to create Account ?
          </Typography>
        )}

        {checked && (
          <PasswordForm
            firstName={getValues('first_name')}
            lastName={getValues('last_name')}
            email={getValues('user_id')}
            grade={getValues('grade')}
            checked={checked}
            onSetUser={onSetUser}
          />
        )}

        <Box sx={{ float: 'right', margin: '24px' }}>
          <Button onClick={onCancelHandler} variant="outlined">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ marginLeft: '15px' }}
            disabled={!isDirty || !isValid}
          >
            Add
          </Button>
        </Box>
      </form>
    </>
  );
};

export default EmployeeForm;
