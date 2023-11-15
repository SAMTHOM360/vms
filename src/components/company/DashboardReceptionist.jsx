// //again

// import React from 'react';
// // import './Dashboard.css';
// import '../../css/ReceptionistDashboard.css';
// // import '../Receptionist/MeetingDetails';
// import { styled } from '@mui/material/styles';
// import { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import GroupsIcon from '@mui/icons-material/Groups';
// import WatchLaterIcon from '@mui/icons-material/WatchLater';
// import Navbar from '../../global/Navbar';
// import Sidebar from '../../global/Sidebar';
// import Header from '../Header';


// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TablePagination from '@mui/material/TablePagination';
// import DownloadIcon from '@mui/icons-material/Download';
// import CloseIcon from '@mui/icons-material/Close';
// import axios from "axios";
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import MenuItem from '@mui/material/MenuItem';

// import { useParams } from 'react-router-dom';
// //modal

// import Modal from '@mui/material/Modal';
// import Typography from '@mui/material/Typography';
// import { TextField } from '@mui/material';
// import Button from '@mui/material/Button';





// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));



// const columns = [
//     { field: "id", headerName: "ID", flex: 0.5 },
//     { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
//     { field: "meetings", headerName: "Number of meetings", flex: 1 },
//     { field: "meetingHours", headerName: "Meeting hours", flex: 1 },

// ]
// const rowsPerPage = 10;


// export default function Dashboard() {
//     const [page, setPage] = useState(0);
//     const [visitors, setVisitors] = useState([]);

//     const [meetings, setMeetings] = useState([]);


//     const rowsPerPage = 10;//now
//     const [totalVisitors, setTotalVisitors] = useState(0);
//     const [pendingVisitors, setPendingVisitors] = useState(0);
//     const [approvedVisitors, setApprovedVisitors] = useState(0);




//     const [item, setItem] = useState('');



//     const [phoneNumberFilter, setPhoneNumberFilter] = useState('');
//     const [searchQuery, setSearchQuery] = useState('');


//     function calculateSerialNumber(page, rowsPerPage, index) {
//         return page * rowsPerPage + index + 1;
//     }



//     const [open, setOpen] = useState(false);


//     const handleOpenModal = (value) => {
//         setItem(value);
//         setOpen(true);
//     };

//     // Function to handle closing the modal
//     const handleCloseModal = () => {
//         setOpen(false);
//     };


//     //select
//     const [rooms, setRooms] = useState([]);
//     const [selectedRoom, setSelectedRoom] = useState('');


//     const handleChange1 = (event) => {
//         setSelectedRoom(event.target.value);
//     };

//     function getRoomsOption() {



//         const roomUrl = `http://192.168.12.54:8080/api/room/all?id=${companyId}`;

//         axios.get(roomUrl, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },

//         }).then(response => {
//             const data = response.data.data;
//             // console.log(data);
//             setRooms(data);
//             // console.log("Room Data", data[4].id)


//         }).catch(error => {
//             console.error('Error fetching data:', error);
//         });
//     }


//     //status

//     const [status, setStatus] = useState('')

//     const handleChangeStatus = (event) => {
//         setStatus(event.target.value);
//     };

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//         // fetchData(newPage);
//     };


//     // const { id } = useParams();

//     const adminId = localStorage.getItem('adminId');
//     // console.log(adminId, "adminId");

//     // const { adminId } = useParams();



//     const companyId = localStorage.getItem('companyId');



//     function fetchData() {



//         const payload = {
//             page: page,
//             size: rowsPerPage,
//             phoneNumber: phoneNumberFilter,
//             searchQuery: searchQuery,
//             companyId: companyId
//             // status:status,
//             // date:'2023-10-18T11:00:00'

//         }
//         const getVisitorUrl = `http://192.168.12.54:8080/api/meeting/paginate`
//         axios
//             .post(getVisitorUrl,
//                 payload)
//             .then(response => {
//                 const responseData = response.data.data.meetings;


//                 // Loop through the meetings to access each one and its meetingId
//                 responseData.forEach(meeting => {
//                     const meetingId = meeting.id; // This is the meetingId
//                     // Now you can use the meetingId as needed
//                     console.log("Meeting ID:", meetingId);
//                 });





