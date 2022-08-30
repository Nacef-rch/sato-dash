import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import { Paper, Stack, Typography } from '@mui/material';
import List from '@mui/material/List';
import NotificationCard from '../../components/Notification/NotificationCard';


const Notification = () => {
  const notification = useSelector(
    (state) => state.notification.notificationCount
  );
  const notificationArray = useSelector(
    (state) => state.notification.notifications
  );
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 300, height: '100vh' }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        sx={{
          bgcolor: '#F1F5F9',
          height: `calc(100% - 60px)`,
          p: 3,
          pt: 2,
          mt: '60px',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: '500' }}>
          Notifications
        </Typography>
        <List sx={{ pt: 5 }}>
          {notificationArray.map((leaveReq)=>(
            <NotificationCard status={leaveReq.status} sender={leaveReq.employee_name} approver={leaveReq.leave_approver} dateFrom={leaveReq.from_date} dateTo={leaveReq.to_date}/>
          ))}
          
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <IconButton onClick={toggleDrawer('right', true)} size="small">
        <Badge
          badgeContent={notification}
          max={99}
          sx={{ marginTop: '8px' }}
          color="error"
        >
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>
      <Drawer
        sx={{
          zIndex: '99999999999',
        }}
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
      </Drawer>
    </>
  );
};

export default Notification;
