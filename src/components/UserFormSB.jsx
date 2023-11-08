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
import excelFile from "../assets/MultiuserTemplate.xlsx";

import Navbar from "../global/Navbar";
import Sidebar from "../global/Sidebar";
import Loader from "./Loader";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Divider, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function UserForm({ authenticated, closeDialog, fetchData,}) {
  const { isLimitReached } = useAuth();

  console.log("isLimitReached", isLimitReached)
  // const BASE_URL = "http://192.168.12.58:8080/api/user";
  const BASE_URL = "http://192.168.12.54:8080/api/user";
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const loggedUserRole = sessionStorage.getItem("loggedUserRole");
  const companyId = sessionStorage.getItem("companyId");
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
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [roles, setRoles] = useState([]);
  const [companies, setCompanies] = useState([]);
  // const [addUserDialogOpen, setAddUserDialogOpen] = useState();
  const [dobDate, setDobDate] = useState("");
  const [cleared, setCleared] = useState(false);
  const [isSingleUser, setIsSingleUser] = useState(false);
  const [isMultiUser, setIsMultiUser] = useState(false);
  const [isUserSelection, setIsUserSelection] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(loggedUserRole === 'SUPERADMIN');

  // EXCEL UPLOAD STARTS -----------------------------------------------------------------------------------------------------------------

  const [isUpload, setIsUpload] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState("");
  const [excelUpData, setExcelUpData] = useState();
  const [btnLoading, setBtnLoading] = useState(false);
  const [isDownload, setIsDownload] = useState(false);

  const [excelDownData, setExcelDownData] = useState({
    totalElement: "",
    successfullyAdded: "",
    falidData: "",
    duplicateData: "",
    downloadLink: "",
    falidDataLink: "",
    duplicateDataLink: "",
  });

  const handleChooseFile = (event) => {
    // debugger
    // console.log("i got hit")
    const excelFile = event.target.files[0];
    const formData = new FormData();
    formData.append("companyId", companyId);
    formData.append("file", excelFile);
    const fileName = excelFile ? excelFile.name : "";
    setExcelUpData(formData);
    setIsUpload(true);
    setIsFileSelected(fileName);
    // console.log("FORM DATA", formData)
  };
  // console.log("is upload", isUpload);

  const handleCancel = (e) => {
    e.preventDefault()
    setIsUpload(false);
    const fileInput = document.getElementById("fileInputExcel");
    if (fileInput) {
      fileInput.value = ""; // Clear the selected file
    }
    setIsFileSelected("");
  };

  // console.log("excel up data", excelUpData);

  const handleSaveUpload = async () => {
    try {
      setBtnLoading(true);
      const response = await axios.post(
        `${BASE_URL}/excel/upload`,
        excelUpData,
        {
          headers: excelHeaders,
        }
      );
      if(response.status === 200) {
        toast.success("File uploaded Successfully. Please check for faulty data.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        const excelApiData = response.data.data;
        // console.log("excelApiData", excelApiData);
        if (
          excelApiData.duplicateData != 0 ||
          excelApiData.unSuccessfullyAdded != 0
        ) {
          setIsDownload(true);
        } else {
          setIsDownload(false);
        }
        setExcelDownData({
          totalElement: excelApiData.totalElement || "",
          successfullyAdded: excelApiData.successfullyAdded || "",
          falidData: excelApiData.falidData || "",
          duplicateData: excelApiData.duplicateData || "",
          downloadLink: excelApiData.downloadLink || "",
          falidDataLink: excelApiData.falidDataLink || "",
          duplicateDataLink: excelApiData.duplicateDataLink || "",
        });
        setIsUpload(false);
        const fileInput = document.getElementById("fileInputExcel");
        if (fileInput) {
          fileInput.value = "";
        }
        setIsFileSelected("");
      }
      else if(response.status === 400){
        console.log("400 response", response)
        // toast.error("New Employee Added Successfully.", {
        //   position: "top-right",
        //   autoClose: 4000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      }
    } 
    catch(error){
      // console.error('Error Updating Password:', error);
      if(error.request.status === 400){
        const errMessage =error.response.data;
        // console.log("400 response", errMessage)
        const cleanedMessage = JSON.stringify(errMessage);
        toast.error(JSON.parse(cleanedMessage)+' !!!', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
      }
       else {
        toast.error('Something went wrong !!!', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
      }
    }
    setBtnLoading(false)
  }

  // console.log("excel down data", excelDownData)

  // const handleDownloadExcel = () => {
  //   const fileUrl = excelDownData.downloadLink;
  //   const link = document.createElement("a");
  //   link.href = fileUrl;
  //   link.download = "excel-file.xlsx";
  //   link.click();
  // };

  const handleDownloadExcel = () => {
    const fileData = [
      { url: excelDownData.falidDataLink, filename: "Failed Data.xlsx" },
      { url: excelDownData.duplicateDataLink, filename: "Duplicate Data.xlsx" },
    ];

    const downloadFile = (index) => {
      if (index < fileData.length) {
        const data = fileData[index];
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = data.url;
        link.download = "TEST 1";

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);

        setTimeout(() => {
          downloadFile(index + 1);
        }, 1000); // Delay in milliseconds
      }
    };

    // Start the download process with the first file
    downloadFile(0);
  };

  //EXCEL UPLOAD ENDS -----------------------------------------------------------------------------------------------------------------

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
    axios
      .get("http://192.168.12.54:8080/api/state/all")
      .then((response) => {
        setStates(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching states", error);
      });

    axios
      .get("http://192.168.12.54:8080/api/role/getall")
      .then((response) => {
        setRoles(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching roles", error);
      });

    if (loggedUserRole === "SUPERADMIN") {
      axios
        .get("http://192.168.12.54:8080/com/all", { headers })
        .then((response) => {
          setCompanies(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching roles", error);
        });
    }
  }, []);

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
    } else if (name === "role") {
      const selectedRole = roles.find((role) => role.id === value);
      setFormData({
        ...formData,
        [name]: {
          id: value,
          name: selectedRole ? selectedRole.name : "",
        },
      });
    }
    // else if (name === 'company') {
    //   const selectedCompany = companies.find((company) => company.id === value);
    //   setFormData({
    //     ...formData,
    //     [name]: {
    //       id: value,
    //       name: selectedCompany ? selectedCompany.name : '',
    //     },
    //   });
    // }
    else if (name === "company") {
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
    try {
      // console.log("state id", stateId);
      let response = await axios.get(
        `http://192.168.12.54:8080/api/city/${stateId}`
      );
      setCities(response.data.data);
    } catch (error) {
      console.error("Error fetching cities", error);
      setCities([]);
    }
  };

  const handleDateChange = (date) => {
    const adjustedDate = date ? date.add(1, "day") : null;

    // console.log("adjusted date", adjustedDate);

    setFormData({
      ...formData,
      dob: adjustedDate,
    });
    // console.log("selected date", formData.dob);
  };

  const handleSubmit = async (e) => {
    // console.log("I GOT HITTTT  !!!!!!");
    e.preventDefault();
    if (!formData.dob) {
      alert("Date of birth is required");
      return;
    }

    const user = {
      id: null,
      firstName: formData.firstName,
      image: "alt img",
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob.toISOString().split("T")[0],
      gender: formData.gender,
      govtId: formData.govtId,
      pincode: formData.pincode,
      company: {
        id: loggedUserRole === "SUPERADMIN" ? formData.company.id : companyId,
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
    };

    // console.log("PAYLOAD USER", user);

    // debugger
    try {
      setLoading(true);
      let response = await axios.post(
        "http://192.168.12.54:8080/api/user/adduser",
        user,
        { headers }
      );
      if (response.status === 200) {
        // closeDialog()
        handleEmployeeRedirect();
        fetchData();
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
          company: { id: "" },
          role: { id: "" },
          state: { id: "" },
          city: { id: "" },
        });
        toast.success("New Employee Added Successfully.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        alert(
          "Error in submitting data: " + JSON.stringify(response.data.response)
        );
      }
    } catch (error) {
      alert("Error submitting user data", error);
    }
    setLoading(false);
  };

  const handleEmployeeRedirect = () => {
    navigate("/employee");
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSingleUserForm = () => {
    setIsSingleUser(true);
    setIsUserSelection(false);
  };

  const handleMultiUserForm = () => {
    setIsMultiUser(true);
    setIsUserSelection(false);
  };

  const handleBack = () => {
    setIsSingleUser(false);
    setIsMultiUser(false);
    setIsUserSelection(true);
  };

  const handleRedirectEmployee =  () => {
    navigate('/employee')
  }

  const handleTemplateDownload = () => {
    const anchor = document.createElement("a");
    anchor.style.display = "none";
    anchor.href = excelFile;
    anchor.download = "MultiuserTemplate.xlsx";

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  // const handleTest = () => {
  //   setBtnLoading(true);
  //   setTimeout(() => {
  //     setBtnLoading(false);
  //   }, 2000);
  // };
  // console.log(excelDownData);
  return (
    <>
      <Loader isLoading={loading} />
      <Navbar toggleSidebar={toggleSidebar} />
      <Box sx={{ display: "flex", flexGrow: 1, p: 3,  }}>
        <Sidebar open={sidebarOpen} />
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
                title="Employee Form"
                subtitle="You can add employees of your choice"
              />
            </Box>
          </Grid>

          {isLimitReached
          ?
          <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems:'center',
            width: "100%",
            height: "75vh",
            // mt: "-5em",
          }}
        >
          <Typography sx={{fontSize:'50px'}}>You have reached max limit</Typography>
        </Box>
          :
          <>
                    {isUserSelection ? (
              <>
                          <Grid item xs={12} md={12} lg={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems:'center',
                  width: "100%",
                  height: "75vh",
                  mt: "-5em",
                }}
              >
                <Box sx={{ display: "flex", flexDirection:'row', width:'50em', justifyContent:'center' }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      margin: "1.2em 1.2em 0 0",
                      width: "20em",
                      height: "4em",
                    }}
                    onClick={handleSingleUserForm}
                  >
                    Add Single Employee
                  </Button>

                  {isSuperAdmin
                  ?

                  <></>
                  :

                  <>
                  <hr
  style={{
    height: "5em",
    border: "3px solid #BFBFBF",
    borderRadius: "5px",
  }}
/>

<Button
  variant="contained"
  size="large"
  sx={{
    margin: "1.2em 0 1.2em 1.2em",
    width: "20em",
    height: "4em",
  }}
  onClick={handleMultiUserForm}
>
  Add Multiple Employees
</Button>
</>
                  }


                </Box>
                <Button
                    variant="contained"
                    color="secondary"
                    // size="large"
                    sx={{
                      mt:'3em'
                      // width: "20em",
                      // height: "4em",
                    }}
                    onClick={handleRedirectEmployee}
                  >
                    Back to table
                  </Button>                
              </Box>

            </Grid>

            <Grid item xs={12} md={12} lg={12}>
 
            </Grid>
              </>
          ) : (
            ""
          )}

          {isSingleUser ? (
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
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      inputProps={{ maxLength: 26 }}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      inputProps={{ maxLength: 26 }}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={4} lg={4}>
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

                  <Grid item xs={12} sm={4} md={4} lg={4}>
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

                  <Grid item xs={12} sm={4} md={4} lg={4}>
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

                  <Grid item xs={12} sm={4} md={4} lg={4}>
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

                  <Grid item xs={12} sm={6} md={6} lg={6}>
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
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
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

                    {/* <Autocomplete
  className='inputField'
  options={cities}
  getOptionLabel={(city) => city.name}
  value={
    cities.find((city) => city.id === formData.city.id) || { id: '', name: '' }
  }
  onChange={(event, newValue) => handleChange('city', newValue)}
  isOptionEqualToValue={(option, value) => option.id === value.id}
  renderInput={(params) => (
    <TextField
      {...params}
      label="City"
      name="city"
      required
    />
  )}
/> */}
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
                        maxLength: governmentIdType === "Aadhar Card" ? 12 : 10,
                      }}
                      fullWidth
                      required
                      error={Boolean(error)}
                      helperText={error || warning}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControl sx={{ width: "100%", mt: "10px" }} required>
                      <InputLabel htmlFor="role">Role</InputLabel>
                      <Select
                        label="Role"
                        name="role"
                        value={formData.role.id || ""}
                        onChange={handleChange}
                        required
                      >
                        {roles.map((role) => (
                          <MenuItem key={role.id} value={role.id}>
                            {role.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* <Autocomplete
  className='inputField'
  options={roles}
  getOptionLabel={(role) => role.name}
  value={
    roles.find((role) => role.id === formData.role.id) || { id: '', name: '' }
  }
  onChange={(event, newValue) => handleChange('role', newValue)}
  isOptionEqualToValue={(option, value) => option.id === value.id}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Role"
      name="role"
      required
    />
  )}
/> */}
                  </Grid>

                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    {/* <FormControl sx={{width:'100%', mt:'10px'}} required>
        <InputLabel htmlFor="company">Company</InputLabel>
        <Select
          label="company"
          name="company"
          value={formData.company.id || ''}
          onChange={handleChange}
          disabled={loggedUserRole !== 'SUPERADMIN'}
          required
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '150px',
                maxWidth:'150px'
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
      </FormControl> */}

                    <FormControl sx={{ width: "100%", mt: "10px" }} required>
                      {loggedUserRole === "SUPERADMIN" ? (
                        <>
                          <InputLabel htmlFor="company">Company</InputLabel>
                          <Select
                            label="company"
                            name="company"
                            value={formData.company.id || ""}
                            onChange={handleChange}
                            // disabled={loggedUserRole !== 'SUPERADMIN'}
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
                          // onChange={handleChange}
                          aria-readonly
                        />
                      )}
                    </FormControl>

                    {/* <Autocomplete
  className='inputField'
  options={roles}
  getOptionLabel={(role) => role.name}
  value={
    roles.find((role) => role.id === formData.role.id) || { id: '', name: '' }
  }
  onChange={(event, newValue) => handleChange('role', newValue)}
  isOptionEqualToValue={(option, value) => option.id === value.id}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Role"
      name="role"
      required
    />
  )}
/> */}
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
                </Grid>
                {/* <Box sx={{display:'flex', flexDirection:'row', gap:'3em', width:'100%'}}>
</Box > */}

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
                    onClick={handleBack}
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
          ) : (
            ""
          )}

          {isMultiUser ? (
            //       <Grid item xs={12} md={12} lg={12}>
            //         <Box
            //           sx={{
            //             display: "flex",
            //             flexDirection: "row",
            //             justifyContent: "center",
            //             width: "100%",
            //             height: "75vh",
            //             paddingTop: "10em",
            //           }}
            //         >
            //           <Box sx={{ display: "flex", flexDirection: "column" }}>
            //             <Button
            //               variant="contained"
            //               sx={{
            //                 margin: "1.2em",
            //                 width: "20em",
            //                 height: "4em",
            //                 bgcolor: "green",
            //                 color: "white",
            //               }}
            //               download={excelFile}
            //               onClick={handleTemplateDownload}
            //             >
            //               Get Excel Template
            //             </Button>

            //             <Box
            //               sx={{
            //                 display: "flex",
            //                 flexDirection: "row",
            //                 alignItems: "center",
            //               }}
            //             >
            //               <div
            //                 style={{ flex: 1, borderBottom: "2px solid #BFBFBF" }}
            //               ></div>
            //               <div style={{ margin: "0 10px", color: "#939393" }}>OR</div>
            //               <div
            //                 style={{ flex: 1, borderBottom: "2px solid #BFBFBF" }}
            //               ></div>
            //             </Box>
            //             <TextField
            //               type="text"
            //               value={isFileSelected ? isFileSelected : 'No chosen file'} // Display the selected file's name
            //               sx={{ mt: "1em" }}
            //               disabled
            //             />
            //             {/* <Button  variant="contained" sx={{margin:'1.2em',width:'20em', height:'4em', bgcolor:'green', color:'white'}} onChange={handleChooseFile}>
            //   Upload Excel File
            //               <input
            //                 type="file"
            //                 hidden
            //               />
            // </Button> */}

            //             <Button
            //               variant="contained"
            //               component="label"
            //               onChange={handleChooseFile}
            //               sx={{
            //                 margin: "1.2em",
            //                 width: "20em",
            //                 height: "4em",
            //                 bgcolor: "green",
            //                 color: "white",
            //               }}
            //             >
            //               Choose File
            //               <input type="file" hidden id="fileInput" />
            //             </Button>

            //             <Button
            //               variant="contained"
            //               component="label"
            //               onClick={handleSaveUpload}
            //               disabled={!isUpload}
            //               sx={{margin:'1.2em',width:'20em', height:'4em', bgcolor:'green', color:'white'}}
            //             >
            //               Submit
            //             </Button>

            //             <Button
            //               variant="contained"
            //               component="label"
            //               onClick={handleDownloadExcel}
            //               sx={{margin:'1.2em',width:'20em', height:'4em', bgcolor:'green', color:'white'}}
            //             >
            //               download
            //             </Button>
            //           </Box>
            //         </Box>

            //         <Box>
            //           {/* <input accept=".xlsx" style={{ display:"none", }} id="raised-button-file" multiple type="file"/> */}
            //         </Box>
            //       </Grid>


             <Grid item xs={12} md={12} lg={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent:'flex-start',
                  alignItems: "center",
                  width: "100%",
                  height: "75vh",
                  paddingTop: "2em",
                  flexGrow:1,
                }}
              >
                <Paper
           elevation={1}
           sx={{
               display: 'flex',
               justifyContent: 'center',
               width:'50%',
              //  height: '4.5em',
              //  mt: '3em',
               mb: '0.5em'
           }}
           >
                <Box sx={{ width: "95%",
                // bgcolor: "#EBEBEB", 
                margin:'2em' 
                }}>
                  <Box
                    sx={{
                      bgcolor: "#EBEBEB",
                      width: "100%",
                      height: "15em",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "5px 5px 0 0",
                      border: "2px dashed #A6A6A6",
                      borderBottom: "none", 
                    }}
                  >
                    {isFileSelected
                      ? isFileSelected
                      : "Choose your file to upload"}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      bgcolor: "#F7F7F7",
                      borderRadius: "0 0 5px 5px",
                      border: "2px dashed #A6A6A6",
                      borderTop:"none",
                      // mb:'2em'
                    }}
                  >
                    <Box sx={{ width: "85px", mr: "10px" }}>
                      <Button
                        variant="contained"
                        component="label"
                        sx={{
                          width: "100%",
                          height: "44px",
                          borderRadius: "0px",
                          bgcolor: isUpload ? "#FF503B" : "#45D836",
                          "&:hover": {
                            backgroundColor: isUpload? "#922F24" : "#1B7D00",
                            color: "white",
                          },
                          boxShadow: "none",
                          elevation: 0,
                        }}
                        // onChange={isUpload ? null : handleChooseFile } // Conditionally set onChange
                        onClick={isUpload ? handleCancel : undefined} // Conditionally set onClick
                      >
                        <AddIcon
                          sx={{
                            fontSize: "40px",
                            transform: isUpload ? "rotate(45deg)" : "none",
                            transition: "transform 500ms ease-in-out",
                          }}
                        />
                        {isUpload ? '' : (
                          <input
                            type="file"
                            hidden
                            id="fileInputExcel"
                            onChange={handleChooseFile}
                          />
                        )}
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "#ACACAC",
                        width: "80%",
                      }}
                    >
                      <Typography>Add your excel file here.</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      color: "#ACACAC",
                      width: "100%",
                      mb: "2em",
                    }}
                  >
                    <Typography>
                      What to upload?{" "}
                      <a
                        href={excelFile}
                        download="Multiuser Template.xlsx"
                        style={{ color: "#A0A0A0" }}
                      >
                        Get Template
                      </a>
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: "2em",
                      paddingX: "1em",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ width: "9em", height: "44px" }}
                      onClick={handleBack}
                    >
                      Back
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!isUpload}
                      sx={{
                        width: "9em",
                        height: "44px",
                        pointerEvents: btnLoading ? "none" : "auto",
                        backgroundColor: btnLoading
                          ? "rgba(0, 0, 0, 0.12)"
                          : "primary.main",
                        "&:hover": {
                          backgroundColor: btnLoading
                            ? "rgba(0, 0, 0, 0.12)"
                            : "primary.dark", // Change color on hover
                        },
                      }}
                      onClick={handleSaveUpload}
                    >
                      {btnLoading ? (
                        <>
                          <CircularProgress
                            size="2em"
                            // sx={{ color: "rgba(0, 0, 0, 0.5)" }}
                          />
                        </>
                      ) : (
                        "Upload"
                      )}
                    </Button>
                  </Box>

                  <Box sx={{ mb: "2em" }}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Total Records</TableCell>
                            <TableCell>Successfully Added</TableCell>
                            <TableCell>Unsuccessfully Added</TableCell>
                            <TableCell>Duplicate Data</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              {excelDownData.totalElement || "0"}
                            </TableCell>
                            <TableCell>
                              {excelDownData.successfullyAdded || "0"}
                            </TableCell>
                            <TableCell>
                              {excelDownData.falidData || "0"}
                            </TableCell>
                            <TableCell>
                              {excelDownData.duplicateData || "0"}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      mb: "2em",
                    }}
                  >
                    <Button
                      variant="contained"
                      // component="label"
                      disabled={!isDownload}
                      color="error"
                      sx={{ width: "9em", height: "44px" }}
                      onClick={handleDownloadExcel}
                    >
                      Download
                    </Button>
                  </Box>
                </Box>
              </Paper>
              </Box>
            </Grid>
          ) : (
            ""
          )}
          </>
          }


        </Grid>
      </Box>
    </>
  );
}

export default UserForm;
