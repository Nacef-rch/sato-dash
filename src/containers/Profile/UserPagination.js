import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import { Box, Button, Stack } from '@mui/material';

const UserPagination = ({ title, children, onEdit }) => {
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  const handleEdit = () => {
    onEdit();
  };

  return (
    <Box role="presentation" onClick={handleClick} sx={{ mb: 5 }}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography variant="h4" sx={{ mb: 4 }}>
            {title}
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}
              color="inherit"
              href="/"
            >
              <HomeIcon
                sx={{ mr: 0.5, width: 25, height: 25 }}
                fontSize="inherit"
              />
            </Link>
            <Link
              underline="hover"
              sx={{
                display: 'flex',
                alignItems: 'center',

                fontSize: '20px',
              }}
              color="inherit"
              href="/"
            >
              {children}
            </Link>
          </Breadcrumbs>
        </Box>
        <Button
          variant="outlined"
          startIcon={<AutoFixHighIcon />}
          onClick={handleEdit}
        >
          EDIT
        </Button>
      </Stack>
    </Box>
  );
};

export default UserPagination;
