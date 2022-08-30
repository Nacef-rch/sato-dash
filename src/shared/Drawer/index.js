import { useState, useEffect, Fragment } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SharedDrawer({
  drawerWidth,
  drawerClick,
  children,
  openDraw,
  drawerPos,
}) {
  const [state, setState] = useState({
    left: false,
  });

  useEffect(() => {
    if (openDraw) {
      setState({ ...state, [drawerPos]: true });
    }
  }, [openDraw]);

  const toggleDrawer = (anchor, open) => (event) => {
    drawerClick(open);
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box sx={{ width: drawerWidth }} role="presentation">
      <IconButton
        aria-label="delete"
        onClick={toggleDrawer(drawerPos, false)}
        sx={{ position: 'absolute', top: '100px', right: '50px' }}
      >
        <CloseIcon />
      </IconButton>
      {children}
    </Box>
  );

  return (
    <div>
      <Fragment key={drawerPos}>
        <Drawer anchor={drawerPos} open={state[drawerPos]} variant="persistent">
          {list(drawerPos)}
        </Drawer>
      </Fragment>
    </div>
  );
}
