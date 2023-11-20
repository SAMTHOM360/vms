import React from "react";
import '../../css/MeetingDetails.css'
import { Autocomplete, Button, TextField, Box, Typography, Paper } from "@mui/material";
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
import { SecurityUpdateGoodOutlined } from "@mui/icons-material";
import Grid from '@mui/material/Grid';
import Header from "../Header";



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

const MeetingDetails = () => {

  // state for disabling submit button based on employee meeting status
  const [status, setStatus] = useState("");
  const [cities, setCities] = useState([]);

  console.log(cities, "fetched cities")
  //Host Url
  const userUrl = "http://192.168.12.54:8080/api/user/alluser";
  // fetch meeting context dropdown
  const meetingContextUrl = "http://192.168.12.54:8080/vis/meetCon";


  const [fetchedUserData, setFetchedUserData] = useState(null);

  // console.log(fetchedUserData,"this data i sfetched user data from phone number")
  // console.log(fetchedUserData.state.id,"state id")
  // console.log(fetchedUserData.city.id,"city id")


  // store hosts here
  const [users, setUsers] = useState([]);

  // defining initial states

  const initialFormData = {
    name: "",
    phoneNumber: "",
    email: "",
    state: "",
    stateId: "",
    city: "",
    cityId: "",
    user: {
      id: "",
    },
    companyName: "",
    remarks: "",
    meetingStartDateTime: null,
    context: "",


  };

  const [formData, setFormData] = useState({ ...initialFormData });
  // const [phoneInput, setPhoneInput] = useState("");

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
          console.log(userList, "userlist")
        }
        // room.roomName
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(formData, "formdataa")


  // fetching visitor data based on visitor phone number

  const handlePhoneNumberChange = async (event) => {
    const phone = event.target.value;
    console.log(phone, "phone number is getting clicked")
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

          // const newStateId = response.data.data.state.id;
          // console.log(newStateId,"selected state id by handle phone")
          // const newCityId = response.data.data.city.id;
          // console.log(newCityId,"selected city id by handle phone")
          console.log(response.data.data.city.id, "cityIdddd");
          setFormData({
            ...formData,
            phoneNumber: phone,
            name: response.data.data.name || "",
            companyName: response.data.data.companyName || "",

            cityId: response.data.data.city.id,
            stateId: response.data.data.state.id,
            city: response.data.data.city.name || "",
          });

        }
      } catch (error) {
        console.error(error);
        toast.error("user does not exist")
      }
    }
  };
  console.log(formData, "formDataaaaaaaaa");
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
    console.log("form data will be submitted")

    const updatedFormData = {

      // ...formData,
      name: formData.name || "",
      phoneNumber: formData.phoneNumber || "",

      user: {
        id: formData.user.id || "",
      },
      city: {
        id: formData.cityId || "",
      },
      state: {
        id: formData.stateId || "",
      },
      companyName: formData.companyName,
      remarks: formData.remarks,
      meetingStartDateTime: formattedDateTimePicker1,
      context: formData.context,
      email: formData.email
    };
    // debugger
    console.log(updatedFormData, "updatedFormData");

    try {
      const response = await axios.post(
        "http://192.168.12.54:8080/api/visitor-meeting/save",
        updatedFormData
      );
      if (response.status === 200) {
        console.log("Form Data:", updatedFormData);
        toast.success("Meeting approval sent")
      }else if(response.data.data === null){
        // toast.warning("visitor already has pending meetings")
        console.log("visitor already has pending meetings")

      }
    } catch (err) {
      console.error(err, "There is some issue moving into the database");
      // toast.warning("Sorry there is some issue")
    }

    setFormData({ ...initialFormData });
  };


  const shouldDisableDate = (date) => {
    return date < new Date().setDate(new Date().getDate() - 1);
  };

  // converting time to UTC format
  const formattedDateTimePicker1 = formData.meetingStartDateTime
    ? formData.meetingStartDateTime.toISOString()
    : null;


  // minimum and maximum time
  const minTime = dayjs().set('hour', 9).startOf('hour');
  const maxTime = dayjs().set('hour', 18).startOf('hour');

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


  // calling the city 
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await axios.get(
          `http://192.168.12.54:8080/api/cityByName?cityName=${formData.city}`
        );
        if (response.status === 200) {
          setCities(response.data.data);
          console.log(response.data.data, "this is city data from search filter");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (formData.city) {
      fetchCity();
    }
  }, [formData.city]);


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
    }

    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

