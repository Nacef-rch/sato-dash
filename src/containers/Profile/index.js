import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import UserHelp from './UserHelp';
import UserImage from './UserImage';
import UserPagination from './UserPagination';
import UserSolde from './UserSolde';
import PersonIcon from '@mui/icons-material/Person';
import UserInfo from './UserInfo';
import { useDispatch } from 'react-redux';
import {
  fetchAllLeaveApplication,
  fetchAllLeaveTypes,
} from '../../+store/Leave/leave.action';

const ProfileContainer = () => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllLeaveTypes());
    dispatch(fetchAllLeaveApplication(true));
  }, []);
  const handleEdit = () => {
    setEditMode((prevstate) => !prevstate);
  };
  return (
    <Box sx={{ p: 10, backgroundColor: '#F1F5F9' }}>
      <UserPagination title={'Account'} onEdit={handleEdit}>
        <PersonIcon
          sx={{ mr: 0.5, width: 25, height: 25 }}
          fontSize="inherit"
        />
        Profile
      </UserPagination>

      <Grid container spacing={10}>
        <Grid item xs={3} md={3}>
          <UserImage />
          <UserHelp />
        </Grid>
        <Grid item xs={9} md={9}>
          <UserSolde />
          <UserInfo editMode={editMode} />
          {/* <Calender /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileContainer;
