import react from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import InfoIcon from '@mui/icons-material/Info';



import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

export default function BasicTable() {

  // const companyId = sessionStorage.getItem('companyId');
  const selectedCompanyId = sessionStorage.getItem('selectedCompanyId');


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const [openDialog, setOpenDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');


  const [roomDetails, setRoomDetails] = useState({});
  const customRows = Object.keys(roomDetails).map((key, index) => ({
    'Sl No': index + 1,
    room: roomDetails[key].roomName,
    status: roomDetails[key].status ? 'Available' : 'Occupied',
    capacity: roomDetails[key].capacity,
    info: 'info',
    meetings: roomDetails[key].meetings
  }));


  const customColumns = [
    { id: 'Sl No', label: 'Sl No', minWidth: 170 },
    { id: 'room', label: 'Room Name', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'capacity', label: 'Capacity', minWidth: 170 },
    { id: 'info', label: 'Info', minWidth: 170 },
  ];




  const roomDetailsUrl = `http://192.168.12.54:8080/api/room/getroomfordashboard/?companyId=${selectedCompanyId}`



  //dialog

  const handleClickOpenDialog = (value) => {

    console.log(value, "value")

    setOpenDialog(true);
    setSelectedValue(value)


  };

  const handleCloseDialog = (value) => {
    setOpenDialog(false);
    setSelectedValue(value);
  };



  //pagination

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  function calculateSerialNumber(index) {
    return index + 1 + page * rowsPerPage;
  }


  //format time

  function formatMeetingDuration1(meeting) {
    const endTimestamp = meeting.meetingEndDateTime;

    if (endTimestamp != null) {
      const endDate = new Date(endTimestamp);

      endDate.setHours(endDate.getHours() - 5);
      endDate.setMinutes(endDate.getMinutes() - 30);

      const options = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Kolkata', // Set the timezone to IST
      };

      const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(endDate);

      let hours = endDate.getHours();
      const amPm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; // Convert midnight (0 hours) to 12

      // Manually construct the time in 12-hour format (hh:mm AM/PM)
      const formattedTime = `${hours}:${endDate.getMinutes().toString().padStart(2, '0')} ${amPm}`;

      return `${formattedDate}, ${formattedTime}`;
    }
  }


  function formatMeetingDuration(meeting) {
    const endTimestamp = meeting.meetingStartDateTime;

    if (endTimestamp != null) {
      const endDate = new Date(endTimestamp);

      endDate.setHours(endDate.getHours() - 5);
      endDate.setMinutes(endDate.getMinutes() - 30);

      const options = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Kolkata', // Set the timezone to IST
      };

      const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(endDate);

      let hours = endDate.getHours();
      const amPm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; // Convert midnight (0 hours) to 12

      // Manually construct the time in 12-hour format (hh:mm AM/PM)
      const formattedTime = `${hours}:${endDate.getMinutes().toString().padStart(2, '0')} ${amPm}`;

      return `${formattedDate}, ${formattedTime}`;
    }
  }


  //format host name
  function getFullName(user) {
    return `${user.firstName} ${user.lastName}`;
  }


  //sorting
  const customRowsOccupied = customRows.filter((row) => row.status === 'Occupied');
  const customRowsAvailable = customRows.filter((row) => row.status === 'Available');
  const sortedCustomRows = [...customRowsOccupied, ...customRowsAvailable];


  function calculateSerialNumber(rowIndex) {
    return page * rowsPerPage + rowIndex + 1;
  }
  

  //fetchRoomDetails function
  function fetchRoomDetails() {

    axios
      .get(roomDetailsUrl, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      })
      .then(response => {

        response.data.data?setRoomDetails(response.data.data) : console.log("no rooms");

        // console.log(response.data.data,"roomdetailsdata")

      })
      .catch((error) => {
        console.error("Error fetching data", error);
      })


  }

  useEffect(() => {

    fetchRoomDetails();

  }, [])






  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ height: 450, overflow: "auto" }}>
          <Table stickyHeader aria-label="sticky table">

            <TableHead>

              <TableRow>
                {customColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ fontWeight: "bolder", fontSize: "15px" }}
                  // style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}


              </TableRow>
            </TableHead>




            <TableBody>
              {sortedCustomRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                      {customColumns.map((column) => {
                        const value = row[column.id];
                        return (
                     
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'Sl No' ? calculateSerialNumber(rowIndex) : (
                              column.id === 'info' ? (row.status === 'Occupied' ?
                                <InfoIcon
                                  style={{ fontSize: "20px", color: "grey", marginTop: "5px", cursor: "pointer" }}
                                  onClick={() => handleClickOpenDialog(row.meetings)}
                                  
                                />
                                : "-"
                              ) : row[column.id])
                            }
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
          rowsPerPageOptions={[ 15, 20,25]}
          component="div"
          count={customRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />


      </Paper>

      {Array.isArray(selectedValue) && selectedValue.map((meeting, index) => (
        <div key={index} style={{ width: "1000px" }}>

          {openDialog && (
            <Dialog onClose={handleCloseDialog} open={openDialog}
         
            >
              <DialogTitle style={{ color: "black" }}>Room Details</DialogTitle>
              <List sx={{ width: "300px" }}>
                <ListItem button onClick={() => handleCloseDialog('username@gmail.com')}>
                  <ListItemText primary={`Start Time: ${meeting.meetingStartDateTime !== null ? formatMeetingDuration(meeting) : '-'}`} />
                </ListItem>
                <ListItem button onClick={() => handleCloseDialog('user02@gmail.com')}>
                  <ListItemText primary={`End Time: ${meeting.meetingEndDateTime !== null ? formatMeetingDuration1(meeting) : "-"} `} />
                </ListItem>
                <ListItem button onClick={() => handleCloseDialog('user02@gmail.com')}>
                  <ListItemText primary={`Host Name : ${getFullName(meeting.user)}`} />
                </ListItem>
                <ListItem button onClick={() => handleCloseDialog('user02@gmail.com')}>
                  <ListItemText primary={`Visitor Name : ${meeting.visitor.name}`} />
                </ListItem>




              </List>
            </Dialog>

          )}


        </div>
      ))}

    </>
  )
}