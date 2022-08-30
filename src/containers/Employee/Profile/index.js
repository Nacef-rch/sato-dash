import { Button, Box, Typography, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import React from 'react';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import MailIcon from '@mui/icons-material/Mail';
import CakeIcon from '@mui/icons-material/Cake';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';

const TypoStyle = {
  marginBottom: '-5px',
  marginRight: '20px',
  color: '#7c8890',
};
const EmployeeProfile = ({ onUpdateUser, user }) => {
  const Gender = 'Male';
  const onBtnClick = () => {
    onUpdateUser();
  };
  return (
    <>
      <Stack spacing={3} sx={{ m: 5, mt: '-50px' }}>
        <Box>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            disableElevation
            sx={{
              width: '100px',
              float: 'right !important',
              borderRadius: '25px',
              textTransform: 'none',
            }}
            onClick={onBtnClick}
          >
            Edit
          </Button>
        </Box>
        <Typography variant="h4">
          {user.employee_name}
          {user.gender === 'Male' ? (
            <MaleIcon sx={{ color: '#347DC1' }} />
          ) : (
            <FemaleIcon sx={{ color: '#CC6594' }} />
          )}
        </Typography>
        <Box>
          <Typography
            variant="subtitle"
            sx={{
              backgroundColor: '#EBEBEB',
              padding: ' 5px 10px',
              borderRadius: '25px',
              color: '#7c8890',
            }}
          >
            {user.grade}
          </Typography>
        </Box>
        <Divider />
        <Typography variant="h6" sx={{}}>
          <WorkOutlineIcon sx={TypoStyle} />
          {user.branch}
        </Typography>
        <Typography variant="h6">
          <WorkOutlineIcon sx={TypoStyle} />
          {user.department}
        </Typography>
        <Typography variant="h6">
          <MailIcon sx={TypoStyle} />
          {user.user_id}
        </Typography>
        <Typography variant="h6">
          <CakeIcon sx={TypoStyle} />
          {user.date_of_birth}
        </Typography>
        <Typography variant="h6">
          <HistoryEduIcon sx={TypoStyle} />
          {user.employment_type}
        </Typography>
        <Typography variant="h6">
          <InsertInvitationIcon sx={TypoStyle} />
          {user.date_of_joining}
        </Typography>
      </Stack>
    </>
  );
};

export default EmployeeProfile;
