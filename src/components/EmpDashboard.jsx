import React, { useEffect } from "react";
import { useState } from "react";
// import Navbar from "../global/Navbar";
// import Sidebar from "../global/Sidebar";
import Grid from "@mui/material/Grid";
import {
  Paper,
  Box,
  Typography,
  Button,
  FormControl,
} from "@mui/material";
import Header from "./Header";
import StatBox from "./StatBox";
import Loader from "./Loader";

import HandshakeIcon from "@mui/icons-material/Handshake";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


import MeetBarChart from "./experimentals/MeetBarChart";
import MeetingTimeline from "./experimentals/MeetingTimeline";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../routes/AuthContext";
import Config from "../Config/Config";

const EmpDashboard = () => {
// console.log('I am imposter')

  const { setIsNavBar, setIsSideBar, setActiveListItem } = useAuth();
  // const BASE_URL1 = "http://192.168.12.58:8080/api";
  const BASE_URL1 = 'http://192.168.12.54:8080/api'
  // const BASE_URL1 = 'http://192.168.12.60:8080/api'
  // const BASE_URL = 'http://192.168.12.54:8080/api'

  // sessionStorage.setItem('activeListItem', '/empdashboard')
  useEffect(() => {
    // console.log('useeffect set active item')
    setActiveListItem('/empdashboard')
  }, [setActiveListItem])
  const adminId = sessionStorage.getItem("adminId");
  // const token = sessionStorage.getItem("token");
  const loggedUserRole = sessionStorage.getItem("loggedUserRole");

  // const headers = {
  //   Authorization: `Bearer ${token}`,
  // };
  
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalMeetings: "",
    completedMeetings: "",
    pendingMeetings: "",
    totalMeetngHours: "",
  });
  const [barchartData, setBarchartData] = useState(null);
  const [timelineData, setTimelineData] = useState(null);
  const [visibleData, setVisibleData ] = useState()
  const [loading, setLoading] = useState(false);

  const [isTodayInterval, setIsTodayInterval] = useState(true);
  const [isThisWeekInterval, setIsThisWeekInterval] = useState(false);
  const [isThisMonthInterval, setIsThisMonthInterval] = useState(false);
  const [empFilteredFromDate, setEmpFilteredFromDate] = useState()
  const [empFilteredToDate, setEmpFilteredToDate] = useState()



  // const handleNavigateMeeting = () => {
  //   if (loggedUserRole) {
  //     if (loggedUserRole === "ADMIN") {
  //       navigate("/meetings");
  //     } else {
  //       navigate("/meetings");
  //     }
  //   }
  // };

  const handleNavigateMeeting = (filteredVisitors) => {
    let path = `/meetings`;

    // navigate(path);
    // console.log('empFilteredFromDate', empFilteredFromDate)
    // console.log('empFilteredToDate', empFilteredToDate)

    if (empFilteredFromDate && empFilteredToDate) {
      sessionStorage.setItem("filters", filteredVisitors)
      sessionStorage.setItem("empFilteredFromDate", empFilteredFromDate)
      sessionStorage.setItem("empFilteredToDate", empFilteredToDate)
      navigate(path);

  }
  else {
      navigate(path);
  }
  };

  // console.log('from date',empFilteredFromDate)
  // console.log('to date', empFilteredToDate)

  async function fetchData(fromDate, toDate) {
    toast.dismiss();
    const payLoad = {
      user: {
        id: adminId,
      },
      fromDate: fromDate,
      // fromDate: "2023-11-13",
      // toDate: "2023-11-14",
      toDate: toDate,
    };

    // console.log("dynamic payload", payLoad);

    // console.log('non dynamic data')
    let url1 = Config.baseUrl + Config.apiEndPoints.empDashboardFetchDashboard
    let url2 = Config.baseUrl + Config.apiEndPoints.empDashboardFetchTimeline

    try {
      setLoading(true);

      const dashboardResponse = await axios.post(
        `${url1}?userId=${adminId}`,
        payLoad
      );

      const dashboardTimelineResponse = await axios.post(
        `${url2}`,
        payLoad
      );

      const dashboardApiData = dashboardResponse.data.data;

      // console.log("dashboardApiData", dashboardApiData);
      const timelineApiData = dashboardTimelineResponse.data.data;

      if (dashboardResponse.status === 200) {
        setBarchartData(dashboardApiData.meetingsContextDate);
        setTimelineData(timelineApiData);

        let hours = dashboardApiData.totalHoursOfMeeting / 3600000;
        let hoursFloat = Math.round(hours * 100) / 100;

        setDashboardData({
          totalMeetings: dashboardApiData.totalMeetings || "",
          completedMeetings: dashboardApiData.completed || "",
          pendingMeetings: dashboardApiData.pending || "",
          totalMeetngHours: hoursFloat || "",
        });
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  }








  // async function fetchTimeLineData(fromDate, toDate) {
  //   const payLoad = {
  //     user: {
  //       id: adminId,
  //     },
  //     fromDate: fromDate,
  //     // fromDate: "2023-11-13",
  //     // toDate: "2023-11-14",
  //     toDate: toDate,
  //   };

  //   console.log('dynamic payload',);

  //   try {
  //     const dashboardTimelineResponse = await axios.post(
  //       `${BASE_URL1}/meeting/meetingfordashboard`,
  //       payLoad
  //     );
  //     const timelineApiData = dashboardTimelineResponse.data.data;

  //     if (dashboardTimelineResponse.status === 200) {
  //       setTimelineData(timelineApiData);

  //       // setTimelineData((prevTimelineData) => ({
  //       //   ...prevTimelineData,
  //       //   ...timelineApiData,
  //       // }));
  //     }
  //   } catch (error) {
  //     // toast.error("Something went wrong!");
  //     console.error("Error fetching data:", error);
  //   }
  // }










  const options = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "thisWeek" },
    { label: "This Month", value: "thisMonth" },
  ];

  const [selectedFilter, setSelectedFilter] = useState("today");

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;

    switch (selectedValue) {
      case 'today':
        setIsTodayInterval(true);
        setIsThisWeekInterval(false);
        setIsThisMonthInterval(false);
        handleTodayClick();
        break;
      case 'thisWeek':
        setIsTodayInterval(false);
        setIsThisWeekInterval(true);
        setIsThisMonthInterval(false);
        handleThisWeekClick();
        break;
      case 'thisMonth':
        setIsTodayInterval(false);
        setIsThisWeekInterval(false);
        setIsThisMonthInterval(true);
        handleThisMonthClick();
        break;
      default:
        break;
    }

    setPageIndex(0);

    setSelectedFilter(selectedValue);
  };


