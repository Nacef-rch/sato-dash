import { Avatar, AvatarGroup, Box, Divider, Typography } from '@mui/material';
import React from 'react';
import ProgressBar from '../../shared/ProgressBar';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import { deepOrange, deepPurple } from '@mui/material/colors';

const ProjectOn = () => {
  return (
    <Box
      sx={{
        border: 2,
        borderColor: 'divider',
        borderRadius: '5px',
        width: '100%',
        mb: 6,
      }}
    >
      <Typography variant="h6" sx={{ p: 3 }}>
        Working On
      </Typography>
      <Divider />
      <Box sx={{ p: 3, pb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, color: '#7c8890' }}>
          <DesktopMacIcon
            color="inherit"
            sx={{ marginBottom: '-5px', mr: 1 }}
          />
          ERP Application
        </Typography>
        <ProgressBar value="30" />
        <AvatarGroup total={9} sx={{ pt: 1 }}>
          <Avatar>NR</Avatar>
          <Avatar sx={{ bgcolor: deepOrange[400] }}>WR</Avatar>
          <Avatar sx={{ bgcolor: deepPurple[400] }}>SZ</Avatar>
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default ProjectOn;
