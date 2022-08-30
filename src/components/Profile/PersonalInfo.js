import {
  Divider,
  Stack,
  Typography,
  Box,
  InputAdornment,
  TextField,
  Autocomplete,
  Button,
} from '@mui/material';
import React from 'react';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import WcIcon from '@mui/icons-material/Wc';
import CakeIcon from '@mui/icons-material/Cake';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployee } from '../../+store/Employee/employee.action';
const TypoStyle = {
  marginBottom: '-5px',
  marginRight: '10px',
};

const genderArray = ['Male', 'Female'];

const PersonalInfo = ({ editMode }) => {
  const dispatch = useDispatch();
  const collab = useSelector((state) => state.profile.collab[0]);
  const [value, setValue] = React.useState(collab.gender);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      updateEmployee(
        {
          first_name: data.get('first_name'),
          last_name: data.get('last_name'),
          gender: data.get('gender'),
          date_of_birth: data.get('date_of_birth'),
        },
        collab.name
      )
    );
  };
  return (
    <Box
      sx={{
        border: 2,
        borderColor: 'divider',
        borderRadius: '5px',
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h6" sx={{ p: 3 }}>
        Personal Information
      </Typography>
      <Divider />
      <Box sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ color: '#7c8890' }}>
          <AccountCircle sx={TypoStyle} color="inherit" />
          Full Name
        </Typography>
        {!editMode ? (
          <Typography variant="body1" sx={{ ml: 4 }}>
            {collab.employee_name}
          </Typography>
        ) : (
          <>
            <TextField
              required
              label="First Name"
              autoFocus
              id="first_name"
              name="first_name"
              variant="outlined"
              defaultValue={collab.first_name}
              sx={{ m: 2, ml: 0 }}
            />
            <TextField
              required
              label="Last Name"
              autoFocus
              id="last_name"
              name="last_name"
              variant="outlined"
              defaultValue={collab.last_name}
              sx={{ m: 2, ml: 0 }}
            />
          </>
        )}
      </Box>
      <Divider />

      <Divider />
      <Box sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ color: '#7c8890' }}>
          <MailIcon sx={TypoStyle} color="inherit" />
          Email id
        </Typography>

        <Typography variant="body1" sx={{ ml: 4 }}>
          {collab.user_id}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ color: '#7c8890' }}>
          <WcIcon sx={TypoStyle} color="inherit" />
          Gender
        </Typography>
        {!editMode ? (
          <Typography variant="body1" sx={{ ml: 4 }}>
            {collab.gender}
          </Typography>
        ) : (
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            id="controllable-states-demo"
            options={genderArray}
            renderInput={(params) => (
              <TextField {...params} id="gender" name="gender" />
            )}
          />
        )}
      </Box>
      <Divider />
      <Box sx={{ p: 3, pb: 1 }}>
        <Typography variant="subtitle1" sx={{ color: '#7c8890' }}>
          <CakeIcon sx={TypoStyle} color="inherit" />
          Date of Birth
        </Typography>
        {!editMode ? (
          <Typography variant="body1" sx={{ ml: 4 }}>
            {collab.date_of_birth}
          </Typography>
        ) : (
          <TextField
            required
            autoFocus
            id="date_of_birth"
            name="date_of_birth"
            variant="outlined"
            defaultValue={collab.date_of_birth}
            sx={{ m: 2 }}
          />
        )}
      </Box>

      {editMode && (
        <>
          <Divider />
          <Button
            variant="outlined"
            sx={{ m: 2, float: 'right' }}
            type="submit"
          >
            Save
          </Button>
        </>
      )}
    </Box>
  );
};

export default PersonalInfo;
