import { Box, Typography, CircularProgress } from '@mui/material';
import React from 'react';
import FbLoader from './FbLoader';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Loader = ({fLoading,lLoading}) => {

  return (
    <>
      <FbLoader />
      <Box
        sx={{
          position: 'relative',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>
          {fLoading ? (
            <CircularProgress
              color="inherit"
              sx={{
                width: '20px !important',
                height: '20px !important',
                mr: 1,
              }}
            />
          ) : (
            <CheckCircleOutlineIcon
              color="success"
              sx={{ mb: '-5px', mr: 1 }}
            />
          )}
          Creating User account....
        </Typography>
        <Typography variant="h6">
          {lLoading ? (
            <CircularProgress
              color="inherit"
              sx={{
                width: '20px !important',
                height: '20px !important',
                mr: 1,
              }}
            />
          ) : (
            <CheckCircleOutlineIcon sx={{ mb: '-5px', mr: 1 }} />
          )}
          Creating Employee account....
        </Typography>
      </Box>
    </>
  );
};

export default Loader;
