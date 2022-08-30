import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const CardStat = ({
  num,
  title,
  subNum,
  subTitle,
  cardTitle,
  colorCode,
  onGetRange,
  selected,
  onViewClick,
}) => {
  const [range, setRange] = React.useState('month');
  const [showEye, setShowEye] = React.useState(selected);
  React.useEffect(() => {
    setShowEye(selected);
  }, [setShowEye, selected]);
  const handleChangeEmp = (event) => {
    setRange(event.target.value);
    onGetRange(event.target.value);
  };
  const onEyeClick = () => {
    setShowEye((prevState) => !prevState);
    onViewClick();
  };

  return (
    <Paper sx={{ p: 3, pt: 2, borderRadius: '20px' }}>
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          {cardTitle ? (
            <Typography variant="subtitle1" sx={{ fontWeight: 500, p: 1.5 }}>
              {cardTitle}
            </Typography>
          ) : (
            <FormControl>
              <InputLabel id="demo-simple-select-label">Range</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={range}
                label="Age"
                defaultValue="month"
                onChange={handleChangeEmp}
              >
                <MenuItem value={'day'}>Today</MenuItem>
                <MenuItem value={'week'}>Week</MenuItem>
                <MenuItem value={'month'}>Month</MenuItem>
              </Select>
            </FormControl>
          )}
          {!cardTitle ? (
            <RemoveRedEyeIcon
              sx={{ color: showEye ? '#1976D2' : 'black', cursor: 'pointer' }}
              onClick={onEyeClick}
            />
          ) : (
            <MoreVertIcon sx={{ cursor: 'pointer' }} />
          )}
        </Stack>
        <Box sx={{ mt: '-10px !important' }}>
          <Typography variant="h2" sx={{ fontWeight: 900, color: colorCode }}>
            {num}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: colorCode }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2">
          {subTitle} : <strong>{subNum}</strong>
        </Typography>
      </Stack>
    </Paper>
  );
};

export default CardStat;
