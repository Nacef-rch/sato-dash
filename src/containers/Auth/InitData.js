import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SatoLoader from '../../shared/Loading/SatoLoader';
const InitData = () => {
  const navigate = useNavigate();
  const isInit = useSelector((state) => state.auth.isInit);
  const role = useSelector((state) => state.auth.role);
  const loadingMsg = useSelector((state) => state.auth.loadingMessage);
  React.useEffect(() => {
    if (isInit) {
      if (role === 'HR') {
        navigate('/');
      } else if (role === 'sysAdmin') {
        navigate('/board');
      } else {
        navigate('/profile');
      }
    }
  }, [isInit]);
  return (
    <>
      <SatoLoader />
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <h1>{loadingMsg}</h1>
      </Box>
    </>
  );
};

export default InitData;
