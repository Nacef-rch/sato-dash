import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TransitEnterexitIcon from '@mui/icons-material/TransitEnterexit';
import { updateEmployee } from '../../+store/Employee/employee.action';
import { useDispatch, useSelector } from 'react-redux';

const Alert_Danger_Style = { borderColor: '#EC645E', color: '#EC645E' };
const Alert_Safe_Style = { borderColor: '#82C49B', color: '#82C49B' };
const BoardCard = ({
  department,
  name,
  join_date,
  bStatus,
  id,
  alertBoard,
}) => {
  const dispatch = useDispatch();
  const [status, setStatus] = React.useState(bStatus);
  const role = useSelector((state) => state.auth.role);
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const onBtnClick = () => {
    if (bStatus === 'close') {
      return;
    }
    if (status === 'close') {
      dispatch(
        updateEmployee(
          {
            final_confirmation_date: new Date().toISOString().split('T')[0],
          },
          id
        )
      );
    }
  };

  return (
    <Paper
      sx={{ MinWidth: 300, margin: '10px !important', borderRadius: '25px' }}
    >
      <Box sx={{ p: 3 }}>
        <Stack
          direction="row"
          spacing={6}
          sx={{ pb: 3 }}
          justifyContent="space-between"
        >
          {alertBoard ? (
            <Chip
              label={bStatus === 'close' ? 'Done' : 'High Priority'}
              style={
                bStatus === 'close' ? Alert_Safe_Style : Alert_Danger_Style
              }
              variant="outlined"
            />
          ) : (
            <Chip
              label={bStatus === 'close' ? 'Done' : 'Low Priority'}
              style={Alert_Safe_Style}
              variant="outlined"
            />
          )}

          {bStatus === 'close' && <VerifiedIcon color="success" />}
        </Stack>
        <Typography variant="h5">OnBoarding in Department :</Typography>
        <Typography variant="subtitle1" sx={{ pt: 1 }}>
          <strong>{department}</strong>
        </Typography>
        <Stack
          direction="row"
          spacing={6}
          sx={{ pb: 1, mt: 5 }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <PersonOutlineIcon sx={{ mb: '-5px' }} />
              {name}
            </Typography>
            <Typography variant="body1">
              <TransitEnterexitIcon sx={{ mb: '-5px' }} />
              {join_date}
            </Typography>
          </Box>
          <FormControl sx={{ width: 100 }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={handleChange}
              disabled={bStatus === 'close' || role === 'HR'}
            >
              <MenuItem value={'open'}>Open</MenuItem>
              <MenuItem value={'delay'}>Delay</MenuItem>
              <MenuItem value={'close'}>Close</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#F1F5F9',
          p: 3,
          borderRadius: ' 0px 0px 25px 25px',
          flexDirection: 'row-reverse',
          width: '100%',
        }}
      >
        <Button variant="outlined" onClick={onBtnClick}>
          {bStatus === 'close' || role === 'HR' ? 'Show More' : 'Save'}
        </Button>
      </Box>
    </Paper>
  );
};

export default BoardCard;
