import React from 'react';

import { useDispatch } from 'react-redux';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, InputAdornment, TextField } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { registerDepartment } from '../../../+store/Department/department.action';

const schema = yup.object().shape({
  department_name: yup.string().required('You must enter Department'),
  company: yup.string().required('You must enter Company'),
});

const DepForm = ({ handleDialogClick }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      company: 'Satoripop',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (isValid) {
   
      dispatch(registerDepartment(data));
      handleDialogClick();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="department_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.department_name}
            helperText={errors?.department_name?.message}
            label="Department *"
            autoFocus
            sx={{ margin: '24px', width: '90% !important' }}
            id="department_name"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Controller
        name="company"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.company}
            helperText={errors?.company?.message}
            label="Company *"
            autoFocus
            sx={{ margin: '24px', width: '90% !important' }}
            id="company"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ApartmentIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Button type="submit" variant="contained" disabled={!isDirty || !isValid}>
        SAVE
      </Button>
    </form>
  );
};

export default DepForm;
