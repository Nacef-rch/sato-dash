import React from 'react';
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';

const Appointment = ({ children, style, ...restProps }) => {
  return (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: children[1].props.data.color,
        borderRadius: '8px',
      }}
    >
      {children}
    </Appointments.Appointment>
  );
};

export default Appointment;
