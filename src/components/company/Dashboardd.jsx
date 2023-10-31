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




//now





  





const StyledModal = styled(Modal)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border:"none"
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



//now






const rowsPerPage = 10;


export default function Dashboard() {
    const [page, setPage] = useState(0);
    const [visitors, setVisitors] = useState([]);
    const [totalMeetings, setTotalMeetings] = useState(0); 
    const [pendingMeetings, setPendingMeetings] = useState(0); 
    const [approvedMeetings, setApprovedMeetings] = useState(0); 




    const [item, setItem] = useState('');


    function calculateSerialNumber(index) {
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

    const [status, setStatus] = useState('')

    // const handleChangeStatus = (event) => {
    //     setStatus(event.target.value);
    // };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    // const { id } = useParams();

    const adminId = localStorage.getItem('adminId');
    console.log(adminId,"adminId");

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


    const handleAddMeeting =(value,status1)=>{
        // console.log("check icon clicked")
        //
            const meetingData = {

                id: value.id,
                status:status1,
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


    const addMeetingUrl = 'http://192.168.12.54:8080/api/meeting/update/visitor';
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





    useEffect(() => {


        fetchData();
        // getRoomsOption()
    }, []);


    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };


    return (
        <>
    <Navbar toggleSidebar={toggleSidebar} />
       <Box sx={{display:'flex', flexGrow:1, p:3, width:'100%'}}>
           <Sidebar open={sidebarOpen} />
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "",flexGrow:1  }}>
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
                        <Grid item xs={12}>
                            <Grid style={{ gap: "30px", marginTop: "20px" }} container justifyContent="center" >
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
                                        <div className='icon' style={{ height: "150px", width: "80px", backgroundColor: "skyblue", marginTop: "", display: "flex", justifyContent: "center", alignItems: "center",fontSize:"50px" }}>
                                            <PersonOutlineIcon
                                            style={{fontSize:"50px"}}
                                             />

                                        </div>
                                        <div className='info' style={{ 
                                            marginRight:"90px",display: "flex", flexDirection: "column",alignItems:"center",textAlign:"center" }}>
                                            <div><h2>Total Visitors:</h2></div>
                                            <div><h2>{totalMeetings}</h2></div>

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
                                            <GroupsIcon 
                                            style={{fontSize:"50px"}}/>

                                        </div>
                                        <div className='info' style={{ marginRight:"70px",display: "flex", flexDirection: "column",alignItems:"center",textAlign:"center" }}>
                                            <div><h2>Pending Visitors:</h2></div>
                                            <div><h2>{pendingMeetings}</h2></div>

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
                                        <div className='info' style={{ 
                                            marginRight:"70px",display: "flex", flexDirection: "column" ,alignItems:"center",textAlign:"center"}}>
                                            <div><h2>Approved Visitors:</h2></div>
                                            <div><h2>{approvedMeetings}</h2></div>

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
                                    />
                                    

                                </div>

                                <TableContainer component={Paper} sx={{ width: '100%', boxShadow: 6, backgroundColor: "" }}>
                                    <Table sx={{}} aria-label="simple table">
                                        <TableHead sx={{ backgroundColor: 'aliceblue', border: "1px solid black" }}>
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
                                                    <TableRow key={visitor.visitor.id}>
                                                        {/* <TableCell>{visitor.id}</TableCell>
                                                        <TableCell>{visitor.visitor.id}</TableCell> */}

                                                        <TableCell>{calculateSerialNumber(index)}</TableCell>

                                                        <TableCell align="left">{visitor.visitor.name}</TableCell>

                                                        <TableCell align="left">{visitor.visitor.email}</TableCell>
                                                        <TableCell align="left">{visitor.visitor.phoneNumber}</TableCell>

                                                        <TableCell align="left">{visitor.visitor.companyName}</TableCell>

                                                        <TableCell align="left">{formatDate(visitor.meetingStartDateTime)}</TableCell>
                                                        <TableCell align="left">{formatDate(visitor.meetingEndDateTime)}</TableCell>
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
                                                                    <CheckIcon style={{cursor:"pointer",color:"lightgray",pointerEvents:"none",marginRight:"10px"}}/>
                                                            <ClearIcon style={{cursor:"pointer",color:"lightgray",pointerEvents:"none"}}/>

                                                                    </div>
                                                          

                                                                    </>

                                                          
                                                                    
                                                                ):( <>
                                                                    <div className='status'>
                                                                    <CheckIcon style={{cursor:"pointer",marginRight:"10px"}} onClick={() =>handleAddMeeting(visitor,'APPROVED')}/>
                                                                <ClearIcon style={{cursor:"pointer"}}onClick={()=>handleAddMeeting(visitor,'CANCELLED')}/>
                                                                        
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
                                        rowsPerPageOptions={[]}
                                        component="div"
                                        count={visitors.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
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
