import react from 'react';
import {useState} from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';



// const columns = [
//     { id: 'name', label: 'Name', minWidth: 170 },
//     { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//     {
//       id: 'population',
//       label: 'Population',
//       minWidth: 170,
//       align: 'right',
//       format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//       id: 'size',
//       label: 'Size\u00a0(km\u00b2)',
//       minWidth: 170,
//       align: 'right',
//       format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//       id: 'density',
//       label: 'Density',
//       minWidth: 170,
//       align: 'right',
//       format: (value) => value.toFixed(2),
//     },
//   ];
  
//   function createData(name, code, population, size) {
//     const density = population / size;
//     return { name, code, population, size, density };
//   }
  
//   const rows = [
//     createData('India', 'IN', 1324171354, 3287263),
//     createData('China', 'CN', 1403500365, 9596961),
//     createData('Italy', 'IT', 60483973, 301340),
//     createData('United States', 'US', 327167434, 9833520),
//     createData('Canada', 'CA', 37602103, 9984670),
//     createData('Australia', 'AU', 25475400, 7692024),
//     createData('Germany', 'DE', 83019200, 357578),
//     createData('Ireland', 'IE', 4857000, 70273),
//     createData('Mexico', 'MX', 126577691, 1972550),
//     createData('Japan', 'JP', 126317000, 377973),
//     createData('France', 'FR', 67022000, 640679),
//     createData('United Kingdom', 'GB', 67545757, 242495),
//     createData('Russia', 'RU', 146793744, 17098246),
//     createData('Nigeria', 'NG', 200962417, 923768),
//     createData('Brazil', 'BR', 210147125, 8515767),
//   ];

// Define your own columns
const customColumns = [
    { id: 'Sl No', label: 'Sl No', minWidth: 170 },
    { id: 'room', label: 'Room Name', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'people', label: 'People', minWidth: 170, align: 'right' },
  ];
  
  // Define your own rows
  const customRows = [
    { 'Sl No': 1, room: 'Item 1', status: 'Description 1', people: 5 },
    { 'Sl No': 2, room: 'Item 2', status: 'Description 2', people: 10 },
    { 'Sl No': 3, room: 'Item 3', status: 'Description 3', people: 8 },
    { 'Sl No': 3, room: 'Item 3', status: 'Description 3', people: 8 },
    { 'Sl No': 3, room: 'Item 3', status: 'Description 3', people: 8 },
    { 'Sl No': 3, room: 'Item 3', status: 'Description 3', people: 8 },
    { 'Sl No': 3, room: 'Item 3', status: 'Description 3', people: 8 },
    { 'Sl No': 3, room: 'Item 3', status: 'Description 3', people: 8 },
    { 'Sl No': 3, room: 'Item 3', status: 'Description 3', people: 8 },
    { 'Sl No': 3, room: 'Item 3', status: 'Description 3', people: 8 },
    { 'Sl No': 3, room: 'Item 3', status: 'Description 3', people: 8 },
    // Add more rows as needed
  ];
  
  









export default function BasicTable(){

    const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };




    return(
        <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 450,overflow:"auto"}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  Country
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  Details
                </TableCell>
              </TableRow>
              <TableRow>
                {customColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    // style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}


              </TableRow>
            </TableHead>
            <TableBody>
              {customRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {customColumns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={customRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    )
}