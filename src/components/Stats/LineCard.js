import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
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
import FunctionsIcon from '@mui/icons-material/Functions';
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
      display: false,
    },
    y: {
      display: false,
    },
  },
};
const datapoints = [5, 20, 10, 8, 5, 5, 3, 2, 0];
const constLabels = [
  '20 y.o',
  '25 y.o',
  '30 y.o',
  '35 y.o',
  '40 y.o',
  '45 y.o',
  '50 y.o',
  '55 y.o',
  '60 y.o',
];
const LineCard = ({
  title,
  subtitle,
  mainText,
  dataSet,
  borderColor,
  backgroundColor,
  labelSet,
}) => {
  const [labels, setLabels] = useState(constLabels);
  const [most, setMost] = useState();
  useEffect(() => {
    if (dataSet) {
      let max = dataSet[0];
      let indexItem = 0;
      dataSet.map((item, index) => {
        if (item > max) {
          max = item;
          indexItem = index;
        }
      });
      setMost(labelSet[indexItem]);
    }
  }, [dataSet]);
  const data = {
    labels: labelSet ? labelSet : labels,
    datasets: [
      {
        fill: true,
        data: dataSet ? dataSet : datapoints,
        borderColor: borderColor,
        cubicInterpolationMode: 'monotone',
        backgroundColor: backgroundColor,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };
  return (
    <Paper sx={{ width: 400, borderRadius: '15px 15px 0 0' }}>
      <Box sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 300 }}>
          {title}
        </Typography>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          sx={{ mb: '-120px', mr: '10px' }}
        >
          <Typography variant="h2" sx={{ zIndex: '999999 !important' }}>
            <strong>{mainText ? mainText : most}</strong>
          </Typography>
          <FunctionsIcon sx={{ color: borderColor }} />
          <Typography variant="subtitle2" sx={{ zIndex: '999999 !important' }}>
            {subtitle}
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ height: '150px' }}>
        <Line options={options} data={data} />
      </Box>
    </Paper>
  );
};

export default LineCard;
