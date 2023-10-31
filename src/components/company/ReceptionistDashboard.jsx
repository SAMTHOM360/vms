//again

import React from 'react';
// import './Dashboard.css';
import '../../css/ReceptionistDashboard.css'
// import '../Receptionist/MeetingDetails';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

import Navbar from '../../global/Navbar';
import Sidebar from '../../global/Sidebar';
import Header from '../Header';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import DownloadIcon from '@mui/icons-material/Download';
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





const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "meetings", headerName: "Number of meetings", flex: 1 },
    { field: "meetingHours", headerName: "Meeting hours", flex: 1 },

]
const rowsPerPage = 10;


export default function Dashboard() {
    const [page, setPage] = useState(0);
    const [visitors, setVisitors] = useState([]);

    const[meetings,setMeetings] = useState([]);


    const rowsPerPage = 10;//now
    const [totalVisitors, setTotalVisitors] = useState(0);
    const [pendingVisitors, setPendingVisitors] = useState(0);
    const [approvedVisitors, setApprovedVisitors] = useState(0);




    const [item, setItem] = useState('');



    const [phoneNumberFilter, setPhoneNumberFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); 


    function calculateSerialNumber(page,rowsPerPage,index) {
        return page * rowsPerPage + index + 1;
    }



    const [open, setOpen] = useState(false);


    const handleOpenModal = (value) => {
        setItem(value);
        setOpen(true);
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setOpen(false);
    };


    //select
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');


    const handleChange1 = (event) => {
        setSelectedRoom(event.target.value);
    };

    // function getRoomsOption() {

    //     const companyId = localStorage.getItem('companyId');

    //     const roomUrl = `http://192.168.12.54:8080/api/room/all?id=${companyId}`;

    //     axios.get(roomUrl, {
    //         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },

    //     }).then(response => {
    //         const data = response.data.data;
    //         // console.log(data);
    //         setRooms(data);
    //         // console.log("Room Data", data[4].id)


    //     }).catch(error => {
    //         console.error('Error fetching data:', error);
    //     });
    // }


    //status

    const [status, setStatus] = useState('')

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        // fetchData(newPage);
    };


    // const { id } = useParams();

    const adminId = localStorage.getItem('adminId');
    // console.log(adminId, "adminId");

    // const { adminId } = useParams();



    function fetchData() {

    

        const companyId = localStorage.getItem('companyId');


        const payload ={
            page:page,
            size:rowsPerPage,
            phoneNumber: phoneNumberFilter,
            searchQuery: searchQuery,
            companyId:companyId
           // status:status,
            // date:'2023-10-18T11:00:00'

        }
        const getVisitorUrl = `http://192.168.12.54:8080/api/meeting/paginate`
        axios
            .post(getVisitorUrl, 
               payload)
            .then(response => {
                const responseData = response.data.data.meetings;

              
                // Loop through the meetings to access each one and its meetingId
                responseData.forEach(meeting => {
                    const meetingId = meeting.id; // This is the meetingId
                    // Now you can use the meetingId as needed
                    console.log("Meeting ID:", meetingId);
                });

              
             


                setMeetings(response.data.data.totalElements);
                // console.log(response.data.data.meetings.user);

                // console.log(visitorId,"visitorId")
                setVisitors(responseData);
                // setTotalMeetings(responseData.length);
                setTotalVisitors(response.data.data.totalElements);
               //recent
               setPendingVisitors(response.data.data.totalPending);
               setApprovedVisitors(response.data.data.totalApproved);

               
          
              



                // console.log(response.data.data[0].id, "visitors");
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });


    }

