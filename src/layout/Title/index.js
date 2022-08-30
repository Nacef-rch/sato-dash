import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import { Stack } from '@mui/material';

import styles from './title.module.css';

export function PageTitle({
  children,
  btnText,
  openPanel,
  mainText,
  secondaryText,
}) {
  return (
    <Box className={styles['container']}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Box>{children}</Box>

        <Box>
          <Typography variant="h4" fontWeight="700">
            {mainText}
          </Typography>
          {secondaryText && (
            <Typography align="left" variant="subtitle1">
              {secondaryText}
            </Typography>
          )}
        </Box>
        <Box sx={{ marginLeft: 'auto !important' }}>
          <Button variant="contained" disableElevation onClick={openPanel}>
            <SettingsIcon /> {btnText}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default PageTitle;
