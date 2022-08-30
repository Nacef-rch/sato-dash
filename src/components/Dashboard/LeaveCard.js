import { Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import DateRangeIcon from '@mui/icons-material/DateRange';
const LeaveCard = ({ status, type, name, fromDate, toDate }) => {
  const [colors, setColors] = React.useState({
    BgColor: '#F9966C',
    TColor: '#F8814F',
  });
  React.useEffect(() => {
    if (status === 'Rejected') {
      setColors({
        BgColor: '#EC645E',
        TColor: '#E24C4C',
      });
    } else if (status === 'Approved') {
      setColors({
        BgColor: '#82C49B',
        TColor: '#2E844E',
      });
    }
  }, []);
  return (
    <Paper sx={{ p: 2 }}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" spacing={1}>
          <Box>
            <Box
              sx={{
                bgcolor: colors.BgColor,
                width: '60px',
                height: '60px',
                borderRadius: '50%',
              }}
            >
              <WorkOffIcon
                sx={{
                  color: colors.TColor,
                  width: '30px',
                  height: '30px',
                  mt: '15px',
                }}
              />
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {type}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'left' }}>
              {name}
            </Typography>
          </Box>
        </Stack>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, pt: 3 }}>
          <DateRangeIcon sx={{ mb: '-5px' }} /> {`${fromDate} - ${toDate}`}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default LeaveCard;
