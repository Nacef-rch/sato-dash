import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import ApprovalIcon from '@mui/icons-material/Approval';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useSelector } from 'react-redux';
const TypoStyle = {
  marginBottom: '-5px',
  marginRight: '10px',
};

const ProInfo = () => {
  const collab = useSelector((state) => state.profile.collab[0]);
  return (
    <Box
      sx={{
        border: 2,
        borderColor: 'divider',
        borderRadius: '5px',
        width: '100%',
      }}
    >
      <Typography variant="h6" sx={{ p: 3 }}>
        Professional Information
      </Typography>
      <Divider />

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={12}
        sx={{ p: 3 }}
        justifyContent="space-between"
      >
        <Typography variant="subtitle1" sx={{ color: '#7c8890' }}>
          <ApartmentIcon sx={TypoStyle} color="inherit" />
          {collab.company}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#7c8890' }}>
          <InsertInvitationIcon sx={TypoStyle} color="inherit" />
          {collab.date_of_joining}
        </Typography>
      </Stack>
      <Divider />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={12}
        sx={{ p: 3 }}
        justifyContent="space-between"
      >
        <Typography variant="subtitle1" sx={{ color: '#7c8890' }}>
          <BusinessIcon sx={TypoStyle} color="inherit" />
          {collab.department}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#7c8890' }}>
          <ApprovalIcon sx={TypoStyle} color="inherit" />
          {collab.leave_approver}
        </Typography>
      </Stack>
      <Divider />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={12}
        sx={{ p: 3 }}
        justifyContent="space-between"
      >
        <Typography variant="subtitle1" sx={{ color: '#7c8890' }}>
          <AccountTreeIcon sx={TypoStyle} color="inherit" />
          {collab.grade}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#7c8890' }}>
          <BusinessIcon sx={TypoStyle} color="inherit" />
          {collab.branch}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ProInfo;
