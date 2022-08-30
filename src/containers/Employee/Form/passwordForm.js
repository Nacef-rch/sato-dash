import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Box,
  FormHelperText,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState, useEffect } from 'react';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { generatePassword } from '../../../helpers/account.helper';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';

const PasswordForm = ({
  firstName,
  lastName,
  email,
  grade,
  checked,
  onSetUser,
}) => {
  const [password, setPassword] = useState('@Sato-');
  const [error, setError] = useState('');

  function handleLoading() {
    if (
      firstName !== undefined &&
      lastName !== undefined &&
      email !== undefined
    ) {
      const User = {
        email,
        first_name: firstName,
        last_name: lastName,
        new_password: password,
      };
      if (grade === 'Team Lead') {
        Object.assign(User, { roles: [{ role: 'Team Lead' }] });
      }
      onSetUser(User);
      setError('');
    } else {
      setError('you should add firstName, lastName , email and grade first');
    }
  }

  const handleClick = () => {
    setPassword(generatePassword(8));
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <Box sx={{ width: '90%', m: 3 }}>
      <FormControl sx={{ width: '80%' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          value={password}
          error={error}
          onChange={passwordChange}
          label="Password"
          autoFocus
          id="password"
          variant="outlined"
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClick} edge="end">
                <VpnKeyIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        {!!error && (
          <FormHelperText error id="accountId-error">
            {error}
          </FormHelperText>
        )}
      </FormControl>
      <LoadingButton
        size="small"
        sx={{
          padding: '16px !important',
          float: 'right !important',
          '& span': {
            margin: '0 !important',
          },
          '& .css-13u9vua-MuiLoadingButton-loadingIndicator': {
            right: '24px',
          },
        }}
        onClick={handleLoading}
        endIcon={
          <AddCircleOutlineIcon
            fontSize="large"
            sx={{ fontSize: '20px !important' }}
          />
        }
        loading={false}
        loadingPosition="end"
        variant="contained"
      ></LoadingButton>
    </Box>
  );
};

export default PasswordForm;
