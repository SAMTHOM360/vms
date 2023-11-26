import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
// import TimelineSeparator from "@mui/lab/TimelineSeparator";
// import TimelineDot from "@mui/lab/TimelineDot";
import TimelineContent from "@mui/lab/TimelineContent";
import { Box, Typography } from "@mui/material";
// import ImageIcon from "@mui/icons-material/Image";
import Chip from "@mui/material/Chip";
// import { TimelineConnector } from "@mui/lab";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
// import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

// import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
} from "@mui/material";
import { useEffect } from "react";

export default function VisitorMeetTimeline({ meetData }) {
  // const BASE_URL1 = "http://192.168.12.58:8080/api";
  const BASE_URL1 = "http://192.168.12.54:8080/api";

  const token = sessionStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [meetByIdData, setMeetByIdData] = useState({
    meetId: "",
    vistorId: "",
    visitorName: "",
    visitorImgUrl: "",
    visitorCompany: "",
    visitorEmail: "",
    visitorPhoneNumber: "",
    userId: "",
    meetType: "",
    meetTime: "",
    remarks: "",
    status: "",
  });

  const [openMeetDialog, setOpenMeetDialog] = useState(false);
  const [isVisitorMeetData, setisVisitorMeetData] = useState(false);

  const handleMeetDialogOpen = async (dataitem) => {
    console.log("indiii", dataitem.id);
    const meetById = dataitem.id;

    try {
      const response = await axios.get(
        `${BASE_URL1}/meeting/getbyid/${meetById}`
      );
      const apiData = response.data.data;
      console.log("Api data", apiData);
      setMeetByIdData({
        meetId: apiData.id || "",
        vistorId: apiData.visitor.id || "",
        visitorName: apiData.visitor.name || "",
        visitorImgUrl: apiData.visitor.imageUrl || "",
        visitorCompany: apiData.visitor.companyName || "",
        visitorEmail: apiData.visitor.email || "",
        visitorPhoneNumber: apiData.visitor.phoneNumber || "",
        userId: apiData.user.id || "",
        meetType: apiData.context || "",
        // meetTime: apiData.checkInDateTime || '',
        meetTime: apiData.meetingStartDateTime || "",
        remarks: apiData.remarks || "",
        status: apiData.status || "",
      });
    } catch (error) {
      console.error("unable to fetch data", error);
    }
    setOpenMeetDialog(true);
  };

  const handleMeetApprove = async () => {
    const payLoad = {
      id: meetByIdData.meetId,
      status: "APPROVED",
      user: {
        id: meetByIdData.userId,
      },
      visitor: {
        id: meetByIdData.vistorId,
      },
    };
    console.log("payload approve", payLoad);

    try {
      const response = await axios.post(
        `${BASE_URL1}/meeting/update/meeting`,
        payLoad,
        { headers: headers }
      );
      console.log("Meet update response", response);
      setOpenMeetDialog(false);
    } catch (error) {
      console.error("Unable to update meet status: ", error);
    }
  };

  const handleMeetReject = async () => {
    const payLoad = {
      id: meetByIdData.meetId,
      status: "CANCELLED",
      user: {
        id: meetByIdData.userId,
      },
      visitor: {
        id: meetByIdData.vistorId,
      },
    };
    console.log("payload reject", payLoad);

    try {
      const response = await axios.post(
        `${BASE_URL1}/meeting/update/meeting`,
        payLoad,
        { headers }
      );
      console.log("Meet update response", response);
      setOpenMeetDialog(false);
    } catch (error) {
      console.error("Unable to update meet status: ", error);
    }
  };

  console.log("isVisitorMeetData", isVisitorMeetData);

  // console.log("meet by id data", meetByIdData)

  const handleMeetDialogClose = () => {
    setOpenMeetDialog(false);
  };

  useEffect(() => {
    if (meetData && meetData.length > 0) {
      setisVisitorMeetData(true);
    } else {
      setisVisitorMeetData(false);
    }
  }, [meetData]);

  if (!meetData || meetData.length === 0) {
    return (
      <Box>
        <Typography>No Records Found</Typography>
      </Box>
    );
  }

  function formatMeetingStartDateTime(timestamp) {
    if (timestamp === "") {
      return " N/A";
    }
    const date = new Date(timestamp);

    const meetingDate = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });
    const meetingStartTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${meetingDate} | ${meetingStartTime}`;
  }

  function formatMeetingEndDateTime(timestamp) {
    if (timestamp === "") {
      return " N/A";
    }

    const date = new Date(timestamp);
    const meetingEndTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return ` ${meetingEndTime}`;
  }

  if (!Array.isArray(meetData) || meetData.length === 0) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          minWidth: "85%",
          minHeight: "62vh",
          padding: "0",
          overflowX: "hidden",
          overflowY: "auto",
          // bgcolor: "#EEEEEE",
        }}
      >
        <Timeline
          sx={{
            padding: "0",

            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {meetData.map((dataItem, index) => {
            const meetingStartDateTime = dataItem.meetingStartDateTime || "";
            const meetingEndDateTime = dataItem.meetingEndDateTime || "";
            const formattedMeetingStartDateTime =
              formatMeetingStartDateTime(meetingStartDateTime);
            const formattedMeetingEndDateTime =
              formatMeetingEndDateTime(meetingEndDateTime);
            // console.log(formattedMeetingDateTime);

            let dotColor = "#808080";
            let roomNo= null
            if (dataItem) {
              if (dataItem.status === "PENDING") {
                dotColor = "#FFA635";
              } else if (dataItem.status === "COMPLETED") {
                dotColor = "#34E60C";
                roomNo = dataItem.room ? `|| ${dataItem.room.roomName}` : '';
              } else if (dataItem.status === "CANCELLED") {
                dotColor = "red";
              }
            }

            let timelineContentBgColor = "#808080";
            if (dataItem) {
              if (dataItem.status === "PENDING") {
                timelineContentBgColor = "#C589405e";
              } else {
                timelineContentBgColor = "#2D3E5F";
                // timelineContentBgColor = '#ED66635e'
              }
            }

            let chipText = "Others";
            let chipColor = "#E9E9E9";
            let chipBgColor = "#E2E2E21f";
            if (dataItem) {
              if (dataItem.context === "BUSINESS") {
                chipText = "Business";
                chipColor = "#6CD221";
                chipBgColor = "#6CD2211f";
              } else if (dataItem.context === "CASUAL") {
                chipText = "Casual";
                chipColor = "#F9E927";
                chipBgColor = "#F9E9271f";
              } else if (dataItem.context === "INTERVIEW") {
                chipText = "Interview";
                chipColor = "#FF8A52";
                chipBgColor = "#FF8A521f";
              }
            }

            let info = false;
            if (dataItem.status === "PENDING") {
              info = true;
            }

            if (dataItem && dataItem.status === "APPROVED") {
              // console.log("dataitem data", dataItem)

              return (
                <TimelineItem key={index}>
                  <TimelineContent>
                    <Box
                      sx={{
                        padding: "6px 6px",
                        borderRadius: "5px",
                        marginBottom: "15px",
                        color: "white",
                        bgcolor: timelineContentBgColor,
                        display: "flex",
                        minHeight: "7em",
                        flexDirection: { xs: "column", md: "row" },
                        // flexDirection:'column',
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: "7em",
                          bgcolor: "",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          sx={{
                            width: "115px",
                            height: "115px",
                            borderRadius: "5px",
                          }}
                        >
                          {/* <ImageIcon /> */}
                          <img
                            src={dataItem.user.image}
                            alt="No DP"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Avatar>
                      </Box>
                      <Box
                        sx={{
                          width: "83%",
                          ml: "0.5em",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "550",
                            bgcolor: "",
                            fontSize: "16px",
                          }}
                        >
                          <span style={{ fontWeight: "700", fontSize: "18px" }}>
                            Host:{" "}
                          </span>
                          {dataItem.user.firstName} {dataItem.user.lastName}{" "}
                          <span style={{ fontSize: "14px" }}>
                            ({dataItem.user.role.name})
                          </span>
                        </Typography>

                        <Typography sx={{ bgcolor: "", fontSize: "14px" }}>
                          <span style={{ fontWeight: "500", fontSize: "15px" }}>
                            Meeting Id:{" "}
                          </span>
                          {dataItem.id}
                        </Typography>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              color: "#959697",
                              fontSize: "14px",
                              bgcolor: "",
                            }}
                          >
                            {" "}
                            <span
                              style={{ fontSize: "15px", fontWeight: "500" }}
                            >
                              Meeting Time:{" "}
                            </span>
                            {formattedMeetingStartDateTime} -
                            {formattedMeetingEndDateTime} {roomNo}
                          </Typography>
                        </Box>

                        <Typography sx={{ bgcolor: "", fontSize: "14px" }}>
                          <span style={{ fontWeight: "500", fontSize: "15px" }}>
                            Meeting Room:{" "}
                          </span>
                          {dataItem.room.roomName}
                        </Typography>

                        <Typography sx={{ bgcolor: "", fontSize: "14px" }}>
                          <span style={{ fontWeight: "500", fontSize: "15px" }}>
                            Meeting Remarks:{" "}
                          </span>
                          {dataItem.remarks}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "80px",
                          bgcolor: "",
                        }}
                      >
                        <Chip
                          label={chipText}
                          sx={{
                            color: chipColor,
                            bgcolor: chipBgColor,
                            width: "100%",
                          }}
                        />
                        {info ? (
                          <IconButton
                            onClick={() => handleMeetDialogOpen(dataItem)}
                          >
                            <InfoIcon sx={{ color: "#FFA635" }} />
                          </IconButton>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              );
            }
            return null;
          })}
        </Timeline>
      </Box>

      <Dialog
        open={openMeetDialog}
        // onClose={handleMeetDialogClose}
        PaperProps={{
          sx: {
            mt: "5em",
            borderRadius: "5px",
            width: "400px",
            height: "550px",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "right",
            fontSize: "29px",
            fontWeight: "600",
            height: "2em",
          }}
        >
          <IconButton
            onClick={handleMeetDialogClose}
            sx={{ mt: "-1em", mr: "-0.7em" }}
          >
            <CloseIcon sx={{ color: "#FF3636" }} />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            overflow: "hidden",
            padding: "0",
            position: "relative",
            display: "flex",
            // flexDirection:'column',
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              mt: "-3em",
              // ml: "-1em",
              minWidth: "110%",
              minHeight: "40%",
              bgcolor: "cyan",
              transform: "rotate(10deg)",
              transformOrigin: "center",
              // position: 'absolute',
              // top: '50%',
              // left: '50%',
              // Translate the box to center it after rotation
              // transform: 'translate(-50%, -50%) rotate(45deg)',
            }}
          ></Box>

          <Box
            sx={{
              position: "absolute",
              top: "4em",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ width: "100px", height: "100px" }}>
              {/* <ImageIcon /> */}
              <img
                src={meetByIdData.visitorImgUrl}
                alt="No DP"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Avatar>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "550",
                mt: "0.2em",
              }}
            >
              {meetByIdData.visitorName}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "800",
                color: "#5A5A5A",
              }}
            >
              ({meetByIdData.visitorCompany})
            </Typography>{" "}
            {/* if company is present */}
          </Box>

          <Box
            sx={{
              bgcolor: "orange",
              width: "100%",
              height: "200px",
              // position:'relative',
              mt: "14em",
              pt: "0.5em",
              pl: "1em",
            }}
          >
            <Typography>Meeting Type: {meetByIdData.meetType}</Typography>
            <Typography>Meet Time: {meetByIdData.meetTime}</Typography>
            <Typography>Remarks: {meetByIdData.remarks}</Typography>
            <Typography>
              Phone No.: {meetByIdData.visitorPhoneNumber}
            </Typography>
            <Typography>Email: {meetByIdData.visitorEmail}</Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mr: "1em",
            mb: "1em",
            ml: "1em",
          }}
        >
          <Button
            variant="contained"
            onClick={handleMeetReject}
            // color="secondary"
            sx={{
              width: "6em",
              bgcolor: "#DA2B2B",
              "&:hover": {
                backgroundColor: "#9F3327",
                color: "white",
              },
            }}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            onClick={handleMeetApprove}
            color="primary"
            sx={{
              width: "6em",
              bgcolor: "#349E2A",
              "&:hover": {
                backgroundColor: "#1B7D00",
                color: "white",
              },
            }}
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
