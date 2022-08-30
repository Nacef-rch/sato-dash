import { useEffect, useState } from 'react';

import CardList from '../../../components/Employee/cardList';

const EmployeeList = ({ employees }) => {
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const depArray = [...new Set(employees.map((item) => item.department))];

    setDepartments(depArray);
  }, [employees]);
  // if (isLoading) {
  //   return (
  //     <>
  //       <CardList employees={employeesMocks} department={'BEST'} />
  //       <CardList employees={employeesMocks} department={'DIGIX'} />
  //     </>
  //   );
  // }
  // if (!isLoading) {
  return (
    <>
      {departments.map((item) => (
        <CardList employees={employees} department={item} />
      ))}
    </>
  );
  // return <CardList employees={employees} department={'BEST'} />;
  // }
};

export default EmployeeList;
