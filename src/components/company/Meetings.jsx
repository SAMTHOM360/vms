import React from "react";
// import './Dashboard.css';
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import dayjs from "dayjs";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InfoIcon from "@mui/icons-material/Info";

import { useParams } from "react-router-dom";
//modal

import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { TextField, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { DataGrid } from "@mui/x-data-grid";

import Navbar from "../../global/Navbar";
import Sidebar from "../../global/Sidebar";
import Header from "../Header";
import Loader from "../Loader";

//calender
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/AuthContext";
import Config from "../../Config/Config";


//dialog
//dialog
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Meetings() {
  const { setActiveListItem } = useAuth();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [phoneCleared, setPhoneCleared] = useState(false);
  const [startDateCleared, setStartDateCleared] = useState(false);
  const [endDateCleared, setEndDateCleared] = useState(false);

  // sessionStorage.setItem('activeListItem', '/meetings')
  useEffect(() => {
    setActiveListItem("/meetings");
  }, [setActiveListItem]);
  const navigate = useNavigate();

  //pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const [item, setItem] = useState("");
  const [visitorsInfo, setVisitorsInfo] = useState([]);

  function calculateSerialNumber(index, page, rowsPerPage) {
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
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleChange1 = (event) => {
    setSelectedRoom(event.target.value);
  };

  function getRoomsOption() {
    const companyId = sessionStorage.getItem("companyId");

    const roomUrl =
      Config.baseUrl + Config.apiEndPoints.getRoomEndPoint + "?id=" + companyId;

    // const roomUrl = `http://192.168.12.54:8080/api/room/all?id=${companyId}`;

    axios
      .get(roomUrl, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((response) => {
        const data = response.data.data;
        // console.log(data);
        setRooms(data);
        // console.log("Room Data", data[4].id)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  //status
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedStatusOptions, setSelectedStatusOptions] = useState("");

  const [status, setStatus] = useState("");

  // const handleChangeStatus = (event) => {
  //     setStatus(event.target.value);
  // };

  const handleChangeStatus = (event) => {
    setSelectedStatusOptions(event.target.value);

    // console.log(event.target.value,"xyz");
    // fetchData();
  };

  //  console.log('status option', statusOptions);

  // useEffect(() => {
  //   const filter = sessionStorage.getItem('filters');
  //   const empFilteredFromDate = sessionStorage.getItem('empFilteredFromDate');
  //   const empFilteredToDate = sessionStorage.getItem('empFilteredToDate');

  //   if (filter && Array.isArray(statusOptions) && statusOptions.length > 0) {
  //     setSelectedStatusOptions(filter);
  //     sessionStorage.removeItem('filters');
  //   }

  //   if (empFilteredFromDate && empFilteredToDate) {
  //     const startDate = dayjs(empFilteredFromDate);
  //     const endDate = dayjs(empFilteredToDate);

  //     // console.log('useeffect start date', startDate);
  //     // console.log('useeffect end date', endDate);

  //     setStartDate(startDate);
  //     setEndDate(endDate);

  //     sessionStorage.removeItem('empFilteredFromDate');
  //     sessionStorage.removeItem('empFilteredToDate');
  //   }
  // }, [statusOptions]);

  useEffect(() => {
    const filter = sessionStorage.getItem("filters");
    const empFilteredFromDate = sessionStorage.getItem("empFilteredFromDate");
    const empFilteredToDate = sessionStorage.getItem("empFilteredToDate");

    if (
      (filter && Array.isArray(statusOptions) && statusOptions.length > 0) ||
      (empFilteredFromDate && empFilteredToDate)
    ) {
      setSelectedStatusOptions(filter);
      const startDate = dayjs(empFilteredFromDate);
      const endDate = dayjs(empFilteredToDate);

      // console.log('useeffect start date', startDate);
      // console.log('useeffect end date', endDate);

      setStartDate(startDate);
      setEndDate(endDate);

      setTimeout(() => {
        sessionStorage.removeItem("filters");
        sessionStorage.removeItem("empFilteredFromDate");
        sessionStorage.removeItem("empFilteredToDate");
      }, 1000);

      // sessionStorage.removeItem('filters');
      // sessionStorage.removeItem('empFilteredFromDate');
      // sessionStorage.removeItem('empFilteredToDate');
    }
  }, [statusOptions]);

  // console.log('calender start date',startDate)
  // console.log('calender end date',endDate)

  function fetchStatusOptions() {
    // const statusUrl = `http://192.168.12.54:8080/vis/meetstatus`;
    const statusUrl = Config.baseUrl + Config.apiEndPoints.statusEndPoint;
    axios
      .get(statusUrl)
      .then((response) => {
        const data = response.data.data;

        // data.forEach(datas =>{
        //     const status1 = datas;
        //     console.log(status1,"status1");
        //     setStatus(status1);
        // })

        // console.log(data,"sttaus")

        setStatusOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  //calender

  const handleStartDateChange = (date) => {
    setStartDate(date);
    //  console.log(selectedStatusOptions,"acsd")
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    //  fetchData();
  };

  //export

  function downloadFile(url) {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "meeting_details.xlsx");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function excelExport() {
    const selectedCompanyId = sessionStorage.getItem("selectedCompanyId");

    // const exportUrl = `http://192.168.12.54:8080/api/meeting/exportdata`;

    const exportUrl = Config.baseUrl + Config.apiEndPoints.exportEndPoint;

    const payload = {
      page: 0,
      size: 1000,
      phoneNumber: phoneNumberFilter.length === 0 ? null : phoneNumberFilter,
      fromDate: startDate,
      toDate: endDate,

      companyId: selectedCompanyId,
      user: {
        id: adminId,

        // id: selectedHostOptions.length === 0 ? null : selectedHostOptions,
      },

      room: {
        // id: filterSelectedRoom.length === 0 ? null : filterSelectedRoom,
        id: selectedRoom.length === 0 ? null : selectedRoom,
      },

      status: selectedStatusOptions.length === 0 ? null : selectedStatusOptions,
      // date:'2023-10-18T11:00:00'
    };

    axios
      .post(exportUrl, payload, {
        // responseType: 'blob', // important
      })
      .then((response) => {
        const url = response.data.data;
        // console.log(url, "files")
        downloadFile(url);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // const { id } = useParams();

  const adminId = sessionStorage.getItem("adminId");
  // console.log(adminId, "adminId");

  //phonefilter
  const [phoneNumberFilter, setPhoneNumberFilter] = useState("");
  const [meetings, setMeetings] = useState(0);

  // now previous
  function fetchData() {
    // const getVisitorUrl = `http://192.168.12.54:8080/api/meeting/vis?id=${adminId}`

    const payload = {
      page: page,
      size: rowsPerPage,
      phoneNumber: phoneNumberFilter.length === 0 ? null : phoneNumberFilter,
      //         companyId: companyId,
      fromDate: startDate,
      toDate: endDate,
      status: selectedStatusOptions.length === 0 ? null : selectedStatusOptions,
      user: {
        id: adminId,
      },

      room: {
        id: selectedRoom.length === 0 ? null : selectedRoom,
      },

      //         // date:'2023-10-18T11:00:00'

      //     }
    };

    // const getVisitorUrl = `http://192.168.12.54:8080/api/meeting/paginate`;
    const getVisitorUrl =
      Config.baseUrl + Config.apiEndPoints.getVisitorEndPoint;

    axios
      .post(getVisitorUrl, payload)

      .then((response) => {
        const responseData = response.data.data.meetings;
        // console.log(" meet all payload", responseData);

        setVisitors(responseData);
        setMeetings(response.data.data.totalElements);
        setTotalMeetings(responseData.length);
        const pendingCount = responseData.filter(
          (visitor) => visitor.status === "PENDING"
        ).length;
        const approvedCount = responseData.filter(
          (visitor) => visitor.status === "APPROVED"
        ).length;
        setPendingMeetings(pendingCount);
        setApprovedMeetings(approvedCount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  

  const handleAddMeeting = (value, status1) => {
    // console.log("check icon clicked")
    //
    const meetingData = {
      id: value.id,
      status: status1,
      user: {
        id: adminId,
      },
      visitor: {
        id: value.visitor.id,
      },
      // room: {
      //     id: selectedRoom
      // }
    };

    // const addMeetingUrl =
    //   "http://192.168.12.54:8080/api/meeting/update/meeting";
    const addMeetingUrl =
      Config.baseUrl + Config.apiEndPoints.addMeetingEndPoint;

    axios
      .post(addMeetingUrl, meetingData, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((response) => {
        // handleCloseModal();
        // setSelectedRoom('');
        setStatus("");

        if (response.data.data.status === "CANCELLED") {
          alert("Meeting cancelled succesfully");
        } else {
          alert("Meeting added succesfully");
        }

        fetchData();
      })
      .catch((error) => {
        console.error("Error adding meeting:", error);
      });
    // }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  //date
  // function formatMeetingDuration(meeting) {
  //   const startTimestamp = meeting.meetingStartDateTime;
  //   // console.log(startTimestamp,"starttimestamp")

  //   // console.log(visitorsInfo,"ggggg")

  //   // Create JavaScript Date objects with IST timezone
  //   const startDate = new Date(startTimestamp);

  //   startDate.setHours(startDate.getHours());
  //   startDate.setMinutes(startDate.getMinutes());

  //   // Define options for formatting
  //   const options = {
  //     year: "numeric",
  //     month: "numeric",
  //     day: "numeric",
  //     hour: "numeric",
  //     minute: "numeric",
  //     second: "numeric",
  //     timeZone: "Asia/Kolkata", // Set the timezone to IST
  //   };

  //   // Format the start and end dates using the options
  //   const formattedStart = new Intl.DateTimeFormat("en-US", options).format(
  //     startDate
  //   );

  //   return `${formattedStart}`;
  // }

  // function formatMeetingDuration1(meeting) {
  //   const endTimestamp = meeting.checkOutDateTime;
  //   // console.log(endTimestamp,"endtimestamp")

  //   // Create JavaScript Date objects with IST timezone
  //   if (endTimestamp != null) {
  //     const endDate = new Date(endTimestamp);
  //     endDate.setHours(endDate.getHours() - 5);
  //     endDate.setMinutes(endDate.getMinutes() - 30);

  //     // Define options for formatting
  //     const options = {
  //       year: "numeric",
  //       month: "numeric",
  //       day: "numeric",
  //       hour: "numeric",
  //       minute: "numeric",
  //       second: "numeric",
  //       timeZone: "Asia/Kolkata", // Set the timezone to IST
  //     };

  //     // Format the start and end dates using the options

  //     const formattedEnd = new Intl.DateTimeFormat("en-US", options).format(
  //       endDate
  //     );

  //     return `${formattedEnd}`;
  //   }
  // }

  function formatMeetingDuration1(meeting) {
    const endTimestamp = meeting.meetingEndDateTime;

    if (endTimestamp != null) {
      const endDate = new Date(endTimestamp);

      endDate.setHours(endDate.getHours() - 5);
      endDate.setMinutes(endDate.getMinutes() - 30);

      const options = {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        timeZone: "Asia/Kolkata", // Set the timezone to IST
      };

      const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
        endDate
      );

      let hours = endDate.getHours();
      const amPm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert midnight (0 hours) to 12

      // Manually construct the time in 12-hour format (hh:mm AM/PM)
      const formattedTime = `${hours}:${endDate
        .getMinutes()
        .toString()
        .padStart(2, "0")} ${amPm}`;

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
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        timeZone: "Asia/Kolkata", // Set the timezone to IST
      };

      const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
        endDate
      );

      let hours = endDate.getHours();
      const amPm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert midnight (0 hours) to 12

      // Manually construct the time in 12-hour format (hh:mm AM/PM)
      const formattedTime = `${hours}:${endDate
        .getMinutes()
        .toString()
        .padStart(2, "0")} ${amPm}`;

      return `${formattedDate}, ${formattedTime}`;
    }
  }

  // console.log(meetings, "whyyyyy")

  //universal search

  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = visitors.filter((company) => {
    const searchTerm = searchQuery.toLowerCase(); // Convert search query to lowercase
    return (
      company.visitor.name?.toLowerCase()?.includes(searchTerm) ||
      "" ||
      company.visitor.email?.toLowerCase()?.includes(searchTerm) ||
      "" ||
      company.visitor.phoneNumber?.toLowerCase()?.includes(searchTerm) ||
      "" ||
      company.visitor.companyName?.toLowerCase()?.includes(searchTerm) ||
      "" ||
      company.visitor.state?.name?.toLowerCase()?.includes(searchTerm) ||
      "" ||
      company.visitor.city?.name?.toLowerCase()?.includes(searchTerm) ||
      "" ||
      company.visitor.remarks?.toLowerCase()?.includes(searchTerm) ||
      "" ||
      company.visitor.status?.toLowerCase()?.includes(searchTerm) ||
      ""
      // (company.createdBy?.toLowerCase()?.includes(searchTerm) || '')
    );
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update search query state
  };

  //room

  useEffect(() => {
    fetchData();
    fetchStatusOptions();
    getRoomsOption();
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (page === 0) {
      fetchData();
    } else {
      setPage(0);
    }
  }, [
    selectedStatusOptions,
    selectedRoom,
    phoneNumberFilter,
    startDate,
    endDate,
    searchQuery,
  ]);

  const loggedUserRole = sessionStorage.getItem("loggedUserRole");

  const [selectedFilter, setSelectedFilter] = useState("personalMeets");

  const [isADMIN, setIsADMIN] = useState(false);

  useEffect(() => {
    if (loggedUserRole === "ADMIN") {
      setIsADMIN(true);
    } else {
      setIsADMIN(false);
    }
  }, [loggedUserRole]);

  const meetOptions = [
    { label: "Personal Meets", value: "personalMeets" },
    { label: "Company Meets", value: "companyMeets" },
  ];

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;

    switch (selectedValue) {
      case "personalMeets":
        navigate("/meetings");
        break;
      case "companyMeets":
        navigate("/receptionistdashboard");
        break;
      default:
        break;
    }

    setSelectedFilter(selectedValue);
  };

  const handleClearFilters = () => {
    setSelectedStatusOptions("");
    setPhoneNumberFilter("");
    setSelectedRoom("");
    setStartDate(null);
    setEndDate(null);
    setSearchQuery("");
    sessionStorage.removeItem("filters");
    sessionStorage.removeItem("empFilteredFromDate");
    sessionStorage.removeItem("empFilteredToDate");
  };

  const handleOpenAppointMeetingForm = () => {
    // setAddUserDialogOpen(true)
    navigate("/appointmeeting");
  };



  //dialog

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleClickOpenDialog = (value) => {
  
    setOpenDialog(true);

    if (value.remarks !== null && value.remarks !== "") {
      setSelectedValue(value);
    }
  };

  const handleCloseDialog = (value) => {
    setOpenDialog(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Grid container>
              <Grid container>
                <Grid item xs={12}>
                  <Box
                    elevation={1}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      // width:'100%',
                      minHeight: "4.5em",
                      mt: "3em",
                      mb: "0.5em",
                    }}
                  >
                    <Header
                      title="Personal Meetings"
                      subtitle="Get all updates about your meetings"
                    />
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: "1em" }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ marginLeft: "1.2em", width:'12.5em', height: "3em", mt:{xs:'2em', md:0} }}
                        onClick={handleOpenAppointMeetingForm}
                      >
                        Appoint A Meeting
                      </Button>

                      {isADMIN ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            alignItems: "center",
                            gap: "0.3em",
                          }}
                        >
                          <Typography sx={{ color: "#555555" }}>
                            Filter by
                          </Typography>

                          <FormControl
                            sx={{
                              border: "none",
                              borderRadius: "5px",
                              // width: "130px !important",
                              // height: '50px !important',
                              boxShadow: "0px 2px 2px #3333337d",
                              border: "none",
                              "&:hover": {
                                border: "none",
                              },
                            }}
                          >
                            {/* <InputLabel sx={{ color: "#626262" }}>Filter by</InputLabel> */}
                            <Select
                              sx={{
                                color: "white",
                                bgcolor: "#1976d2",
                                width: "165px !important",
                                height: "40px !important",
                                border: "none",
                                "&:hover": {
                                  bgcolor: "#1565c0",
                                },
                                "& .MuiSelect-icon": {
                                  color: "white",
                                },
                              }}
                              label="Select a filter"
                              value={selectedFilter}
                              onChange={handleFilterChange}
                              elevation={3}
                            >
                              {meetOptions.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
         
            <Grid container style={{ marginTop: "" }}>
              <Grid item xs={12} style={{ backgroundColor: "" }}>
                <Item
                  elevation={2}
                  style={{
                    height: "",
                    margin: "10px",
                    backgroundColor: "",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap:'1em',
                      marginBottom:'10px'
                    }}
                  >
                    <Grid container spacing={1}>
                    <Grid item xs={4} md={4} lg={2}>
                    <TextField
                              // id="outlined-select-currency"
                              select
                              label="Status"
                              value={selectedStatusOptions}
                              onChange={handleChangeStatus}
                              style={{ marginTop: "10px",
                              //  width: "17em",
                              width:'100%'
                               }}
                              InputProps={{
                                endAdornment: selectedStatusOptions ? (
                                  <div
                                    style={{
                                      marginRight: "-7px",
                                      marginTop: "4px",
                                      background: "",
                                    }}
                                  >
                                    <ClearIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        setSelectedStatusOptions("")
                                      }
                                    />
                                  </div>
                                ) : null,
                              }}
                            >
                              {/* <MenuItem value="">
                                    <em>Cancel</em>
                                  </MenuItem> */}

                              {Array.isArray(statusOptions) &&
                                statusOptions.map((options, index) => (
                                  <MenuItem key={index} value={options}>
                                    {options}
                                  </MenuItem>
                                ))}
                            </TextField>
                    </Grid>


                    <Grid item xs={4} md={4} lg={2}>
                    <TextField
                              id="outlined-search"
                              label="Phone Number"
                              value={phoneNumberFilter}
                              inputProps={{ maxLength: 10 }}
                              slotProps={{
                                field: {
                                  clearable: true,
                                  onClear: () => setPhoneCleared(true),
                                },
                              }}
                              onChange={(e) => {
                                if (e.target.value.length <= 10) {
                                  setPhoneNumberFilter(e.target.value);
                                }
                              }}
                              type="search"
                              style={{ marginTop: "10px", //  width: "17em",
                              width:'100%' }}
                            />
                    </Grid>

                    <Grid item xs={4} md={4} lg={2}>
                    <TextField
                              id="outlined-select-currency"
                              select
                              label="Room"
                              value={selectedRoom}
                              onChange={handleChange1}
                              sx={{  //  width: "17em",
                                width:'100%' }}
                              SelectProps={{
                                MenuProps: {
                                  style: {
                                    maxHeight: "300px",
                                  },
                                },
                              }}
                              style={{ top: "10px" }}
                              InputProps={{
                                endAdornment: selectedRoom ? (
                                  <div
                                    style={{
                                      marginRight: "-7px",
                                      marginTop: "4px",
                                      background: "",
                                    }}
                                  >
                                    <ClearIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => setSelectedRoom("")}
                                    />
                                  </div>
                                ) : null,
                              }}
                            >
                              {/* <MenuItem value="">
                                    <em>Cancel</em>
                                  </MenuItem> */}

                              {/* {Array.isArray(rooms) && rooms.map((room) => (
                                                                <MenuItem disabled={!room.isAvailable} key={room.id} value={room.id} style={{ color: room.isAvailable ? 'black' : 'grey' }}>{room.roomName}   </MenuItem>
                                                            ))} */}
                              {Array.isArray(rooms) &&
                                rooms.map((room) => (
                                  <MenuItem key={room.id} value={room.id}>
                                    {room.roomName}{" "}
                                  </MenuItem>
                                ))}
                            </TextField>
                    </Grid>

                    <Grid item xs={6} md={6} lg={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                              {/* <DemoContainer components={["DatePicker", "DatePicker"]}> */}
                              <DemoContainer components={["DatePicker"]} sx={{
                                //  width: {md:"24em", lg:'21em'},
                                width:"100%",
                                  mt:'2px' }}>
                                <DatePicker
                                  sx={{ 
                                    // width: "20em",
                                    width:'100%',
                                   }}
                                  label="Meet Start Date"
                                  value={startDate}
                                  onChange={handleStartDateChange}
                                  textField={(props) => (
                                    <TextField {...props} />
                                  )}
                                  format="DD/MM/YYYY"
                                  slotProps={{
                                    field: {
                                      clearable: true,
                                      onClear: () => setStartDate(true),
                                    },
                                  }}
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                    </Grid>

                    <Grid item xs={6} md={6} lg={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DatePicker"]} sx={{
                                 width: {md:"24em", lg:'21em'},
                                 width:'100%',
                                  mt:'2px' }}>
                                <DatePicker
                                  sx={{ 
                                    // width: "20em",
                                    width:'100%',
                                   }}
                                  label="Meet End Date"
                                  value={endDate}
                                  onChange={handleEndDateChange}
                                  textField={(props) => (
                                    <TextField {...props} />
                                  )}
                                  format="DD/MM/YYYY"
                                  slotProps={{
                                    field: {
                                      clearable: true,
                                      onClear: () => setEndDate(true),
                                    },
                                  }}
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                    </Grid>
                    </Grid>


                                        
            <Box
                      sx={{ display: "flex", alignItems: "center", gap: "10px",pt:'9px' }}
                    >
                                              <Button
                                variant="contained"
                                onClick={excelExport}
                                sx={{
                                  marginLeft: "",
                                  width: "200px",
                                  height: "51px",
                                  // top: "9px",
                                  // gap: "5px",
                                  backgroundColor: "",
                                }}
                              >
                                <FileDownloadIcon />
                                Meetings Export
                              </Button>
                      <Tooltip
                        title={
                          <p style={{ fontSize: "12px", fontWeight: 600 }}>
                            Clear filters
                          </p>
                        }
                      >
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          sx={{
                            minWidth: "unset",
                            // marginLeft: "1.2em",
                            width: "3.9em",
                            height: "3.9em",
                          }}
                          onClick={handleClearFilters}
                        >
                          <RotateLeftIcon />
                          {/* Clear Filters */}
                        </Button>
                      </Tooltip>
                    </Box>


                  </div>

                  <TableContainer
                    // component={Paper}
                    sx={{
                      width: "100%",
                      // boxShadow: 6,
                      backgroundColor: "",
                      // maxHeight:'55vh',
                    
                      minHeight:'55vh',
                      maxHeight:{sm:'55vh', lg:'61vh',},
                      "& .css-dwuj3p-MuiTableCell-root":{
                        backgroundColor: "#141b2d",
                        color:'#FFFFFF',
                        height:'5em'

                      },
                    }}
                  >
                    <Table sx={{
                      //  "& .css-dwuj3p-MuiTableCell-root":{
                      //   backgroundColor: "#2b345386",
                      // }
                    }} 
                    // aria-label="simple table"
                    stickyHeader
                      aria-label="sticky table"
                     >
                      <TableHead
                        sx={{
                          // backgroundColor: "#2b345386 !important",
                          backgroundColor: "#2b345386",
                          // "& .css-dwuj3p-MuiTableCell-root":{
                          //   backgroundColor: "#2b345386",
                          // },
                          border: "1px solid black",
                          fontWeight: "600",
                        }}
                      >
                        <TableRow sx={{ border: "1px solid black",bgcolor: "#2b345386" }}>
                          <TableCell align="center">Sl No</TableCell>


                          <TableCell align="center">Visitor Photo</TableCell>
                          <TableCell align="center">Full Name</TableCell>

                          <TableCell align="center">Email</TableCell>
                          <TableCell align="center">Phone No.</TableCell>


                       

                          <TableCell align="center">Company Name</TableCell>

                          <TableCell align="center">Start Time</TableCell>
                          <TableCell align="center">End Time</TableCell>
                          <TableCell align="center">Duration</TableCell>
                        
                          <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Remarks</TableCell>
                          <TableCell align="center">Room</TableCell>

                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{}}>
                        {filteredCompanies
                          // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((visitor, index) => (
                            <TableRow key={index}>
                              {/* <TableCell>{visitor.id}</TableCell>
                                                        <TableCell>{visitor.visitor.id}</TableCell> */}

                              <TableCell>
                                {calculateSerialNumber(
                                  index,
                                  page,
                                  rowsPerPage
                                )}
                              </TableCell>

                              <TableCell align="center">
                                {visitor.visitor.imageUrl !== null ? 
                                <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          alignItems: "center",
                                        }}
                                      >
                                        <a
                                          href={visitor.visitor.imageUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <img
                                            src={visitor.visitor.imageUrl}
                                            alt="Company Logo"
                                            style={{
                                              width: "40px",
                                              height: "40px",
                                              marginLeft: "10px",
                                              cursor: "pointer",
                                            }}
                                          />
                                        </a>
                                      </div> : 'NA' }

                              </TableCell>

                              <TableCell align="center">
                                {visitor.visitor.name}
                              </TableCell>

                              <TableCell align="center">
                                {visitor.visitor.email}
                              </TableCell>
                              <TableCell align="center">
                                {visitor.visitor.phoneNumber}
                              </TableCell>

                             

                              <TableCell align="center">
                                {visitor.visitor.companyName}
                              </TableCell>

                              <TableCell align="center">
                                {visitor.meetingStartDateTime !== null
                                  ? formatMeetingDuration(visitor)
                                  : "NA"}
                              </TableCell>
                              {/* <TableCell align="left">{formatDate(visitor.checkInDateTime)}</TableCell> */}
                              <TableCell align="center">
                                {visitor.meetingEndDateTime !== null
                                  ? formatMeetingDuration1(visitor)
                                  : "NA"}
                              </TableCell>

                              <TableCell align="center">
                                {visitor.duration!== null
                                  ? visitor.duration
                                  : "NA"}
                              </TableCell>
                              {/* <TableCell align="left">
                                    {visitor.remarks}
                                  </TableCell> */}
                              <TableCell align="center">
                                {visitor.updatedBy}
                              </TableCell>

                              <TableCell align="center">
                            {visitor.remarks !== "" ? (
                              <InfoIcon
                                style={{
                                  fontSize: "20px",
                                  color: "",
                                  marginTop: "5px",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleClickOpenDialog(visitor)
                                }
                              />
                            ) : (
                              <InfoIcon
                                style={{
                                  fontSize: "20px",
                                  color: "lightgrey",
                                  marginTop: "5px",
                                  cursor: "",
                                  pointerEvents: "none",
                                }}
                                disabled
                              />
                            )}
                          </TableCell>
                              <TableCell align="center">
                                {visitor.room !== null
                                  ? visitor.room.roomName
                                  : "NA"}
                              </TableCell>
                              <TableCell align="center">
                                {/*                                                            
                                                            { visitor.status === 'COMPLETED' || visitor.status === 'CANCELLED' ? (
                                                                // Disable the Edit button
                                                                <EditIcon style={{ color: 'lightgray', pointerEvents: 'none' }} />
                                                            ) : (
                                                                // Enable the Edit button
                                                                <EditIcon onClick={() => handleOpenModal(visitor)} />
                                                            )} */}

                                {/* zzzzzzzzz */}

                                {/* {visitor.status === "COMPLETED" ||
                                    visitor.status === "CANCELLED" ||
                                    visitor.status ===
                                      "CANCELLED_BY_VISITOR"|| visitor.status ===
                                      "INPROCESS" ? (
                                      <>
                                        <div className="status">
                                          <CheckIcon
                                            style={{
                                              cursor: "pointer",
                                              color: "lightgray",
                                              pointerEvents: "none",
                                              marginRight: "10px",
                                            }}
                                          />
                                          <ClearIcon
                                            style={{
                                              cursor: "pointer",
                                              color: "lightgray",
                                              pointerEvents: "none",
                                            }}
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="status">
                                          <CheckIcon
                                            style={{
                                              cursor: "pointer",
                                              marginRight: "10px",
                                            }}
                                            onClick={() =>
                                              handleAddMeeting(
                                                visitor,
                                                "APPROVED"
                                              )
                                            }
                                          />
                                          <ClearIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                              handleAddMeeting(
                                                visitor,
                                                "CANCELLED"
                                              )
                                            }
                                          />
                                        </div>
                                      </>
                                    )} */}

                                {/* zzzzzz */}

                                {visitor.status === "APPROVED" ? (
                                  <div className="status">
                                    <CheckIcon
                                      style={{
                                        // cursor: 'pointer',
                                        color: "lightgray",
                                        marginRight: "10px",
                                        pointerEvents: "none",
                                      }}
                                    />
                                    <ClearIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleAddMeeting(visitor, "CANCELLED")
                                      }
                                    />
                                  </div>
                                ) : visitor.status === "CANCELLED" ||
                                  visitor.status === "COMPLETED" ||
                                  visitor.status === "CANCELLED_BY_VISITOR" ||
                                  visitor.status === "INPROCESS" ? (
                                  <>
                                    <div className="status">
                                      <CheckIcon
                                        style={{
                                          cursor: "pointer",
                                          color: "lightgray",
                                          marginRight: "10px",
                                          pointerEvents: "none",
                                        }}
                                        // onClick={() => handleAddMeeting(visitor, 'APPROVED')}
                                      />
                                      <ClearIcon
                                        style={{
                                          cursor: "pointer",
                                          color: "lightgray",
                                        }}
                                        // onClick={() => handleAddMeeting(visitor, 'CANCELLED')}
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="status">
                                      <CheckIcon
                                        style={{
                                          cursor: "pointer",
                                          marginRight: "10px",
                                        }}
                                        onClick={() =>
                                          handleAddMeeting(visitor, "APPROVED")
                                        }
                                      />
                                      <ClearIcon
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          handleAddMeeting(visitor, "CANCELLED")
                                        }
                                      />
                                    </div>
                                  </>
                                )}

                                {/* <CheckIcon style={{cursor:"pointer"}} onClick={() =>handleAddMeeting(visitor,'APPROVED')}/>
                                                            <ClearIcon style={{cursor:"pointer"}}onClick={()=>handleAddMeeting(visitor,'CANCELLED')}/> */}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                    {/* <TablePagination
                      rowsPerPageOptions={[5, 10, 25, 50, 100]}
                      component="div"
                      count={meetings}
                      // count={visitors}

                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}
                  </TableContainer>

                  <TablePagination
                  sx={{
                    "& .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar": {
                      bgcolor:'#82889F',
                      borderRadius:'0 0 5px 5px',
                    },
                  }}
                      rowsPerPageOptions={[5, 10, 25, 50, 100]}
                      component="div"
                      count={meetings}
                      // count={visitors}

                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Item>
              </Grid>
            </Grid>

            <StyledModal
              open={open} // Set the open prop of the modal
              // onClose={handleCloseModal} // Handle closing the modal
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Box
                width={600}
                height={300}
                bgcolor={"white"}
                p={3}
                borderRadius={5}
                border="none"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  // margin='auto'
                  // marginTop={10}
                  padding={3}
                  borderRadius={5}
                  gap={3}
                >
                  <Typography fontSize={20} fontWeight={"bold"} variant={"h1"}>
                    Meeting
                  </Typography>

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

            {openDialog && (
          <Dialog onClose={handleCloseDialog} open={openDialog}>
            <DialogTitle
              sx={{
                color: "black",
                backgroundColor: "lightblue",
                textAlign: "center",
              }}
            >
              INFO
            </DialogTitle>
            <List sx={{ width: "300px" }}>
              <ListItem
                button
                onClick={() => handleCloseDialog("username@gmail.com")}
              >
                <ListItemText
                  primary={`Remarks: ${
                    selectedValue.remarks !== null &&
                    selectedValue.remarks !== ""
                      ? selectedValue.remarks
                      : "-"
                  }`}
                  sx={{ color: "blue", fontSize: "20px" }}
                />
              </ListItem>
              <ListItem
                button
                onClick={() => handleCloseDialog("username@gmail.com")}
              >
                <ListItemText
                  primary={`Permission: ${
                    selectedValue.user.isPermission !== "null" ||
                    selectedValue.user.isPermission !== ""
                      ? selectedValue.user.isPermission
                      : ""
                  }`}
                  sx={{ color: "green" }}
                />
              </ListItem>
            </List>
          </Dialog>
        )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}