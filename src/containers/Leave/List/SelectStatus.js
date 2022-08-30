import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SaveIcon from '@mui/icons-material/Save';
import { useConfirm } from 'material-ui-confirm';
import { IconButton, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { UpdateLeaveStatus } from '../../../+store/Leave/leave.action';
const SelectStatus = ({ value, id }) => {
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const [status, setStatus] = React.useState(value);

  const handleSatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleClick = () => {
    confirm({ description: 'This action is permanent!' })
      .then(() => {
        dispatch(UpdateLeaveStatus(id, status));
      })
      .catch(() => {
        setStatus(value);
      });
  };
  return (
    <Stack direction="row" spacing={2}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={value}
          value={status}
          label="Status"
          onChange={handleSatusChange}
        >
          <MenuItem value={'Open'}>Open</MenuItem>
          <MenuItem value={'Approved'}>Approved</MenuItem>
          <MenuItem value={'Rejected'}>Rejected</MenuItem>
          <MenuItem value={'Cancelled'}>Cancelled</MenuItem>
        </Select>
      </FormControl>
      <IconButton aria-label="Save Action" onClick={handleClick}>
        <SaveIcon />
      </IconButton>
    </Stack>
  );
};

export default SelectStatus;
