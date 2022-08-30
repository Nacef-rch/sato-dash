import { Box, Avatar, Typography, CircularProgress } from '@mui/material';

import { stringAvatar } from '../../../helpers/avatar.helper';
import Loader from '../../../shared/Loading';

import { useSelector } from 'react-redux';
import EmployeeProfile from '../Profile';
import { useState, useEffect } from 'react';
import EmployeeForm from './form';
import { URL } from '../../../constants/Api.constant';

const EmployeePanel = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [updateEmp, setUpdateEmp] = useState(false);

  const isLoadingEmp = useSelector((state) => state.employee.isLoading);
  const isLoadingUser = useSelector((state) => state.user.isLoading);
  const selectedEmployee = useSelector(
    (state) => state.employee.selectedEmployee
  );

  useEffect(() => {
    if (Object.keys(selectedEmployee).length !== 0) {
      setShowProfile(true);
    } else {
      setShowProfile(false);
    }
  }, [setShowProfile, selectedEmployee]);

  const onUpdateUser = () => {
    setUpdateEmp(true);
  };

  if (isLoadingUser || isLoadingEmp) {
    return (
      <Box
        sx={{
          bgcolor: '#F1F5F9',
          height: '100vh',
          width: '100%',
          position: 'absolute',
        }}
      >
        <Loader fLoading={isLoadingUser} lLoading={isLoadingEmp} />
      </Box>
    );
  } else {
    return (
      <Box sx={{ bgcolor: '#F1F5F9', height: '100%', paddingTop: '200px' }}>
        {selectedEmployee.image ? (
          <Avatar
            src={URL + selectedEmployee.image}
            sx={{
              width: '100px',
              height: '100px',
              fontSize: '40px',
              marginLeft: '50px',
              marginBottom: '-50px',
            }}
          />
        ) : (
          <Avatar
            {...stringAvatar(
              selectedEmployee.employee_name
                ? selectedEmployee.employee_name
                : 'New User'
            )}
            sx={{
              width: '100px',
              height: '100px',
              fontSize: '40px',
              marginLeft: '50px',
              marginBottom: '-50px',
            }}
          />
        )}

        <Box
          component="div"
          sx={{
            '& .MuiTextField-root': { m: 3, width: '90%' },
            bgcolor: 'background.paper',
            padding: '100px 0',
          }}
          noValidate
          autoComplete="off"
        >
          {showProfile && !updateEmp ? (
            <EmployeeProfile
              onUpdateUser={onUpdateUser}
              user={selectedEmployee}
            />
          ) : (
            <EmployeeForm />
          )}
        </Box>
      </Box>
    );
  }
};

export default EmployeePanel;
