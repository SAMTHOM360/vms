




import React from 'react';
// import './Dashboard.css';
import '../../css/ReceptionistDashboard.css'
// import '../Receptionist/MeetingDetails';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';


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
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InfoIcon from '@mui/icons-material/Info';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { Tooltip } from "@mui/material";

import { useParams } from 'react-router-dom';
//modal

import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';



//dialog
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

//calender
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useStaticPicker } from '@mui/x-date-pickers/internals';
import { style } from '@mui/system';
import { useAuth } from '../../routes/AuthContext';
import Config from '../../Config/Config';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



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
    const { setActiveListItem } = useAuth()
    const navigate = useNavigate()
    // sessionStorage.setItem('activeListItem', '/receptionistdashboard')
    useEffect(() => {
        setActiveListItem('/receptionistdashboard')
    }, [setActiveListItem])

    //pagination and filter

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [visitors, setVisitors] = useState([]);

    const [passVisitors, setPassVisitors] = useState([]);

    const [meetings, setMeetings] = useState(0);
    const [meetingsLength, setMeetingsLength] = useState(0);
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



    //handleclearfilters
    const handleClearFilters = () => {
        setSelectedStatusOptions('')
        setSelectedHostOptions('')
        setPhoneNumberFilter('')
        setSelectedRoom('')
        setStartDate(null)
        setEndDate(null)
        setSearchQuery('')
        sessionStorage.removeItem('filters')
        sessionStorage.removeItem('empFilteredFromDate');
        sessionStorage.removeItem('empFilteredToDate');
    }




    //status
    const [statusOptions, setStatusOptions] = useState([]);
    const [selectedStatusOptions, setSelectedStatusOptions] = useState("");

    const handleChangeStatus = (event) => {

        setSelectedStatusOptions(event.target.value);

        // console.log(event.target.value,"xyz");
        // fetchData();

    };


    //status modal
    const [statusModal, setStatusModal] = useState([]);
    const [selectedStatusModal, setSelectedStatusModal] = useState([]);


    const handleChangeStatusModal = (event) => {

        setSelectedStatusModal(event.target.value);

        // console.log(event.target.value,"xyz");
        // fetchData();

    };

    function fetchStatusOptions() {

        // const statusUrl = `http://192.168.12.54:8080/vis/meetstatus`;
        const statusUrl = Config.baseUrl + Config.apiEndPoints.statusRecepEndPoint;
        axios.get(statusUrl)
            .then(response => {
                const data = response.data.data;

                setStatusOptions(data);
                // setStatusModal(data);
            }).catch(error => {
                console.error('Error fetching data:', error);
            });

    }

    function fetchStatusOptions1() {

        // const statusUrl = `http://192.168.12.54:8080/vis/meetstatusadmin`;
        const statusUrl = Config.baseUrl + Config.apiEndPoints.statusAdminEndPoint

        axios.get(statusUrl)
            .then(response => {
                const data = response.data.data;
                setStatusModal(data);



            }).catch(error => {
                console.error('Error fetching data:', error);
            });

    }

    //host

    const [hostOptions, setHostOptions] = useState([]);
    const [selectedHostOptions, setSelectedHostOptions] = useState("");


    const handleChangeHost = (event) => {

        setSelectedHostOptions(event.target.value);

    };


    function fetchHostOptions() {

        // const hostUrl = `http://192.168.12.54:8080/api/user/alluser?companyId=${selectedCompanyId}`;

        const hostUrl = Config.baseUrl + Config.apiEndPoints.hostEndPoint + "?companyId=" + selectedCompanyId

        axios.get(hostUrl)
            .then(response => {
                const data = response.data.data;
                console.log(data, "hostnames")

                setHostOptions(data);

            }).catch(error => {
                console.error('Error fetching data:', error);
            });

    }



    const [roomAdded, setRoomAdded] = useState(false);

    function calculateSerialNumber(page, rowsPerPage, index) {
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
    const [filterSelectedRoom, setFilterSelectedRoom] = useState('');

    const [selectedRoomOptions, setSelectedRoomOptions] = useState('');


    const handleChange2 = (event) => {
        setFilterSelectedRoom(event.target.value);
    }


    const handleChange1 = (event) => {
        setSelectedRoom(event.target.value);

    };


    const selectedCompanyId = sessionStorage.getItem('selectedCompanyId');
    console.log(selectedCompanyId, "hello")

    function getRoomsOption() {


        // const companyId = sessionStorage.getItem('companyId');


        // const roomUrl = `http://192.168.12.54:8080/api/room/all?id=${selectedCompanyId}`;
        const roomUrl = Config.baseUrl + Config.apiEndPoints.roomDetailsRecepEndPoint + "?id=" + selectedCompanyId

        axios.get(roomUrl, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },

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

        const meetingData = {

            id: item.id,
            status: item.user.isPermission === true && item.room === null && item.status === "PENDING" ? selectedStatusModal : item.status,
            // status: 'APPROVED',

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

        // const addMeetingUrl = 'http://192.168.12.54:8080/api/meeting/update/meeting';

        const addMeetingUrl = Config.baseUrl + Config.apiEndPoints.addMeetingEndPoint

        axios.post(addMeetingUrl, meetingData, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        })
            .then((response) => {



                // handleCloseModal();
                setSelectedRoom('');
                setSelectedStatusModal('');

                // setStatus('')

                if (response.data.message === "Meeting is cancelled") {
                    alert("Meeting cancelled succesfully")
                }
                else {
                    console.log(selectedRoom, "selectedRoom")
                    alert("Room added succesfully")
                    setRoomAdded(true);
                }

                fetchData();


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

        // const selectedCompanyId = sessionStorage.getItem('companyId');

        // const exportUrl = `http://192.168.12.54:8080/api/meeting/exportdata`;
        const exportUrl = Config.baseUrl + Config.apiEndPoints.exportRecepEndPoint

        const payload = {
            page: 0,
            size: 1000,
            phoneNumber: phoneNumberFilter.length === 0 ? null : phoneNumberFilter,
            fromDate: startDate,
            toDate: endDate,

            companyId: selectedCompanyId,
            user: {

                id: selectedHostOptions.length === 0 ? null : selectedHostOptions,
            },

            room: {
                id: filterSelectedRoom.length === 0 ? null : filterSelectedRoom,
            },

            status: selectedStatusOptions.length === 0 ? null : selectedStatusOptions,
            // date:'2023-10-18T11:00:00'

        }

        axios.post(exportUrl, payload, {

            // responseType: 'blob', // important
        })
            .then(response => {
                const url = response.data.data;
                // console.log(url, "files")
                downloadFile(url)

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




    const adminId = sessionStorage.getItem('adminId');

    const [adminData, setAdminData] = useState([]);

    function fetchData() {



        // const companyId = sessionStorage.getItem('companyId');
        const payload = {
            page: page,
            size: rowsPerPage,
            phoneNumber: phoneNumberFilter.length === 0 ? null : phoneNumberFilter,
            companyId: selectedCompanyId,
            fromDate: startDate,
            toDate: endDate,
            status: selectedStatusOptions.length === 0 ? null : selectedStatusOptions,
            user: {

                id: selectedHostOptions.length === 0 ? null : selectedHostOptions,
            },

            room: {
                id: filterSelectedRoom.length === 0 ? null : filterSelectedRoom,
            }

            // date:'2023-10-18T11:00:00'

        }
        // const getVisitorUrl = `http://192.168.12.54:8080/api/meeting/paginate`
        const getVisitorUrl = Config.baseUrl + Config.apiEndPoints.getVisitorRecepEndPoint
        axios
            .post(getVisitorUrl,
                payload)
            .then(response => {
                const responseData = response.data.data.meetings;
                console.log(response.data.data.meetings[0].user.isPermission, "isPermission")
                const responseDataLength = response.data.data.meetings.length;

                console.log(responseDataLength, "length")
                console.log(responseData, "responseDatta")

                responseData.forEach(meeting => {
                    const meetingId = meeting.id;
                });


                setMeetingsLength(responseDataLength);

                setMeetingsPerPage(response.data.data.totalMeeting);
                setMeetings(response.data.data.totalElements);

                setVisitors(responseData);

                setTotalVisitors(response.data.data.totalElements);

                setPendingVisitors(response.data.data.totalPending);
                setApprovedVisitors(response.data.data.totalApproved);

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });


    }






    function getFullName(user) {
        return `${user.firstName} ${user.lastName}`;
    }

    function formatMeetingDurationStartTime(meeting) {
        const endTimestamp = meeting.meetingStartDateTime;
        if (endTimestamp != null) {
            const endDate = new Date(endTimestamp);

            endDate.setHours(endDate.getHours() - 5);
            endDate.setMinutes(endDate.getMinutes() - 30);

            const options = {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                timeZone: 'Asia/Kolkata',
            };

            const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(endDate);

            let hours = endDate.getHours();
            const amPm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;


            const formattedTime = `${hours}:${endDate.getMinutes().toString().padStart(2, '0')} ${amPm}`;

            return `${formattedDate}, ${formattedTime}`;

        }
    }





    function formatMeetingDuration1(meeting) {
        const endTimestamp = meeting.checkOutDateTime;

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
            hours = hours % 12 || 12;


            const formattedTime = `${hours}:${endDate.getMinutes().toString().padStart(2, '0')} ${amPm}`;

            return `${formattedDate}, ${formattedTime}`;
        }
    }


    function formatMeetingDuration(meeting) {
        const endTimestamp = meeting.checkInDateTime;

        if (endTimestamp != null) {
            const endDate = new Date(endTimestamp);

            endDate.setHours(endDate.getHours() - 5);
            endDate.setMinutes(endDate.getMinutes() - 30);

            const options = {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                timeZone: 'Asia/Kolkata',
            };

            const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(endDate);

            let hours = endDate.getHours();
            const amPm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;


            const formattedTime = `${hours}:${endDate.getMinutes().toString().padStart(2, '0')} ${amPm}`;

            return `${formattedDate}, ${formattedTime}`;
        }
    }


    const handleDownloadPass = (meetingId, visitorName, visitorPhoneNumber) => {

        // const passApiEndpoint = `http://192.168.12.54:8080/api/meeting/downloadPass?meetingId=${meetingId}`;

        const passApiEndpoint = Config.baseUrl + Config.apiEndPoints.passApiEndPoint + "?meetingId=" + meetingId

        axios
            .get(passApiEndpoint,
                {
                    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },

                    responseType: 'blob',
                }
            )
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
                fetchData();
            })
            .catch((error) => {
                console.error('Error downloading pass:', error);
            });
    };


    const handlePhoneNumberSearch = (event) => {
        if (event.key === 'Enter') {

            fetchData(phoneNumberFilter);
        }
    };

    useEffect(() => {


        fetchData();
        getRoomsOption();
        fetchStatusOptions();
        fetchStatusOptions1();
        fetchHostOptions();

    }, [page, rowsPerPage]);



    const filter = sessionStorage.getItem('filters')
    if (filter) {

        setSelectedStatusOptions(filter)
        // setPage(0)
        sessionStorage.removeItem('filters')


    }


    useEffect(() => {


        if (page === 0) {

            fetchData();

        } else {
            setPage(0);
        }


    }, [selectedStatusOptions, filterSelectedRoom, selectedHostOptions, phoneNumberFilter, startDate, endDate])








    // useEffect(() => {
    //     // const filter = sessionStorage.getItem('filters')
    //     if (filter) {

    //         setSelectedStatusOptions(filter)
    //         // setPage(0)
    //         sessionStorage.removeItem('filters')
    //     }

    // }, [selectedStatusOptions])


    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };


    //dialog

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const handleClickOpenDialog = (value) => {

        console.log(value.remarks, "whatever")

        setOpenDialog(true);

        if (value.remarks !== null && value.remarks !== "") {
            setSelectedValue(value)
        }

    };

    const handleCloseDialog = (value) => {
        setOpenDialog(false);
        setSelectedValue(value);
    };




    const loggedUserRole = sessionStorage.getItem("loggedUserRole");

    const [selectedFilter, setSelectedFilter] = useState("companyMeets");

    const [isADMIN, setIsADMIN] = useState(false)

    const [isReceptionist, setIsReceptionist] = useState(false)


    useEffect(() => {
        if (loggedUserRole === "ADMIN") {
            setIsADMIN(true);
        } else {
            setIsADMIN(false);
        }

        if (loggedUserRole === "RECEPTIONIST") {
            setIsReceptionist(true);
        } else {
            setIsReceptionist(false);
        }






    }, [loggedUserRole]);

    const meetOptions = [
        { label: "Personal Meets", value: "personalMeets" },
        { label: "Company Meets", value: "companyMeets" },
    ];


    const handleFilterChange = (event) => {
        const selectedValue = event.target.value;

        switch (selectedValue) {
            case 'personalMeets':
                navigate('/meetings')
                break;
            case 'companyMeets':
                navigate('/receptionistdashboard')
                break;
            default:
                break;
        }


        setSelectedFilter(selectedValue);
    };



    console.log(openDialog, "opendialog")
    return (
  
        //trial2

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


                            <Grid container>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Paper
                                            elevation={1}
                                            sx={{
                                                display: 'flex',
                                               
                                                // width:'100%',
                                                minHeight: '4.5em',
                                                mt: '3em',
                                                mb: '0.5em',
                                                display:"flex",
                                                justifyContent:"space-between"
                                            }}
                                        >
                                                                                 
                                       


                                                <TextField
                                                    id="outlined-select-currency"
                                                    select
                                                    label="Search by Status"
                                                    value={selectedStatusOptions}

                                                    onChange={handleChangeStatus}

                                                    style={{ top: "10px",width:"20%" }}


                                                >


                                                    {Array.isArray(statusOptions) && statusOptions.map((options, index) => (
                                                        <MenuItem key={index} value={options} >{options}</MenuItem>
                                                    ))}
                                                </TextField>



                                                <TextField
                                                    id="outlined-select-currency"
                                                    select
                                                    label="Search by Host"
                                                    value={selectedHostOptions}

                                                    onChange={handleChangeHost}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            style: {
                                                                maxHeight: '400px',
                                                                maxWidth: '200px',

                                                            },
                                                        },
                                                    }}

                                                    style={{ top: "10px",width:"20%" }}


                                                >

                                                    {Array.isArray(hostOptions) && hostOptions.map((options, index) => (
                                                        <MenuItem key={index} value={options.id} disabled={!options.isPresent}
                                                            style={{ color: options.isPresent ? 'black' : 'grey' }} >{options.name}</MenuItem>
                                                    ))}
                                                </TextField>

                                                <TextField id="outlined-search" label="Search By Phone Number" value={phoneNumberFilter}

                                                    inputProps={{ maxLength: 10 }}

                                                    onChange={(e) => {

                                                        if (e.target.value.length <= 10) {
                                                            setPhoneNumberFilter(e.target.value)
                                                        }


                                                    }}



                                                    // Update phone number filter state
                                                    onKeyPress={handlePhoneNumberSearch} type="search" style={{ top: "10px",width:"20%" }} />



                                                <TextField
                                                    id="outlined-select-currency"
                                                    select
                                                    label="Search by Room"
                                                    value={filterSelectedRoom}

                                                    onChange={handleChange2}

                                                    SelectProps={{
                                                        MenuProps: {
                                                            style: {
                                                                maxHeight: '400px', // 
                                                            },
                                                        },
                                                    }}

                                                    style={{ top: "10px",width:"20%"}}


                                                >

                             



                                                    {Array.isArray(rooms) && rooms.map((room) => (
                                                        <MenuItem key={room.id} value={room.id}>{room.roomName}</MenuItem>
                                                    ))}
                                                </TextField>

                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                                                        <DatePicker
                                                            label="Start Date"
                                                            value={startDate}
                                                            // onChange={(newValue) => setStartDate(newValue)}
                                                            onChange={handleStartDateChange}
                                                            renderInput={(params) => <TextField {...params} />}
                                                            format="DD/MM/YYYY"
                                                        />
                                                        <DatePicker
                                                            label="End Date"
                                                            value={endDate}
                                                            // onChange={(newValue) => setEndDate(newValue)}
                                                            onChange={handleEndDateChange}
                                                            renderInput={(params) => <TextField {...params} />}
                                                            format="DD/MM/YYYY"
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>

                                                <Button variant="contained" onClick={excelExport} sx={{ marginLeft: "", width: "200px", height: "50px", top: "20px", gap: "3px", backgroundColor: "" }}><FileDownloadIcon />Meetings Export</Button>


                                                                <Box sx={{ display: "flex", alignItems: "center", gap: '1em', }}>
                                                                     <Tooltip title={<p style={{ fontSize: '12px', fontWeight: 600 }}>Clear filters</p>} >
                                                                        <Button
                                                                            variant="contained"
                                                                             color="error"
                                                                            size="small"
                                                                           sx={{ minWidth: "unset", marginLeft: "1.2em", width: '3.9em', height: "3.9em", top: "5px" }}
                                                                            onClick={handleClearFilters}
                                                                         >
                                                                         <RotateLeftIcon />
                                                                        {/* Clear Filters */}
                                                                    </Button>
                                                                   </Tooltip>
                                                               </Box>


                                                
                                                



                                            
                                        </Paper>
                                    </Grid>

                                </Grid>

                            </Grid>





                    
                            {/* code */}

                            <Grid sx={{ flexGrow: 1, backgroundColor: "" }} >
                                <Grid item xs={12} style={{ backgroundColor: "red", display: "flex", flexDirection: "row" }}>
                                    <Grid style={{ gap: "20px", marginTop: "", backgroundColor: "", display: "flex", flexDirection: "row"}} container >



                                        <Paper style={{ backgroundColor: "red", display: "flex", justifyContent: "center",flexDirection:"row", }} elevation={7} sx={{
                                            height: 700,
                                            width: 400,
                                            flexGrow: 1,
                                            backgroundColor: "",
                                        }}>


                                            <TableContainer component={Paper} sx={{ width: '100%', boxShadow: 6, backgroundColor: "" }}>
                                                <Table sx={{}} aria-label="simple table">
                                                    <TableHead sx={{ backgroundColor: '#141b2d', border: "1px solid white", fontSize: "18px", color: "white" }}>
                                                        <TableRow sx={{ border: "1px solid black" }}>
                                                            {/* <TableCell>Meeting ID</TableCcenter
                                                        <TableCell>Visitor ID</TableCell> */}
                                                            <TableCell sx={{ color: "white" }}>Sl No</TableCell>
                                                            <TableCell sx={{ color: "white" }} align="left">Full Name</TableCell>
                                                            {/* <TableCell align="right">Email</TableCell> */}
                                                            <TableCell sx={{ color: "white" }} align="left">Phone No.</TableCell>
                                                            <TableCell sx={{ color: "white" }} align="left">Company Name</TableCell>
                                                            <TableCell sx={{ color: "white" }} align="left">Host Name</TableCell>
                                                            {/* <TableCell align="right">Remarks</TableCell> */}
                                                            <TableCell sx={{ color: "white" }} align="left">Room</TableCell>

                                                            <TableCell sx={{ color: "white" }} align="left">Meeting Time</TableCell>
                                                            {/* <TableCell align="right">End Time</TableCell> */}

                                                            <TableCell sx={{ color: "white" }} align="left">Check In</TableCell>
                                                            <TableCell sx={{ color: "white" }} align="left">Check Out</TableCell>

                                                            <TableCell sx={{ color: "white" }} align="left">Status</TableCell>
                                                            <TableCell sx={{ color: "white" }} align="left">Remarks</TableCell>



                                                            {/* <TableCell sx={{color:"white"}}align="left">Actions</TableCell> */}

                                                            {!isADMIN && <TableCell sx={{ color: "white" }}>Actions</TableCell>}

                                                            {/* <TableCell sx={{ color: "white" }} align="left">Actions</TableCell> */}




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
                                                                    {/* <TableCell align="left">{getFullName(visitor.user)}</TableCell> */}

                                                                    <TableCell align="left">
                                                                        {visitor.user.role.name === "ADMIN" ? (
                                                                            <span> {getFullName(visitor.user)} (Admin)

                                                                            </span>
                                                                        ) : (
                                                                            getFullName(visitor.user)
                                                                        )}
                                                                    </TableCell>

                                                                    {/* <TableCell align="right">{visitor.user.role.name}</TableCell> */}
                                                                    <TableCell align="left">{visitor.room === null ? 'NA' : visitor.room.roomName}</TableCell>
                                                                    <TableCell align="left">{visitor.meetingStartDateTime !== null ? formatMeetingDurationStartTime(visitor) : "NA"}</TableCell>
                                                                    {/* <TableCell align="right">{formatDate(visitor.meetingEndDateTime)}</TableCell> */}

                                                                    <TableCell align="left">{visitor.checkInDateTime !== null ? formatMeetingDuration(visitor) : "NA"}</TableCell>
                                                                    <TableCell align="left">{visitor.checkOutDateTime !== null ? formatMeetingDuration1(visitor) : "NA"}</TableCell>
                                                                    {/* <TableCell align="left">{visitor.checkOutDateTime}</TableCell> */}
                                                                    <TableCell align="left">{visitor.status}</TableCell>
                                                                    {/* <TableCell align="left"><InfoIcon style={{ fontSize: "20px", color: "grey", marginTop: "5px", cursor: "pointer" }} onClick={() => handleClickOpenDialog(visitor)} /></TableCell> */}

                                                                    <TableCell align="left">
                                                                        {
                                                                            visitor.remarks !== "" ?
                                                                                <InfoIcon
                                                                                    style={{ fontSize: "20px", color: "", marginTop: "5px", cursor: "pointer" }}
                                                                                    onClick={() => handleClickOpenDialog(visitor)}
                                                                                /> :
                                                                                <InfoIcon
                                                                                    style={{ fontSize: "20px", color: "lightgrey", marginTop: "5px", cursor: "", pointerEvents: "none" }}
                                                                                    disabled



                                                                                />
                                                                        }




                                                                    </TableCell>


                                                                    {/*                                                                
                                                                          {!isADMIN && (
                                                                            <TableCell sx={{ color: "white" }} align="left">Actions</TableCell>

                                                                          )}
                                                                             */}


                                                                    {!isADMIN && (

                                                                        <TableCell align="left">

                                                                            {
                                                                                (visitor.status === 'APPROVED') ? (
                                                                                    visitor.room ?
                                                                                        <DownloadIcon
                                                                                            style={{ cursor: "pointer" }}

                                                                                            onClick={() => handleDownloadPass(visitor.id, visitor.visitor.name, visitor.visitor.phoneNumber)} />
                                                                                        :
                                                                                        <EditIcon onClick={() => handleOpenModal(visitor)} />
                                                                                ) :

                                                                                    (visitor.status === 'INPROCESS' && visitor.room) ? (
                                                                                        <DownloadIcon

                                                                                            style={{ cursor: "pointer" }}

                                                                                            onClick={() => handleDownloadPass(visitor.id, visitor.visitor.name, visitor.visitor.phoneNumber)} />
                                                                                    ) :

                                                                                        ['COMPLETED', 'CANCELLED', 'CANCELLED_BY_VISITOR'].includes(visitor.status) ? (
                                                                                            <EditIcon style={{ color: 'lightgray' }} disabled />
                                                                                        ) :

                                                                                            visitor.status === 'PENDING' && visitor.user.isPermission === true ? (
                                                                                                <EditIcon
                                                                                                    style={{ cursor: "pointer" }}

                                                                                                    onClick={() => handleOpenModal(visitor)} />
                                                                                            ) : (
                                                                                                <EditIcon style={{ color: 'lightgray' }} disabled />
                                                                                            )
                                                                            }




                                                                        </TableCell>

                                                                    )}

                                                                </TableRow>
                                                            ))}
                                                    </TableBody>

                                                </Table>
                                                <TablePagination
                                                    //   rowsPerPageOptions={[10, 25, 50, 100]}
                                                    rowsPerPageOptions={[10, 15, 20]}
                                                    component="div"
                                                    count={meetings}

                                                    rowsPerPage={rowsPerPage}

                                                    page={page}
                                                    onPageChange={
                                                        handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}

                                                />
                                            </TableContainer>













                                        </Paper>




                                    </Grid>
                                </Grid>

                            </Grid>

                        </div>

                    </div>
                </Grid>
            </Grid>
        </Box>
































        //my code

        //         <Box sx={{ display: "flex", flexGrow: 1, p: 3 }}>
        //             <Grid container spacing={2} style={{}} >
        //                 <Grid item xs={12} md={12} lg={12}>
        //                     <div style={{ display: "flex", justifyContent: "center", flexDirection: "", flexGrow: 1, }}>
        //                         <div className="one" style={{ backgroundColor: '', border: "1px solid offwhite", flexGrow: 1 }}>
        //                             <Grid container>
        //                                 <Grid item xs={12}>
        //                                     <Paper
        //                                         elevation={1}
        //                                         sx={{
        //                                             display: 'flex',
        //                                             justifyContent: 'space-between',
        //                                             // width:'100%',
        //                                             minHeight: '4.5em',
        //                                             mt: '3em',
        //                                             mb: '0.5em'
        //                                         }}
        //                                     >
        //                                         <Header title="Visitors Meetings" subtitle="Get all the visitors meeting list" />




        //                                         {isADMIN ? (<Box
        //                                             sx={{
        //                                                 display: 'flex',
        //                                                 flexDirection: { xs: 'column', md: 'row' },
        //                                                 alignItems: 'center',
        //                                                 gap: '0.3em'
        //                                             }}
        //                                         >

        //                                             <Typography sx={{ color: '#555555' }}>Filter by</Typography>

        //                                             <FormControl
        //                                                 sx={{
        //                                                     border: "none",
        //                                                     borderRadius: "5px",
        //                                                     // width: "130px !important",
        //                                                     // height: '50px !important',
        //                                                     boxShadow: "0px 2px 2px #333333",
        //                                                 }}
        //                                             >
        //                                                 {/* <InputLabel sx={{ color: "#626262" }}>Filter by</InputLabel> */}
        //                                                 <Select
        //                                                     sx={{
        //                                                         color: "white",
        //                                                         bgcolor: "#1976d2",
        //                                                         width: "165px !important",
        //                                                         height: '40px !important',
        //                                                         border: "none",
        //                                                         "&:hover": {
        //                                                             bgcolor: "#1565c0",
        //                                                         },
        //                                                         "& .MuiSelect-icon": {
        //                                                             color: "white",
        //                                                         },
        //                                                     }}
        //                                                     label="Select a filter"
        //                                                     value={selectedFilter}
        //                                                     onChange={handleFilterChange}
        //                                                     elevation={3}
        //                                                 >
        //                                                     {meetOptions.map((option) => (
        //                                                         <MenuItem key={option.value} value={option.value}>
        //                                                             {option.label}
        //                                                         </MenuItem>
        //                                                     ))}
        //                                                 </Select>
        //                                             </FormControl>
        //                                         </Box>) : ''}
        //                                     </Paper>
        //                                 </Grid>

        //                             </Grid>
        //                             <Grid sx={{ flexGrow: 1, backgroundColor: "" }} >


        //                             </Grid>
        //                             <Grid container style={{ marginTop: "" }}>
        //                                 <Grid item xs={12} style={{ backgroundColor: "" }}>
        //                                     <Item elevation={2} style={{ height: '', margin: '10px', backgroundColor: "" }}>
        //                                         <div style={{ display: "flex", justifyContent: "", width: "100%", backgroundColor: "" }}>


        //                                             <Grid>
        //                                                 <Box
        //                                                     component="form"
        //                                                     sx={{
        //                                                         '& .MuiTextField-root': { m: 1, width: '25ch' },
        //                                                     }}
        //                                                     noValidate
        //                                                     autoComplete="on"
        //                                                 // style={{display:"flex",justifyContent:"space-evenly"}}
        //                                                 >
        //                                                     <Grid style={{ display: "flex", flexDirection: "", justifyContent: "space-between", margin: "", backgroundColor: "", gap: "20px", width: "" }}>



        //                                                         <Grid style={{ backgroundColor: "", display: "flex", flexDirection: "row" }}>




        //                                                             <TextField id="outlined-search" label="Search By Phone Number" value={phoneNumberFilter}

        //                                                                 inputProps={{ maxLength: 10 }}

        //                                                                 onChange={(e) => {

        //                                                                     if (e.target.value.length <= 10) {
        //                                                                         setPhoneNumberFilter(e.target.value)
        //                                                                     }


        //                                                                 }}





        //                                                                 // Update phone number filter state
        //                                                                 onKeyPress={handlePhoneNumberSearch} type="search" style={{ top: "10px" }} />


        //                                                             <TextField
        //                                                                 id="outlined-select-currency"
        //                                                                 select
        //                                                                 label="Search by Status"
        //                                                                 value={selectedStatusOptions}

        //                                                                 onChange={handleChangeStatus}

        //                                                                 style={{ top: "10px" }}


        //                                                             >

        //                                                                 {/* <MenuItem value="">
        //                                                                     <em>Cancel</em>
        //                                                                 </MenuItem> */}



        //                                                                 {Array.isArray(statusOptions) && statusOptions.map((options, index) => (
        //                                                                     <MenuItem key={index} value={options} >{options}</MenuItem>
        //                                                                 ))}
        //                                                             </TextField>


        //                                                             <TextField
        //                                                                 id="outlined-select-currency"
        //                                                                 select
        //                                                                 label="Search by Host"
        //                                                                 value={selectedHostOptions}

        //                                                                 onChange={handleChangeHost}
        //                                                                 SelectProps={{
        //                                                                     MenuProps: {
        //                                                                         style: {
        //                                                                             maxHeight: '400px',
        //                                                                             maxWidth:'200px',

        //                                                                         },
        //                                                                     },
        //                                                                 }}

        //                                                                 style={{ top: "10px" }}


        //                                                             >

        //                                                                 {/* <MenuItem value="">
        //                                                                     <em>Cancel</em>
        //                                                                 </MenuItem> */}



        //                                                                 {Array.isArray(hostOptions) && hostOptions.map((options, index) => (
        //                                                                     <MenuItem key={index} value={options.id} disabled={!options.isPresent}
        //                                                                         style={{ color: options.isPresent ? 'black' : 'grey' }} >{options.name}</MenuItem>
        //                                                                 ))}
        //                                                             </TextField>


        //                                                             <TextField
        //                                                                 id="outlined-select-currency"
        //                                                                 select
        //                                                                 label="Search by Room"
        //                                                                 value={filterSelectedRoom}

        //                                                                 onChange={handleChange2}

        //                                                                 SelectProps={{
        //                                                                     MenuProps: {
        //                                                                         style: {
        //                                                                             maxHeight: '400px', // 
        //                                                                         },
        //                                                                     },
        //                                                                 }}

        //                                                                 style={{ top: "10px" }}


        //                                                             >

        //                                                                 {/* <MenuItem value="">
        //                                                                     <em>Cancel</em>
        //                                                                 </MenuItem> */}



        //                                                                 {Array.isArray(rooms) && rooms.map((room) => (
        //                                                                     <MenuItem key={room.id} value={room.id}>{room.roomName}</MenuItem>
        //                                                                 ))}
        //                                                             </TextField>


        //                                                             <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                                                                 <DemoContainer components={['DatePicker', 'DatePicker']}>

        //                                                                     <DatePicker
        //                                                                         label="Start Date"
        //                                                                         value={startDate}
        //                                                                         // onChange={(newValue) => setStartDate(newValue)}
        //                                                                         onChange={handleStartDateChange}
        //                                                                         renderInput={(params) => <TextField {...params} />}
        //                                                                         format="DD/MM/YYYY"
        //                                                                     />
        //                                                                     <DatePicker
        //                                                                         label="End Date"
        //                                                                         value={endDate}
        //                                                                         // onChange={(newValue) => setEndDate(newValue)}
        //                                                                         onChange={handleEndDateChange}
        //                                                                         renderInput={(params) => <TextField {...params} />}
        //                                                                         format="DD/MM/YYYY"
        //                                                                     />
        //                                                                 </DemoContainer>
        //                                                             </LocalizationProvider>

        //                                                             {/* <LocalizationProvider dateAdapter={AdapterDayjs}>

        //     <DatePicker
        //       label="Start Date"
        //       value={startDate}
        //       onChange={handleStartDateChange}
        //       renderInput={(params) => <TextField {...params} />}
        //       format="dd/MM/yy" // Set the desired date format
        //     />
        //     <DatePicker
        //       label="End Date"
        //       value={endDate}
        //       onChange={handleEndDateChange}
        //       renderInput={(params) => <TextField {...params} />}
        //       format="dd/MM/yy" // Set the desired date format
        //     />

        // </LocalizationProvider> */}





        //                                                         </Grid>

        //                                                         <Grid style={{ backgroundColor: "", right: 0 }}>
        //                                                             <Button variant="contained" onClick={excelExport} sx={{ marginLeft: "", width: "200px", height: "50px", top: "20px", gap: "3px", backgroundColor: "" }}><FileDownloadIcon />Meetings Export</Button>

        //                                                         </Grid>

        //                                                         <Box sx={{ display: "flex", alignItems: "center", gap: '1em', }}>
        //                                                             <Tooltip title={<p style={{ fontSize: '12px', fontWeight: 600 }}>Clear filters</p>} >
        //                                                                 <Button
        //                                                                     variant="contained"
        //                                                                     color="error"
        //                                                                     size="small"
        //                                                                     sx={{ minWidth: "unset", marginLeft: "1.2em", width: '3.9em', height: "3.9em", top: "5px" }}
        //                                                                     onClick={handleClearFilters}
        //                                                                 >
        //                                                                     <RotateLeftIcon />
        //                                                                     {/* Clear Filters */}
        //                                                                 </Button>
        //                                                             </Tooltip>
        //                                                         </Box>






        //                                                     </Grid>



        //                                                 </Box>

        //                                             </Grid>



        //                                         </div>

        //                                         <TableContainer component={Paper} sx={{ width: '100%', boxShadow: 6, backgroundColor: "" }}>
        //                                             <Table sx={{}} aria-label="simple table">
        //                                                 <TableHead sx={{ backgroundColor: '#141b2d', border: "1px solid white", fontSize: "18px", color: "white" }}>
        //                                                     <TableRow sx={{ border: "1px solid black" }}>
        //                                                         {/* <TableCell>Meeting ID</TableCcenter
        //                                                 <TableCell>Visitor ID</TableCell> */}
        //                                                         <TableCell sx={{ color: "white" }}>Sl No</TableCell>
        //                                                         <TableCell sx={{ color: "white" }} align="left">Full Name</TableCell>
        //                                                         {/* <TableCell align="right">Email</TableCell> */}
        //                                                         <TableCell sx={{ color: "white" }} align="left">Phone No.</TableCell>
        //                                                         <TableCell sx={{ color: "white" }} align="left">Company Name</TableCell>
        //                                                         <TableCell sx={{ color: "white" }} align="left">Host Name</TableCell>
        //                                                         {/* <TableCell align="right">Remarks</TableCell> */}
        //                                                         <TableCell sx={{ color: "white" }} align="left">Room</TableCell>

        //                                                         <TableCell sx={{ color: "white" }} align="left">Meeting Time</TableCell>
        //                                                         {/* <TableCell align="right">End Time</TableCell> */}

        //                                                         <TableCell sx={{ color: "white" }} align="left">Check In</TableCell>
        //                                                         <TableCell sx={{ color: "white" }} align="left">Check Out</TableCell>

        //                                                         <TableCell sx={{ color: "white" }} align="left">Status</TableCell>
        //                                                         <TableCell sx={{ color: "white" }} align="left">Remarks</TableCell>



        //                                                         {/* <TableCell sx={{color:"white"}}align="left">Actions</TableCell> */}

        //                                                         {!isADMIN && <TableCell sx={{color:"white"}}>Actions</TableCell>}

        //                                                             {/* <TableCell sx={{ color: "white" }} align="left">Actions</TableCell> */}




        //                                                     </TableRow>
        //                                                 </TableHead>
        //                                                 <TableBody>
        //                                                     {visitors
        //                                                         // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        //                                                         .map((visitor, index) => (
        //                                                             <TableRow key={index}>
        //                                                                 {/* <TableCell>{visitor.id}</TableCell>
        //                                                         <TableCell>{visitor.visitor.id}</TableCell> */}

        //                                                                 <TableCell>{calculateSerialNumber(page, rowsPerPage, index)}</TableCell>

        //                                                                 <TableCell align="left">{visitor.visitor.name}</TableCell>

        //                                                                 {/* <TableCell align="right">{visitor.visitor.email}</TableCell> */}
        //                                                                 <TableCell align="left">{visitor.visitor.phoneNumber}</TableCell>

        //                                                                 <TableCell align="left">{visitor.visitor.companyName}</TableCell>
        //                                                                 {/* <TableCell align="left">{getFullName(visitor.user)}</TableCell> */}

        //                                                                 <TableCell align="left">
        //                                                                     {visitor.user.role.name === "ADMIN" ? (
        //                                                                         <span> {getFullName(visitor.user)} (Admin)

        //                                                                         </span>
        //                                                                     ) : (
        //                                                                         getFullName(visitor.user)
        //                                                                     )}
        //                                                                 </TableCell>

        //                                                                 {/* <TableCell align="right">{visitor.user.role.name}</TableCell> */}
        //                                                                 <TableCell align="left">{visitor.room === null ? 'NA' : visitor.room.roomName}</TableCell>
        //                                                                 <TableCell align="left">{visitor.meetingStartDateTime !== null ? formatMeetingDurationStartTime(visitor) : "NA"}</TableCell>
        //                                                                 {/* <TableCell align="right">{formatDate(visitor.meetingEndDateTime)}</TableCell> */}

        //                                                                 <TableCell align="left">{visitor.checkInDateTime !== null ? formatMeetingDuration(visitor) : "NA"}</TableCell>
        //                                                                 <TableCell align="left">{visitor.checkOutDateTime !== null ? formatMeetingDuration1(visitor) : "NA"}</TableCell>
        //                                                                 {/* <TableCell align="left">{visitor.checkOutDateTime}</TableCell> */}
        //                                                                 <TableCell align="left">{visitor.status}</TableCell>
        //                                                                 {/* <TableCell align="left"><InfoIcon style={{ fontSize: "20px", color: "grey", marginTop: "5px", cursor: "pointer" }} onClick={() => handleClickOpenDialog(visitor)} /></TableCell> */}

        //                                                                 <TableCell align="left">
        //                                                                     {
        //                                                                         visitor.remarks !== "" ?
        //                                                                             <InfoIcon
        //                                                                                 style={{ fontSize: "20px", color: "", marginTop: "5px", cursor: "pointer" }}
        //                                                                                 onClick={() => handleClickOpenDialog(visitor)}
        //                                                                             /> :
        //                                                                             <InfoIcon
        //                                                                                 style={{ fontSize: "20px", color: "lightgrey", marginTop: "5px", cursor: "", pointerEvents: "none" }}
        //                                                                                 disabled



        //                                                                             />
        //                                                                     }




        //                                                                 </TableCell>


        // {/*                                                                
        //                                                                   {!isADMIN && (
        //                                                                     <TableCell sx={{ color: "white" }} align="left">Actions</TableCell>

        //                                                                   )}
        //                                                                      */}


        //                                                                 {!isADMIN && (

        //                                                                 <TableCell align="left">

        //                                                                     {
        //                                                                         (visitor.status === 'APPROVED') ? (
        //                                                                             visitor.room ?
        //                                                                                 <DownloadIcon
        //                                                                                     style={{ cursor: "pointer" }}

        //                                                                                     onClick={() => handleDownloadPass(visitor.id, visitor.visitor.name, visitor.visitor.phoneNumber)} />
        //                                                                                 :
        //                                                                                 <EditIcon onClick={() => handleOpenModal(visitor)} />
        //                                                                         ) :

        //                                                                             (visitor.status === 'INPROCESS' && visitor.room) ? (
        //                                                                                 <DownloadIcon

        //                                                                                     style={{ cursor: "pointer" }}

        //                                                                                     onClick={() => handleDownloadPass(visitor.id, visitor.visitor.name, visitor.visitor.phoneNumber)} />
        //                                                                             ) :

        //                                                                                 ['COMPLETED', 'CANCELLED', 'CANCELLED_BY_VISITOR'].includes(visitor.status) ? (
        //                                                                                     <EditIcon style={{ color: 'lightgray' }} disabled />
        //                                                                                 ) :

        //                                                                                     visitor.status === 'PENDING' && visitor.user.isPermission === true ? (
        //                                                                                         <EditIcon
        //                                                                                             style={{ cursor: "pointer" }}

        //                                                                                             onClick={() => handleOpenModal(visitor)} />
        //                                                                                     ) : (
        //                                                                                         <EditIcon style={{ color: 'lightgray' }} disabled />
        //                                                                                     )
        //                                                                     }




        //                                                                 </TableCell>

        // )}

        //                                                             </TableRow>
        //                                                         ))}
        //                                                 </TableBody>

        //                                             </Table>
        //                                             <TablePagination
        //                                                 //   rowsPerPageOptions={[10, 25, 50, 100]}
        //                                                 rowsPerPageOptions={[10, 15, 20]}
        //                                                 component="div"
        //                                                 count={meetings}

        //                                                 rowsPerPage={rowsPerPage}

        //                                                 page={page}
        //                                                 onPageChange={
        //                                                     handleChangePage}
        //                                                 onRowsPerPageChange={handleChangeRowsPerPage}

        //                                             />
        //                                         </TableContainer>

        //                                     </Item>
        //                                 </Grid>
        //                             </Grid>


        //                             <StyledModal
        //                                 open={open}
        //                                 aria-labelledby="modal-title"
        //                                 aria-describedby="modal-description"
        //                             >

        //                                 <Box width={450} height={300} bgcolor={'white'} p={2} borderRadius={5} border='none' >

        //                                     <Box
        //                                         display="flex" flexDirection='column'

        //                                         // margin='auto'
        //                                         marginBottom={10}
        //                                         // padding={2}
        //                                         borderRadius={5}
        //                                         gap={3}

        //                                     >
        //                                         <CloseIcon onClick={handleCloseModal} style={{ backgroundColor: "", color: "grey", cursor: "pointer", marginBottom: "10px", marginLeft: "400px" }} />

        //                                         {item.status === 'PENDING' && item.user.isPermission === true ?
        //                                             <>
        //                                                 <FormControl fullWidth>
        //                                                     <InputLabel id="demo-simple-select-label">Status</InputLabel>
        //                                                     <Select
        //                                                         labelId="demo-simple-select-label"
        //                                                         id="demo-simple-select"
        //                                                         value={
        //                                                             selectedStatusModal

        //                                                         }
        //                                                         label="status"
        //                                                         onChange={handleChangeStatusModal}
        //                                                         disabled={roomAdded}
        //                                                         className={roomAdded ? 'disabledButton' : ''}
        //                                                     >

        //                                                         {/* <MenuItem value="">
        //                                                             <em>Cancel</em>
        //                                                         </MenuItem> */}

        //                                                         {Array.isArray(statusModal) && statusModal.map((options, index) => (
        //                                                             <MenuItem key={index} value={options} >{options}</MenuItem>
        //                                                         ))}

        //                                                     </Select>
        //                                                 </FormControl>

        //                                                 <FormControl >
        //                                                     <InputLabel id="demo-simple-select-label">Choose Room</InputLabel>
        //                                                     <Select
        //                                                         labelId="demo-simple-select-label"
        //                                                         id="demo-simple-select"
        //                                                         value={selectedRoom}

        //                                                         label="rooms"
        //                                                         onChange={handleChange1}
        //                                                         disabled={selectedStatusModal === "CANCELLED" || roomAdded}
        //                                                         className={roomAdded ? 'disabledButton' : ''}

        //                                                         style={{ color: selectedStatusModal === "CANCELLED" ? 'grey' : 'black' }}
        //                                                         // className="room-dropdown"
        //                                                         MenuProps={MenuProps}
        //                                                     >

        //                                                         {Array.isArray(rooms) && rooms.map((room) => (

        //                                                             // <MenuItem key={room.id} value={room.id} disabled={!room.isAvailable}
        //                                                             //     style={{ color: room.isAvailable ? 'black' : 'grey' }}>{room.roomName}       Capacity:{room.capacity}</MenuItem>
        //                                                             <MenuItem
        //                                                                 key={room.id}
        //                                                                 value={room.id}
        //                                                                 disabled={!room.isAvailable}
        //                                                                 style={{ display: 'flex', justifyContent: 'space-between', color: room.isAvailable ? 'black' : 'grey' }}
        //                                                             >
        //                                                                 <div>{room.roomName}</div>
        //                                                                 <div>Capacity: {room.capacity}</div>
        //                                                             </MenuItem>
        //                                                         ))}
        //                                                     </Select>
        //                                                 </FormControl>

        //                                                 <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        //                                                     <div style={{ display: "flex", justifyContent: "", gap: "7px" }}>
        //                                                         <Button variant='contained' onClick={handleAddMeeting}
        //                                                             className={roomAdded ? 'disabledButton' : ''} >Add </Button>

        //                                                     </div>
        //                                                     <div style={{ display: "flex", justifyContent: "", gap: "5px" }}>


        //                                                         {roomAdded && (
        //                                                             <Button variant="contained" onClick={() => handleDownloadPass(item.id, item.visitor.name, item.visitor.phoneNumber)}>Generate Pass</Button>
        //                                                         )}
        //                                                     </div>

        //                                                 </div>
        //                                             </>

        //                                             : <>
        //                                                 <FormControl >
        //                                                     <InputLabel id="demo-simple-select-label">Choose Room</InputLabel>
        //                                                     <Select
        //                                                         labelId="demo-simple-select-label"
        //                                                         id="demo-simple-select"
        //                                                         value={selectedRoom}
        //                                                         label="rooms"
        //                                                         onChange={handleChange1}
        //                                                         className="room-dropdown"
        //                                                         MenuProps={MenuProps}
        //                                                     >

        //                                                         {Array.isArray(rooms) && rooms.map((room) => (

        //                                                             <MenuItem key={room.id} value={room.id} disabled={!room.isAvailable}
        //                                                                 style={{ color: room.isAvailable ? 'black' : 'grey' }}>{room.roomName}</MenuItem>
        //                                                         ))}

        //                                                     </Select>
        //                                                 </FormControl>

        //                                                 <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

        //                                                     <div style={{ display: "flex", justifyContent: "", gap: "7px" }}>
        //                                                         <Button variant='contained' onClick={handleAddMeeting}

        // disabled={roomAdded}
        // className={roomAdded ? 'disabledButton' : ''}



        //                                                         >Add Room</Button>



        //                                                     </div>
        //                                                     <div style={{ display: "flex", justifyContent: "", gap: "5px" }}>

        //                                                         {roomAdded && (

        //                                                             <Button variant="contained" onClick={() => handleDownloadPass(item.id, item.visitor.name, item.visitor.phoneNumber)}>Generate Pass</Button>
        //                                                         )}
        //                                                     </div>

        //                                                 </div>
        //                                             </>}

        //                                     </Box>

        //                                 </Box>
        //                             </StyledModal>



        //                             {openDialog && (
        //                                 <Dialog onClose={handleCloseDialog} open={openDialog}
        //                                 >
        //                                     <DialogTitle sx={{ color: "black", backgroundColor: "lightblue", textAlign: "center" }}>INFO</DialogTitle>
        //                                     <List sx={{ width: "300px" }}>
        //                                         <ListItem button onClick={() => handleCloseDialog('username@gmail.com')}>
        //                                             <ListItemText primary={`Remarks: ${selectedValue.remarks !== null && selectedValue.remarks !== "" ? selectedValue.remarks : '-'}`} sx={{ color: "blue", fontSize: "20px" }} />

        //                                         </ListItem>
        //                                         <ListItem button onClick={() => handleCloseDialog('username@gmail.com')}>
        //                                             <ListItemText primary={`Permission: ${selectedValue.user.isPermission !== 'null' || selectedValue.user.isPermission !== "" ? selectedValue.user.isPermission : ""}`} sx={{ color: "green" }} />

        //                                         </ListItem>

        //                                     </List>
        //                                 </Dialog>

        //                             )}
        //                             {/* 
        // {openDialog && (
        //   <Dialog onClose={handleCloseDialog} open={openDialog}>
        //     <DialogTitle style={{ color: "black" ,textAlign:"center"}}>INFO</DialogTitle>
        //     <List sx={{ width: "300px" }}>
        //       <ListItem button onClick={() => handleCloseDialog('username@gmail.com')}>
        //         <ListItemText
        //           primary="Remarks:"
        //           secondary={selectedValue.remarks !== null && selectedValue.remarks !== "" ? selectedValue.remarks : '-'}
        //           primaryTypographyProps={{ sx: { color: "blue" } }} // Style for the label "Remarks"
        //           secondaryTypographyProps={{ sx: { color: "green" } }} // Style for the value of Remarks
        //         />
        //       </ListItem>
        //       <ListItem button onClick={() => handleCloseDialog('username@gmail.com')}>
        //         <ListItemText
        //           primary="Permission:"
        //           secondary={selectedValue.user.isPermission !== 'null' && selectedValue.user.isPermission !== "" ? selectedValue.user.isPermission : ""}
        //           primaryTypographyProps={{ sx: { color: "red" } }} // Style for the label "Permission"
        //           secondaryTypographyProps={{ sx: { color: "purple" } }} // Style for the value of Permission
        //         />
        //       </ListItem>
        //     </List>
        //   </Dialog>
        // )} */}



        //                             {/* </div> */}


        //                         </div>

        //                     </div>
        //                 </Grid>
        //             </Grid>
        //         </Box>
    )
}