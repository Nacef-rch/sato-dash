import React from 'react';

import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import OutboxIcon from '@mui/icons-material/Outbox';
import Badge from '@mui/material/Badge';

import { drawerWidth } from '../../constants/layout.constant';
import SearchNav from '../../shared/Search';
import UserAccount from './userAccount';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function NavBar({ open, handleDrawerOpen }) {
  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{
        backgroundColor: 'white',
        boxShadow:
          '0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1) !important',
        color: 'rgba(0, 0, 0, 0.54)',
        zIndex: '999999',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Badge
          badgeContent={10}
          max={99}
          sx={{ marginRight: '15px' }}
          color="primary"
        >
          <MailOutlineIcon />
        </Badge>
        <Badge badgeContent={3} max={99} color="primary">
          <OutboxIcon />
        </Badge>
        <SearchNav variant={'small'} />
        <Box sx={{ marginLeft: 'auto' }}>
          <UserAccount />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