console.log("appoint fomrdata", formData)

  //------------------------ JSX ---------------------

  return (
    <>
        <Box sx={{display:"flex", flexGrow: 1, p: 3,}}>
            <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
            <Box
              // elevation={5}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                // width:'100%',
                height: "4.5em",
                mt: "3em",
                mb: "0.5em",
              }}
            >
              <Header
                title="Meeting Appoint Form"
                subtitle="Form to appoint a meeting with a visitor"
              />
            </Box>
          </Grid>
  <Grid item xs={12} md={12} lg={12}>
  <Paper
        elevation={5}
        sx={{
          // width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          m="20px 0 0 0"
          // display='flex'
          // width="100%"
          maxWidth='90%'
          flexGrow={1}
          height="75vh"
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
            mb:'1.5em'
          }}
        >
      <form>
        <div className="container">
          <div className="left">
            <TextField
              placeholder=" PhoneNumber*"
              type="number"
              name="phoneNumber"
              autoComplete="off"
              onInput={handlePhoneNumberChange}
              onChange={handleChange}
              // onChange={handlePhoneNumberChange}
              value={formData.phoneNumber}
              // onChange={handleLength}
              autoFocus
            />

            {/* host name */}

            <FormControl >
              <InputLabel id="demo-user-select-label">Host*</InputLabel>
              <Select
                labelId="demo-user-select-label"
                id="demo-user-select"
                value={formData.selectedUser}
                label="Select a User"
                name="user"
                onChange={handleChange}
                MenuProps={MenuProps}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {user.username}
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* email */}

            <TextField
              // placeholder=" Email*"
              variant='outlined'
              label="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!formData.emailError}
              helperText={formData.emailError}
              inputProps={{ maxLength: 60 }}
            // disabled={fetchedUserData && !editMode && !editButtonClicked}

            />


            {/* city name  */}

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={cities.map((city) => city.name)}
              fullWidth
              onInputChange={(event, newValue) => {
                const selectedCity = cities.find((city) => city.name === newValue);
                const cityId = selectedCity ? selectedCity.id : null;
                const stateId = selectedCity ? selectedCity.state.id : null;


                setFormData({
                  ...formData,
                  city: newValue,
                  cityId: cityId,
                  stateId: stateId,
                });
              }}
              renderInput={(params) => <TextField {...params} label="City" />}
            />



            {/* company Name */}

            <TextField
              id="outlined-basic"
              label="Company Name"
              variant="outlined"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />

          </div>
          <div className="right">


            {/* visitor name */}

            <TextField id="outlined-basic" label="Name" variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            {/* Visit Type */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Context*
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.context}
                onChange={handleChange}
                name="context"
                label="context"
              >
                {meetingContextOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>


            {/* Remarks */}
            <TextField id="outlined-basic" label="Remarks" variant="outlined" value={formData.remarks} name="remarks"
              onChange={handleChange}
              inputProps={{ maxLength: 30 }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Start Time*"
                  value={formData.meetingStartDateTime}
                  shouldDisableDate={shouldDisableDate}
                  minTime={minTime}
                  maxTime={maxTime}
                  onChange={(value) =>
                    handleDateTimePickerChange("meetingStartDateTime", value)
                  }
                  ampm={false}
                />
              </DemoContainer>
            </LocalizationProvider>

            <Button variant="contained" onClick={handleSubmit}>submit</Button>

          </div>
        </div>
      </form>
      </Box>
      </Paper>
      </Grid>
      </Grid>
      </Box>

    </>
  );
};

export default MeetingDetails;

// meeeeeeeeeeeeting details adddded  jlksbdckjasbdkjbd