//                 setMeetings(response.data.data.totalElements);
//                 // console.log(response.data.data.meetings.user);

//                 // console.log(visitorId,"visitorId")
//                 setVisitors(responseData);
//                 // setTotalMeetings(responseData.length);
//                 setTotalVisitors(response.data.data.totalElements);
//                 // const pendingCount = responseData.filter(visitor => visitor.status === 'PENDING').length;
//                 // const approvedCount = responseData.filter(visitor => visitor.status === 'APPROVED').length;
//                 // setPendingVisitors(pendingCount);
//                 // setApprovedVisitors(approvedCount);
//                 setPendingVisitors(response.data.data.totalPending);
//                 setApprovedVisitors(response.data.data.totalApproved);






//                 //test code

//                 // let totalPendingVisitors = 0;
//                 // let totalApprovedVisitors = 0;

//                 // responseData.forEach((visitor) => {
//                 //   if (visitor.status === 'PENDING') {
//                 //     totalPendingVisitors++;
//                 //   } else if (visitor.status === 'APPROVED') {
//                 //     totalApprovedVisitors++;
//                 //   }
//                 // });



//                 // console.log(response.data.data[0].id, "visitors");
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });


//     }



//     //date format
//     // const formatDate = (dateString) => {

//     //     const date = new Date(dateString);
//     //     return date.toLocaleString();
//     //   };


//     function getFullName(user) {
//         return `${user.firstName} ${user.lastName}`;
//     }

//     function formatMeetingDuration(meeting) {
//         const startDate = new Date(meeting.meetingStartDateTime);
//         const endDate = new Date(meeting.meetingEndDateTime);

//         const formattedDate = startDate.toLocaleDateString();
//         const startTime = startDate.toLocaleTimeString();
//         const endTime = endDate.toLocaleTimeString();

//         return `${formattedDate}, ${startTime} - ${endTime}`;
//     }




//     const handleDownloadPass = (meetingId, visitorName, visitorPhoneNumber) => {
//         // Replace 'your-pass-download-api-endpoint' with the actual API endpoint that serves the pass file
//         const passApiEndpoint = `http://192.168.12.54:8080/api/meeting/downloadPass?meetingId=${meetingId}`;

//         axios
//             .get(passApiEndpoint, {
//                 responseType: 'blob', // Set the response type to blob
//             })
//             .then((response) => {
//                 const blob = new Blob([response.data], { type: response.headers['content-type'] });
//                 const url = window.URL.createObjectURL(blob);
//                 const a = document.createElement('a');
//                 a.href = url;
//                 const fileName = `${visitorName}_${visitorPhoneNumber}_pass.pdf`;
//                 a.setAttribute('download', fileName);
//                 // a.download = ; // Set the desired file name
//                 a.click();
//                 window.URL.revokeObjectURL(url);
//             })
//             .catch((error) => {
//                 console.error('Error downloading pass:', error);
//             });
//     };






//     const handlePhoneNumberSearch = (event) => {
//         if (event.key === 'Enter') {
//             // Call the fetchData function when Enter key is pressed
//             fetchData();
//         }
//     };




//     useEffect(() => {


//         fetchData();
//         // getRoomsOption()
//     }, [page]);

//     const [sidebarOpen, setSidebarOpen] = useState(true);

//     const toggleSidebar = () => {
//         setSidebarOpen(!sidebarOpen);
//     };


//     return (
//         <>

//             <Navbar toggleSidebar={toggleSidebar} />
//             <Box sx={{ display: 'flex', flexGrow: 1, p: 3, width: '100%' }}>
//                 <Sidebar open={sidebarOpen} />
//                 <div style={{ display: "flex", justifyContent: "center", flexDirection: "", flexGrow: 1, }}>
//                     <div className="one" style={{ backgroundColor: '', border: "1px solid offwhite", flexGrow: 1 }}>
//                         <Grid container>
//                             <Grid container>
//                                 <Grid item xs={12}>
//                                     <Paper
//                                         // elevation={5}
//                                         sx={{
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             // width:'100%',
//                                             height: '4.5em',
//                                             mt: '3em',
//                                             mb: '0.5em'
//                                         }}
//                                     >
//                                         <Header title="Dashboard" subtitle="Welcome to dashboard" />
//                                     </Paper>
//                                 </Grid>

