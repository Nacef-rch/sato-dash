import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Box from '@mui/material/Box';

import { useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { borderColor } from '@mui/system';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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
  scales: {
    x: {
      display: true,
      title: {
        display: true,
      },
    },
    y: {
      display: false,
      title: {
        display: true,
        text: 'Value',
      },
    },
  },
};
const datapoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const constLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];
const BtnStyle = {
  textTransform: 'capitalize',
  fontWight: 500,
  color: 'rgba(255, 255, 255, 0.9)',
  borderColor: 'white',
};
const data = {
  labels: constLabels,
  datasets: [
    {
      fill: true,
      data: datapoints,
      borderColor: '#818CF8',
      cubicInterpolationMode: 'monotone',
      backgroundColor: 'rgba(130, 141, 248, 0.2)',
      height: 800,
      tension: 0.4,
    },
  ],
};
const LineChart = ({ points }) => {
  const [labels, setLabels] = useState(constLabels);
  const [dataPoints, setDataPoints] = useState(datapoints);
  const [pData, setPData] = useState(data);
  const [year, setYear] = useState(new Date().getFullYear());
  const thisYear = new Date().getFullYear();
  useEffect(() => {
    const dataArray = datapoints;
    if (points) {
      Object.keys(points).map((key) => {
        if (key.substring(0, 4) == year) {
          dataArray[key.substring(6, 7) - 1] = points[key].length;
        }
      });
      setDataPoints(dataArray);
    }
  }, [points, year]);
  useEffect(() => {
    setPData({
      labels: constLabels,
      datasets: [
        {
          fill: true,
          data: dataPoints,
          borderColor: '#818CF8',
          cubicInterpolationMode: 'monotone',
          backgroundColor: 'rgba(130, 141, 248, 0.2)',
          height: 800,
          tension: 0.4,
        },
      ],
    });
  }, [points, dataPoints, year]);

  const handleChangeYear = () => {
    if (year === thisYear) {
      setYear(thisYear - 1);
    } else {
      setYear(thisYear);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'rgb(30, 41, 59)',
        p: 5,

        borderRadius: 5,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Box sx={{ color: 'white' }}>
          <Typography variant="h5" sx={{ fontWeight: 300 }}>
            Change in workforce
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 300 }}>
            Per Year
          </Typography>
        </Box>
        <Box>
          <Button
            sx={BtnStyle}
            onClick={handleChangeYear}
            variant={year === thisYear ? 'outlined' : 'text'}
          >
            This Year
          </Button>
          <Button
            sx={BtnStyle}
            onClick={handleChangeYear}
            variant={year === thisYear ? 'text' : 'outlined'}
          >
            Last Year
          </Button>
        </Box>
      </Stack>
      <Box sx={{ mt: 3 }}>
        <Line options={options} data={pData} />
      </Box>
    </Box>
  );
};
export default LineChart;
