import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../routes/AuthContext";
import axios from "axios";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import Loader from "./Loader";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Divider, Paper, Typography } from "@mui/material";
import Config from "../Config/Config";

function UserForm({ authenticated, closeDialog }) {
  const { isLimitReached } = useAuth();
  // console.log("isLimitReached", isLimitReached)

  // const BASE_URL = "http://192.168.12.58:8080/api/user";
  const BASE_URL = "http://192.168.12.54:8080/api/user";
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const loggedUserRole = sessionStorage.getItem("loggedUserRole");
  const companyIdStr = sessionStorage.getItem("companyId");
  const companyId = parseInt(companyIdStr, 10);
  const companyName = sessionStorage.getItem("companyName");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const excelHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    image: "",
    email: "",
    phone: "",
    dob: new Date(),
    gender: "",
    govtId: "",
    pincode: "",
    company: {
      id: "",
      name: "",
    },
    dept: {
      id: "",
      name: "",
    },
    role: {
      id: "",
      name: "",
    },
    state: {
      id: "",
      name: "",
    },
    city: {
      id: "",
      name: "",
    },
    isPermission: true,
    empCode:'',
  });
  console.log("form data", formData);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [roles, setRoles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [dobDate, setDobDate] = useState("");
  const [cleared, setCleared] = useState(false);
  const [depts, setDepts] = useState([]);

  const [loading, setLoading] = useState(false);

  const shouldDisableDate = (date) => {
    return date > new Date().setDate(new Date().getDate());
  };

  //ADHAAR STARTS
  const [governmentIdType, setGovernmentIdType] = useState("");
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  const handleChangeGovernmentIdType = (event) => {
    setGovernmentIdType(event.target.value);
    setError("");
    setWarning("");
    setFormData({
      ...formData,
      govtId: "",
    });
  };

  const handleChangeGender = (event) => {
    const value = event.target.value;

    setFormData({
      ...formData,
      gender: value,
    });
  };

  const handleChangeGovernmentId = (event) => {
    let value = event.target.value;

    let errorMessage = "";
    let warningMessage = "";

    if (governmentIdType === "Aadhar Card") {
      if (/^\d{0,12}$/.test(value)) {
        if (value.length === 12) {
          warningMessage = "";
        } else if (value.length < 12) {
          warningMessage = "Aadhar Card must be 12 digits only.";
        } else {
          warningMessage = "";
        }
      } else {
        errorMessage = "Aadhar Card must be 12 digits only.";
      }
    } else if (governmentIdType === "PAN Card") {
      if (/^[A-Z0-9]{0,10}$/.test(value)) {
        if (value.length === 10) {
          warningMessage = "";
        } else if (value.length > 0) {
          warningMessage =
            "PAN Card must be 10 characters, uppercase letters, and digits only.";
        } else {
          warningMessage = "";
        }
      } else {
        errorMessage =
          "PAN Card must be 10 characters, uppercase letters, and digits only.";
      }
    } else if (governmentIdType === "") {
      errorMessage = "First Choose Your ID Type.";
    }

    if (value.length > (governmentIdType === "Aadhar Card" ? 12 : 10)) {
      value = value.slice(0, governmentIdType === "Aadhar Card" ? 12 : 10);
    }

    if (governmentIdType === "Aadhar Card") {
      value = value.replace(/[^0-9]/g, "");
    }

    if (governmentIdType === "PAN Card") {
      value = value.replace(/[^A-Z0-9]/g, "");
    }

    setFormData({
      ...formData,
      govtId: value,
    });

    setError(errorMessage);
    setWarning(warningMessage);
  };

  //ADHAAR ENDS

  useEffect(() => {
    let url1 = Config.baseUrl + Config.apiEndPoints.userformSBGetAllState
    let url2 = Config.baseUrl + Config.apiEndPoints.userformSBGetAllRole
    let url3 = Config.baseUrl + Config.apiEndPoints.userformSBGetCompanyAll
    axios
    // .get("http://192.168.12.54:8080/api/state/all")
    .get(url1)
    .then((response) => {
        setStates(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching states", error);
      });

    axios
    // .get("http://192.168.12.54:8080/api/role/getall", { headers })
    .get(url2, { headers })
    .then((response) => {
        setRoles(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching roles", error);
      });

    if (loggedUserRole === "SUPERADMIN") {
      axios
      // .get("http://192.168.12.54:8080/com/all", { headers })
      .get(url3, { headers })
      .then((response) => {
          setCompanies(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching roles", error);
        });
    }
  }, []);

  useEffect(() => {
    fetchDepts();
  }, [companyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "gender") {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (name === "govtId") {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (name === "state") {
      const selectedState = states.find((state) => state.id === value);
      setFormData({
        ...formData,
        [name]: {
          id: value,
          name: selectedState ? selectedState.name : "",
        },
        city: {
          id: "",
        },
      });

      fetchCities(value);
    } else if (name === "city") {
      const selectedCity = cities.find((city) => city.id === value);
      setFormData({
        ...formData,
        [name]: {
          id: value,
          name: selectedCity ? selectedCity.name : "",
        },
      });
    } else if (name === "dept") {
      const selectedDept = depts.find((dept) => dept.id === value);
      setFormData({
        ...formData,
        [name]: {
          id: value,
          name: selectedDept ? selectedDept.name : "",
        },
      });
    } else if (name === "role") {
      const selectedRole = roles.find((role) => role.id === value);
      setFormData({
        ...formData,
        [name]: {
          id: value,
          name: selectedRole ? selectedRole.name : "",
        },
      });
    } else if (name === "company") {
      if (loggedUserRole === "SUPERADMIN") {
        const selectedCompany = companies.find(
          (company) => company.id === value
        );
        setFormData({
          ...formData,
          [name]: {
            id: value,
            name: selectedCompany ? selectedCompany.name : "",
          },
        });
      }
      // else if (loggedUserRole === 'ADMIN') {
      //   setFormData({
      //     ...formData,
      //     [name]: {
      //       id: companyId,
      //       name: companyName,
      //     },
      //   });
      // }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const fetchCities = async (stateId) => {
    let url = Config.baseUrl + Config.apiEndPoints.userformSBGetAllCity
    try {
      let response = await axios.get(
        `${url}/${stateId}`
      );
      setCities(response.data.data);
    } catch (error) {
      console.error("Error fetching cities", error);
      setCities([]);
    }
  };

  const fetchDepts = async () => {
    let url = Config.baseUrl + Config.apiEndPoints.userformSBGetAllDept
    try {
      const response = await axios.get(
        `${url}?companyId=${companyId}`
      );
      const deptApiData = response.data.data;
      // console.log("dept data", response.data.data);
      setDepts(deptApiData);
    } catch (error) {
      console.error("Error in fetching depts", error);
    }
  };

  // const handleDateChange = (date) => {
  //   const adjustedDate = date ? date.add(1, "day") : null;

  //   setFormData({
  //     ...formData,
  //     dob: adjustedDate,
  //   });
  // };


  const handleDateChange = (date) => {
    const currentDate = new Date();
    const selectedDate = date ? new Date(date) : null;
  
    if (selectedDate && selectedDate > currentDate) {
      console.error("Invalid date selected. Please choose a date up to today.");
      return;
    }
  
    setFormData({
      ...formData,
      dob: selectedDate,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.dob) {
    toast.warn("Date of birth is required !!!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return;
  }
  const currentDate = new Date();

  if (!(formData.dob instanceof Date) || isNaN(formData.dob) || formData.dob > currentDate) {
    toast.warn("Invalid date of birth selected. Please choose a date up to today.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // console.error('Invalid date of birth selected. Please choose a date up to today.');
    return;
  }

  const dob = new Date(formData.dob);
dob.setDate(dob.getDate() + 1); 

const dobISOString = dob.toISOString().split("T")[0];

if (formData.empCode.length < 4) {
  toast.warn("Employee Code must be at least 4 characters !!!", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  return;
}


if (governmentIdType === "Aadhar Card" && formData.govtId.length !== 12) {
  toast.warn("Aadhar Card must be 12 digits only.", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  return;
} 

if (governmentIdType === "PAN Card" && formData.govtId.length !== 10) {
  toast.warn("PAN Card must be 10 characters, uppercase letters, and digits only.", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  return;
}


  const user = {
    id: null,
    firstName: formData.firstName,
    image: "alt img",
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    dob: dobISOString,
    gender: formData.gender,
    govtId: formData.govtId,
    pincode: formData.pincode,
    company: {
      id: loggedUserRole === "SUPERADMIN" ? formData.company.id : companyId,
    },
    departmentDto: {
      id: formData.dept.id,
    },
    role: {
      id: formData.role.id,
    },
    state: {
      id: formData.state.id,
    },
    city: {
      id: formData.city.id,
    },
    isPermission: formData.isPermission,
    empCode: formData.empCode,
  };

  // console.log("user", user);
  let url = Config.baseUrl + Config.apiEndPoints.userformSBAddUser

  try {
    setLoading(true);
    // let response = await axios.post(
    //   `${BASE_URL}/adduser`,
    //   user,
    //   { headers }
    // );
    let response = await axios.post(
      `${url}`,
      user,
      { headers }
    );
    if (response.status === 200) {
      toast.success("New Employee Added Successfully.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // closeDialog()
      handleEmployeeRedirect();
      // setAddUserDialogOpen(false)
      setGovernmentIdType("");
      setDobDate("");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: new Date(),
        gender: "",
        govtId: "",
        pincode: "",
        company: { id: "", name: "" },
        dept: { id: "", name: "" },
        role: { id: "", name: "" },
        state: { id: "", name: "" },
        city: { id: "", name: "" },
        isPermission: true,
        empCode: '',
      });
    }
  } catch (error) {
    toast.error("Something went wrong !!!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.error("Error submitting user data", error);
  } finally {
    setLoading(false);
  }
};





  // async function fetchData() {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/getall`, { headers });
  
  //     const apiDataArray = response.data;
  
  //     sessionStorage.setItem("currEmpLength", apiDataArray.length);
  //   } catch(error) {
  //     console.error('Error in getting data: ', error)
  //   }
  // }



  




  const handleEmployeeRedirect = () => {
    navigate("/employee");
  };

  const handleRedirectEmployee = () => {
    navigate("/employee");
  };

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
                title="Employee Form"
                subtitle="You can add employees of your choice"
              />
            </Box>
          </Grid>

          {isLimitReached ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "75vh",
                // mt: "-5em",
              }}
            >
              <Typography sx={{ fontSize: "50px" }}>
                You have reached max limit
              </Typography>
            </Box>
          ) : (
            <>
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
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <TextField
                        sx={{ width: "100%", mt: "10px" }}
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        // inputProps={{ maxLength: 26 ,}}
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
                              firstName: value,
                            });
                          },
                        }}
                        // onChange={handleChange}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <TextField
                        sx={{ width: "100%", mt: "10px" }}
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        // inputProps={{ maxLength: 26 }}
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
                              lastName: value,
                            });
                          },
                        }}
                        // onChange={handleChange}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <TextField
                        sx={{ width: "100%", mt: "10px" }}
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        inputProps={{
                          pattern: "^[0-9]*",
                          onInput: (event) => {
                            let value = event.target.value;
                            value = value.replace(/\D/g, "");
                            if (value.length > 10) {
                              value = value.slice(0, 10);
                            }
                            setFormData({
                              ...formData,
                              phone: value,
                            });
                          },
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <TextField
                        sx={{ width: "100%", mt: "10px" }}
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        inputProps={{ maxLength: 126 }}
                        onChange={handleChange}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ width: "100%", mt: "10px" }}
                          label="Date of Birth"
                          format="YYYY/MM/DD"
                          shouldDisableDate={shouldDisableDate}
                          onChange={handleDateChange}
                          slotProps={{
                            field: {
                              clearable: true,
                              onClear: () => setCleared(true),
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <FormControl sx={{ width: "100%", mt: "10px" }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Gender
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={formData.gender}
                          label="Gender"
                          onChange={handleChangeGender}
                          required
                        >
                          <MenuItem value={"Male"}>Male</MenuItem>
                          <MenuItem value={"Female"}>Female</MenuItem>
                          <MenuItem value={"Others"}>Others</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* <Grid item xs={12} sm={6} md={4} lg={4}>
                      <FormControl sx={{ width: "100%", mt: "10px" }} required>
                        <InputLabel htmlFor="state">State</InputLabel>
                        <Select
                          label="State"
                          name="state"
                          value={formData.state.id || ""}
                          onChange={handleChange}
                          required
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: "150px",
                              },
                            },
                          }}
                        >
                          {states.map((state) => (
                            <MenuItem key={state.id} value={state.id}>
                              {state.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid> */}

<Grid item xs={12} sm={6} md={4} lg={4}>
  <Autocomplete
    disablePortal
    id="state-autocomplete"
    sx={{ width: '100%', mt: '10px' }}
    options={states}
    getOptionLabel={(option) => option.name || ''}
    value={states.find((state) => state.id === formData.state.id) || null}
    onChange={(event, newValue) => {

      setFormData({
        ...formData,
        state:{
          id: newValue.id || '',
          name:newValue.name || '',
        } || '',
        city: { id: '' },

      })

      // console.log('selected state', newValue);

      fetchCities(newValue ? newValue.id : '');
    }}
    ListboxProps={{
      style: {
        maxHeight: '150px',
      },
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label="State"
        name="state"
        required
      />
    )}
    isOptionEqualToValue={(option, value) => option.id === value.id}
  />
</Grid>



                    {/* <Grid item xs={12} sm={6} md={4} lg={4}>
                      <FormControl sx={{ width: "100%", mt: "10px" }} required>
                        <InputLabel htmlFor="city">City</InputLabel>
                        <Select
                          label="City"
                          name="city"
                          value={formData.city.id || ""}
                          onChange={handleChange}
                          required
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: "150px",
                              },
                            },
                          }}
                        >
                          {cities.map((city) => (
                            <MenuItem key={city.id} value={city.id}>
                              {city.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid> */}

<Grid item xs={12} sm={6} md={4} lg={4}>
  <Autocomplete
    disablePortal
    id="city-autocomplete"
    sx={{ width: '100%', mt: '10px' }}
    options={cities}
    getOptionLabel={(option) => option.name || ''}
    value={cities.find((city) => city.id === formData.city.id) || null}
    onChange={(event, newValue) => {
      // const selectedCity = cities.find((city) => city.id === newValue);
      setFormData({
        ...formData,
        city: {
          id: newValue? newValue.id : '',
          name: newValue ? newValue.name : '',
        },
      });

      // console.log('selected city', newValue);
    }}
    ListboxProps={{
      style: {
        maxHeight: '150px',
      },
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label="City"
        name="city"
        required
      />
    )}
    isOptionEqualToValue={(option, value) => option.id === value.id}
  />
</Grid>



                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <TextField
                        sx={{ width: "100%", mt: "10px" }}
                        label="PIN Code"
                        name="pincode"
                        value={formData.pincode}
                        inputProps={{
                          pattern: "^[0-9]*",
                          onInput: (event) => {
                            let value = event.target.value;
                            value = value.replace(/\D/g, "");
                            if (value.length > 6) {
                              value = value.slice(0, 6);
                            }
                            setFormData({
                              ...formData,
                              pincode: value,
                            });
                          },
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <TextField
                        sx={{ width: "100%", mt: "10px" }}
                        select
                        label="Government ID Type"
                        value={governmentIdType}
                        onChange={handleChangeGovernmentIdType}
                        fullWidth
                        required
                      >
                        <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
                        <MenuItem value="PAN Card">PAN Card</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <TextField
                        sx={{ width: "100%", mt: "10px" }}
                        label="Government ID"
                        value={formData.govtId}
                        onChange={handleChangeGovernmentId}
                        inputProps={{
                          maxLength:
                            governmentIdType === "Aadhar Card" ? 12 : 10,
                        }}
                        fullWidth
                        required
                        error={Boolean(error)}
                        helperText={error || warning}
                      />
                    </Grid>

                    {loggedUserRole === "SUPERADMIN" ? (
                                          <Grid item xs={12} sm={4} md={4} lg={4}>
                                          <FormControl sx={{ width: "100%", mt: "10px" }} required>
                                              <>
                                                <InputLabel htmlFor="company">Company</InputLabel>
                                                <Select
                                                  label="company"
                                                  name="company"
                                                  value={formData.company.id || ""}
                                                  onChange={handleChange}
                                                  required
                                                  MenuProps={{
                                                    PaperProps: {
                                                      style: {
                                                        maxHeight: "150px",
                                                        maxWidth: "150px",
                                                      },
                                                    },
                                                  }}
                                                >
                                                  {companies.map((company) => (
                                                    <MenuItem key={company.id} value={company.id}>
                                                      {company.name}
                                                    </MenuItem>
                                                  ))}
                                                </Select>
                                              </>
                                          </FormControl>
                                        </Grid>
                    ) : null }

                    {/* <Grid item xs={12} sm={4} md={4} lg={4}>
                      <FormControl sx={{ width: "100%", mt: "10px" }} required>
                        {loggedUserRole === "SUPERADMIN" ? (
                          <>
                            <InputLabel htmlFor="company">Company</InputLabel>
                            <Select
                              label="company"
                              name="company"
                              value={formData.company.id || ""}
                              onChange={handleChange}
                              required
                              MenuProps={{
                                PaperProps: {
                                  style: {
                                    maxHeight: "150px",
                                    maxWidth: "150px",
                                  },
                                },
                              }}
                            >
                              {companies.map((company) => (
                                <MenuItem key={company.id} value={company.id}>
                                  {company.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </>
                        ) : (
                          <TextField
                            label="company"
                            value={companyName}
                            aria-readonly
                          />
                        )}
                      </FormControl>
                    </Grid> */}

                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <FormControl sx={{ width: "100%", mt: "10px" }} required>
                        <InputLabel htmlFor="dept">Department</InputLabel>
                        <Select
                          label="Department"
                          name="dept"
                          value={formData.dept.id || ""}
                          onChange={handleChange}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 150,
                              },
                            },
                          }}
                          required
                        >
                          {depts.map((dept) => (
                            <MenuItem key={dept.id} value={dept.id}>
                              {dept.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <FormControl sx={{ width: "100%", mt: "10px" }} required>
                        <InputLabel htmlFor="role">Role</InputLabel>
                        <Select
                          label="Role"
                          name="role"
                          value={formData.role.id || ""}
                          onChange={handleChange}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 150,
                              },
                            },
                          }}
                          required
                        >
                          {roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                              {role.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <TextField
                        sx={{ width: "100%", mt: "10px" }}
                        label="Employee Code"
                        name="empCode"
                        value={formData.empCode}
                        // inputProps={{ maxLength: 26 ,}}
                        inputProps={{
                          maxLength: 10,
                          onInput: (event) => {
                            let value = event.target.value;
                    
                            // Remove characters other than lowercase, uppercase, and numbers
                            value = value.replace(/[^a-zA-Z0-9]/g, '');
                    
                            // Ensure the length does not exceed 10
                            if (value.length > 10) {
                              value = value.slice(0, 10);
                            }
                    
                            setFormData({
                              ...formData,
                              empCode: value,
                            });
                          },
                        }}
                        // onChange={handleChange}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <FormControl fullWidth sx={{ width: "100%", mt: "10px" }} required>
                        <InputLabel id="approval-label">
                          Can Receptionist approve meet?
                        </InputLabel>
                        <Select
                          labelId="approval-label"
                          name="isPermission"
                          value={formData.isPermission}
                          label="Can Receptionist approve meet?"
                          onChange={handleChange}
                        >
                          <MenuItem value="true">YES</MenuItem>
                          <MenuItem value="false">NO</MenuItem>
                        </Select>
                      </FormControl>
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
                      onClick={handleRedirectEmployee}
                    >
                      Back
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ width: "9em", height: "44px", mb: "2em" }}
                    >
                      Submit
                    </Button>
                  </Box>
                </form>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
}

export default UserForm;