//                             </Grid>

//                         </Grid>
//                         {/* <Grid  item xs={12} sx={{ flexGrow: 1, backgroundColor: "red",width:"86%" }} >
//                             <Grid item xs={4} style={{ backgroundColor: "blue" }}>

//                             </Grid>

//                         </Grid> */}

//                         <Grid flexGrow={1} spacing={{ xs: 4}} sx={{ backgroundColor: "",justifyContent:"",flexDirection:"row" }} >

//                             <Grid container sx={{justifyContent:"space-between",backgroundColor:"", width:'95%',flexDirection:"row"}} >


//                                     <Grid item xs={2}  sx={{flex:'1'}}>
//                                         <Item sx={{height:"100px",width:"300px"}}><h2>Total Meetings</h2></Item>

//                                     </Grid>
//                                     <Grid item xs={2} sx={{flex:'1'}}>
//                                         <Item sx={{height:"100px",width:"300px"}}><h2>Pending Meetings</h2></Item>

//                                     </Grid>
//                                     <Grid item xs={2} sx={{flex:'1'}}>
//                                         <Item sx={{height:"100px",width:"300px"}}><h2>Approved Meetings</h2></Item>

//                                     </Grid>
//                                     <Grid item xs={2} sx={{flex:'1'}}>
//                                         <Item sx={{height:"100px",width:"300px"}}><h2>Inprocess Meetings</h2></Item>

//                                     </Grid>
//                                     <Grid item xs={2} sx={{flex:'1'}}>
//                                         <Item sx={{height:"100px",width:"300px"}}><h2>Completed Meetings</h2></Item>

//                                     </Grid>



//                             </Grid>



//                         </Grid>

//                         {/* </Box> */}




//                     </div>

//                 </div>

//             </Box>



//         </>
//     )
// }








//again

import React from 'react';
import axios from "axios";

// import './Dashboard.css';
import '../../css/DashboardReceptionist.css';

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


import PendingIcon from '@mui/icons-material/Pending';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

import DoughnutChart from './DoughnutChart';
import ProgressBar from './ProgressBar';
import Loader from '../Loader';

// import { createBrowserHistory } from 'history';

// import PieChart from './Piechart';


import ReceptionistDashboard from './ReceptionistDashboard'








const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));






export default function Dashboard() {

    const [allData, setAllData] = useState(null);


    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };


    //paperclick
    // const history = useHistory();


// const customHistory = createBrowserHistory();


//     const handlePaperClick = () => {
        
//   customHistory.push('dashboardreceptionist');

