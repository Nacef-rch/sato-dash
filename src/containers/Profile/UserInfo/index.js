import * as React from 'react';
import { Paper, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonalInfo from '../../../components/Profile/PersonalInfo';
import ProjectOn from '../../../components/Profile/ProjectOn';
import ProInfo from '../../../components/Profile/ProInfo';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const UserInfo = ({ editMode }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={2} sx={{ borderRadius: '10px' }}>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            pt: 1,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="About"
              {...a11yProps(0)}
              sx={{ textTransform: 'capitalize' }}
            />
            <Tab
              label="Applications"
              {...a11yProps(1)}
              sx={{ textTransform: 'capitalize' }}
            />
            <Tab
              label="Teams"
              {...a11yProps(2)}
              sx={{ textTransform: 'capitalize' }}
            />
            <Tab
              label="Connections"
              {...a11yProps(3)}
              sx={{ textTransform: 'capitalize' }}
            />
          </Tabs>
        </Box>
        <Box sx={{ p: 3 }}>
          <TabPanel value={value} index={0}>
            <Stack direction="row" spacing={6}>
              <PersonalInfo editMode={editMode} />
              <Box sx={{ width: '100%' }}>
                <ProjectOn />
                <ProInfo />
              </Box>
            </Stack>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={4}>
            Item Two
          </TabPanel>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserInfo;
