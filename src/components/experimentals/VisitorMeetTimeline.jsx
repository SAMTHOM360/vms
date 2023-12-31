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
import Config from "../../Config/Config";

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
    // console.log("indiii", dataitem.id);
    const meetById = dataitem.id;

    let url = Config.baseUrl + Config.apiEndPoints.visitorTimeLineFetchData

    try {
      const response = await axios.get(
        `${url}/${meetById}`
      );
      const apiData = response.data.data;
      // console.log("Api data", apiData);
      setMeetByIdData({
        meetId: apiData.id || "",
        vistorId: apiData.visitor.id || "",
        visitorName: apiData.visitor.name || "",
        visitorImgUrl: apiData.visitor.imageUrl || "",
        visitorCompany: apiData.visitor.companyName || "N/A",
        visitorEmail: apiData.visitor.email || "N/A",
        visitorPhoneNumber: apiData.visitor.phoneNumber || "N/A",
        userId: apiData.user.id || "",
        meetType: apiData.context || "",
        // meetTime: apiData.checkInDateTime || '',
        meetTime: apiData.meetingStartDateTime || "N/A",
        remarks: apiData.remarks ?  apiData.remarks || "N/A" : "N/A",
        status: apiData.status || "",
      });
    } catch (error) {
      console.error("unable to fetch data", error);
    }
    setOpenMeetDialog(true);
  };

  // console.log("isVisitorMeetData", isVisitorMeetData);

  // console.log("meet by id data", meetByIdData)


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

            if (dataItem && dataItem.status === "APPROVED" || dataItem.status === "INPROCESS") {
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

                        <Typography sx={{ color: "#BDBDBD", bgcolor: "", fontSize: "14px" }}>
                          <span style={{ fontWeight: "500", fontSize: "15px" }}>
                            Meeting Id:{" "}
                          </span>
                          {dataItem.id}
                        </Typography>
     

                        <Typography sx={{ color: "#BDBDBD", fontSize: "14px" }}>
                          <span style={{ fontWeight: "500", fontSize: "15px" }}>
                            Meeting Room:{" "}
                          </span>
                          {dataItem.room.roomName ? dataItem.room.roomName : "N/A"}
                        </Typography>

                        <Typography sx={{ color: "#BDBDBD", fontSize: "14px" }}>
                          <span style={{ fontWeight: "500", fontSize: "15px" }}>
                            Meeting Remarks:{" "}
                          </span>
                          {dataItem.remarks ? dataItem.remarks : "N/A"}
                        </Typography>

                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              // color: "#959697",
                              // color: "#959697",
                              color:'#BDBDBD',
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
    </>
  );
}
