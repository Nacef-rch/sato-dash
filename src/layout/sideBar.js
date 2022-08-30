import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DeckIcon from '@mui/icons-material/Deck';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AnalyticsIcon from '@mui/icons-material/Analytics';
const LinkStyle = {
  textDecoration: 'none',
  color: 'black',
};

function SideBar({ open }) {
  const [openList, setOpenList] = React.useState(false);
  const role = useSelector((state) => state.auth.role);
  // React.useEffect(() => {
  //   if (!open) {
  //     setOpenList(false);
  //   }
  // }, [open]);

  const handleClick = () => {
    setOpenList(!openList);
  };
  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      {role === 'HR' && (
        <>
          <Link to="/stats" style={LinkStyle}>
            <ListItemButton>
              <ListItemIcon>
                <AnalyticsIcon />
              </ListItemIcon>
              <ListItemText primary="Statistics" />
            </ListItemButton>
          </Link>
          <Divider />

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <BusinessCenterOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="RH" />
            {openList ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openList && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/employee" style={LinkStyle}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PersonAddAltOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Employee" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
          <Divider />
        </>
      )}
      {role !== 'HR' && role !== 'sysAdmin' && (
        <>
          <Link to="/profile" style={LinkStyle}>
            <ListItemButton>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </Link>
          <Divider />
          <Link to="/calendar" style={LinkStyle}>
            <ListItemButton>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary="Leave Calendar" />
            </ListItemButton>
          </Link>
          <Divider />
        </>
      )}
      {role !== 'Employee' && role !== 'sysAdmin' && (
        <>
          <Link to="/leave" style={LinkStyle}>
            <ListItemButton>
              <ListItemIcon>
                <DeckIcon />
              </ListItemIcon>
              <ListItemText primary="Leave" />
            </ListItemButton>
          </Link>
          <Divider />
        </>
      )}
      {(role === 'sysAdmin' || role === 'HR') && (
        <>
          <Link to="/board" style={LinkStyle}>
            <ListItemButton>
              <ListItemIcon>
                <MeetingRoomIcon />
              </ListItemIcon>
              <ListItemText primary="OnBoarding" />
            </ListItemButton>
          </Link>
          <Divider />
        </>
      )}
    </List>
  );
}

export default SideBar;
