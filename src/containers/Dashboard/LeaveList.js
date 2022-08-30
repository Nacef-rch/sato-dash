import React, { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../../helpers/avatar.helper';
import { useSelector } from 'react-redux';
import { filterEmpOnLeave } from '../../helpers/stats.helper';
import FbLoader from '../../shared/Loading/FbLoader';
import { Box } from '@mui/material';

const LeaveList = () => {
  const [leaveArray, setLeaveArray] = useState([]);
  const appointments = useSelector((state) => state.leave.allLeaves);
  useEffect(() => {
    setLeaveArray(filterEmpOnLeave(appointments));
  }, [appointments]);

  return (
    <>
      {leaveArray.map((emp) => {
        return (
          <ListItem button divider>
            <ListItemAvatar>
              {emp.image ? (
                <Avatar src={emp.image} />
              ) : (
                <Avatar {...stringAvatar(emp.employee_name)} />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={` ${emp.employee_name} (${emp.leave_type})`}
              secondary={`${emp.from_date} - ${emp.to_date}`}
            />
          </ListItem>
        );
      })}
    </>
  );
};

export default LeaveList;
