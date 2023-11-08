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
import Loader from '../Loader';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
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


//calender
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useStaticPicker } from '@mui/x-date-pickers/internals';





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



const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "meetings", headerName: "Number of meetings", flex: 1 },
    { field: "meetingHours", headerName: "Meeting hours", flex: 1 },

]
const rowsPerPage = 10;


export default function Dashboard() {


    //pagination and filter

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    // const rowsPerPage = 10;







    const [visitors, setVisitors] = useState([]);

    const [passVisitors, setPassVisitors] = useState([]);

    const [meetings, setMeetings] = useState([]);
    const [meetingsPerPage, setMeetingsPerPage] = useState([]);


    // const rowsPerPage = 10;//now
    const [totalVisitors, setTotalVisitors] = useState(0);
    const [pendingVisitors, setPendingVisitors] = useState(0);
    const [approvedVisitors, setApprovedVisitors] = useState(0);




    const [item, setItem] = useState('');



    const [phoneNumberFilter, setPhoneNumberFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');


    //calender
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);



    const handleStartDateChange = (date) => {
        setStartDate(date);
        //  console.log(selectedStatusOptions,"acsd")
    };


    const handleEndDateChange = (date) => {
        setEndDate(date);
        //  fetchData();
    };



    //status
    const [statusOptions, setStatusOptions] = useState([]);
    const [selectedStatusOptions, setSelectedStatusOptions] = useState("");
    const [status, setStatus] = useState('');

    console.log(selectedStatusOptions, "selectedstatus");


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

    const [roomAdded, setRoomAdded] = useState(false);


    function calculateSerialNumber(page, rowsPerPage, index) {
        if (phoneNumberFilter || startDate || endDate || selectedStatusOptions) {
            return 0 * rowsPerPage + index + 1;

        }
        else {
            return page * rowsPerPage + index + 1;

        }

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


    //  add meeting details  
    const handleAddMeeting = () => {
        // if (status === 'APPROVED' && !selectedRoom) {
        // if (status === 'APPROVED') {

        //     console.log("APPROVED") //alert("Room is required")

        // }
        // else {
        const meetingData = {

            id: item.id,
            status: "APPROVED",
            // user: {
            //     id: adminId
            // },
            // visitor: {
            //     id: item.visitor.id
            // },
            room: {
                id: selectedRoom
            }




        };

        const addMeetingUrl = 'http://192.168.12.54:8080/api/meeting/update/meeting';

        axios.post(addMeetingUrl, meetingData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
            .then((response) => {



                // handleCloseModal();
                // setSelectedRoom('');
                // setStatus('')

                if (response.data.message === "CANCELLED Successfully") {
                    alert("Meeting cancelled succesfully")
                }
                else {
                    alert("Room added succesfully")
                    setRoomAdded(true);
                }



            })
            .catch((error) => {

                console.error('Error adding meeting:', error);

            });
        // };


    }


    //export



    function downloadFile(url) {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'meeting_details.xlsx');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    function excelExport() {

        const companyId = localStorage.getItem('companyId');

        const exportUrl = `http://192.168.12.54:8080/api/meeting/exportdata`;

        const payload = {
            page: 0,
            size: 100,
            phoneNumber: phoneNumberFilter,
            fromDate: startDate,
            toDate: endDate,

            companyId: companyId,

            status: selectedStatusOptions.length === 0 ? null : selectedStatusOptions,
            // date:'2023-10-18T11:00:00'

        }

        axios.post(exportUrl, payload, {

            // responseType: 'blob', // important
        })
            .then(response => {
                const url = response.data.data;
                console.log(url, "files")
                downloadFile(url)


                // const url = window.URL.createObjectURL(new Blob([data]));
                // const link = document.createElement('a');
                // link.href = url;
                // link.setAttribute('download', `${Date.now()}.xlsx`);
                // document.body.appendChild(link);
                // link.click();







            }).catch(error => {
                console.error('Error fetching data:', error);
            });
    }



    //pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        // fetchData(newPage);
    };



    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0); 
    };


    // const { id } = useParams();

    const adminId = localStorage.getItem('adminId');
    // console.log(adminId, "adminId");

    // const { adminId } = useParams();



    function fetchData() {



        const companyId = localStorage.getItem('companyId');


        const payload = {
            page: phoneNumberFilter || startDate && endDate || selectedStatusOptions ? 0 : page,
            size: phoneNumberFilter || startDate && endDate || selectedStatusOptions ? 1000 : rowsPerPage,
            phoneNumber: phoneNumberFilter,
            companyId: companyId,
            fromDate: startDate,
            toDate: endDate,
            status: selectedStatusOptions.length === 0 ? null : selectedStatusOptions,
            // date:'2023-10-18T11:00:00'

        }
        const getVisitorUrl = `http://192.168.12.54:8080/api/meeting/paginate`
        axios
            .post(getVisitorUrl,
                payload)
            .then(response => {
                const responseData = response.data.data.meetings;

                // const passResponseData = response.data.data.meetings;
                // console.log(passResponseData,"passREsponseData");


                // Loop through the meetings to access each one and its meetingId
                responseData.forEach(meeting => {
                    const meetingId = meeting.id; // This is the meetingId
                    // Now you can use the meetingId as needed
                    console.log("Meeting ID:", meetingId);
                });




                setMeetingsPerPage(response.data.data.totalMeeting);
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

    // function formatMeetingDuration(meeting) {
    //     const startDate = new Date(meeting.meetingStartDateTime);
    //     const endDate = new Date(meeting.meetingEndDateTime);

    //     const formattedDate = startDate.toLocaleDateString();
    //     const startTime = startDate.toLocaleTimeString();
    //     const endTime = endDate.toLocaleTimeString();

    //     return `${formattedDate}, ${startTime} - ${endTime}`;
    // }

    function formatMeetingDuration(meeting) {
        const startTimestamp = meeting.checkInDateTime;
        const endTimestamp = meeting.checkOutDateTime;



        // Create JavaScript Date objects with IST timezone
        const startDate = new Date(startTimestamp);
        startDate.setHours(startDate.getHours() - 5);
        startDate.setMinutes(startDate.getMinutes() - 30);
        const endDate = new Date(endTimestamp);

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
        const formattedEnd = new Intl.DateTimeFormat('en-US', options).format(endDate);

        return `${formattedStart}`;
    }

    function formatMeetingDuration1(meeting) {

        const endTimestamp = meeting.checkOutDateTime;
        console.log(endTimestamp, "endtimestamp")



        // Create JavaScript Date objects with IST timezone
        if (endTimestamp != null) {
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


    const handleDownloadPass = (meetingId, visitorName, visitorPhoneNumber) => {

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
                alert('Pass downloaded succesfully');
                handleCloseModal();
            })
            .catch((error) => {
                console.error('Error downloading pass:', error);
            });
    };






    const handlePhoneNumberSearch = (event) => {
        if (event.key === 'Enter') {
            // Call the fetchData function when Enter key is pressed
            fetchData(phoneNumberFilter);
        }
    };




    useEffect(() => {


        fetchData();
        getRoomsOption();
        fetchStatusOptions();
        // filterData();

        // console.log(statusOptions,"statusOptions")




    }, [page,rowsPerPage, selectedStatusOptions, phoneNumberFilter, startDate, endDate]);


    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };




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
                                        <Header title="Meetings" subtitle="Get all the meeting list" />
                                    </Paper>
                                </Grid>

                            </Grid>

                        </Grid>
                        <Grid sx={{ flexGrow: 1, backgroundColor: "" }} >
                            {/* <Grid item xs={12} style={{ backgroundColor: "" }}> */}
                            {/* <Grid style={{ gap: "30px", marginTop: "" }} container justifyContent="center" > */}
                            {/* <Paper style={{ backgroundColor: "" }} elevation={1} sx={{
                                        height: 150,
                                        width: 400,
                                        display: 'flex', // Use flex display
                                        alignItems: 'center',// Vertically center content
                                        // borderRadius:"40px",
                                        backgroundColor: "red",


                                        boxShadow: "5px 5px 10px grey",

                                        ":hover": {
                                            boxShadow: "10px 10px 20px grey",
                                            cursor: "pointer"
                                        },

                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',


                                    }}>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "" }}>


                                            <div className='icon' style={{ height: "150px", width: "80px", backgroundColor: "skyblue", marginTop: "", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "50px" }}>
                                                <PersonOutlineIcon style={{ fontSize: "50px" }} />

                                            </div>



                                            <div className='info' style={{ marginLeft: "50px", display: "flex", flexDirection: "column", backgroundColor: "", alignItems: "center", textAlign: "center" }}>
                                                <h2>Total Visitors:</h2>
                                                <h2>{totalVisitors}</h2>

                                            </div>

                                        </div>

                                    </Paper> */}



                            {/* </Grid> */}
                            {/* </Grid> */}

                        </Grid>
                        <Grid container style={{ marginTop: "40px" }}>
                            <Grid item xs={12} style={{ backgroundColor: "" }}>
                                <Item elevation={2} style={{ height: '', margin: '10px', backgroundColor: "" }}>
                                    <div style={{ display: "flex", justifyContent: "", width: "100%", backgroundColor: "" }}>
                                        {/* <h1 style={{ textAlign: "left" }}>Visitors</h1> */}
                                        {/* <button type="submit" onclick={<MeetingDetails/>}>Add User</button> */}


                                        {/* <Grid style={{
                                            position: '',
                                            right: 0,
                                            // marginTop: "15px",
                                            marginBottom: "20px",
                                            width: "100%",
                                            height: "50px",
                                            marginRight: "10px",
                                            borderRadius: "10px",
                                            gap: "30px",
                                            display: "flex",
                                            // flexDirection:"column",
                                            justifyContent: "flex-start",
                                            backgroundColor: "red"
                                        }}> */}




                                        {/* <input
                                                type="text"
                                                placeholder="Search..."
                                                // value={phoneNumberFilter}
                                                // onChange={(e) => setPhoneNumberFilter(e.target.value)} // Update phone number filter state
                                                // onKeyPress={handlePhoneNumberSearch}

                                                style={{
                                                    // position: '',
                                                    // right: 0,
                                                    // marginTop: "15px",
                                                    // marginBottom: "15px",
                                                    height: "45px",
                                                    width: "250px",

                                                    borderRadius: "10px",
                                                    // border: "none"
                                                }}
                                            /> */}







                                        {/* </Grid> */}

                                        {/* <Grid> */}
                                        {/* <input
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
                                                    height: "45px",
                                                    width: "250px",

                                                    borderRadius: "10px",
                                                    // border: "none"
                                                }}
                                            /> */}


                                        {/* </Grid> */}

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
                                                <Grid style={{ display: "flex", flexDirection: "", justifyContent: "space-between", margin: "", backgroundColor: "", gap: "20px", width: "" }}>



                                                    <Grid style={{ backgroundColor: "", display: "flex", flexDirection: "row" }}>
                                                        <TextField
                                                            id="outlined-select-currency"
                                                            select
                                                            label="Search by Status"
                                                            value={selectedStatusOptions}
                                                            // onChange={(e) => setPhoneNumberFilter(e.target.value)} // Update phone number filter state
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




                                                        <TextField id="outlined-search" label="Search By Phone Number" value={phoneNumberFilter}
                                                            onChange={(e) => setPhoneNumberFilter(e.target.value)} // Update phone number filter state
                                                            onKeyPress={handlePhoneNumberSearch} type="search" style={{ top: "10px" }} />


                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DemoContainer components={['DatePicker', 'DatePicker']}>

                                                                <DatePicker
                                                                    label="Start Date"
                                                                    value={startDate}
                                                                    // onChange={(newValue) => setStartDate(newValue)}
                                                                    onChange={handleStartDateChange}
                                                                />
                                                                <DatePicker
                                                                    label="End Date"
                                                                    value={endDate}
                                                                    // onChange={(newValue) => setEndDate(newValue)}
                                                                    onChange={handleEndDateChange}
                                                                />
                                                            </DemoContainer>
                                                        </LocalizationProvider>
                                                    </Grid>

                                                    <Grid style={{ backgroundColor: "", right: 0 }}>
                                                        <Button variant="contained" onClick={excelExport} sx={{ marginLeft: "", width: "200px", height: "50px", top: "20px", gap: "3px", backgroundColor: "" }}><FileDownloadIcon />Meetings Export</Button>

                                                    </Grid>






                                                </Grid>



                                            </Box>

                                        </Grid>



                                    </div>

                                    <TableContainer component={Paper} sx={{ width: '100%', boxShadow: 6, backgroundColor: "" }}>
                                        <Table sx={{}} aria-label="simple table">
                                            <TableHead sx={{ backgroundColor: '#2b345386', border: "1px solid black",fontWeight:600 }}>
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
                                                    {/* <TableCell align="left">Room</TableCell> */}

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

                                                            <TableCell>{calculateSerialNumber(page, rowsPerPage, index)}</TableCell>

                                                            <TableCell align="left">{visitor.visitor.name}</TableCell>

                                                            {/* <TableCell align="right">{visitor.visitor.email}</TableCell> */}
                                                            <TableCell align="left">{visitor.visitor.phoneNumber}</TableCell>

                                                            <TableCell align="left">{visitor.visitor.companyName}</TableCell>
                                                            <TableCell align="left">{getFullName(visitor.user)}</TableCell>
                                                            {/* <TableCell align="right">{visitor.remarks}</TableCell> */}
                                                            {/* <TableCell align="left">{visitor.room.roomName}</TableCell> */}
                                                            <TableCell align="left">{formatMeetingDuration(visitor)}</TableCell>
                                                            {/* <TableCell align="right">{formatDate(visitor.meetingEndDateTime)}</TableCell> */}

                                                            <TableCell align="left">{formatMeetingDuration(visitor)}</TableCell>
                                                            <TableCell align="left">{formatMeetingDuration1(visitor)}</TableCell>
                                                            {/* <TableCell align="left">{visitor.checkOutDateTime}</TableCell> */}
                                                            <TableCell align="left">{visitor.status}</TableCell>

                                                            {/* <TableCell align="right">{visitor.meetingStartDateTime}</TableCell>
                                                        <TableCell align="right">{visitor.meetingEndDateTime}</TableCell>
                                                        <TableCell align="right">{visitor.remarks}</TableCell>
                                                        <TableCell align="right">{visitor.status}</TableCell> */}
                                                            <TableCell align="right">

                                                                {/* //download pass
                                                            {visitor.status === 'COMPLETED' || visitor.status === 'CANCELLED' || visitor.status === 'PENDING' ? (
                                                                
                                                                <DownloadIcon style={{ color: 'lightgray', pointerEvents: 'none' }} />
                                                            ) : (
                                                            
                                                                <DownloadIcon style={{cursor:"pointer"}} onClick={() => handleDownloadPass(visitor.id,visitor.visitor.name,visitor.visitor.phoneNumber)} />
                                                            )} */}


                                                                {visitor.status === 'COMPLETED' || visitor.status === 'CANCELLED' || visitor.status === 'PENDING' || visitor.status === 'INPROCESS' ? (
                                                                    // Disable the Edit button
                                                                    <EditIcon style={{ color: 'lightgray', pointerEvents: 'none' }} />
                                                                ) : (
                                                                    // Enable the Edit button
                                                                    <EditIcon onClick={() => handleOpenModal(visitor)} />
                                                                )}



                                                            </TableCell>

                                                        </TableRow>
                                                    ))}
                                            </TableBody>

                                        </Table>
                                        <TablePagination
                                            //   rowsPerPageOptions={[10, 25, 50, 100]}
                                            rowsPerPageOptions={[5, 10, 15]}
                                            component="div"



                                            // count={meetings}

                                            count={phoneNumberFilter || startDate || endDate || selectedStatusOptions ? 1 : meetings}

                                            // rowsPerPage={ phoneNumberFilter || startDate || endDate || selectedStatusOptions ? 10 : rowsPerPage}





                                            rowsPerPage={rowsPerPage}
                                            page={phoneNumberFilter || startDate || endDate || selectedStatusOptions ? 0 : page}
                                            // page={page}
                                            onPageChange={
                                                handleChangePage}
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



                                    <FormControl fullWidth>
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
                                    </FormControl>

                                    {/* <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={
                                            
                                        }
                                        label="status"
                                        onChange={handleChangeStatus}
                                    >
                                        <MenuItem value='APPROVED'>APPROVE</MenuItem>
                                        <MenuItem value='CANCELLED' >CANCEL</MenuItem>

                                    </Select>
                                </FormControl> */}



                                    <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
                                        <Button variant='contained' onClick={handleAddMeeting} >Add Room</Button>


                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", gap: "5px" }}>


                                        {/* <Button variant='contained' onClick={() => handleDownloadPass(item.id,item.visitor.name,item.visitor.phoneNumber)}>Pass</Button> */}

                                        {roomAdded && (
                                            <Button variant="contained" onClick={() => handleDownloadPass(item.id, item.visitor.name, item.visitor.phoneNumber)}>Generate Pass</Button>
                                        )}

                                        <Button variant='contained' onClick={handleCloseModal}>Close</Button>


                                    </div>








                                </Box>








                            </Box>
                        </StyledModal>


                    </div>

                </div>

            </Box>



        </>
    )
}
