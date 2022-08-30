import { Box, Typography } from '@mui/material';
import React from 'react';

const Title = ({ Header, Sub }) => {
  return (
    <Box
      sx={{
        marginBottom: '20px',
      }}
    >
      <Typography variant="h4" fontWeight="900">
        {Header}
      </Typography>
      {Sub && (
        <Typography
          align="left"
          variant="subtitle1"
          sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
        >
          {Sub}
        </Typography>
      )}
    </Box>
  );
};

export default Title;
