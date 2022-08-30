import * as React from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { ConfirmProvider } from 'material-ui-confirm';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

import NavBar from './Nav';
import SideBar from './sideBar';
import { DrawerHeader, Drawer } from './drawer';

import logo from '../assets/satoLogo.png';
import { Outlet } from 'react-router-dom';
import AuthGuard from '../guard/auth.guard';

// const themee = createTheme({
//   palette: {
//     primary: {
//       main: '#fce525',
//     },
//   },
// });

export function Layout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    // <ThemeProvider theme={themee}>
    <AuthGuard>
      <ConfirmProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <NavBar open={open} handleDrawerOpen={handleDrawerOpen} />
          <Drawer variant="permanent" open={open} sx={{ zIndex: '9999' }}>
            <DrawerHeader>
              <img src={logo} alt="" width="200" height="auto" />
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <SideBar open={open} />
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1 }}>
            <DrawerHeader />
            <Outlet />
          </Box>
        </Box>
      </ConfirmProvider>
    </AuthGuard>

    // </ThemeProvider>
  );
}
export default Layout;
