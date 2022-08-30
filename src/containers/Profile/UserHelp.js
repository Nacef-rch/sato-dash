import React from 'react';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

const UserHelp = () => {
  return (
    <Paper elevation={2} sx={{ borderRadius: '25px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column ',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <ForumOutlinedIcon sx={{ mt: 8, width: '100px', height: '100px' }} />
        <Typography variant="h5" sx={{ m: 3 }}>
          <b>Need help ?</b>
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: '20px', p: 4 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic veritatis
          fuga et reiciendis mollitia eius fugit tenetur qui recusandae
          voluptate quos eveniet aliquam
        </Typography>
      </Box>
    </Paper>
  );
};

export default UserHelp;