//change

   //date format
    // const formatDate = (dateString) => {

    //     const date = new Date(dateString);
    //     return date.toLocaleString();
    //   };


      function getFullName(user) {
        return `${user.firstName} ${user.lastName}`;
      }

    function formatMeetingDuration(meeting) {
        const startDate = new Date(meeting.meetingStartDateTime);
        const endDate = new Date(meeting.meetingEndDateTime);

        const formattedDate = startDate.toLocaleDateString();
        const startTime = startDate.toLocaleTimeString();
        const endTime = endDate.toLocaleTimeString();

        return `${formattedDate}, ${startTime} - ${endTime}`;
    }



    ///////


    const handleDownloadPass = (meetingId,visitorName,visitorPhoneNumber) => {
      
        const passApiEndpoint = `http://192.168.12.54:8080/api/meeting/downloadPass?meetingId=${meetingId}`;
    
        axios
            .get(passApiEndpoint, {
                responseType: 'blob', 
            })
            .then((response) => {
                const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const fileName = `${visitorName}_${visitorPhoneNumber}_pass.pdf`;
            a.setAttribute('download', fileName);
            // a.download = ; 
            a.click();
            window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('Error downloading pass:', error);
            });
    };





    
    const handlePhoneNumberSearch = (event) => {
        if (event.key === 'Enter') {
            // Call the fetchData function when Enter key is pressed
            fetchData();
        }
    };




    useEffect(() => {


        fetchData();
        // getRoomsOption()
    }, [page]);    


    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };




    return (
        <>
                <Navbar toggleSidebar={toggleSidebar}/>
                <Box sx={{display:'flex', flexGrow:1, p:3, width:'100%'}}>
                <Sidebar open={sidebarOpen} />
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "", flexGrow:1, }}>
                <div className="one" style={{ backgroundColor: '', border: "1px solid offwhite", flexGrow:1 }}>
                    <Grid container>
                        <Grid container>
                            <Grid item xs={12}>
                            <Paper
                                 elevation={5}
                                 sx={{
                                   display:'flex',
                                   justifyContent:'space-between',
                                   // width:'100%',
                                 height:'4.5em',
                                 mt:'3em',
                                 mb:'0.5em' 
                                 }}
                                 >
                                    <Header title="Dashboard" subtitle="Welcome to dashboard" />
                                </Paper>
                            </Grid>

                        </Grid>

                    </Grid>
                    <Grid sx={{ flexGrow: 1, backgroundColor: "" }} >
                        <Grid item xs={12} style={{backgroundColor:""}}>
                            <Grid style={{ gap: "30px", marginTop: "20px"}} container justifyContent="center" >
                                <Paper  style={{backgroundColor:""}}elevation={1} sx={{
                                    height: 150,
                                    width: 400,
                                    display: 'flex', // Use flex display
                                    alignItems: 'center',// Vertically center content
                                    // borderRadius:"40px",
                                    backgroundColor:"red",
                                    

                                    boxShadow:"5px 5px 10px grey",

                                    ":hover": {
                                        boxShadow: "10px 10px 20px grey",
                                        cursor: "pointer"
                                    },

                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',


                                }}>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between",backgroundColor:"" }}>

                                        
                                            <div className='icon' style={{ height: "150px", width: "80px", backgroundColor: "skyblue", marginTop: "", display: "flex", justifyContent: "center", alignItems: "center",fontSize:"50px" }}>
                                                <PersonOutlineIcon style={{fontSize:"50px"}}/>

                                            </div>

                                        

                                        <div className='info' style={{ marginLeft:"50px",display: "flex", flexDirection: "column", backgroundColor: "", alignItems: "center" ,textAlign:"center"}}>
                                            <h2>Total Visitors:</h2>
                                            <h2>{totalVisitors}</h2>

                                        </div>

                                    </div>

                                </Paper>
                                <Paper elevation={1} sx={{
                                    height: 150,
                                    width: 400,
                                    boxShadow:"5px 5px 10px grey",

                                    ":hover": {
                                        boxShadow: "10px 10px 20px grey",
                                        cursor: "pointer"
                                    },

                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                }}>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <div className='icon' style={{ height: "150px", width: "80px", backgroundColor: "orange", marginTop: "", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <GroupsIcon style={{fontSize:"50px"}} />

                                        </div>
                                        <div className='info' style={{marginRight:"70px" ,display: "flex", flexDirection: "column",alignItems:"center",textAlign:"center" }}>
                                            <div><h2>Pending Visitors:</h2></div>
                                            <div><h2>{pendingVisitors}</h2></div>

                                        </div>

                                    </div>
                                </Paper>
                                <Paper elevation={1} sx={{
                                    height: 150,
                                    width: 400,
                                    boxShadow:"5px 5px 10px grey",

                                    ":hover": {
                                        boxShadow: "10px 10px 20px grey",
                                        cursor: "pointer"
                                    },

                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                }}>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <div className='icon' style={{ height: "150px", width: "80px", backgroundColor: "lightpink", marginTop: "", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <WatchLaterIcon style={{fontSize:"50px"}} />

                                        </div>
                                        <div className='info' style={{ marginRight:"70px",display: "flex", flexDirection: "column" ,alignItems:"center",textAlign:""}}>
                                            <div><h2>Approved Visitors:</h2></div>
                                            <div><h2>{approvedVisitors}</h2></div>

                                        </div>

                                    </div>

                                </Paper>


                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid container style={{ marginTop: "40px" }}>
                        <Grid item xs={12} style={{ backgroundColor: "" }}>
                            <Item elevation={2} style={{ height: '', margin: '10px', backgroundColor: "" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <h1 style={{ textAlign: "left" }}>Visitors</h1>
                                    {/* <button type="submit" onclick={<MeetingDetails/>}>Add User</button> */}
                                    <Grid style={{
                                            position: '',
                                            right: 0,
                                            marginTop: "15px",
                                            // marginBottom: "15px",
                                            height: "30px",
                                            marginRight: "10px",
                                            borderRadius: "10px"}}>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={phoneNumberFilter}
                                        onChange={(e) => setPhoneNumberFilter(e.target.value)} // Update phone number filter state
                                        onKeyPress={handlePhoneNumberSearch} 
                                        // value={searchQuery}
                                        // onChange={handleSearch}
                                        style={{
                                            // position: '',
                                            // right: 0,
                                            // marginTop: "15px",
                                            // marginBottom: "15px",
                                            height: "30px",
                                            
                                            borderRadius: "10px",
                                            // border: "none"
                                        }}
                                    /> 

                                    </Grid>
                                   

                                </div>

                                <TableContainer component={Paper} sx={{ width: '100%', boxShadow: 6, backgroundColor: "" }}>
                                    <Table sx={{}} aria-label="simple table">
                                        <TableHead sx={{ backgroundColor: 'aliceblue', border: "1px solid black" }}>
                                            <TableRow sx={{ border: "1px solid black" }}>
                                                {/* <TableCell>Meeting ID</TableCcenter
                                                <TableCell>Visitor ID</TableCell> */}
                                                <TableCell>Sl No</TableCell>
                                                <TableCell align="left">Full Name</TableCell>
                                                {/* <TableCell align="right">Email</TableCell> */}
                                                <TableCell align="left">Phone No.</TableCell>
                                                <TableCell align="left">Company Name</TableCell>
                                                <TableCell align="left">Host Name</TableCell>
                                                {/* <TableCell align="right">Remarks</TableCell> */}
                                                <TableCell align="left">Room</TableCell>

                                                <TableCell align="left">Meeting Time</TableCell>
                                                {/* <TableCell align="right">End Time</TableCell> */}

                                                <TableCell align="left">Check In</TableCell>
                                                <TableCell align="left">Check Out</TableCell>
                                               
                                                <TableCell align="left">Status</TableCell>



                                                <TableCell align="left"></TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {visitors
                                                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((visitor, index) => (
                                                    <TableRow key={index}>
                                                        {/* <TableCell>{visitor.id}</TableCell>
                                                        <TableCell>{visitor.visitor.id}</TableCell> */}

                                                        <TableCell>{calculateSerialNumber(page,rowsPerPage,index)}</TableCell>

                                                        <TableCell align="left">{visitor.visitor.name}</TableCell>

                                                        {/* <TableCell align="right">{visitor.visitor.email}</TableCell> */}
                                                        <TableCell align="left">{visitor.visitor.phoneNumber}</TableCell>

                                                        <TableCell align="left">{visitor.visitor.companyName}</TableCell>
                                                        <TableCell align="left">{getFullName(visitor.user)}</TableCell>
                                                        {/* <TableCell align="right">{visitor.remarks}</TableCell> */}
                                                        <TableCell align="left">{visitor.room.roomName}</TableCell>
                                                        <TableCell align="left">{formatMeetingDuration(visitor)}</TableCell>
                                                        {/* <TableCell align="right">{formatDate(visitor.meetingEndDateTime)}</TableCell> */}
                                                        <TableCell align="left">{visitor.checkInDateTime}</TableCell>
                                                        <TableCell align="left">{visitor.checkOutDateTime}</TableCell>
                                                        <TableCell align="left">{visitor.status}</TableCell>

                                                        {/* <TableCell align="right">{visitor.meetingStartDateTime}</TableCell>
                                                        <TableCell align="right">{visitor.meetingEndDateTime}</TableCell>
                                                        <TableCell align="right">{visitor.remarks}</TableCell>
                                                        <TableCell align="right">{visitor.status}</TableCell> */}
                                                        <TableCell align="right">


                                                            {visitor.status === 'COMPLETED' || visitor.status === 'CANCELLED' || visitor.status === 'PENDING' ? (
                                                                
                                                                <DownloadIcon style={{ color: 'lightgray', pointerEvents: 'none' }} />
                                                            ) : (
                                                            
                                                                <DownloadIcon style={{cursor:"pointer"}} onClick={() => handleDownloadPass(visitor.id,visitor.visitor.name,visitor.visitor.phoneNumber)} />
                                                            )}



                                                        </TableCell>

                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                        
                                    </Table>
                                    <TablePagination
                                        rowsPerPageOptions={[]}
                                        component="div"
                                        // count={visitors.length}
                                        count={meetings}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={
                                            handleChangePage}
                                    
                                    />
                                </TableContainer>






                                </Item>
                        </Grid>
                    </Grid>

                 
                </div>

            </div>

            </Box>



        </>
    )
}
