// const XLSX = require('xlsx');
// const path = require('path');

// export const exportDataToExcel = (
//   data,
//   columnName,
//   workSheetName,
//   fileName
// ) => {
//   const workBook = XLSX.utils.book_new();
//   const workSheetData = [columnName, ...data];
//   const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
//   XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
//   XLSX.writeFile(workBook, path.resolve(fileName));
//   return true;
// };
