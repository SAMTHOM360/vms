import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../global/Navbar";
import Sidebar from "../global/Sidebar";
import Grid from "@mui/material/Grid";
import {
  Paper,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import Header from "./Header";
import StatBox from "./StatBox";
import Loader from "./Loader";

import HandshakeIcon from "@mui/icons-material/Handshake";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import MeetList from "./experimentals/MeetList";
import MeetBarChart from "./experimentals/MeetBarChart";
import MeetingTimeline from "./experimentals/MeetingTimeline";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TimelineDot from "@mui/lab/TimelineDot";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../routes/AuthContext";

const EmpDashboard = () => {
  const BASE_URL1 = "http://192.168.12.58:8080/api";
  // const BASE_URL1 = 'http://192.168.12.54:8080/api'
  // const BASE_URL1 = 'http://192.168.12.60:8080/api'
  // const BASE_URL = 'http://192.168.12.54:8080/api'

  const adminId = localStorage.getItem("adminId");
  const token = sessionStorage.getItem("token");
  const loggedUserRole = sessionStorage.getItem("loggedUserRole");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const navigate = useNavigate();

  const { setIsNavBar, setIsSideBar } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalMeetings: "",
    completedMeetings: "",
    pendingMeetings: "",
    totalMeetngHours: "",
  });
  const [barchartData, setBarchartData] = useState(null);
  const [timelineData, setTimelineData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isTodayBtn, setIsTodayBtn] = useState(true);
  const [isWeekBtn, setIsWeekBtn] = useState(false);
  const [isMonthBtn, setIsMonthBtn] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigateMeeting = () => {
    if (loggedUserRole) {
      if (loggedUserRole === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  };

  // async function fetchData() {
  //   const payLoad = {
  //     user: {
  //       id: adminId,
  //     },

  //     fromDate:"2023-07-13",
  //     toDate:"2023-11-19",
  //   };
  //   try {
  //     setLoading(true);
  //     // const dashboardResponse = await axios.get(
  //     //   `${BASE_URL1}/meeting/userdashboard?userId=${adminId}`,
  //     // );

  //     const dashboardResponse = await axios.post(
  //       `${BASE_URL1}/meeting/userdashboard?userId=${adminId}`,
  //       payLoad
  //     );

  //     const dashboardTimelineResponse = await axios.post(
  //       `${BASE_URL1}/meeting/meetingfordashboard`,
  //       payLoad
  //     );

  //     // const dashboardTimelineResponse = await axios.get(
  //     //   `${BASE_URL1}/meeting/vis?id=${adminId}`
  //     // );

  //     const dashboardApiData = dashboardResponse.data.data;
  //     const timelineApiData = dashboardTimelineResponse.data.data;

  //     console.log("DB API DATA", timelineApiData);
  //     // console.log("Timeline API DATA", dashboardTimelineResponse.data.data)

  //     const transformedData = Object.keys(
  //       dashboardApiData.meetingsContextDate
  //     ).map((date) => ({
  //       date: date,
  //       ...dashboardApiData[date],
  //     }));

  //     if (dashboardResponse.status === 200) {
  //       setBarchartData(dashboardApiData.meetingsContextDate);
  //       setTimelineData(timelineApiData);

  //       let hours = dashboardApiData.totalHoursOfMeeting / 3600000;
  //       let hoursFloat = Math.round(hours * 100) / 100;

  //       setDashboardData({
  //         totalMeetings: dashboardApiData.totalMeetings || "",
  //         completedMeetings: dashboardApiData.completed || "",
  //         pendingMeetings: dashboardApiData.pending || "",
  //         totalMeetngHours: hoursFloat || "",
  //       });
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong !", {
  //       position: "top-right",
  //       autoClose: 4000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     console.error("Error fetching data:", error);
  //   }
  //   setLoading(false);
  // }

  // console.log("dashboard data", dashboardData)

  async function fetchData(fromDate, toDate) {
    const payLoad = {
      user: {
        id: adminId,
      },
      fromDate: fromDate,
      // fromDate: "2023-11-13",
      // toDate: "2023-11-14",
      toDate: toDate,
    };

    console.log("dynamic payload", payLoad);

    try {
      setLoading(true);

      const dashboardResponse = await axios.post(
        `${BASE_URL1}/meeting/userdashboard?userId=${adminId}`,
        payLoad
      );

      const dashboardTimelineResponse = await axios.post(
        `${BASE_URL1}/meeting/meetingfordashboard`,
        payLoad
      );

      const dashboardApiData = dashboardResponse.data.data;

      console.log("dashboardApiData", dashboardApiData);
      const timelineApiData = dashboardTimelineResponse.data.data;

      const transformedData = Object.keys(
        dashboardApiData.meetingsContextDate
      ).map((date) => ({
        date: date,
        ...dashboardApiData[date],
      }));

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
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  }

  // const handleTodayClick = async () => {
  //   const today = new Date().toISOString().split('T')[0];
  //   await fetchData(today, today);
  // };

  // const handleThisWeekClick = async () => {
  //   const currentDate = new Date();
  //   const diffFromMonday = currentDate.getDay() - 1;
  //   const startOfWeek = new Date(currentDate);
  //   startOfWeek.setDate(currentDate.getDate() - diffFromMonday);
  //   const endOfWeek = new Date(startOfWeek);
  //   endOfWeek.setDate(startOfWeek.getDate() + 6);

  //   const fromWeek = startOfWeek.toISOString().split('T')[0];
  //   const toWeek = endOfWeek.toISOString().split('T')[0];

  //   await fetchData(fromWeek, toWeek);
  // };

  // const handleThisMonthClick = async () => {
  //   const currentDate = new Date();
  //   const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  //   const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  //   const fromMonth = firstDayOfMonth.toISOString().split('T')[0];
  //   const toMonth = lastDayOfMonth.toISOString().split('T')[0];

  //   await fetchData(fromMonth, toMonth);
  // };

  const options = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "thisWeek" },
    { label: "This Month", value: "thisMonth" },
  ];

  const [selectedFilter, setSelectedFilter] = useState("today");

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;

    switch (selectedValue) {
      case "today":
        handleTodayClick();
        break;
      case "thisWeek":
        handleThisWeekClick();
        break;
      case "thisMonth":
        handleThisMonthClick();
        break;
      default:
        break;
    }

    setSelectedFilter(selectedValue);
  };

  const handleTodayClick = async () => {
    const today = new Date();
    const formattedToday = formatDateForServer(today);
    await fetchData(formattedToday, formattedToday);
    setIsTodayBtn(true);
    setIsWeekBtn(false);
    setIsMonthBtn(false);
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
    setIsTodayBtn(false);
    setIsWeekBtn(true);
    setIsMonthBtn(false);
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
    setIsTodayBtn(false);
    setIsWeekBtn(false);
    setIsMonthBtn(true);
  };

  const formatDateForServer = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // fetchData();
    handleTodayClick();
    setIsNavBar(true);
    setIsSideBar(true);
  }, []);

  const [pageIndex, setPageIndex] = useState(0);

  // ... (other code)

  const handleNextPage = () => {
    setPageIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevPage = () => {
    setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const dates = Object.keys(barchartData || {});
  const visibleData = dates
    .slice(pageIndex * 15, (pageIndex + 1) * 15)
    .reduce((acc, date) => {
      acc[date] = barchartData[date];
      return acc;
    }, {});

  console.log("VISIBLE DATA", Object.keys(visibleData || {}).length);
  console.log("Bar chart Data", barchartData);
  // console.log("Time Line Data", timelineData)

  console.log("page index", pageIndex);

  return (
    <>
      <Loader isLoading={loading} />
      <Navbar toggleSidebar={toggleSidebar} />
      <Box sx={{ display: "flex", flexGrow: 1, p: 3 }}>
        <Sidebar open={sidebarOpen} />
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

              <Box>
                {/* <Button
                  variant="contained"
                  size="small"
                  color={isTodayBtn ? "primary" : "inherit"}
                  sx={{
                    height: "3em",
                    borderRadius: "0px",
                    width: "97px",
                    boxShadow: "none",
                    borderRight: "2px solid #B0B0B0",
                  }}
                  onClick={handleTodayClick}
                >
                  Today
                </Button>

                <Button
                  color={isWeekBtn ? "primary" : "inherit"}
                  variant="contained"
                  size="small"
                  sx={{
                    height: "3em",
                    borderRadius: "0px",
                    width: "97px",
                    boxShadow: "none",
                    borderRight: "2px solid #B0B0B0",
                  }}
                  onClick={handleThisWeekClick}
                >
                  This week
                </Button>

                <Button
                color={isMonthBtn ? 'primary' : 'inherit'}
                  variant="contained"
                  size="small"
                  sx={{
                    height: "3em",
                    borderRadius: "0px",
                    width: "97px",
                    boxShadow: "none",
                  }}
                  onClick={handleThisMonthClick}
                >
                  Total
                </Button> */}

                <FormControl
                  sx={{
                    border: "none",
                    borderRadius: "5px",
                    // width: "130px !important",
                    // height: '50px !important',
                    boxShadow: "0px 2px 2px #333333",
                  }}
                >
                  <InputLabel sx={{ color: "#626262" }}>Filter by</InputLabel>
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
            <Box
              // elevation={5}
              sx={{
                // width: '100%',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                m="20px 0 0 0"
                // display='flex'
                // width="100%"
                maxWidth="100%"
                flexGrow={1}
                height="auto"
                // sx={{
                //   "& .MuiDataGrid-root": {
                //     border: 'none',
                //   },
                // //   "& .MuiDataGrid-cell": {
                // //     borderBottom: 'none',
                // //   },
                //   "& .MuiDataGrid-columnHeaders": {
                //     borderBottom: 'none',
                //   },
                // //   "& .MuiDataGrid-footerContainer": {
                // //     borderTop: 'none',
                // //   },
                // }}

                sx={{
                  mb: "1.5em",
                }}
              >
                <Grid container spacing={2} mt="1px">
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
                      onClick={handleNavigateMeeting}
                    >
                      <StatBox
                        title={dashboardData.totalMeetings || "0"}
                        subtitle="Total Meetings"
                        // progress="0.75"
                        // increase="+14%"
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
                      }}
                    >
                      <StatBox
                        title={dashboardData.pendingMeetings || "0"}
                        subtitle="Pending Meetings"
                        // progress="0.75"
                        // increase="+14%"
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
                      }}
                    >
                      <StatBox
                        title={dashboardData.completedMeetings || "0"}
                        subtitle="Completed Meetings"
                        // progress="0.75"
                        // increase="+14%"
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
                        // progress="0.75"
                        // increase="+14%"
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
                        pb:'2em'
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
                          sx={{ color: "#4cceac", mt: "10px", ml: "10px" }}
                        >
                          Meeting Counts
                        </Typography>
                        <Box
                          sx={{
                            mt: "1em",
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
                            }}
                          >
                            PREV
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
                            }}
                          >
                            NEXT
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
                      {/* Recent meetings tickets (with explore more dialog) */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{ color: "#4cceac", mt: "10px", ml: "10px" }}
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
                        {/* <MeetList /> */}
                        <MeetingTimeline timelineApiData={timelineData} />
                      </Box>
                    </Box>
                    {/* <Grid container spacing={2}>
                      <Grid item xs={12} md={6} lg={12}>
                    <Box sx={{width:'100%', background:'#1F2A40', height:'15.5em', maxHeight:'15.5em', display:'flex',flexDirection:'column', }}>
                      <Typography variant='h5' sx={{color:'#4cceac', mt:'10px', ml:'10px'}}>Activity Timeline</Typography>
                      <Box sx={{overflowY:'auto', width:'100%', mb:'1em',}}>
                      <MeetingTimeline />
                      </Box>
                      
                    </Box>
                        </Grid>

                        <Grid item xs={12} md={6} lg={12}>
                    <Box sx={{width:'100%', background:'blue', height:'15.5em', color:'#fff'}}>
                      Meeting types count PIECHART
                    </Box>
                        </Grid>
                      </Grid> */}
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EmpDashboard;
