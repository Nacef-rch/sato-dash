import { Box } from '@mui/material';
import * as React from 'react';
import SharedDrawer from '../../shared/Drawer';
import Calender from './Calendar';
import CalendarDrawer from './CalendarDrawer';

const drawerWidth = 300;

const CalenderContainer = () => {
  const [open, setOpen] = React.useState(true);
  const drawerClickHandler = (event) => {
    setOpen(event);
  };
  return (
    <Box>
      <SharedDrawer
        drawerWidth={drawerWidth}
        drawerClick={drawerClickHandler}
        openDraw={open}
        drawerPos={'right'}
      >
        <CalendarDrawer />
      </SharedDrawer>
      <Box
        sx={{
          bgcolor: '#F1F5F9',
          ...(open
            ? {
                width: `calc(100% - ${drawerWidth}px)`,
              }
            : {
                width: '100%',
              }),
        }}
      >
        <Calender />
      </Box>
    </Box>
  );
};
export default CalenderContainer;
