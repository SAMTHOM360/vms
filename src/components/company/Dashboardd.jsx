import React from 'react';
// import './Dashboard.css';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

import { useParams } from 'react-router-dom';
//modal

import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

import { DataGrid } from '@mui/x-data-grid';


import Navbar from '../../global/Navbar';
import Sidebar from '../../global/Sidebar';
import Header from '../Header';




//calender
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';






const StyledModal = styled(Modal)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "none"
})




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



// const columns = [
//     { field: "id", headerName: "ID", flex: 0.5 },
//     { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
//     { field: "meetings", headerName: "Number of meetings", flex: 1 },
//     { field: "meetingHours", headerName: "Meeting hours", flex: 1 },

// ]




  









export default function Dashboard() {

    //pagination
    const [page, setPage] = useState(0);
    const[rowsPerPage,setRowsPerPage] = useState(10);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0); 
    };

 







    const [visitors, setVisitors] = useState([]);
    const [totalMeetings, setTotalMeetings] = useState(0);
    const [pendingMeetings, setPendingMeetings] = useState(0);
    const [approvedMeetings, setApprovedMeetings] = useState(0);



    //searchCriteria

const [searchCriteria, setSearchCriteria] = useState({
    status: "",
    phoneNumber: "",
    startDate: null,
    endDate: null,
  });




    const [item, setItem] = useState('');
    const[visitorsInfo,setVisitorsInfo] = useState([]);

   
    function calculateSerialNumber(index,page,rowsPerPage) {
        return page * rowsPerPage + index + 1;
        
    }



    const [open, setOpen] = useState(false);


    // const handleOpenModal = (value) => {
    //     setItem(value);
    //     setOpen(true);
    // };

    // Function to handle closing the modal
    // const handleCloseModal = () => {
    //     setOpen(false);
    // };


    //select
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');


    const handleChange1 = (event) => {
        setSelectedRoom(event.target.value);
    };

    function getRoomsOption() {

        const companyId = localStorage.getItem('companyId');

        const roomUrl = `http://192.168.12.54:8080/api/room/all?id=${companyId}`;

        axios.get(roomUrl, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },

        }).then(response => {
            const data = response.data.data;
            // console.log(data);
            setRooms(data);
            // console.log("Room Data", data[4].id)


        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }


    //status
    const [statusOptions, setStatusOptions] = useState([]);
    const [selectedStatusOptions, setSelectedStatusOptions] = useState("");

    const [status, setStatus] = useState('')

    // const handleChangeStatus = (event) => {
    //     setStatus(event.target.value);
    // };

    const handleChangeStatus = (event) => {

        setSelectedStatusOptions(event.target.value);

        // console.log(event.target.value,"xyz");
        // fetchData();

    };

    function fetchStatusOptions() {

        const statusUrl = `http://192.168.12.54:8080/vis/meetstatus`;
        axios.get(statusUrl)
            .then(response => {
                const data = response.data.data;

                // data.forEach(datas =>{
                //     const status1 = datas;
                //     console.log(status1,"status1");
                //     setStatus(status1);
                // })

                // console.log(data,"sttaus")


                setStatusOptions(data);



            }).catch(error => {
                console.error('Error fetching data:', error);
            });

    }












    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    // const { id } = useParams();

    const adminId = localStorage.getItem('adminId');
    console.log(adminId, "adminId");

    // const { adminId } = useParams();



    function fetchData() {
        // const getVisitorUrl = `http://192.168.12.54:8080/api/meeting/vis/${id}`;
        const getVisitorUrl = `http://192.168.12.54:8080/api/meeting/vis?id=${adminId}`
        axios
            .get(getVisitorUrl, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            })
            .then(response => {
                const responseData = response.data.data;

                // const responseDataVisitorsInfo = response.data.data.user;
                // console.log(responseDataVisitorsInfo,"res")
                // if (responseData && responseData.data) {
                //     const visitorsArray = responseData.data;
                    
                   
                //    setVisitorsInfo(visitorsArray);
                //   }

                  
                // const status11111 = response.data.data.status;
                // console.log(status11111,"status");
                // console.log(responseData);

                // console.log(visitorId,"visitorId")
                setVisitors(responseData);
                setTotalMeetings(responseData.length);
                const pendingCount = responseData.filter(visitor => visitor.status === 'PENDING').length;
                const approvedCount = responseData.filter(visitor => visitor.status === 'APPROVED').length;
                setPendingMeetings(pendingCount);
                setApprovedMeetings(approvedCount);


                // console.log(response.data.data[0].id, "visitors");
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });


    }




    //add meeting details  
    // const handleAddMeeting = () => {
    //     // if (status === 'APPROVED' && !selectedRoom) {
    //         if (status === 'APPROVED') {

    //         console.log("APPROVED") //alert("Room is required")

    //     }
    //     else {
    //         const meetingData = {

    //             id: item.id,
    //             status: status,
    //             user: {
    //                 id: adminId
    //             },
    //             visitor: {
    //                 id: item.visitor.id
    //             },
    //             // room: {
    //             //     id: selectedRoom
    //             // }




    //         };

    //         const addMeetingUrl = 'http://192.168.12.54:8080/api/meeting/update/visitor';

    //         axios.post(addMeetingUrl, meetingData, {
    //             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    //         })
    //             .then((response) => {



    //                 handleCloseModal();
    //                 setSelectedRoom('');
    //                 setStatus('')

    //                 if (response.data.message === "CANCELLED Successfully") {
    //                     alert("Meeting cancelled succesfully")
    //                 }
    //                 else {
    //                     alert("Meeting added succesfully")
    //                 }



    //             })
    //             .catch((error) => {

    //                 console.error('Error adding meeting:', error);

    //             });
    //     };


    // }


    const handleAddMeeting = (value, status1) => {
        // console.log("check icon clicked")
        //
        const meetingData = {

            id: value.id,
            status: status1,
            user: {
                id: adminId
            },
            visitor: {
                id: value.visitor.id
            },
            // room: {
            //     id: selectedRoom
            // }

        }


        const addMeetingUrl = 'http://192.168.12.54:8080/api/meeting/update/meeting';
        console.log("before axios post")

        axios.post(addMeetingUrl, meetingData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
            .then((response) => {



                // handleCloseModal();
                // setSelectedRoom('');
                setStatus('')

                if (response.data.message === "CANCELLED Successfully") {
                    alert("Meeting cancelled succesfully")
                }
                else {
                    alert("Meeting added succesfully")
                }

                fetchData();



            })
            .catch((error) => {

                console.error('Error adding meeting:', error);

            });
        // }

    }



    const formatDate = (dateString) => {

        const date = new Date(dateString);
        return date.toLocaleString();
    };

//date
function formatMeetingDuration(meeting) {
    const startTimestamp = meeting.checkInDateTime;
    console.log(startTimestamp,"starttimestamp")
  
    // console.log(visitorsInfo,"ggggg")

  
    // Create JavaScript Date objects with IST timezone
    const startDate = new Date(startTimestamp);

    startDate.setHours(startDate.getHours() - 5);
    startDate.setMinutes(startDate.getMinutes() - 30);
   
  
    // Define options for formatting
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Kolkata', // Set the timezone to IST
    };
  
    // Format the start and end dates using the options
    const formattedStart = new Intl.DateTimeFormat('en-US', options).format(startDate);
  
  
    return `${formattedStart }`;
  }

  function formatMeetingDuration1(meeting) {

    const endTimestamp = meeting.checkOutDateTime;
    console.log(endTimestamp,"endtimestamp")


  
    // Create JavaScript Date objects with IST timezone
 if(endTimestamp!= null){
    const endDate = new Date(endTimestamp);
    endDate.setHours(endDate.getHours() - 5);
    endDate.setMinutes(endDate.getMinutes() - 30);
  
    // Define options for formatting
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Kolkata', // Set the timezone to IST
    };
  
    // Format the start and end dates using the options
   
    const formattedEnd = new Intl.DateTimeFormat('en-US', options).format(endDate);
  
    return `${formattedEnd}`;


  }

 }
   








    useEffect(() => {


        fetchData();
        fetchStatusOptions();
        // getRoomsOption()
    }, []);


    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };


    return (
        <>
            <Navbar toggleSidebar={toggleSidebar} />
            <Box sx={{ display: 'flex', flexGrow: 1, p: 3, width: '100%' }}>
                <Sidebar open={sidebarOpen} />
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "", flexGrow: 1 }}>
                    <div className="one" style={{ backgroundColor: '', border: "1px solid offwhite", flexGrow: 1 }}>
                        <Grid container>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            // width:'100%',
                                            height: '4.5em',
                                            mt: '3em',
                                            mb: '0.5em'
                                        }}
                                    >

                                        <Header title="Visitors" subtitle="Get all updates about visitors" />
                                    </Paper>
                                </Grid>

                            </Grid>

                        </Grid>
                        <Grid sx={{ flexGrow: 1, backgroundColor: "" }} >
                            {/* <Grid item xs={12}>
                                <Grid style={{ gap: "30px", marginTop: "20px" }} container justifyContent="center" >
                                    <Paper elevation={1} sx={{
                                        height: 150,
                                        width: 400,
                                        boxShadow: "5px 5px 10px grey",

                                        ":hover": {
                                            boxShadow: "10px 10px 20px grey",
                                            cursor: "pointer"
                                        },

                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',


                                    }}>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <div className='icon' style={{ height: "150px", width: "80px", backgroundColor: "skyblue", marginTop: "", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "50px" }}>
                                                <PersonOutlineIcon
                                                    style={{ fontSize: "50px" }}
                                                />

                                            </div>
                                            <div className='info' style={{
                                                marginRight: "90px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"
                                            }}>
                                                <div><h2>Total Visitors:</h2></div>
                                                <div><h2>{totalMeetings}</h2></div>

                                            </div>

                                        </div>

                                    </Paper>
                                    <Paper elevation={1} sx={{
                                        height: 150,
                                        width: 400,
                                        boxShadow: "5px 5px 10px grey",

                                        ":hover": {
                                            boxShadow: "10px 10px 20px grey",
                                            cursor: "pointer"
                                        },

                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    }}>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <div className='icon' style={{ height: "150px", width: "80px", backgroundColor: "orange", marginTop: "", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <GroupsIcon
                                                    style={{ fontSize: "50px" }} />

                                            </div>
                                            <div className='info' style={{ marginRight: "70px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                                <div><h2>Pending Visitors:</h2></div>
                                                <div><h2>{pendingMeetings}</h2></div>

                                            </div>

                                        </div>
                                    </Paper>
                                    <Paper elevation={1} sx={{
                                        height: 150,
                                        width: 400,
                                        boxShadow: "5px 5px 10px grey",

                                        ":hover": {
                                            boxShadow: "10px 10px 20px grey",
                                            cursor: "pointer"
                                        },

                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    }}>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <div className='icon' style={{ height: "150px", width: "80px", backgroundColor: "lightpink", marginTop: "", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <WatchLaterIcon style={{ fontSize: "50px" }} />

                                            </div>
                                            <div className='info' style={{
                                                marginRight: "70px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"
                                            }}>
                                                <div><h2>Approved Visitors:</h2></div>
                                                <div><h2>{approvedMeetings}</h2></div>

                                            </div>

                                        </div>

                                    </Paper>


                                </Grid>
                            </Grid> */}

                        </Grid>
                        <Grid container style={{ marginTop: "40px" }}>
                            <Grid item xs={12} style={{ backgroundColor: "" }}>
                                <Item elevation={2} style={{ height: '', margin: '10px', backgroundColor: "" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        {/* <h1 style={{ textAlign: "left" }}>Visitors</h1>
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            // value={searchQuery}
                                            // onChange={handleSearch}
                                            style={{
                                                position: '',
                                                right: 0,
                                                marginTop: "15px",
                                                // marginBottom: "15px",
                                                height: "30px",
                                                marginRight: "10px",
                                                borderRadius: "10px",
                                                // border: "none"
                                            }}
                                        /> */}



                                        <Grid>
                                            <Box
                                                component="form"
                                                sx={{
                                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                            // style={{display:"flex",justifyContent:"space-evenly"}}
                                            >
                                                <Grid style={{ display: "flex", flexDirection: "", justifyContent: "", margin: "", backgroundColor: "", gap: "20px", width: "" }}>



                                                    <Grid style={{ backgroundColor: "", display: "flex", flexDirection: "row" }}>
                                                        <TextField
                                                            id="outlined-select-currency"
                                                            select
                                                            label="Search by Status"
                                                            value={selectedStatusOptions}

                                                            onChange={handleChangeStatus}

                                                            style={{ top: "10px" }}


                                                        >

                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>



                                                            {Array.isArray(statusOptions) && statusOptions.map((options, index) => (
                                                                <MenuItem key={index} value={options} >{options}</MenuItem>
                                                            ))}
                                                        </TextField>




                                                        <TextField id="outlined-search" label="Search By Phone Number"
                                                            //  value={phoneNumberFilter}
                                                            // onChange={(e) => setPhoneNumberFilter(e.target.value)} // Update phone number filter state
                                                            // onKeyPress={handlePhoneNumberSearch} 


                                                            //searchcriteria code
                                                            // value={searchCriteria.phoneNumber}
                                                            // onChange={(e) => setSearchCriteria({ ...searchCriteria, phoneNumber: e.target.value })}                                                       
                                                            type="search" style={{ top: "10px" }} />


                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DemoContainer components={['DatePicker', 'DatePicker']}>

                                                                <DatePicker
                                                                    label="Start Date"
                                                                // value={startDate}

                                                                // onChange={handleStartDateChange}

                                                                //searchcriteria code
    //                                                             value={searchCriteria.startDate}
    //   onChange={(date) => setSearchCriteria({ ...searchCriteria, startDate: date })}


                                                                />
                                                                <DatePicker
                                                                    label="End Date"
                                                                // value={endDate}

                                                                // onChange={handleEndDateChange}

                                                                //searchcriteria code
    //                                                             value={searchCriteria.endDate}
    //   onChange={(date) => setSearchCriteria({ ...searchCriteria, endDate: date })}

                                                                />
                                                            </DemoContainer>
                                                        </LocalizationProvider>

                                                        <TextField id="outlined-search" label="Search" 
                                                            //  value={phoneNumberFilter}
                                                            // onChange={(e) => setPhoneNumberFilter(e.target.value)} // Update phone number filter state
                                                            // onKeyPress={handlePhoneNumberSearch} 
                                                            type="search" style={{ top: "10px" }} />

                                                       





                                                    </Grid>








                                                </Grid>



                                            </Box>

                                        </Grid>


                                    </div>

                                    <TableContainer component={Paper} sx={{ width: '100%', boxShadow: 6, backgroundColor: "" }}>
                                        <Table sx={{}} aria-label="simple table">
                                            <TableHead sx={{ backgroundColor: '#2b345386', border: "1px solid black",fontWeight:"600" }}>
                                                <TableRow sx={{ border: "1px solid black" }}>
                                                    {/* <TableCell>Meeting ID</TableCell>
                                                <TableCell>Visitor ID</TableCell> */}
                                                    <TableCell>Sl No</TableCell>
                                                    <TableCell align="left">Full Name</TableCell>

                                                    <TableCell align="left">Email</TableCell>
                                                    <TableCell align="left">Phone No.</TableCell>
                                                    <TableCell align="left">Company Name</TableCell>



                                                    <TableCell align="left">Start Time</TableCell>
                                                    <TableCell align="left">End Time</TableCell>
                                                    <TableCell align="left">Remarks</TableCell>
                                                    <TableCell align="left">Status</TableCell>



                                                    <TableCell align="left">Actions</TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {visitors
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((visitor, index) => (
                                                        <TableRow key={index}>
                                                            {/* <TableCell>{visitor.id}</TableCell>
                                                        <TableCell>{visitor.visitor.id}</TableCell> */}

                                                            <TableCell>{calculateSerialNumber(index,page,rowsPerPage)}</TableCell>

                                                            <TableCell align="left">{visitor.visitor.name}</TableCell>

                                                            <TableCell align="left">{visitor.visitor.email}</TableCell>
                                                            <TableCell align="left">{visitor.visitor.phoneNumber}</TableCell>

                                                            <TableCell align="left">{visitor.visitor.companyName}</TableCell>

                                                            <TableCell align="left">{formatMeetingDuration(visitor)}</TableCell>
                                                            {/* <TableCell align="left">{formatDate(visitor.checkInDateTime)}</TableCell> */}
                                                            <TableCell align="left">{formatMeetingDuration1(visitor)}</TableCell>
                                                            <TableCell align="left">{visitor.remarks}</TableCell>
                                                            <TableCell align="left">{visitor.status}</TableCell>
                                                            <TableCell align="left">


                                                                {/*                                                            
                                                            { visitor.status === 'COMPLETED' || visitor.status === 'CANCELLED' ? (
                                                                // Disable the Edit button
                                                                <EditIcon style={{ color: 'lightgray', pointerEvents: 'none' }} />
                                                            ) : (
                                                                // Enable the Edit button
                                                                <EditIcon onClick={() => handleOpenModal(visitor)} />
                                                            )} */}

                                                                {
                                                                    visitor.status === 'COMPLETED' || visitor.status === 'CANCELLED' ? (
                                                                        <>
                                                                            <div className='status'>
                                                                                <CheckIcon style={{ cursor: "pointer", color: "lightgray", pointerEvents: "none", marginRight: "10px" }} />
                                                                                <ClearIcon style={{ cursor: "pointer", color: "lightgray", pointerEvents: "none" }} />

                                                                            </div>


                                                                        </>



                                                                    ) : (<>
                                                                        <div className='status'>
                                                                            <CheckIcon style={{ cursor: "pointer", marginRight: "10px" }} onClick={() => handleAddMeeting(visitor, 'APPROVED')} />
                                                                            <ClearIcon style={{ cursor: "pointer" }} onClick={() => handleAddMeeting(visitor, 'CANCELLED')} />

                                                                        </div>

                                                                    </>)

                                                                }


                                                                {/* <CheckIcon style={{cursor:"pointer"}} onClick={() =>handleAddMeeting(visitor,'APPROVED')}/>
                                                            <ClearIcon style={{cursor:"pointer"}}onClick={()=>handleAddMeeting(visitor,'CANCELLED')}/> */}



                                                            </TableCell>

                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                        <TablePagination
                                           rowsPerPageOptions={[5, 10, 15]}
                                            component="div"
                                            count={visitors.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </TableContainer>





                                </Item>
                            </Grid>
                        </Grid>

                        <StyledModal
                            open={open} // Set the open prop of the modal
                            // onClose={handleCloseModal} // Handle closing the modal
                            aria-labelledby="modal-title"
                            aria-describedby="modal-description"
                        >
                            <Box width={600} height={300} bgcolor={'white'} p={3} borderRadius={5} border='none' >

                                <Box
                                    display="flex" flexDirection='column'

                                    // margin='auto'
                                    // marginTop={10}
                                    padding={3}
                                    borderRadius={5}
                                    gap={3}

                                >
                                    <Typography fontSize={20} fontWeight={'bold'} variant={'h1'}>Meeting</Typography>



                                    {/* <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Choose Room</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedRoom}
                                        label="rooms"
                                        onChange={handleChange1}
                                    >
                                   
                                        {Array.isArray(rooms) && rooms.map((room) => (
                                            <MenuItem key={room.id} value={room.id}>{room.roomName}</MenuItem>
                                        ))}





                                    </Select>
                                </FormControl> */}

                                    {/* <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={status}
                                        label="status"
                                        onChange={handleChangeStatus}
                                    >
                                        <MenuItem value='APPROVED'>APPROVE</MenuItem>
                                        <MenuItem value='CANCELLED' >CANCEL</MenuItem>

                                    </Select>
                                </FormControl> */}
                                    {/* <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
                                    <Button variant='contained' onClick={handleAddMeeting} >Update</Button>
                                    <Button variant='contained' onClick={handleCloseModal}>Close</Button>
                                </div> */}






                                </Box>








                            </Box>
                        </StyledModal>

                    </div>

                </div>
            </Box>
        </>
    )
}
