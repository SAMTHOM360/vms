

//again

import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
import { useAuth } from '../../routes/AuthContext';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



export default function Dashboard() {

    const {setActiveListItem} = useAuth()

    // sessionStorage.setItem('activeListItem', '/dashboardreceptionist')
    setActiveListItem('/dashboardreceptionist')

    const [allData, setAllData] = useState(null);


    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };



    const [visitors, setVisitors] = useState([]);

    const [totalVisitors, setTotalVisitors] = useState(0);
    const [pendingVisitors, setPendingVisitors] = useState(0);
    const [approvedVisitors, setApprovedVisitors] = useState(0);
    const [inProcessVisitors, setInprocessVisitors] = useState(0);
    const [completedVisitors, setCompletedVisitors] = useState(0);

    const [filteredVisitors, setFilteredVisitors] = useState([]);


    const [pendingVisitorsStatus, setPendingVisitorsStatus] = useState(0);
    const [approvedVisitorsStatus, setApprovedVisitorsStatus] = useState(0);
    const [inProcessVisitorsStatus, setInprocessVisitorsStatus] = useState(0);
    const [completedVisitorsStatus, setCompletedVisitorsStatus] = useState(0);



    const companyId = sessionStorage.getItem('companyId');




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
            fromDate: eightDaysAgoFormatted,
            toDate: today
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

                console.log(response.data.data.status, "statusssss");
                // responseData.forEach(meeting => {
                //     const meetingId = meeting.id; 

                // });

                setVisitors(responseData);

                setTotalVisitors(response.data.data.totalElements);

                setPendingVisitors(response.data.data.totalPending);
                setApprovedVisitors(response.data.data.totalApproved);
                setInprocessVisitors(response.data.data.totalInProcess);
                setCompletedVisitors(response.data.data.totalCompleted);
                setPendingVisitorsStatus(response.data.data.status)

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }


    useEffect(() => {
        fetchData();
    }, [])

    const navigate = useNavigate();
    const routeChange = (filteredVisitors) => {
        let path = `/receptionistdashboard`;

        navigate(path);

        if (filteredVisitors) {
            sessionStorage.setItem("filters", filteredVisitors)
            navigate(path);

        }
        else {
            navigate(path);
        }
    }

const routeChange1 = ()=>{
    let path1= '/receptionistdashboard';
    navigate(path1);
}


    return (
        <>
            <Box sx={{ display: "flex", flexGrow: 1, p: 3, }}>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
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
                                                    minHeight: '4.5em',
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
                                            <Paper onClick={routeChange1} elevation={1} sx={{
                                                height: 150,
                                                width: 300,
                                                // display: 'flex', // Use flex display
                                                // alignItems: 'center',// Vertically center content
                                                // borderRadius:"40px",
                                                backgroundColor: "#32577e",
                                                cursor: "pointer"



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
                                            <Paper onClick={() => routeChange('PENDING')} elevation={1} sx={{
                                                height: 150,
                                                width: 300,
                                                backgroundColor: "#32577e",
                                                cursor: "pointer"


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
                                            <Paper onClick={() => routeChange('APPROVED')} elevation={1} sx={{
                                                height: 150,
                                                width: 300,
                                                backgroundColor: "#32577e",
                                                cursor: "pointer"
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

                                            <Paper onClick={() => routeChange('INPROCESS')} elevation={1} sx={{
                                                height: 150,
                                                width: 300,
                                                backgroundColor: "#32577e",
                                                cursor: "pointer"
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
                                            <Paper onClick={() => routeChange('COMPLETED')} elevation={1} sx={{
                                                height: 150,
                                                width: 300,
                                                backgroundColor: "#32577e",
                                                cursor: "pointer"

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
                                        <Grid style={{ gap: "20px", marginTop: "20px",backgroundColor:"" }} container justifyContent="space-between" >
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
                                                    {/* <h2 style={{ color: "black" }}>Meeting Hours</h2> */}
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
                                                    <h2 style={{ color: "black", bottom: "" }}>Room Details</h2>
                                                    <DoughnutChart allData={allData} />

                                                </div>
                                              
                                            </Paper>

                                        </Grid>
                                    </Grid>

                                </Grid>




                            </div>

                        </div>
                    </Grid>
                </Grid>
            </Box>


        </>
    )
}