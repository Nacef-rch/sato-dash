import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import { exportDataToExcel } from '../../services/export.service';

const workSheetColumnName = ['First_Name', 'Email', 'Gender'];
const UserList = [
  {
    fname: 'Nacef',
    lname: 'Racheh',
    email: 'dummy@gmail.com',
    gender: 'Male',
  },
  {
    fname: 'shaima',
    lname: 'zouai',
    email: 'shazoua@gmail.com',
    gender: 'female',
  },
];
const workSheetName = 'users';
const filePath = './users.xlsx';
const PageTitle = () => {
  const exportData = () => {
    const data = UserList.map((user) => {
      return [user.fname, user.email, user.gebder];
    });

    // exportDataToExcel(data, workSheetColumnName, workSheetName, filePath);
  };
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      justifyItems="center"
      sx={{ mb: 5 }}
    >
      <Box>
        <Typography variant="h5">
          <strong>Analytics dashboard</strong>
        </Typography>
        <Typography variant="body2">
          Monitor metrics, check reports and review company
        </Typography>
      </Box>
      <Stack direction="row" alignItems="center" spacing={4}>
        <Typography variant="body1" sx={{ fontWeight: '500' }}>
          <SettingsIcon sx={{ mb: '-5px', mr: '5px' }} />
          Setting
        </Typography>
        <Button
          variant="contained"
          disableElevation
          sx={{ textTransform: 'capitalize', borderRadius: '25px' }}
          startIcon={<SystemUpdateAltIcon />}
        >
          Export
        </Button>
      </Stack>
    </Stack>
  );
};

export default PageTitle;
