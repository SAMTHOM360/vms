import React, { useEffect, useState } from "react";
// import Navbar from '../global/Navbar';
// import Sidebar from '../global/Sidebar';
import Grid from "@mui/material/Grid";
import { Paper, Box, Typography, Avatar } from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";

import axios from "axios";
import Header from "../Header";
import VisitorMeetTimeline from "./VisitorMeetTimeline";
import image1 from "../../assets/5053309.jpg"

const DynamicIdCard = () => {
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [meetingDetails0, setMeetingDetails0] = useState({
    visitorId: "",
    visitorName: "N/A",
    visitorImg: "",
    visitorCompany: "N/A",
    visitorEmail: "N/A",
    visitorPhone: "N/A",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        const id = window.location.pathname.split("/").pop();

        const apiUrl = `http://192.168.12.58:8080/api/meeting/meeting-details/${id}`;

        const response = await axios.get(apiUrl);

        const apiData = response.data.data;
        const apiData0 = apiData[0];
        // setMeetingDetails0(apiData[0])
        console.log("Dynamic Id Response", apiData0);
        console.log("Dynamic Id Response", apiData);

        setMeetingDetails(apiData);
        setMeetingDetails0({
          visitorId: apiData0.visitor.id || "",
          visitorName: apiData0.visitor.name || "N/A",
          visitorImg: apiData0.visitor.imageUrl || "",
          visitorCompany: apiData0.visitor.companyName || "N/A",
          visitorEmail: apiData0.visitor.email || "N/A",
          visitorPhone: apiData0.visitor.phoneNumber || "N/A",
        });
      } catch (error) {
        setError("Error fetching meeting details");
        console.error("Error fetching meeting details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingDetails();
  }, []);


  const appStyle = {
    backgroundImage: `url(${image1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    
  };

  // console.log("0th data", meetingDetails0)

  return (
    // <div>
    //   <h1>Meeting Details</h1>
    //   {loading && <p>Loading meeting details...</p>}
    //   {error && <p>{error}</p>}
    //   {meetingDetails && (
    //     <div>
    //       {/* <p>Title: {meetingDetails.title}</p>
    //       <p>Date: {meetingDetails.date}</p> */}
    //       {/* Add more details as needed */}
    //     </div>
    //   )}
    // </div>

    <>
      {/* <Navbar toggleSidebar={toggleSidebar}/> */}
      <Box sx={{ display: "flex", flexGrow: 1, p: 3 }}>
        {/* <Sidebar open={sidebarOpen} /> */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Box
              elevation={5}
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
                title="Visitor's Meeting Details"
                subtitle="Information of about the visitor and his/her meeetings."
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5.5} md={4} lg={3}>
                  <Paper
                  elevation={2}
                    sx={{
                      height: "75vh",
                      // display:'flex',
                      // flexDirection:'column',
                      // justifyContent:'center',
                      borderRadius:'10px',
                      overflow:'hidden'
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        minHeight: "260px",
                        display: "flex",
                        position: "relative",
                        overflow: "hidden",
                        padding: "0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          // mt: "-3em",
                          // ml: "1em",
                          top: "-3.5em",
                          // left:'-1em',
                          minWidth: "125%",
                          minHeight: "70%",
                          transform: "rotate(15deg)",
                          transformOrigin: "center",
                          // position: 'absolute',
                          // top: '50%',
                          // left: '50%',
                          // Translate the box to center it after rotation
                          // transform: 'translate(-50%, -50%) rotate(45deg)',
                        }}

                        style={appStyle}
                      ></Box>
                      <Box
                        sx={{
                          width: "100%",
                          position: "absolute",
                          top: "1em",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          sx={{
                            width: "180px",
                            height: "180px",
                            borderRadius: "5px",
                          }}
                        >
                          {/* <ImageIcon /> */}
                          <img
              src={meetingDetails0.visitorImg}
              alt="No DP"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
                        </Avatar>
                        <Typography
                          sx={{
                            fontSize: "22px",
                            fontWeight: "550",
                            mt: "0.2em",
                          }}
                        >
                          {meetingDetails0.visitorName} #{meetingDetails0.visitorId}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "800",
                            color: "#5A5A5A",
                          }}
                        >
                          {meetingDetails0.visitorCompany}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        padding:'2em',
                        height:'47.5vh',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        pb:'2em'
                      }}
                    >
                      <Box sx={{bgcolor:'#EEEEEE', width:'100%', maxHeight:'100%', padding:'2em', borderRadius:'10px'}}>
                      <Typography>Email: {meetingDetails0.visitorEmail}</Typography>
                      <Typography>Phone: {meetingDetails0.visitorPhone}</Typography>
                      {/* <Typography>Meeting Attended: 5</Typography> */}
                      <Typography></Typography>
                      <Typography></Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6.5} md={8} lg={9}>
                  <Paper
                         elevation={2}
                         sx={{
                           minHeight: "75vh",
                           // display:'flex',
                           // flexDirection:'column',
                           // justifyContent:'center',
                           borderRadius:'10px',
                           bgcolor:'green',
                           overflow:'hidden'
                         }}
                  >
                  <Box
                    sx={{
                      bgcolor: "lavender",
                      minHeight: "10vh",
                      overflow: "hidden",
                      pl:'1em'
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#3d3d3d",
                        fontSize: "28px",
                        fontWeight: "bold",
                      }}
                    >
                      Meeting Updates
                    </Typography>
                    <Typography variant="h7" sx={{ mt: "5px" }} color="#666666">
                      Get latest status of meetings.
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      overflowX: "hidden",
                      overflowY: "hidden",
                      width: "100%",
                      height: "65vh",
                      bgcolor: "beige",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <VisitorMeetTimeline meetData={meetingDetails} />
                  </Box>
                  </Paper>
                </Grid>

                {/* <Grid item xs={12} md={12} lg={12}></Grid> */}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DynamicIdCard;
