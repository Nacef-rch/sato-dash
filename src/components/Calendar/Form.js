import * as React from 'react';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { useSelector } from 'react-redux';
import {
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === 'multilineTextEditor') {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const fixedOptions = useSelector(
    (state) => state.profile.leaveSolde.leave_approver
  );
  const teamLeads = useSelector((state) => state.employee.teamLeads);
  const [value, setValue] = React.useState([fixedOptions]);
  const [leaveType, setLeaveType] = React.useState('Casual Leave');
  React.useEffect(() => {
    onFieldChange({ leave_approver: fixedOptions });
  }, [value]);
  React.useEffect(() => {
    onFieldChange({ title: leaveType });
  }, [leaveType]);

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <FormControl sx={{ pt: 2, pb: 3 }} fullWidth>
        <InputLabel id="demo-simple-select-label" sx={{ pt: 3 }}>
          Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={leaveType}
          label="Type"
          onChange={(event) => {
            setLeaveType(event.target.value);
          }}
        >
          <MenuItem value={'Casual Leave'}>Casual Leave</MenuItem>
          <MenuItem value={'Sick Leave'}>Sick Leave</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete
        multiple
        id="fixed-tags-demo"
        value={value}
        onChange={(event, newValue) => {
          setValue([
            fixedOptions,
            ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
          ]);
        }}
        options={teamLeads.map((option) => option.user_id)}
        getOptionLabel={(option) => option}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option}
              {...getTagProps({ index })}
              disabled={fixedOptions.indexOf(option) !== -1}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Fixed tag"
            placeholder="leave approver"
          />
        )}
      />
    </AppointmentForm.BasicLayout>
  );
};

export { BasicLayout, TextEditor };
