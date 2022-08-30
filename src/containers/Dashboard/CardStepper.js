import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LeaveList from './LeaveList';

const steps = [
  {
    label: 'Employees on leave',
    content: <LeaveList />,
  },
  {
    label: '',
    content: <LeaveList />,
  },
  {
    label: '',
    content: <LeaveList />,
  },
];

export default function CardStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ minWidth: 400, flexGrow: 1, borderRadius: '20px !important' }}>
      <MobileStepper
        x={{ borderRadius: '20px !important' }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: '20px !important',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
          textAlign: 'center',
        }}
      >
        <Typography variant="subtitle1">
          <strong>{steps[activeStep].label}</strong>
        </Typography>
      </Paper>
      <Box sx={{ maxHeight: 600, maxWidth: 400, width: '100%', p: 2 }}>
        {steps[activeStep].content}
      </Box>
    </Box>
  );
}
