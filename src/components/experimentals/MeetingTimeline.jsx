import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineContent from "@mui/lab/TimelineContent";
import { Box, Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import Chip from "@mui/material/Chip";
import { TimelineConnector } from "@mui/lab";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
} from "@mui/material";

export default function MeetingTimeline({ timelineApiData }) {
  const BASE_URL1 = "http://192.168.12.58:8080/api";

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
  const [dashMeetDialogData, setDashMeetDialogData] = useState({});

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

  // console.log("meet by id data", meetByIdData)

  const handleMeetDialogClose = () => {
    setOpenMeetDialog(false);
  };

  if (!timelineApiData || timelineApiData.length === 0) {
    return null;
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

  return (
    <>
      <Timeline
        position="right"
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {timelineApiData.map((dataItem, index) => {
          const meetingStartDateTime = dataItem.meetingStartDateTime || "";
          const meetingEndDateTime = dataItem.meetingEndDateTime || "";
          const formattedMeetingStartDateTime =
            formatMeetingStartDateTime(meetingStartDateTime);
          const formattedMeetingEndDateTime =
            formatMeetingEndDateTime(meetingEndDateTime);
          // console.log(formattedMeetingDateTime);

          let dotColor = "#808080";
          let roomNo;
          if (dataItem) {
            if (dataItem.status === "PENDING") {
              dotColor = "#FFA635";
            } else if (dataItem.status === "COMPLETED") {
              dotColor = "#34E60C";
              roomNo = `|| ${dataItem.room.roomName}`;
            } else if (dataItem.status === "CANCELLED") {
              dotColor = "red";
            }
          }

          let timelineContentBgColor = "#808080";
          if (dataItem) {
            if (dataItem.status === "PENDING") {
              // timelineContentBgColor = "#C589405e";
              timelineContentBgColor = "#DADADA5e";
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

          if (
            dataItem &&
            (dataItem.status === "PENDING" ||
              dataItem.status === "COMPLETED" ||
              dataItem.status === "CANCELLED")
          ) {
            // console.log("dataitem data", dataItem)

            return (
              
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot
                      sx={{
                        background: dotColor,
                      }}
                    />
                    {index !== timelineApiData.length - 1 && (
                      <TimelineConnector
                      //  sx={{bgcolor:dotColor}}
                      />
                    )}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box
                      sx={{
                        padding: "6px 16px",
                        borderRadius: "5px",
                        marginBottom: "15px",
                        color: "white",
                        bgcolor: timelineContentBgColor,
                        display: "flex",
                      }}
                    >
                      <Box
                        sx={{
                          width: "7%",
                          bgcolor: "",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Avatar sx={{ width: "35px", height: "35px" }}>
                          {/* <ImageIcon /> */}
                          <img
                            src={dataItem.visitor.imageUrl}
                            alt="No DP"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Avatar>
                      </Box>
                      <Box sx={{ width: "60%", ml: "0.5em" }}>
                        <Typography sx={{ fontWeight: "550", bgcolor: "" }}>
                          {dataItem.visitor.name}
                        </Typography>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              color: "#959697",
                              fontSize: "15px",
                              bgcolor: "",
                            }}
                          >
                            {formattedMeetingStartDateTime} -
                            {formattedMeetingEndDateTime} {roomNo}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "right",
                          alignItems: "center",
                          width: "33%",
                          bgcolor: "",
                        }}
                      >
                        <Chip
                          label={chipText}
                          sx={{ color: chipColor, bgcolor: chipBgColor }}
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

        
      {/* {timelineApiData.map((dataItem, index) => {

if (
  dataItem &&
  (dataItem.status === "INPROCESS" || dataItem.status === "APPROVED")
) {
          return (
            <Box
              key="iHaveNoClue"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                mt:'10em',
              }}
            >
              <Typography sx={{ fontSize: "28px", fontWeight: "bold" }}>
                No Data !!!
              </Typography>
            </Box>
          );
}

})} */}
      


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
