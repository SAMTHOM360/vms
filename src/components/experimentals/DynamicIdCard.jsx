import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Paper, Box, Typography, Avatar } from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";
import Skeleton from "@mui/material/Skeleton";

import axios from "axios";
import Header from "../Header";
import VisitorMeetTimeline from "./VisitorMeetTimeline";
import image1 from "../../assets/6173954.jpg";
import Loader from "../Loader";
import Config from "../../Config/Config";

const DynamicIdCard = () => {
  // const BASE_URL = `http://192.168.12.58:8080/api/meeting/meeting-details`;
  // const BASE_URL = `http://192.168.12.54:8080/api/meeting/meeting-details`;

  const [meetingDetails, setMeetingDetails] = useState(null);
  const [isDynamicMeet, setIsDynamicMeet] = useState(false);
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


  const fetchMeetingDetails = async () => {
    try {
      setLoading(true);
      const id = window.location.pathname.split("/").pop();
      let url = Config.baseUrl + Config.apiEndPoints.dynamicIdCardMeetDetails


      // const response = await axios.get(`${BASE_URL}/${id}`);
      const response = await axios.get(`${url}/${id}`);

      const apiData = response.data.data;

      if (apiData) {
        setIsDynamicMeet(true);
        const apiData0 = apiData[0];
        setMeetingDetails0({
          visitorId: apiData0.visitor.id || "",
          visitorName: apiData0.visitor.name || "N/A",
          visitorImg: apiData0.visitor.imageUrl || "",
          visitorCompany: apiData0.visitor.companyName || "N/A",
          visitorEmail: apiData0.visitor.email || "N/A",
          visitorPhone: apiData0.visitor.phoneNumber || "N/A",
        });
      }

      if (!apiData) {
        setIsDynamicMeet(false);
      }
      console.log("Dynamic Id Response", apiData);

      setMeetingDetails(apiData);
    } catch (error) {
      setError("Error fetching meeting details");
      console.error("Error fetching meeting details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetingDetails();
  }, []);

  const appStyle = {
    backgroundImage: `url(${image1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (

    <>
      <Loader isLoading={loading} />
      {isDynamicMeet ? (
        <>
          <Box sx={{ display: "flex", flexGrow: 1, p: 3 }}>
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
                          minHeight: "75vh",
                          // display:'flex',
                          // flexDirection:'column',
                          // justifyContent:'center',
                          borderRadius: "10px",
                          overflow: "hidden",
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
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />

                            </Avatar>
                            <Typography
                              sx={{
                                fontSize: "22px",
                                fontWeight: "550",
                                mt: "0.2em",
                              }}
                            >
                              {meetingDetails0.visitorName} 
                              {/* {meetingDetails0.visitorId} */}
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
                            padding: "2em",
                            minHeight: "42vh",
                            // minHeight: "39vh",
                            display: "flex",
                            justifyContent: "center",
                            // alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              bgcolor: "#EEEEEE",
                              width: "100%",
                              minHeight: "100%",
                              padding: "2em",
                              borderRadius: "10px",
                              wordBreak:'break-word'
                            }}
                          >
                            <Typography>
                              Email: {meetingDetails0.visitorEmail}
                            </Typography>
                            <Typography>
                              Phone: {meetingDetails0.visitorPhone}
                            </Typography>
                            <Typography></Typography>
                            <Typography></Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6.5} md={8} lg={9}>
                      <Paper
                        elevation={3}
                        sx={{
                          minHeight: "75vh",
                          // display:'flex',
                          // flexDirection:'column',
                          // justifyContent:'center',
                          borderRadius: "10px",
                          // bgcolor: "green",
                          overflow: "hidden",
                        }}
                      >
                        {/* <Box
                  sx={{
                    bgcolor: "",
                    minHeight: "8vh",
                    overflow: "hidden",
                    pl:'1em'
                  }}
                > */}

                        <Box
                          sx={{
                            minHeight: "8vh",
                            overflow: "hidden",
                            pl: "1em",
                            background: "hsla(0, 0%, 100%, 1)",
                            background:
                              "linear-gradient(90deg, hsla(0, 0%, 100%, 1) 0%, hsla(0, 0%, 84%, 1) 100%)",
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
                          <Typography
                            variant="h7"
                            sx={{ mt: "5px" }}
                            color="#666666"
                          >
                            Get latest status of meetings.
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            overflowX: "hidden",
                            overflowY: "hidden",
                            width: "100%",
                            minHeight: "67vh",
                            // bgcolor: "beige",
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
      ) : (
        <Box 
        sx={{
          // minWidth:'100%',
          // minHeight:'100%',
          width:'100vw',
          height:'100vh',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          padding:'0 1em 1em 1em',
        }}
        >
          <Typography
          sx={{
            fontSize:'54px',
            fontWeight:'bold',
            // fontStyle:'Arial'
          }}
          >
            No Data Found / Pass is expired !!! 
            </Typography>
        </Box>
      )}
    </>
  );
};

export default DynamicIdCard;
