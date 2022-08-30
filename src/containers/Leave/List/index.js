import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SelectStatus from './SelectStatus';
import { useSelector } from 'react-redux';
const columns = [
  {
    id: 'Department',
    label: 'Department',
    minWidth: 170,
  },
  { id: 'Leave_Type', label: 'Leave Type', minWidth: 170 },
  { id: 'Employee', label: 'Employee', minWidth: 200 },
  {
    id: 'Status',
    label: 'Status',
    minWidth: 70,
  },
  {
    id: 'From_Date',
    label: 'From Date',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'To_Date',
    label: 'To Date',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'Leaves',
    label: 'Total Leave Days',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'Balance',
    label: 'Balance',
    minWidth: 100,
    align: 'right',
  },

  {
    id: 'Edit',
    label: 'Action',
    minWidth: 170,
    align: 'right',
  },
];

function createData(
  Department,
  Employee,
  Leave_Type,
  Status,
  From_Date,
  To_Date,
  Leaves,
  Balance,
  stats,
  Edit
) {
  return {
    Department,
    Employee,
    Leave_Type,

    Status,
    From_Date,
    To_Date,
    Leaves,
    Balance,
    Edit,
  };
}

const dataRows = [
  createData(
    'BEST',
    'Shaima Racheh',
    'Casual Leave',

    'Open',
    '2022/08/14',
    '2022/08/19',
    '2',
    '21',
    'HT-100'
  ),
  createData(
    'BEST',
    'Nacef Racheh',
    'Casual Leave',

    'Open',
    '2022/08/14',
    '2022/08/19',
    '2',
    '19',
    'HT-101'
  ),
  createData(
    'DIGIX',
    'Wahid Racheh',
    'Sick Leave',

    'Closed',
    '2022/08/16',
    '2022/08/21',
    '2',
    '21',
    'HT-102'
  ),
  createData(
    'DIGIX',
    'Eya Zouai',
    'Casual Leave',

    'Open',
    '2022/08/14',
    '2022/08/19',
    '2',
    '21',
    'HT-103'
  ),
  createData(
    'DIGIX',
    'Ela Zouai',
    'Casual Leave',

    'Open',
    '2022/08/14',
    '2022/08/19',
    '2',
    '21',
    'HT-104'
  ),
];

const LeaveList = () => {
  const [rows, setRow] = React.useState(dataRows);
  const [edit, setEdit] = React.useState(false);
  const [selectedEdit, setSelectedEdit] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const appointments = useSelector((state) => state.leave.allLeaves);
  React.useEffect(() => {
    const data = appointments.map((item) =>
      createData(
        item.department,
        item.employee_name,
        item.leave_type,
        item.status,
        item.from_date,
        item.to_date,
        item.total_leave_days,
        item.leave_balance,
        item.name
      )
    );
    setRow(data);
  }, [appointments]);

  const handleEditStatus = (event) => {
    setEdit((prevStat) => !prevStat);
    setSelectedEdit(event.currentTarget.id);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (
                        column.id === 'Status' &&
                        edit &&
                        row['Edit'] === selectedEdit
                      ) {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <SelectStatus value={value} id={row['Edit']} />
                          </TableCell>
                        );
                      } else if (column.id === 'Edit') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <IconButton
                              color="primary"
                              aria-label="Edit Status"
                              id={value}
                              onClick={handleEditStatus}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default LeaveList;
