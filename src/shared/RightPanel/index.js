import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/material';
import { borderRadius } from '@mui/system';

export const FormPanel = ({ children }) => {
  const matches = useMediaQuery('(min-width:600px)');
  return (
    <Box
      sx={{
        borderLeft: '1px solid #e2e8f0',
        borderTop: '1px solid #e2e8f0',
        margin: '0 !important',
        backgroundColor: '#fff',
        height: '100%',
        padding: '50px 30px',
      }}
    >
      {children}
    </Box>
  );
};

export default FormPanel;
