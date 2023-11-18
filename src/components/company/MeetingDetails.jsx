import React from "react";
import "../../css/MeetingDetails.css";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { duration } from "moment";
import Navbar from "../../global/Navbar";
import Sidebar from "../../global/Sidebar";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Grid from "@mui/material/Grid";

const MeetingDetails = () => {
  const navigate = useNavigate();

  // state for disabling submit button based on employee meeting status
  const [status, setStatus] = useState("");

  const [availableRooms, setAvailableRooms] = useState([]);

  //Host Url
  const userUrl = "http://192.168.12.54:8080/api/user/alluser";
  // fetch meeting context dropdown
  const meetingContextUrl = "http://192.168.12.54:8080/vis/meetCon";

  const [fetchedUserData, setFetchedUserData] = useState(null);

  // store hosts here
  const [users, setUsers] = useState([]);

  // defining initial states

  const initialFormData = {
    name: "",
    phone: "",
    user: {
      id: "",
    },
    meetingContext: "",
    companyName: "",
    remarks: "",
    meetingStartDateTime: null,
    duration: "",
    visitor: {
      id: "",
    },
    room: {
      id: "",
    },
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [phoneInput, setPhoneInput] = useState("");

  // function to fetch hosts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(userUrl);
        if (response.status === 200 && response.data.data) {
          const userList = response.data.data.map((user) => ({
            id: user.id,
            username: user.name,
            profilePhoto: user.image,
          }));
          setUsers(userList);
          console.log(userList, "userlist");
        }
        // room.roomName
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(formData, "formdataa");
  // function for disabling submit button based on employee meeting status
  const checkEmployeeeStatus = () => {
    if (status.data !== null) {
      console.log(status, "employee already has an appointment");
      return true;
    } else {
      console.log(status, "employee is free in this time slot");
      return false;
    }
  };

  // fetching visitor data based on visitor phone number

  const handlePhoneNumberChange = async (event) => {
    const phone = event.target.value;
    // setPhoneInput(phone);
    // handle selected states
    if (phone.length === 10) {
      try {
        const response = await axios.get(
          `http://192.168.12.54:8080/vis/getVisitorByPhone?phoneNumber=${phone}`
        );

        if (response.status === 200 && response.data.data) {
          // set the fetched user data in the form
          setFetchedUserData(response.data.data);
          // console.log(fetchedUserData, "getting user data by phone number initials")

          setFormData({
            ...formData,
            phone: phone,
            name: response.data.data.name || "",
            companyName: response.data.data.companyName || "",
            visitor: {
              id: response.data.data.id || "",
            },
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("user does not exist");
      }
    }
  };

  // state to store the meeting context dropdown
  const [meetingContextOptions, setMeetingContextOptions] = useState([]);

  // fetching meeting context options from api
  const fetchMeetingContextOptions = async () => {
    try {
      const response = await axios.get(meetingContextUrl);
      if (response.status === 200 && response.data.data) {
        setMeetingContextOptions(response.data.data);
      }
    } catch (error) {
      console.log("error fetching meeting context options");
    }
  };
  // calling the meeting context options inside useeffect
  useEffect(() => {
    fetchMeetingContextOptions();
  }, []);

  // console.log(formData.user.id,"accesss the user id")

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data will be submitted");
    // Check for empty fields
    // for (const key in formData) {
    //   if (
    //     [
    //       "name",
    //       "phoneNumber",
    //       "user",
    //       "meetingContext",
    //       "companyName",
    //       "meetingStartDateTime",
    //     ].includes(key) &&
    //     !formData[key]
    //   ) {
    //     toast.error("All input fields are required");
    //     return;
    //   }
    // }
    // debugger
    const updatedFormData = {
      // ...formData,
      name: formData.name || "",
      user: {
        id: formData.user.id || "",
      },
      visitor: {
        id: formData.visitor.id || "",
      },
      phone: formData.phone || "",
      company: formData.companyName,
      context: formData.meetingContext,
      remarks: formData.remarks,
      room: {
        id: formData.room.id || "",
      },
      meetingStartDateTime: formattedDateTimePicker1,
      duration: formData.duration,
    };

    console.log(updatedFormData, "payload");
    console.log("submit function has been called");
    try {
      const response = await axios.post(
        "http://192.168.12.54:8080/api/meeting/save",
        updatedFormData
      );
      if (response.status === 200) {
        console.log("Form Data:", updatedFormData);
        toast.success("Meeting approval sent");
        navigate("/receptionistdashboard");
      }
    } catch (err) {
      console.error(err, "There is some issue moving into the database");
    }

    setFormData({ ...initialFormData });
    // navigate(-1);
  };
  // ---------------------------------------------------------------------
  // const validateInput = (value, validationRule) => {
  //   if (validationRule.test(value)) {
  //     return "";
  //   } else {
  //     return "Invalid Input";
  //   }
  // };

  // const phoneNumberError = validateInput(formData.phone, /^\d{10}$/);

  const shouldDisableDate = (date) => {
    return date < new Date().setDate(new Date().getDate() - 1);
  };

  // rough

  // converting time to UTC format
  const formattedDateTimePicker1 = formData.meetingStartDateTime
    ? formData.meetingStartDateTime.toISOString()
    : null;

  // minimum and maximum time
  const minTime = dayjs().set("hour", 9).startOf("hour");
  const maxTime = dayjs().set("hour", 18).startOf("hour");

  const handleDateTimePickerChange = (name, value) => {
    if (name === "meetingStartDateTime") {
      // const maxEndTime = value ? value.add(2, 'hour') : null;

      setFormData({
        ...formData,
        [name]: value,
        // meetingEndDateTime: maxEndTime,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // employee status url

  // fetch employee status

  const fetchStatus = async () => {
    const statusUrl = `http://192.168.12.54:8080/api/meeting/emp-status?id=${formData.user.id}&duration=${formData.duration}&meetingStartDate=${formattedDateTimePicker1}`;
    try {
      const response = await axios.get(statusUrl);
      if (response.data.data && response.data.data.id) {
        setStatus(response.data);
        toast.warning("employee already has an appointment");
      }
    } catch (e) {
      console.log("employee is free in this time slot");
    }
  };

  // calling the status function
  useEffect(() => {
    fetchStatus();
  }, [formattedDateTimePicker1, formData.duration]);

  // find available rooms

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      const roomUrl = `http://192.168.12.54:8080/api/room/all?id=1&meetingStartDate=${formattedDateTimePicker1}&duration=${formData.duration}`;

      try {
        const response = await axios.get(roomUrl);
        if (response.status === 200 && response.data.data) {
          const roomNames = response.data.data.map((room) => ({
            id: room.id,
            name: room.roomName,
          }));
          setAvailableRooms(roomNames);
          console.log(roomNames, "this is setAvailable rooms");
          // setFormData({
          //   ...formData,
          //   room:{
          //     id:response.data.data.id,
          //   }
          // });
          console.log(roomUrl, "room url");
        }
      } catch (error) {
        console.error("Error fetching available rooms", error);
      }
      // fetchAvailableRooms();
    };
    fetchAvailableRooms();
  }, [formattedDateTimePicker1, formData.duration]);

  const handleDurationChange = (event) => {
    setFormData({
      ...formData,
      duration: event.target.value,
    });
    console.log(duration, "duration value");
  };

  // handle change function

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "user") {
      setFormData({
        ...formData,
        user: {
          id: value.id,
        },
      });
    } else if (name === "room") {
      setFormData({
        ...formData,
        room: {
          id: value.id,
        },
      });
    }
    // else if (name === "phone"){
    //   if(value.length <=10){
    //     setFormData({
    //       phone:value
    //     })
    //   }
    // }
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // handle phone length
  const handleLength = (event) => {
    const phone = event.target.value;
    setPhoneInput(phone);

    setPhoneInput(phone.slice(0, 10)); // Truncate input to 10 characters
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  //------------------------ JSX ---------------------

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: "4.5em",
              mt: "3em",
              mb: "0.5em",
            }}
          >
            <Header title="Meeting Form" subtitle="Add details for meeting." />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <form>
            <div className="container">
              <div className="left">
                <TextField
                  placeholder=" PhoneNumber*"
                  type="number"
                  name="phone"
                  autoComplete="off"
                  onInput={handlePhoneNumberChange}
                  error={!!formData.phoneError}
                  helperText={formData.phoneError}
                  value={phoneInput}
                  onChange={handleLength}
                  autoFocus
                />

                {/* host name */}

                <FormControl>
                  <InputLabel id="demo-user-select-label">Host*</InputLabel>
                  <Select
                    labelId="demo-user-select-label"
                    id="demo-user-select"
                    value={formData.selectedUser}
                    label="Select a User"
                    name="user"
                    onChange={handleChange}
                  >
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {user.username}
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* company Name */}

                <TextField
                  id="outlined-basic"
                  label="Company Name"
                  variant="outlined"
                  name="companyName"
                  value={formData.companyName}
                />

                {/* visitor name */}

                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                />

                {/* Visit Type */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Visit Type*
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.meetingContext}
                    onChange={handleChange}
                    name="meetingContext"
                    label="meetingContext"
                  >
                    {meetingContextOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="right">
                {/* start time */}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Start Time*"
                      value={formData.meetingStartDateTime}
                      shouldDisableDate={shouldDisableDate}
                      minTime={minTime}
                      maxTime={maxTime}
                      onChange={(value) =>
                        handleDateTimePickerChange(
                          "meetingStartDateTime",
                          value
                        )
                      }
                      ampm={false}
                    />
                  </DemoContainer>
                </LocalizationProvider>

                {/* div for selecting duration for meeeting and available slots */}
                <div
                  className="input"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Duration
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData.duration}
                      name="duration"
                      label="duration"
                      onChange={handleDurationChange}
                    >
                      <MenuItem value={10}>10 mins.</MenuItem>
                      <MenuItem value={15}>15 mins.</MenuItem>
                      <MenuItem value={30}>30 mins.</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                {/* Remarks */}
                <TextField
                  id="outlined-basic"
                  label="Remarks"
                  variant="outlined"
                  value={formData.remarks}
                  name="remarks"
                  onChange={handleChange}
                  inputProps={{ maxLength: 30 }}
                />
                {/* meeting Location */}
                <FormControl>
                  <InputLabel id="demo-simple-select-label"> Room</InputLabel>
                  <Select
                    name="room"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.room.name}
                    label="Room"
                    onChange={handleChange}
                  >
                    {availableRooms.map((roomName) => (
                      <MenuItem key={roomName.id} value={roomName}>
                        {roomName.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button variant="contained" onClick={handleSubmit}>
                  submit
                </Button>
                {/* <Button variant="contained"disabled={checkEmployeeeStatus} onClick={handleSubmit}>submit</Button> */}
                {/* <Button variant="contained"disabled={false} onClick={handleSubmit}>submit</Button> */}
              </div>
            </div>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default MeetingDetails;