//     }





    const [visitors, setVisitors] = useState([]);

    const [totalVisitors, setTotalVisitors] = useState(0);
    const [pendingVisitors, setPendingVisitors] = useState(0);
    const [approvedVisitors, setApprovedVisitors] = useState(0);
    const [inProcessVisitors, setInprocessVisitors] = useState(0);
    const [completedVisitors, setCompletedVisitors] = useState(0);



    const companyId = localStorage.getItem('companyId');




      function fetchData() {

        const today = new Date().toISOString().split('T')[0];

        const eightDaysAgo = new Date();
        eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);
        const eightDaysAgoFormatted = eightDaysAgo.toISOString().split('T')[0];



        const payload = {
            page: 0,
            size: 1000,
            // phoneNumber: '',
            // searchQuery: '',
            companyId: companyId,
            fromDate:eightDaysAgoFormatted,
            toDate:today
            // status:status,
            // date:'2023-10-18T11:00:00'

        }
        const getVisitorUrl = `http://192.168.12.54:8080/api/meeting/paginateDashBoard`
        axios
            .post(getVisitorUrl,
                payload)
            .then(response => {

                setAllData(response.data.data);
                const responseData = response.data.data.meetings;


               
                // responseData.forEach(meeting => {
                //     const meetingId = meeting.id; 
                   
                // });

                

                setVisitors(responseData);
           
                setTotalVisitors(response.data.data.totalElements);
            
                setPendingVisitors(response.data.data.totalPending);
                setApprovedVisitors(response.data.data.totalApproved);
                setInprocessVisitors(response.data.data.totalInProcess);
                setCompletedVisitors(response.data.data.totalCompleted);

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });


    }


    useEffect(() => {
        fetchData();
    }, [])





    return (
        <>

            <Navbar toggleSidebar={toggleSidebar} />
            <Box sx={{ display: 'flex', flexGrow: 1, p: 3, width: '100%' }}>
                <Sidebar open={sidebarOpen} />
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "", flexGrow: 1, }}>
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
                                        <Header title="Dashboard" subtitle="Welcome to dashboard" />
                                    </Paper>
                                </Grid>

                            </Grid>

                        </Grid>
                        <Grid sx={{ flexGrow: 1, backgroundColor: "" }} >
                            <Grid item xs={12} style={{ backgroundColor: "" }}>
                                <Grid style={{ gap: "10px", marginTop: "20px", flexGrow: 1, backgroundColor: "" }} container justifyContent="space-evenly" >
                                    <Paper  elevation={1} sx={{
                                        height: 150,
                                        width: 300,
                                        // display: 'flex', // Use flex display
                                        // alignItems: 'center',// Vertically center content
                                        // borderRadius:"40px",
                                        backgroundColor: "#32577e",


                                        // boxShadow: "5px 5px 10px grey",

                                        // ":hover": {
                                        //     boxShadow: "10px 10px 20px grey",
                                        //     cursor: "pointer"
                                        // },

                                        // backgroundColor: (theme) =>
                                        //     theme.palette.mode === 'dark' ? '#1A2027' : '#fff',


                                    }}>


                                        {/* <h2>Total Meetings</h2> */}
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "" }}>


                                            <div className='icon' style={{ height: "150px", width: "70px", backgroundColor: "#618fbed9", marginTop: "", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px" }}>
                                                <PersonOutlineIcon style={{ fontSize: "50px", color: "" }} />



                                            </div>



                                            <div className='info' style={{ marginRight: "50px", display: "flex", flexDirection: "column", backgroundColor: "", alignItems: "center", textAlign: "center" }}>
                                                <h3>Total Meetings:</h3>
                                                <h2>{totalVisitors}</h2>

                                            </div>

                                        </div>
                                        {/* {isOpen && <ReceptionistDashboard />} */}

                                    </Paper>
                                    <Paper elevation={1} sx={{
                                        height: 150,
                                        width: 300,
                                        backgroundColor: "#32577e",

                                        // boxShadow: "5px 5px 10px grey",

                                        // ":hover": {
                                        //     boxShadow: "10px 10px 20px grey",
                                        //     cursor: "pointer"
                                        // },

                                        // backgroundColor: (theme) =>
                                        //     theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    }}>


                                        {/* <PendingIcon /> */}
                                        {/* <h2>Pending Meetings</h2> */}
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <div className='icon' style={{ height: "150px", width: "70px", backgroundColor: "#618fbed9", marginTop: "", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <PendingIcon style={{ fontSize: "50px" }} />

                                            </div>
                                            <div className='info' style={{ marginRight: "30px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", backgroundColor: "" }}>
                                                <div><h3>Pending Meetings:</h3></div>
                                                <div><h2>{pendingVisitors}</h2></div>

                                            </div>

                                        </div>
                                    </Paper>
                                    <Paper elevation={1} sx={{
                                        height: 150,
                                        width: 300,
                                        backgroundColor: "#32577e",
                                        // boxShadow: "5px 5px 10px grey",

                                        // ":hover": {
                                        //     boxShadow: "10px 10px 20px grey",
                                        //     cursor: "pointer"
                                        // },

                                        // backgroundColor: (theme) =>
                                        //     theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    }}>




                                        {/* <h2>Approved Meetings</h2> */}
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <div className='icon' style={{ height: "150px", width: "70px", backgroundColor: "#618fbed9", marginTop: "", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <HowToRegIcon style={{ fontSize: "50px" }} />

                                            </div>
                                            <div className='info' style={{ marginRight: "30px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "" }}>
                                                <div><h3>Approved Meetings:</h3></div>
                                                <div><h2>{approvedVisitors}</h2></div>

                                            </div>

                                        </div>

                                    </Paper>

                                    <Paper elevation={1} sx={{
                                        height: 150,
                                        width: 300,
                                        backgroundColor: "#32577e",
                                        // boxShadow: "5px 5px 10px grey",

                                        // ":hover": {
                                        //     boxShadow: "10px 10px 20px grey",
                                        //     cursor: "pointer"
                                        // },

                                        // backgroundColor: (theme) =>
                                        //     theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    }}>


                                        {/* <h2>Inprocess Meetings</h2> */}
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <div className='icon' style={{ height: "150px", width: "80px", backgroundColor: "#618fbed9", marginTop: "", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <WatchLaterIcon style={{ fontSize: "50px" }} />

                                            </div>
                                            <div className='info' style={{ marginRight: "30px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "" }}>
                                                <div><h3>Inprocess Meetings:</h3></div>
                                                <div><h2>{inProcessVisitors}</h2></div>

                                            </div>

                                        </div>

                                    </Paper>
                                    <Paper elevation={1} sx={{
                                        height: 150,
                                        width: 300,
                                        backgroundColor: "#32577e",

                                        // boxShadow: "5px 5px 10px grey",

                                        // ":hover": {
                                        //     boxShadow: "10px 10px 20px grey",
                                        //     cursor: "pointer"
                                        // },

                                        // backgroundColor: (theme) =>
                                        //     theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    }}>


                                        {/* <h2>Completed Meetings</h2> */}
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <div className='icon' style={{ height: "150px", width: "70px", backgroundColor: "#618fbed9", marginTop: "", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <LibraryAddCheckIcon style={{ fontSize: "50px" }} />

                                            </div>
                                            <div className='info' style={{ marginRight: "30px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "" }}>
                                                <div><h3>Completed Meetings:</h3></div>
                                                <div><h2>{completedVisitors}</h2></div>

                                            </div>

                                        </div>

                                    </Paper>




                                </Grid>
                            </Grid>

                        </Grid>


                        {/* code */}

                        <Grid sx={{ flexGrow: 1, backgroundColor: "" }} >
                            <Grid item xs={12} style={{ backgroundColor: "" }}>
                                <Grid style={{ gap: "20px", marginTop: "20px" }} container justifyContent="space-between" >
                                    <Paper style={{ backgroundColor: "", display: "flex", justifyContent: "center" }} elevation={7} sx={{
                                        height: 570,
                                        width: 900,
                                        flexGrow: 1,

                                        // border:
                                        // display: 'flex', // Use flex display
                                        // alignItems: 'center',// Vertically center content
                                        // borderRadius:"40px",
                                        backgroundColor: "",


                                        // boxShadow: "5px 5px 10px grey",

                                        // ":hover": {
                                        //     boxShadow: "10px 10px 20px grey",
                                        //     cursor: "pointer"
                                        // },

                                        // backgroundColor: (theme) =>
                                        //     theme.palette.mode === 'dark' ? '#1A2027' : '#fff',


                                    }}>


                                        {/* <h2>Today Meetings Chart</h2> */}
                                        <div>
                                            <h2 style={{ color: "black" }}>Meeting Hours</h2>
                                            <ProgressBar />
                                        </div>


                                    </Paper>
                                    <Paper elevation={7} sx={{
                                        height: 570,
                                        width: 550,
                                        flexGrow: 1,
                                        // backgroundColor: "#32577e",
                                        // boxShadow: "5px 5px 10px grey",

                                        // ":hover": {
                                        //     boxShadow: "10px 10px 20px grey",
                                        //     cursor: "pointer"
                                        // },

                                        // backgroundColor: (theme) =>
                                        //     theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    }}>


                                        <div className="rooms">
                                            <h2 style={{ color: "black",bottom:"" }}>Room Details</h2>
                                            <DoughnutChart  allData={allData}/>

                                        </div>
                                        {/* <PieChart/> */}




                                    </Paper>





                                </Grid>
                            </Grid>

                        </Grid>




                    </div>

                </div>

            </Box>



        </>
    )
}