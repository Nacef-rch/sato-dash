import { Box, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import DoughChart from '../../components/Stats/DoughChart';
import LineCard from '../../components/Stats/LineCard';
import LineChart from '../../components/Stats/LineChart';
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from '../../components/Stats/PageTitle';
import { fetchAllEmployees } from '../../+store/Employee/employee.action';
import { fetchAllDepartments } from '../../+store/Department/department.action';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchAllLeaveApplication } from '../../+store/Leave/leave.action';
import { groupLeaveByDate } from '../../helpers/statis.helper';

const gender = {
  title: 'Gender',
  year: new Date().getFullYear(),
  labels: ['Female', 'Men'],
  backgroundColor: ['#B794F4', '#805AD5'],
  data: [12, 19],
};
const contract = {
  title: 'Contract',
  year: new Date().getFullYear(),
  labels: ['CDI', 'CDD', 'Intern'],
  backgroundColor: ['#DD6B20', '#ea9a3f', '#F6AD55', '#f3bd7b'],

  data: [20, 6, 9],
};
const department = {
  title: 'Department',
  year: new Date().getFullYear(),
  labels: ['DIGIX', 'BEST'],
  backgroundColor: ['#4FD1C5', '#319795', '#74dfd4'],
  data: [12, 30],
};
const grade = {
  title: 'Grade',
  year: new Date().getFullYear(),
  labels: ['Employee', 'SysAdmin', 'Team Lead', 'RH'],
  backgroundColor: ['#63b3ed', '#4598d3', '#2f87c6', '#3182CE'],
  data: [25, 4, 1, 1],
};
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
const datapoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const StatsContainer = () => {
  const [depPoints, setDepPoints] = useState([]);
  const [depLabels, setDepLabels] = useState([]);
  const [leavePoints, setLeavePoints] = useState([]);
  const dispatch = useDispatch();
  const {
    empByYear,
    empByGrade,
    empByDep,
    empByDepartment,
    empByGender,
    empByContract,
  } = useSelector((state) => state.stats);
  const { allLeaves } = useSelector((state) => state.leave);
  useEffect(() => {
    dispatch(fetchAllEmployees());
    dispatch(fetchAllDepartments());
    dispatch(fetchAllLeaveApplication());
  }, []);
  useEffect(() => {
    const labels = [];
    const pnt = [];

    Object.keys(empByDepartment).map((key) => {
      labels.push(key.replace('- Sato', ''));
      pnt.push(empByDepartment[key].length);
    });
    setDepPoints(pnt);
    setDepLabels(labels);
  }, [empByDepartment]);
  useEffect(() => {
    const pnt = datapoints;
    Object.keys(groupLeaveByDate(allLeaves)).map((key) => {
      pnt[key] = groupLeaveByDate(allLeaves)[key].length;
    });
    setLeavePoints(pnt);
  }, [allLeaves]);

  return (
    <Box sx={{ backgroundColor: '#F1F5F9' }}>
      <Container maxWidth="xl" sx={{ p: 5 }}>
        <PageTitle />
        <LineChart points={empByYear} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mt: 5 }}
        >
          <LineCard
            title={'Age'}
            subtitle={'Average Age'}
            mainText={'27'}
            borderColor={'#4F46E5'}
            backgroundColor={'rgba(185,191,255,1)'}
          />
          <LineCard
            title={'Department'}
            subtitle={'Most Charged'}
            dataSet={depPoints}
            labelSet={depLabels}
            borderColor={'#2E7D32'}
            backgroundColor={'#C4E4C5'}
          />
          <LineCard
            title={'Leave'}
            subtitle={'Most Taken In'}
            labelSet={constLabels}
            dataSet={leavePoints}
            borderColor={'#F44336'}
            backgroundColor={'#FFEBED'}
          />
        </Stack>

        <Typography variant="h5" sx={{ mt: 5 }}>
          <strong>Satoripop</strong>
        </Typography>
        <Typography variant="body2">
          Demographic properties of your Company
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mt: 5 }}
        >
          <DoughChart
            title={gender.title}
            year={gender.year}
            labels={gender.labels}
            backgroundColor={gender.backgroundColor}
            dataSet={empByGender ? empByGender : gender.data}
          />
          <DoughChart
            title={contract.title}
            year={contract.year}
            labels={empByContract.key ? empByContract.key : contract.labels}
            backgroundColor={contract.backgroundColor}
            dataSet={empByContract.data ? empByContract.data : contract.data}
          />
          <DoughChart
            title={department.title}
            year={department.year}
            labels={empByDep.key ? empByDep.key : department.labels}
            backgroundColor={department.backgroundColor}
            dataSet={empByDep.data ? empByDep.data : department.data}
          />
          <DoughChart
            title={grade.title}
            year={grade.year}
            labels={grade.labels}
            backgroundColor={grade.backgroundColor}
            dataSet={empByGrade ? empByGrade : grade.data}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default StatsContainer;
