import React from "react";
// import '../../css/MeetingDetails.css'
import {
  Autocomplete,
  Button,
  TextField,
  Box,
  Typography,
  Paper,
} from "@mui/material";
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
import Grid from "@mui/material/Grid";
import Header from "../Header";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import Config from "../../Config/Config";

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
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const userUrl = "http://192.168.12.54:8080/api/user/alluser";
  const meetingContextUrl = "http://192.168.12.54:8080/vis/meetCon";
  const adminId = sessionStorage.getItem("adminId");
  const loggedUserName = sessionStorage.getItem("loggedUserName")
  const companyId =sessionStorage.getItem("companyId");


  const [users, setUsers] = useState([]);
  const [visitorCompanyLists, setVisitorCompanyLists] = useState([])
  const [visitorCompanyInputValue, setVisitorCompanyInputValue] = useState("")
  const [cleared, setCleared] = useState(false);
  const [isVisitorDataPresent, setIsVisitorDataPresent] = useState(false)

  const initialFormData = {
    name: "",
    phoneNumber: "",
    email: "",
    state: "",
    stateId: "",
    city: {
      id: "",
      name: "",
    },
    cityId: "",
    user: {
      id: "",
      username: "",
    },
    companyName: "",
    remarks: "",
    meetingStartDateTime: null,
    // meetingStartDateTime:dayjs(new Date().setHours(9, 0, 0, 0)),
    context: "",
    company: {
      id: null,
      name:"",
    }
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  useEffect(() => {
    if(adminId){
      setFormData((prevFormData) => ({
        ...prevFormData,
        user: {
          id:adminId,
          username:loggedUserName,
        },
      }));
    }
  },[adminId])

  


  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     let url = Config.baseUrl + Config.apiEndPoints.appointMeetFormFetchUsers
  //     try {
  //       // const response = await axios.get(`${userUrl}?companyId=${companyId}`);
  //       const response = await axios.get(`${url}?companyId=${companyId}`);
  //       if (response.status === 200 && response.data.data) {
  //         const userList = response.data.data.map((user) => ({
  //           id: user.id,
  //           username: user.name,
  //           profilePhoto: user.image,
  //         }));

  //         setUsers(userList);

  //         const matchedAdminUser = userList.find(
  //           (user) => user.id === Number(adminId)
  //         );

  //         if (matchedAdminUser) {
  //           setFormData((prevData) => ({
  //             ...prevData,
  //             user: {
  //               id: matchedAdminUser.id,
  //               username: matchedAdminUser.username,
  //             },
  //           }));
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching users", error);
  //     }
  //   };

  //   fetchUsers();
  // }, [adminId]);


  // const fetchVisitorsCompanies = async () => {
  //   let url = Config.baseUrl + Config.apiEndPoints.appointMeetFormFetchUsers
  //   try {
  //     // const response = await axios.get(`${userUrl}?companyId=${companyId}`);
  //     const response = await axios.get(`${url}?companyId=${companyId}`);
  //     if (response.status === 200 && response.data.data) {
  //       const visitorCompanies = response.data.data.map((user) => ({
  //         id: user.id,
  //         name: user.name,
  //       }));

  //       setVisitorCompanyLists(visitorCompanies);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching users", error);
  //   }
  // };


  const fetchVisitorsCompanies = async (enteredComValue) => {
    let url = Config.baseUrl + Config.apiEndPoints.appointMeetFormGetVisitorCompanyName
    // let url = "http://192.168.12.58:8080/vis/company/name"
    try {
      // const response = await axios.get(`${userUrl}?companyId=${companyId}`);
      const response = await axios.get(`${url}?companyName=${enteredComValue}`);
      if (response.status === 200 && response.data.data) {
        const visitorCompanies = response.data.data.map((user) => ({
          id: user.id,
          name: user.name,
        }));

        setVisitorCompanyLists(visitorCompanies);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  // console.log('visitorCompanyLists', visitorCompanyLists)

  // useEffect(() => {
  //   fetchVisitorsCompanies()
  // },[])


  const handlePhoneNumberChange = async (event) => {
    // toast.dismiss()
    const phone = event.target.value;
    let url = Config.baseUrl + Config.apiEndPoints.appointMeetFormGetVisitorByPhone
  
    if (/^\d*$/.test(phone)) {
      if (phone.length === 10) {
        try {
          setLoading(true)
          // const response = await axios.get(
          //   `http://192.168.12.54:8080/vis/getVisitorByPhone?phoneNumber=${phone}`
          // );

          const response = await axios.get(
            `${url}?phoneNumber=${phone}`
          );

          // console.log('phone response', response.data.data)
  
          if (response.status === 200 && response.data.data) {

            let phoneNumberApiData = response.data.data
            const newStateId = phoneNumberApiData.state.id;
            const newCityId = phoneNumberApiData.city.id;
  
            setFormData({
              ...formData,
              phoneNumber: phone,
              name: phoneNumberApiData.name || "",
              companyName: phoneNumberApiData.companyName || "",
              city: {
                id: newCityId || "",
                name: phoneNumberApiData.city.name || "",
              },
              stateId: newStateId,
              email: phoneNumberApiData.email ?  phoneNumberApiData.email || '' : '',
              company:{
                id: phoneNumberApiData.visitorCompanyDto?.id || null,
                name: phoneNumberApiData.visitorCompanyDto?.name || '',
              }
            });

            setVisitorCompanyInputValue(phoneNumberApiData.visitorCompanyDto?.name || '')
            setIsVisitorDataPresent(true)

            setLoading(false)
          }
        } catch (error) {
          // console.error(error);
          // toast.error("User doesn't exist!");
          // setFormData({
          //   ...initialFormData,
          //   phoneNumber: phone,
          //   user: {
          //     id: formData.user.id || "",
          //     username: formData.user.username || "",
          //   },
          // });

          if(error.request.status === 400){

            let errMessage = '';
    
    
            if (error.response && error.response.data && error.response.data.message) {
              errMessage = error.response.data.message;
              const cleanedMessage = JSON.stringify(errMessage);
              toast.error(JSON.parse(cleanedMessage)+' !!!', {
                toastId:"appmeet-error1"
              });

            setFormData({
              ...initialFormData,
              phoneNumber: phone,
              user: {
                id: formData.user.id || "",
                username: formData.user.username || "",
              },
            });
            setVisitorCompanyInputValue('')
            }
     
     
          }
           else {
            toast.error('Something went wrong !!!', {
              toastId:"appmeet-error2"
            });
          setFormData({
            ...initialFormData,
            phoneNumber: phone,
            user: {
              id: formData.user.id || "",
              username: formData.user.username || "",
            },
          });
          }
          setIsVisitorDataPresent(false)
        }
        setLoading(false)
      }
    }
  };

  // console.log('isVisitorDataPresent', isVisitorDataPresent)
  
  const [meetingContextOptions, setMeetingContextOptions] = useState([]);

  const fetchMeetingContextOptions = async () => {
    let url = Config.baseUrl + Config.apiEndPoints.appointMeetFormContextOptions
    try {
      const response = await axios.get(url);
      if (response.status === 200 && response.data.data) {
        setMeetingContextOptions(response.data.data);
      }
    } catch (error) {
      console.error("error fetching meeting context options");
    }
  };
  useEffect(() => {
    fetchMeetingContextOptions();
  }, []);


  const handleSubmit = async (e) => {
    toast.dismiss()
    e.preventDefault();

    const trimmedName = formData.name ? formData.name.trim() : null;
    const trimmedEmail = formData.email ? formData.email.trim() : null;
    // const trimmedCompanyName = formData.companyName ? formData.companyName.trim() : null;
    const trimmedCompanyName = formData.company ? formData.company.name ? formData.company.name.trim() : null : null;
    const trimmedRemarks = formData.remarks ? formData.remarks.trim() : null;

    const emailFormat = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // working efficiently


    // console.log('trimmedCompanyName', trimmedCompanyName)

    if (!trimmedName) {
      toast.warn("Name is required !!!", {
        toastId:"appmeet-warn1"
      });
      return;
    }
  
    // if (!trimmedEmail) {
    //   toast.warn("Email is required !!!", {
    //     toastId:"appmeet-warn2"
    //   });
    //   return;
    // }


        if (trimmedEmail && !emailFormat.test(trimmedEmail)) {
        console.log('i got hit')
      toast.warn("Invalid email address. Please enter a valid email address.", {
        toastId:"appmeet-warn23"
      });
      return;
    }
    

    // if(formData.company.name) {
      if (!trimmedCompanyName) {
        toast.warn("Company Name can\'t be empty !!!", {
          toastId:"appmeet-warn3"
        });
        return;
      }
    // }

    
    if(formData.remarks) {
      if (!trimmedRemarks) {
        toast.warn("Remarks can\'t be empty (if required) !!!", {
          toastId:"appmeet-warn4"
        });
        return;
      }
  
    }


    if (!formData.meetingStartDateTime) {
      toast.warn('Meeting start date and time is required.', {
        toastId:"appmeet-warn5"
      });
      return;
    }
  
    const today = new Date();
    today.setHours(0, 0, 0, 0); 


  const currentDateTime = new Date();

    if (formData.meetingStartDateTime < currentDateTime) {
      toast.warn('Meeting start date and time cannot be in the past.', {
        toastId:"appmeet-warn6"
      });
      return;
    }

    const differenceInDays = Math.floor((formData.meetingStartDateTime - today) / (1000 * 60 * 60 * 24));
  
    if (differenceInDays < 0 || differenceInDays > 90) {
      toast.warn('Meeting start date and time must be within the next 90 days and not in the past.', {
        toastId:"appmeet-warn7"
      });
      return;
    }

    if(formData.phoneNumber.length!== 10) {
      toast.warn("Username must be exactly 10 digits !!!", {
        toastId:"appmeet-warn8"
      });
      return
    }


    if (!dayjs(formData.meetingStartDateTime).isValid()) {
      toast.warn('Invalid date and time format. Please enter a valid date and time.', {
        toastId:"appmeet-warn9"
      });
      return;
    }
  

    const updatedFormData = {
      name: formData.name || "",
      phoneNumber: formData.phoneNumber || "",

      user: {
        id: formData.user.id || "",
      },
      city: {
        id: formData.city.id || "",
      },
      state: {
        id: formData.stateId || "",
      },
      // companyName: formData.companyName,
      remarks: formData.remarks,
      meetingStartDateTime: formattedDateTimePicker1,
      context: formData.context,
      email: formData.email,
      visitorCompany: {
        id:formData.company.id,
        // name:formData.company.name,
        name:trimmedCompanyName,
      },
    };
    // console.log('updatedFormData',updatedFormData)
    let url = Config.baseUrl + Config.apiEndPoints.appointMeetFormSubmitForm

    try {
      setLoading(true)
      const response = await axios.post(
        // "http://192.168.12.58:8080/api/meeting/add/byuser",
        url,
        updatedFormData
      );
      if (response.status === 200) {
        toast.success("Meeting appointed successfully.", {
          toastId:"appmeet-succ5"
        });
        setFormData({ ...initialFormData });
        handleRedirectMeetings()
      } 
    } catch (err) {
      console.error(err, "There is some issue moving into the database");
    }
    setLoading(false)
  };

  // const shouldDisableDate = (date) => {
  //   return date < new Date().setDate(new Date().getDate() - 1);
  // };

  // const shouldDisableDate = (date) => {
  //   const today = new Date();
  //   const differenceInDays = Math.floor(
  //     (date - today) / (1000 * 60 * 60 * 24)
  //   );
  
  //   return differenceInDays > 90 || date < today;
  // };

  const shouldDisableDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const differenceInDays = Math.floor(
      (date - today) / (1000 * 60 * 60 * 24)
    );
  
    return differenceInDays > 90 || date < today;
  };

  // const formattedDateTimePicker1 = formData.meetingStartDateTime
  //   ? formData.meetingStartDateTime.toISOString()
  //   : null;

  const formattedDateTimePicker1 = formData.meetingStartDateTime
  ? dayjs(formData.meetingStartDateTime).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
  : null;

  const [minTime, setMinTime] = useState(dayjs().startOf('hour'));

  useEffect(() => {
    // Update minTime based on the current date and time
    setMinTime(dayjs().startOf('hour'));
  }, []); 

  
  // const minTime = dayjs().set("hour", 9).startOf("hour");
  // const maxTime = dayjs().set("hour", 18).startOf("hour");

  // const handleDateTimePickerChange = (name, value) => {
  //   if (name === "meetingStartDateTime") {

  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   }
  // };

  // const handleDateTimePickerChange = (name, value) => {
  //   if (name === "meetingStartDateTime") {
  //     console.log('if hittt')
  //     setFormData({
  //       ...formData,
  //       [name]: value instanceof Date && !isNaN(value) ? value : null,
  //     });
  //   } else {
  //     console.log('else hittt')
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   }
  // };

  const handleDateTimePickerChange = (name, value) => {
  if (name === "meetingStartDateTime") {
    if(value){
      setFormData({
           ...formData,
           [name]: value,
         });
    }else {
      setFormData({
        ...formData,
        [name]: null,
      });
    }
  } else {
    // console.log('else hit');
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};

  // console.log('form data', formData)

  // console.log('visitor comany input value',visitorCompanyInputValue)

  const handleDateChange = (date) => {
    const adjustedDate = date ? date.add(1, "day") : null;

    setFormData({
      ...formData,
      meetingStartDateTime: adjustedDate,
    });
  };

  useEffect(() => {
    const fetchCity = async () => {
      let url = Config.baseUrl + Config.apiEndPoints.appointMeetFormGetAllCity

      try {
        // const response = await axios.get(
        //   `http://192.168.12.54:8080/api/cityByName?cityName=${formData.city.name}`
        // );

        const response = await axios.get(
          `${url}?cityName=${formData.city.name}`
        );


        if (response.status === 200) {
          setCities(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (formData.city.name) {
      fetchCity();
    }
  }, [formData.city.name]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "user") {
      const selectedUseruser = users.find((user) => user.id === value);
      setFormData({
        ...formData,
        [name]: {
          id: selectedUseruser.id,
          username: selectedUseruser.username,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleRedirectMeetings = () => {
    navigate("/meetings");
  };

  const handleClearDateTime = () => {
    setFormData({
      ...formData,
      meetingStartDateTime:null,
    })
  }


  // console.log("form data", formData)


  //------------------------ JSX ---------------------

  return (
    <>
    <Loader isLoading={loading} />
      <Box sx={{ display: "flex", flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Box
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
                title="Meeting Appoint Form"
                subtitle="Form to appoint a meeting with a visitor"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                height: "35em",
                gap: "2em",
              }}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2} sx={{ mt: "10px" }}>
                <Grid item xs={12} sm={6} md={4} lg={4}>

                  <TextField
                  label=" Visitor's Phone Number"
                  name="phoneNumber"
                  autoComplete="off"
                  sx={{ width: "100%", mt: "10px" }}
                  value={formData.phoneNumber}
                  onInput={handlePhoneNumberChange}
                    inputProps={{
                      maxLength:10,
                      pattern: "^[0-9]*$",
                      onInput: (event) => {
                        let value = event.target.value;
                        value = value.replace(/\D/g, "");
                        if (value.length > 10) {
                          value = value.slice(0, 10);
                        }
                        setFormData({
                          ...formData,
                          phoneNumber: value,
                        });
                      },
                    }}
                    autoFocus
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <TextField
                    id="outlined-basic"
                    label="Visitor's Name"
                    variant="outlined"
                    name="name"
                    disabled={isVisitorDataPresent}
                    sx={{ width: "100%", mt: "10px" }}
                    value={formData.name}
                    inputProps={{
                      maxLength: 26,
                      onInput: (event) => {
                        let value = event.target.value;
                  
                        // Remove characters other than lowercase, uppercase, and spaces
                        value = value.replace(/[^a-zA-Z\s]/g, '');
                  
                        // Replace consecutive spaces with a single space
                        value = value.replace(/\s{2,}/g, ' ');
                  
                        // Ensure the length does not exceed maxLength
                        if (value.length > 26) {
                          value = value.slice(0, 26);
                        }
                  
                        setFormData({
                          ...formData,
                          name: value,
                        });
                      },
                    }}
                    // onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    variant="outlined"
                    label="Visitor's Email"
                    type="email"
                    name="email"
                    disabled={isVisitorDataPresent}
                    sx={{ width: "100%", mt: "10px" }}
                    value={formData.email}
                    onChange={handleChange}
                    error={!!formData.emailError}
                    helperText={formData.emailError}
                    inputProps={{ maxLength: 126 }}
                    // required
                  />
                </Grid>

                {/* DONE CLEAR BELOW CODE */}



                {/* <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    sx={{ width: "100%", mt: "10px" }}
                    options={cities}
                    fullWidth
                    // freeSolo={false}
                    value={
                      formData.city &&
                      cities.some((city) => city.id === formData.city.id)
                        ? formData.city
                        : null
                    }
                    onInputChange={(event, newValue) => {
                      const formCityId = formData.city
                        ? formData.city.id
                        : null;
                      const formStateId = formData.stateId;
                      const selectedCity = cities.find(
                        (city) => city.name === newValue
                      );
                      const cityId = selectedCity
                        ? selectedCity.id
                        : formCityId || null;
                      const stateId = selectedCity
                        ? selectedCity.state.id
                        : formStateId || null;

                      setFormData({
                        ...formData,
                        city: {
                          id: cityId,
                          name: newValue,
                        },
                        stateId: stateId,
                      });
                    }}
                    getOptionLabel={(option) => option.name || ""}
                    renderOption={(props, option) => (
                      <li {...props} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Visitor's City"
                        id={formData.city ? String(formData.city.id) : ""}
                        value={formData.city ? formData.city.name : ""}
                        required
                      />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                  />
                </Grid> */}




                 {/* DONE CLEAR ABOVE CODE */}


                
                <Grid item xs={12} sm={6} md={4} lg={4}>
  <Autocomplete
    disablePortal
    disabled={isVisitorDataPresent}
    id="combo-box-demo"
    sx={{ width: "100%", mt: "10px" }}
    options={cities}
    fullWidth
    value={
      formData.city &&
      cities.some((city) => city.id === formData.city.id)
        ? formData.city
        : null
    }
    onInputChange={(event, newValue) => {
      const selectedCity = cities.find(
        (city) => city.name === newValue
      );
      const cityId = selectedCity ? selectedCity.id : null;
      const stateId = selectedCity ? selectedCity.state.id : null;

      setFormData({
        ...formData,
        city: {
          id: cityId,
          name: newValue,
        },
        stateId: stateId,
      });
    }}
    getOptionLabel={(option) => option.name || ""}
    renderOption={(props, option) => (
      <li {...props} key={option.id}>
        {option.name}
      </li>
    )}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Visitor's City"
        id={formData.city ? String(formData.city.id) : ""}
        value={formData.city ? formData.city.name : ""}
        required
      />
    )}
    isOptionEqualToValue={(option, value) =>
      option.id === value.id
    }

    //THIS IS onChange NOT onInputChange
    onChange={(event, newValue) => {
      if (!newValue) {
        setFormData({
          ...formData,
          city: { id: null, name: null },
          stateId: null,
        });
      }
    }}
  />
</Grid>


                <Grid item xs={12} sm={6} md={4} lg={4}>
                  {/* <TextField
                    id="outlined-basic"
                    label="Visitor's Company Name"
                    variant="outlined"
                    name="companyName"
                    sx={{ width: "100%", mt: "10px" }}
                    value={formData.companyName}
                    inputProps={{ maxLength: 120 }}
                    // onChange={handleChange}
                    onChange={(e) => {
                      const inputValue = e.target.value.replace(/\s+/g, ' '); // Replace consecutive spaces with a single space
                      setFormData({
                        ...formData,
                        companyName: inputValue,
                      });
                    }}
                    required
                  /> */}

{/* <Autocomplete
      freeSolo
      options={visitorCompanyLists}
      getOptionLabel={(option) => option.name || ""}
      value={visitorCompanyLists.find((company) => company.id === formData.company.id) || null}
      inputValue={visitorCompanyInputValue}
      onInputChange={(event, newInputValue) => {
        setVisitorCompanyInputValue(newInputValue);
      }}
      onChange={(event, newValue) => {
        setFormData({
          ...formData,
          company: {
            id: newValue ? newValue.id : null,
            name: newValue ? newValue.name : visitorCompanyInputValue,
          },
        });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Visitor Company"
          name="companyName"
          required
        />
      )}
    /> */}


{/* <Autocomplete
  freeSolo
  options={visitorCompanyLists}
  getOptionLabel={(option) => option.name || ""}
  value={visitorCompanyLists.find((company) => company.id === formData.company.id) || null}
  inputValue={visitorCompanyInputValue}
  onInputChange={(event, newInputValue) => {
    setVisitorCompanyInputValue(newInputValue);

    // Handle case when the user types something not in the options
    if (!visitorCompanyLists.some((company) => company.name === newInputValue)) {
      setFormData((prevData) => ({
        ...prevData,
        company: {
          id: null,
          name: newInputValue,
        },
      }));
    }
  }}
  onChange={(event, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      company: {
        id: newValue ? newValue.id : null,
        name: newValue ? newValue.name : null,
      },
    }));
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Visitor Company"
      name="companyName"
      required
    />
  )}
/> */}


<Autocomplete
sx={{ width: "100%", mt: "10px" }}
  freeSolo
  disabled={isVisitorDataPresent}
  options={visitorCompanyLists}
  getOptionLabel={(option) => option.name || ""}
  value={visitorCompanyLists.find((company) => company.id === formData.company.id) || null}
  inputValue={visitorCompanyInputValue}
  onInputChange={(event, newInputValue) => {
    // Replace consecutive spaces with a single space
    const sanitizedInputValue = newInputValue.replace(/\s+/g, ' ');
    
    const truncatedInputValue = sanitizedInputValue.slice(0, 120);
    
    // debugger
    // setVisitorCompanyInputValue(sanitizedInputValue);
    setVisitorCompanyInputValue(truncatedInputValue);

    // fetchVisitorsCompanies(truncatedInputValue)

    // let sanitizedTrimmedInputValue = sanitizedInputValue.trim()
    let sanitizedTrimmedInputValue = truncatedInputValue.trim()

    // let capsuled = `(${sanitizedTrimmedInputValue})`

    // console.log('sanitizedTrimmedInputValue', sanitizedTrimmedInputValue )

    fetchVisitorsCompanies(sanitizedTrimmedInputValue)

    // Handle case when the user types something not in the options
    if (!visitorCompanyLists.some((company) => company.name.trim() === sanitizedTrimmedInputValue.trim())) {
      setFormData((prevData) => ({
        ...prevData,
        company: {
          id: null,
          name: sanitizedTrimmedInputValue,
        },
      }));
    }
  }}
  onChange={(event, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      company: {
        id: newValue ? newValue.id : null,
        name: newValue ? newValue.name : null,
      },
    }));
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Visitor Company"
      name="companyName"
      required
    />
  )}
/>



                </Grid>

                {/* host name */}

                {/* <Grid item xs={12} sm={6} md={4} lg={4}>
                  <FormControl sx={{ width: "100%", mt: "10px" }}>
                    <InputLabel id="demo-user-select-label" required>
                      Host
                    </InputLabel>
                    <Select
                      labelId="demo-user-select-label"
                      id="demo-user-select"
                      value={formData.user.id || ""}
                      label="Host"
                      name="user"
                      onChange={handleChange}
                      MenuProps={MenuProps}
                      required
                    >
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                
                          {user.username}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid> */}

                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <TextField
                    label="Host"
                    variant="outlined"
                    fullWidth
                    value={formData.user.username || ""}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ mt: "10px" }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <FormControl sx={{ width: "100%", mt: "10px" }}>
                    <InputLabel required id="demo-simple-select-label">
                      Meeting Context
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData.context}
                      onChange={handleChange}
                      name="context"
                      label="Meeting Context"
                      required
                    >
                      {meetingContextOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <TextField
                    id="outlined-basic"
                    label="Remarks"
                    variant="outlined"
                    sx={{ width: "100%", mt: "10px" }}
                    value={formData.remarks}
                    name="remarks"
                    onChange={(e) => {
                      const inputValue = e.target.value.replace(/\s+/g, ' ');
                      setFormData({
                        ...formData,
                        remarks: inputValue,
                      });
                    }}
                    // onChange={handleChange}
                    inputProps={{ maxLength: 120 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      sx={{ width: "100%", mt: "2px" }}
                      components={["DateTimePicker"]}
                    >
                      <DateTimePicker
                        label="Start Time"
                        value={formData.meetingStartDateTime}
                        shouldDisableDate={shouldDisableDate}
                        minTime={dayjs().isSame(formData.meetingStartDateTime, 'day') ? dayjs().startOf('hour') : null}
                        // minTime={minTime}
                        // maxTime={maxTime}
                        format="DD/MM/YYYY HH:mm"
                        name='meetingStartDateTime'
                        onChange={(value) => {
                          // console.log('Selected date:', value); // Add this line for debugging
                          handleDateTimePickerChange("meetingStartDateTime", value);
                        }}
                        // onChange={handleDateChange}
                        ampm={false}
                        InputProps={{
                          required: true,
                        }}
                        slotProps={{
                          field: {
                            clearable: true,
                            onClear: () => {setCleared(true)},
                            // onClear: handleClearDateTime,
                          },
                          actionBar: {
                            actions: ['clear'],
                          },  
                        }}

                        // componentsProps={{
                        //   actionBar: {
                        //     actions: ['clear'],
                        //   },
                        // }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  mt: "3em",
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ width: "9em", height: "44px", mb: "2em" }}
                  onClick={handleRedirectMeetings}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ width: "9em", height: "44px", mb: "2em" }}
                >
                  submit
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MeetingDetails;