// BLOCK SCOPE USEEFFECT STARTS


  useEffect(() => {


    async function fetchTimeLineData(fromDate, toDate) {
      const payLoad = {
        user: {
          id: adminId,
        },
        fromDate: fromDate,
        // fromDate: "2023-11-13",
        // toDate: "2023-11-14",
        toDate: toDate,
      };
  
      // console.log('dynamic payload',);
      let url = Config.baseUrl + Config.apiEndPoints.empDashboardFetchTimeline

  
      try {
        const dashboardTimelineResponse = await axios.post(
          `${url}`,
          payLoad
        );
        const timelineApiData = dashboardTimelineResponse.data.data;
  
        if (dashboardTimelineResponse.status === 200) {
          setTimelineData(timelineApiData);
  
          // setTimelineData((prevTimelineData) => ({
          //   ...prevTimelineData,
          //   ...timelineApiData,
          // }));
        }
      } catch (error) {
        // toast.error("Something went wrong!");
        console.error("Error fetching data:", error);
      }
    }

    const formatDateForServer2 = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };





    const handleIntervalToday = async () => {
      const today = new Date();
      const formattedToday = formatDateForServer2(today);
      await fetchTimeLineData(formattedToday, formattedToday);
      // console.log('today interval')
    };
  
    const handleIntervalThisWeek = async () => {
      const currentDate = new Date();
      const diffFromMonday = currentDate.getDay() - 1;
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - diffFromMonday);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
  
      const formattedFromWeek = formatDateForServer2(startOfWeek);
      const formattedToWeek = formatDateForServer2(endOfWeek);
  
      await fetchTimeLineData(formattedFromWeek, formattedToWeek);
      // console.log('this week interval')
    };
  
    const handleIntervalThisMonth = async () => {
      const currentDate = new Date();
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
  
      const formattedFromMonth = formatDateForServer2(firstDayOfMonth);
      const formattedToMonth = formatDateForServer2(lastDayOfMonth);
  
      await fetchTimeLineData(formattedFromMonth, formattedToMonth);
      // console.log('this month interval')
    };





    const intervalId = setInterval(() => {
      if (isTodayInterval) {
        handleIntervalToday();
      } else if (isThisWeekInterval) {
        handleIntervalThisWeek();
      } else if (isThisMonthInterval) {
        handleIntervalThisMonth();
      }
    }, 7000);

    return () => clearInterval(intervalId);
  }, [
    isTodayInterval,
     isThisWeekInterval,
      isThisMonthInterval
    ]);




    // BLOCK SCOPE USEEFFECT ENDS




  const handleTodayClick = async () => {
    const today = new Date();
    const formattedToday = formatDateForServer(today);
    await fetchData(formattedToday, formattedToday);
    // await fetchTimeLineData(formattedToday, formattedToday);
    setSelectedFilter('today')
    setEmpFilteredFromDate(formattedToday)
    setEmpFilteredToDate(formattedToday)
  };

  const handleThisWeekClick = async () => {
    const currentDate = new Date();
    const diffFromMonday = currentDate.getDay() - 1;
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - diffFromMonday);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const formattedFromWeek = formatDateForServer(startOfWeek);
    const formattedToWeek = formatDateForServer(endOfWeek);

    await fetchData(formattedFromWeek, formattedToWeek);
    // await fetchTimeLineData(formattedFromWeek, formattedToWeek);
    setEmpFilteredFromDate(formattedFromWeek)
    setEmpFilteredToDate(formattedToWeek)
  };

  const handleThisMonthClick = async () => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const formattedFromMonth = formatDateForServer(firstDayOfMonth);
    const formattedToMonth = formatDateForServer(lastDayOfMonth);

    await fetchData(formattedFromMonth, formattedToMonth);
    // await fetchTimeLineData(formattedFromMonth, formattedToMonth);
    setEmpFilteredFromDate(formattedFromMonth)
    setEmpFilteredToDate(formattedToMonth)
  };




  const formatDateForServer = (date) => {
    // console.log(' am i me')
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // console.log('useeffect handle click')
    handleTodayClick();
    setIsNavBar(true);
    setIsSideBar(true);
  }, []);

  const [pageIndex, setPageIndex] = useState(0);

  const handleNextPage = () => {
    setPageIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevPage = () => {
    setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // const dates = Object.keys(barchartData || {});
  // const visibleData = dates.slice(pageIndex * 15, (pageIndex + 1) * 15).reduce((acc, date) => {
  //   acc[date] = barchartData[date];
  //   console.log("visible data",)
  //   return acc;
  // }, {});


  useEffect(() => {
    const dates = Object.keys(barchartData || {});
    const updatedVisibleData = dates.slice(pageIndex * 15, (pageIndex + 1) * 15).reduce((acc, date) => {
      acc[date] = barchartData[date];
      return acc;
    }, {});

    setVisibleData(updatedVisibleData);
    // console.log("visible data", updatedVisibleData);

    // Additional logic if needed

  }, [barchartData, pageIndex]);
  


  return (
    <>
      <Loader isLoading={loading} />
  
      <Box sx={{ display: "flex", flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Box
              // elevation={5}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // width:'100%',
                minHeight: "4.5em",
                mt: "3em",
                mb: "0.5em",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Header title="Dashboard" subtitle="Welcome to dashboard" />

              <Box
              sx={{
                display:'flex',
                flexDirection:{xs:'column', md:'row'},
                alignItems:'center',
                gap:'0.3em'
              }}
              >

                <Typography sx={{color:'#555555', userSelect:'none'}}>Filter by</Typography>

                <FormControl
                  sx={{
                    border: "none",
                    borderRadius: "5px",
                    // width: "130px !important",
                    // height: '50px !important',
                    boxShadow: "0px 2px 2px #333333",
                  }}
                >
                  {/* <InputLabel sx={{ color: "#626262" }}>Filter by</InputLabel> */}
                  <Select
                    sx={{
                      color: "white",
                      bgcolor: "#1976d2",
                      width: "130px !important",
                      height: '40px !important',
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
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              elevation={5}
              sx={{
                // width: '100%',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingX:'1em'
              }}
            >
              <Box
                m="20px 0 0 0"
                // display='flex'
                // width="100%"
                maxWidth="100%"
                flexGrow={1}
                // height="auto"
                sx={{
                  // mb: "1.5em",
                  minHeight:'75vh'
                }}
              >
                <Grid container spacing={2} mt="1px" mb="15px">
                  <Grid item xs={12} sm={6} md={6} lg={3} >
                    <Box
                      sx={{
                        width: "100%",
                        background: "#1F2A40",
                        height: "10em",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "#283550",
                        },
                      }}
                      onClick={() => handleNavigateMeeting('')}
                    >
                      <StatBox
                        title={dashboardData.totalMeetings || "0"}
                        subtitle="Total Meetings"
                        icon={
                          <Diversity2Icon
                            sx={{ color: "#3da58a", fontSize: "36px" }}
                          />
                        }
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Box
                      sx={{
                        width: "100%",
                        background: "#1F2A40",
                        height: "10em",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "#283550",
                        },
                      }}
                      onClick={() => handleNavigateMeeting('PENDING')}
                    >
                      <StatBox
                        title={dashboardData.pendingMeetings || "0"}
                        subtitle="Pending Meetings"
                        icon={
                          <PendingActionsIcon
                            sx={{ color: "#3da58a", fontSize: "36px" }}
                          />
                        }
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Box
                      sx={{
                        width: "100%",
                        background: "#1F2A40",
                        height: "10em",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "#283550",
                        },
                      }}
                      onClick={() => handleNavigateMeeting('COMPLETED')}

                    >
                      <StatBox
                        title={dashboardData.completedMeetings || "0"}
                        subtitle="Completed Meetings"
                        icon={
                          <HandshakeIcon
                            sx={{ color: "#3da58a", fontSize: "36px" }}
                          />
                        }
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Box
                      sx={{
                        width: "100%",
                        background: "#1F2A40",
                        height: "10em",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <StatBox
                        title={dashboardData.totalMeetngHours || "0"}
                        subtitle="Total Meeting Hours"
                        icon={
                          <HourglassBottomIcon
                            sx={{ color: "#3da58a", fontSize: "36px" }}
                          />
                        }
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={12} lg={7.5}>
                    <Box
                      sx={{
                        width: "100%",
                        background: "#1F2A40",
                        height: "32em",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        pb:'10px'
                      }}
                    >
                      {/* <Grid  container>

                      <Grid item xs={12} md={12} lg={12}> */}

                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          // mb: "1em",
                          pr: "1em",
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{ color: "#4cceac", mt: "10px", ml: "10px", userSelect:'none' }}
                        >
                          Meeting Counts
                        </Typography>
                        <Box
                          sx={{
                            mt: "1em",
                            mt:'10px',
                          }}
                        >
                          <Button
                            variant="contained"
                            onClick={handlePrevPage}
                            color={pageIndex === 0 ? "inherit" : "primary"}
                            sx={{
                              pointerEvents:
                                pageIndex === 0 ||
                                (barchartData &&
                                  Object.keys(barchartData).length <= 15)
                                  ? "none"
                                  : "auto",
                                  minWidth: 'unset',
                                  width: '5px',
                                  height: '30px',  
                                  mr:'0.5em'
                            }}
                          >
       
                            <NavigateBeforeIcon sx={{
                            }} />
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleNextPage}
                            color={
                              barchartData &&
                              Object.keys(barchartData).length <= 15
                                ? "inherit"
                                : pageIndex === 0
                                ? "primary"
                                : (pageIndex + 1) * 15 <
                                  Object.keys(barchartData || {}).length
                                ? "primary"
                                : "inherit"
                            }
                            sx={{
                              pointerEvents:
                                Object.keys(barchartData || {}).length <=
                                Object.keys(visibleData || {}).length
                                  ? "none"
                                  : (pageIndex + 1) * 15 >=
                                    Object.keys(barchartData || {}).length
                                  ? "none"
                                  : "auto",
                                  minWidth: 'unset',
                                  width: '5px',
                                  height: '30px',  
                            }}
                          >
                            <NavigateNextIcon />
                          </Button>
                        </Box>
                      </Box>
{/* 
                      </Grid>


                      <Grid item xs={12} md={12} lg={12}></Grid> */}


                      <Box
                        sx={{
                          width: "100%",
                          height: "95%",
                          // bgcolor: "orange",
                          pb:'1em'
                        }}
                      >
                        <MeetBarChart data={visibleData} />
                      </Box>

                      {/* </Grid> */}






                    </Box>
                  </Grid>

                  <Grid item xs={12} md={12} lg={4.5}>
                    <Box
                      sx={{
                        width: "100%",
                        background: "#1F2A40",
                        height: "32em",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{ color: "#4cceac", mt: "10px", ml: "10px", userSelect:'none' }}
                        >
                          Activity Timeline
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: "0.5em",
                            mr: "1em",
                            color: "#C1C1C1",
                            fontSize: "14px",
                            userSelect:'none'
                          }}
                        >
                          <span
                            style={{
                              width: "12px",
                              height: "12px",
                              backgroundColor: "#FFA635",
                              borderRadius: "50%",
                              display: "inline-block",
                            }}
                          ></span>{" "}
                          <span style={{ width: "3px" }}></span> Pending{" "}
                          <span style={{ width: "10px" }}></span>{" "}
                          <span
                            style={{
                              width: "12px",
                              height: "12px",
                              backgroundColor: "#34E60C",
                              borderRadius: "50%",
                              display: "inline-block",
                            }}
                          ></span>{" "}
                          <span style={{ width: "3px" }}></span> Completed{" "}
                          <span style={{ width: "10px" }}></span>{" "}
                          <span
                            style={{
                              width: "12px",
                              height: "12px",
                              backgroundColor: "red",
                              borderRadius: "50%",
                              display: "inline-block",
                            }}
                          ></span>{" "}
                          <span style={{ width: "3px" }}></span> Rejected
                        </Box>
                      </Box>
                      <Box sx={{ overflowY: "auto", width: "100%", mb: "1em" }}>
                        <MeetingTimeline timelineApiData={timelineData} handleTodayClick={handleTodayClick} />
                      </Box>
                    </Box>
                  </Grid>

                  
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EmpDashboard;
