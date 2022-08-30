import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/system';
import { Chip, Divider, Grid, Stack, Typography, Paper } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useEffect } from 'react';
ChartJS.register(ArcElement, Tooltip, Legend);
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: false,
    },
  },
  interaction: {
    intersect: false,
  },
};

const DoughChart = ({ title, year, labels, backgroundColor, dataSet }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataSet,
        backgroundColor: backgroundColor,
        borderWidth: 1,
        cutout: '70%',
      },
    ],
  };

  const percentage = (x) => {
    const total = dataSet.reduce((partialSum, a) => partialSum + a, 0);
    return Math.round((100 * x) / total) + ' %';
  };
  return (
    <Paper sx={{ width: 300, p: 3, borderRadius: '15px' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography>{title}</Typography>
        <Chip label={year} />
      </Stack>
      <Box sx={{ mt: 3, mb: 5 }}>
        <Doughnut data={data} options={options} />
      </Box>
      {labels.map((item, index) => (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FiberManualRecordIcon
                sx={{
                  width: 15,
                  height: 15,
                  mb: '-2px',
                  color: backgroundColor[index],
                }}
              />{' '}
              {labels[index]}
            </Grid>
            <Grid item xs={12} md={3}>
              {dataSet[index]}
            </Grid>
            <Grid item xs={12} md={3}>
              {percentage(dataSet[index])}
            </Grid>
          </Grid>
          {labels.length - 1 !== index && <Divider sx={{ mt: 1, mb: 1 }} />}
        </>
      ))}
    </Paper>
  );
};

export default DoughChart;
