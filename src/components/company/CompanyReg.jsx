import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  Grid,
} from "@mui/material";
import "../../css/CompanyReg.css";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../global/Navbar";
import Sidebar from "../../global/Sidebar";
import Loader from "../Loader";
import Autocomplete from "@mui/material/Autocomplete";


//loader
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Config from "../../Config/Config";

export default function CompanyReg() {
  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
        width: 250,
      },
    },
  };

  // const url = "http://192.168.12.54:8080/com/add";

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    logo: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    email: "",
    phoneNumber: "",
    industry: "",
    aboutUs: "",
    userLimit: "",
    buildingId: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    logo: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    email: "",
    phoneNumber: "",
    industry: "",
    userLimit: "",
    aboutUs: "",
    buildingId: "",
    image: false,
  });

  const [logoUpdated, setLogoUpdated] = useState(false);

//loader
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {


   
    const companyUrl = Config.baseUrl + Config.apiEndPoints.addCompanyEndPoint;

    e.preventDefault();

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const pincodeRegex = /^\d{6}$/;

    // const phoneNumberRegex = /^\+?[0-9]{1,3}(-|\s)?[0-9]{3,14}$/;
    const phoneNumberRegex = /^\+?[0-9]{1,3}(-|\s)?[0-9]{3,14}$/;

    const newErrors = {};

    // Check for empty fields and validate their content
    // if (!values.name) {
    //     newErrors.name = "Name is required";
    // }

    if (!values.logo) {
      newErrors.logo = "Company Logo is required";
    }

    if (!values.address) {
      newErrors.address = "Address is required";
    }

    if (!values.state) {
      newErrors.state = "State is required";
    }

    if (!values.city) {
      newErrors.city = "City is required";
    }

    if (!values.pincode || !values.pincode.match(pincodeRegex)) {
      newErrors.pincode = "Pincode must be exactly 6 digits";
    }

    if (!values.email || !values.email.match(emailRegex)) {
      newErrors.email = "Invalid email address";
    }

    if (!values.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!phoneNumberRegex.test(values.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }

    if (!values.industry) {
      newErrors.industry = "Industry is required";
    }

    if (!values.userLimit) {
      newErrors.userLimit = "User Limit is required";
    }

    if (!values.buildingId) {
      newErrors.buildingId = "Building Id is required";
    }

    if (!values.aboutUs) {
      newErrors.aboutUs = "About is required";
    }

    setErrors(newErrors); // Update errors state

    if (Object.keys(newErrors).length === 0) {
      setOpen(true); 
     

      try {
        const formData = new FormData();
        formData.append("name", values.name);

        if (values.logo) {
          formData.append("image", values.logo);
        }

        formData.append("address", values.address);
        formData.append("state.id", values.state);
        formData.append("city.id", values.city);
        formData.append("pincode", values.pincode);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("Industry", values.industry);
        formData.append("aboutUs", values.aboutUs);
        formData.append("userLimit", values.userLimit);
        formData.append("building.buildingId", values.buildingId);

        const res = await axios.post(companyUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        if (res.status === 200) {

          setOpen(false); 
          alert("Form submitted successfully");

         

          setValues({
            name: "",
            logo: "",
            address: "",
            state: "",
            city: "",
            pincode: "",
            email: "",
            phoneNumber: "",
            industry: "",
            aboutUs: "",
            userLimit: "",
            buildingId: "",
          });
          setLogoUpdated(false);
          navigate("/companyDetails");
        } else if (res.status === 409) {
          alert(res.data.message);
        }
      } catch (error) {

        setOpen(false); 
        if (error.response && error.response.status === 409) {
          alert(error.response.data.message);
        } else {
          alert(error.response.data.error);
        }

        console.log(error);
      }
    }
  };

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  function fetchStates() {
    const stateUrl = Config.baseUrl + Config.apiEndPoints.statesEndPoint;

    // console.log(stateUrl,"stateUrl")
    axios
      .get(stateUrl)

      .then((response) => {
        setStates(response.data.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchStates();
    fetchBuildingNames();
  }, []);

  const handleStateChange = (event) => {
    const cityUrl =
      Config.baseUrl + Config.apiEndPoints.cityEndPoint + selectedState;
    const selectedState = event.target.value;
    // console.log(selectedState)
    setSelectedState(selectedState);
    setValues({ ...values, state: selectedState });

    // axios.get(`http://192.168.12.54:8080/sc/all/${selectedState}`)

    axios
      .get(cityUrl)

      .then((response) => {
        setCities(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
    setValues({ ...values, city: selectedCity });
    // setSelectedCity(selectedCity);
  };

  const [imageUrl, setImageUrl] = useState("");

  // const handleLogoChange = (event) => {
  //     const logoFile = event.target.files[0];
  //     setValues({ ...values, logo: logoFile });
  //     setLogoUpdated(true);
  //     alert("Company logo updated successfully");

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //         setImageUrl(reader.result);
  //     };
  //     reader.readAsDataURL(logoFile);
  // };
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

  // const handleLogoChange = (event) => {
  //     const logoFile = event.target.files[0];

  //     // Check if file size exceeds the limit
  //     if (logoFile.size > MAX_FILE_SIZE) {
  //         alert("Maximum file size exceeded (5MB)");
  //         setErrors({ ...errors, logo: "Maximum file size exceeded (5MB)" });
  //         return;
  //     }

  //     // Proceed with normal logo upload process
  //     setValues({ ...values, logo: logoFile });
  //     setLogoUpdated(true);
  //     alert("Company logo updated successfully");

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //         setImageUrl(reader.result);
  //     };
  //     reader.readAsDataURL(logoFile);
  // };

  const handleLogoChange = (event) => {

    setOpen(false)
    const allowedExtensions = ["image/jpeg", "image/jpg", "image/png"];
    const logoFile = event.target.files[0];

    if (!logoFile) {
     
      return;
    }

    // Check if file format is allowed
    if (!allowedExtensions.includes(logoFile.type)) {
      alert("Allowed file formats: .jpg, .jpeg, .png");
      resetFileInput(); 
      return;
    }

 
    // if (logoFile.size > MAX_FILE_SIZE) {
    //     alert("Maximum file size exceeded (5MB)");
    //     // setErrors({ ...errors, logo: "Maximum file size exceeded (5MB)" });
    //     return;
    // }

    // Check if file size is within the range (between 1MB and 5MB)
    // const fileSizeInMB = logoFile.size / (1024 * 1024); // Size in MB
    // const minSize = 1; // Minimum size in MB
    // const maxSize = 5; // Maximum size in MB

    // if (fileSizeInMB < minSize || fileSizeInMB > maxSize) {
    //   alert(`File size should be between ${minSize}MB and ${maxSize}MB`);
    //   return;
    // }
 
    const fileSizeInMB = logoFile.size / (1024 * 1024);
    console.log(fileSizeInMB,"filesizemb")
    const minSizeInMB = 0.001;
    const maxSizeInMB = 5; 

    if (fileSizeInMB < minSizeInMB || fileSizeInMB > maxSizeInMB) {

     
      alert(`File size should be between 1KB and 5MB`);
      resetFileInput(); 
     
      return;
    }

    setValues({ ...values, logo: logoFile });
    setLogoUpdated(true);
    alert("Company logo updated successfully");

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(logoFile);
  };



  const resetFileInput = () => {
    // Resetting the file input by keying it out of the DOM and back in
    const fileInput = document.getElementById('file-input');
    fileInput.value = ''; // Resetting the value
  };

  //building options

  const [buildingOptions, setBuildingOptions] = useState([]);
  const [selectedBuildingId, setSelectedBuildingId] = useState(null);

  // const buildingUrl = `http://192.168.12.54:8080/api/building/getAll`;

  function fetchBuildingNames() {
    const buildingUrl =
      Config.baseUrl + Config.apiEndPoints.getBuildingEndPoint;

    axios
      .get(buildingUrl)
      .then((response) => {
        // console.log(response.data.data, "buildings")

        setBuildingOptions(response.data.data);
      })
      .catch((error) => {
        console.log(error, "Error fetching data");
      });
  }

  // };
  const handleBuildingChange = (event, newValue) => {
    if (newValue) {
      setSelectedBuildingId(newValue.id);
      setValues({ ...values, buildingId: newValue.id });
    } else {
      setSelectedBuildingId(null);
      setValues({ ...values, buildingId: "" });
    }
  };

  const handleImageClick = () => {
    if (imageUrl) {
      const newWindow = window.open();
      newWindow.document.write(`<img src="${imageUrl}" alt="Uploaded Logo"/>`);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexGrow: 1, p: 3 ,}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <div className="img" >
              <form onSubmit={(e) => handleSubmit(e)} >
                <Box
                  display="flex"
                  flexDirection="column"
                  maxWidth={800}
                  margin="auto"
                  marginTop={3}
                  padding={3}
                  borderRadius={2}
                  gap={5}
                  elevation={2}
                  boxShadow={"5px 5px 10px #ccc"}
                >
                  <Typography
                    sx={{ margin: "auto" }}
                    fontSize={20}
                    variant={"h1"}
                  >
                    Company Registration Form
                  </Typography>
                  <div
                    className="input"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* 
                                        <TextField sx={{ width: "47%" }} label="Company Name" required placeholder="Company Name " type="text"  
                             
                                        
                                        
                                        
                                        value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })

                                        if (!e.target.value.trim()) {
                                            setErrors({ ...errors, name: "Name is required" })
                                        } else {
                                            setErrors({ ...errors, name: "" });
                                        }

                                      
        
                                    }

                                            error={Boolean(errors.name)}
                                            helperText={errors.name}

                                        ></TextField> */}

                    <TextField
                      sx={{ width: "47%" }}
                      label="Company Name"
                      required
                      placeholder="Company Name"
                      type="text"
                      value={values.name}
                      onChange={(e) => {
                        // const inputValue = e.target.value;

                        const inputValue = e.target.value.replace(/\s{2,}/g, ' ');  // Replace multiple spaces with a single space and trim leading/trailing spaces
                        if (inputValue.length <= 40 || inputValue === "") {
                          setValues({ ...values, name: inputValue });
                          setErrors({ ...errors, name: "" }); // Clear any previous error message
                        } else {
                          setErrors({
                            ...errors,
                            name: "Company Name should be at most 40 characters",
                          });
                        }
                      }}
                      // onBlur={() => {
                      //   if (!values.name.trim()) {
                      //     setErrors({
                      //       ...errors,
                      //       name: "Company Name is required",
                      //     });
                      //   }
                      // }}



                      onBlur={() => {
                        let trimmedValue = values.name.trim(); // Trim leading/trailing spaces
                        setValues({ ...values, name: trimmedValue });
                        
                        if (!trimmedValue) {
                          setErrors({
                            ...errors,
                            name: "name is required",
                          });
                        } else {
                          setErrors({ ...errors, name: "" });
                        }
                      }}



                      // onKeyDown={(e) => {
                      //   if (e.key === " " && e.target.value.slice(-1) === " ") {
                      //     e.preventDefault(); // Prevent multiple spaces
                      //   }
                      // }}



                      error={Boolean(errors.name)}
                      helperText={errors.name}
                    />

                    {/* <label className="custom-file-upload">
                                            <input type="file" id="file-input" onChange={handleLogoChange} />
                                            Upload Company Logo
                                        </label> */}

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "",

                        // border: errors.image == true ? "1px solid red" : ""
                      }}
                    >
                      <label>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                          }}
                        >
                          {imageUrl && (
                            <img
                              src={imageUrl}
                              alt="Uploaded Logo"
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                                marginLeft: "10px",
                                cursor: "pointer",
                              }}
                              onClick={handleImageClick}
                            />
                          )}
                          <span
                            className={`custom-file-upload${
                              logoUpdated ? " updated" : ""
                            }`}
                          >
                            <input
                              type="file"
                              accept="image/jpeg, image/jpg, image/png"
                              id="file-input"
                              onChange={handleLogoChange}

                              // onBlur={(e) => {
                              //     const file = e.target.files[0];
                              //     if (!file) {
                              //         setErrors({ ...errors, logo: "Company Logo is required", image:true });
                              //     } else {
                              //         setErrors({ ...errors, logo: "", image:false });
                              //     }
                              // }}
                            />
                            Upload Company Logo
                          </span>
                        </div>
                      </label>
                      <Typography
                        variant="caption"
                        color="black"
                        sx={{ fontSize: "15px" }}
                      >
                        Allowed file formats: .jpg, .jpeg, .png
                        

                      </Typography>
                      <Typography
                        variant="caption"
                        color="black"
                        sx={{ fontSize: "15px" }}
                      >
                        Logo size (1Kb - 5Mb)
                      </Typography>



                      {errors.logo && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ fontSize: "15px" }}
                        >
                          {errors.logo}
                        </Typography>
                      )}
                    </div>
                  </div>

                  {/* <TextField placeholder="Company Address" type="text" label="Company Address" required value={values.address} onChange={(e) => setValues({ ...values, address: e.target.value })} 

                                    error={Boolean(errors.address)}
                                        helperText={errors.address}></TextField> */}

                  <TextField
                    sx={{ width: "100%" }}
                    label="Company Address"
                    required
                    placeholder="Company Address"
                    type="text"
                    value={values.address}
                    // onChange={(e) => {
                    //   setValues({ ...values, address: e.target.value });

                    //   // Validate input on typing
                    //   if (!e.target.value.trim()) {
                    //     setErrors({
                    //       ...errors,
                    //       address: "Address is required",
                    //     });
                    //   } else {
                    //     setErrors({ ...errors, address: "" });
                    //   }
                    // }}
                    // onBlur={() => {
                    //   // Final validation on blur if needed
                    //   if (!values.address.trim()) {
                    //     setErrors({
                    //       ...errors,
                    //       address: "Address is required",
                    //     });
                    //   } else {
                    //     setErrors({ ...errors, address: "" });
                    //   }
                    // }}


                      onChange={(e) => {
    // Replace multiple spaces with a single space
    const formattedAddress = e.target.value.replace(/\s\s+/g, ' ');
    setValues({ ...values, address: formattedAddress });

    // Validate input on typing
    if (!formattedAddress.trim()) {
      setErrors({
        ...errors,
        address: "Address is required",
      });
    } else {
      setErrors({ ...errors, address: "" });
    }
  }}



                    onBlur={() => {
                      let trimmedValue = values.address.trim(); // Trim leading/trailing spaces
                      setValues({ ...values, address: trimmedValue });
                      
                      if (!trimmedValue) {
                        setErrors({
                          ...errors,
                          address: "address is required",
                        });
                      } else {
                        setErrors({ ...errors, address: "" });
                      }
                    }}
                    error={Boolean(errors.address)}
                    helperText={errors.address}
                  />

                  <div
                    className="input"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: "20px",
                    }}
                  >
                    {/* <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                            
                                                <Autocomplete required
                                                    sx={{ width: '350px' }}
                                                    options={states}
                                                    getOptionLabel={(option) => option.name}
                                                    value={selectedState}
                                                    onChange={(event, newValue) => {
                                                        setSelectedState(newValue);
                                                        setValues({ ...values, state: newValue ? newValue.id : '' });
                                                        if (newValue) {
                                                            // axios.get(`http://192.168.12.54:8080/sc/all/${newValue.id}`)
                                                         
                                                            axios.get(Config.baseUrl + Config.apiEndPoints.cityEndPoint + `/${newValue.id}`)
                                                                .then((response) => {
                                                                    setCities(response.data.data);
                                                                })
                                                                .catch((error) => {
                                                                    console.error(error);
                                                                });
                                                        } else {
                                                            setCities([]);
                                                        }
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params} required
                                                            label="Select State"



                                                            onBlur={() => {
                                                                if (!values.state) {
                                                                    setErrors({ ...errors, state: "State is required" });
                                                                } else {
                                                                    setErrors({ ...errors, state: "" });
                                                                }
                                                            }}
                                                            error={Boolean(errors.state)}
                                                            helperText={errors.state}
                                                            InputLabelProps={{
                                                                shrink: selectedState !== null || params.inputProps?.value,
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Box> */}

                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        {/* <InputLabel id="demo-simple-select-label">Select State</InputLabel> */}
                        <Autocomplete
                          required
                          sx={{ width: "350px" }}
                          options={states}
                          getOptionLabel={(option) => option.name}
                          value={selectedState}
                          onChange={(event, newValue) => {
                            setSelectedState(newValue);
                            setValues({
                              ...values,
                              state: newValue ? newValue.id : "",
                            });

                            if (newValue) {
                              axios
                                .get(
                                  Config.baseUrl +
                                    Config.apiEndPoints.cityEndPoint +
                                    `/${newValue.id}`
                                )
                                .then((response) => {
                                  setCities(response.data.data);
                                })
                                .catch((error) => {
                                  console.error(error);
                                });
                            } else {
                              setSelectedCity(null);
                              setCities([]);
                              setValues({ ...values, city: "" });
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              label="Select State"
                              onBlur={() => {
                                if (!values.state) {
                                  setErrors({
                                    ...errors,
                                    state: "State is required",
                                  });
                                } else {
                                  setErrors({ ...errors, state: "" });
                                }
                              }}
                              error={Boolean(errors.state)}
                              helperText={errors.state}
                              InputLabelProps={{
                                shrink:
                                  selectedState !== null ||
                                  params.inputProps?.value,
                              }}
                            />
                          )}
                        />
                      </FormControl>
                    </Box>

                    {/* <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>

                                                <Autocomplete
                                                    required

                                                    sx={{ width: '350px' }}
                                                    options={cities}
                                                    getOptionLabel={(option) => option.name}
                                                    value={selectedCity}
                                                    onChange={(event, newValue) => {
                                                        setSelectedCity(newValue);
                                                        setValues({ ...values, city: newValue ? newValue.id : '' });
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params} required
                                                            label="Select City"

                                                            onBlur={() => {
                                                                if (!values.city) {
                                                                    setErrors({ ...errors, city: "City is required" });
                                                                } else {
                                                                    setErrors({ ...errors, city: "" });
                                                                }
                                                            }}
                                                            error={Boolean(errors.city)}
                                                            helperText={errors.city}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Box> */}

                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        {/* <InputLabel id="demo-simple-select-label">Select City</InputLabel> */}
                        <Autocomplete
                          required
                          sx={{ width: "350px" }}
                          options={cities}
                          getOptionLabel={(option) => option.name}
                          value={selectedCity}
                          onChange={(event, newValue) => {
                            setSelectedCity(newValue);
                            setValues({
                              ...values,
                              city: newValue ? newValue.id : "",
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              label="Select City"
                              onBlur={() => {
                                if (!values.city) {
                                  setErrors({
                                    ...errors,
                                    city: "City is required",
                                  });
                                } else {
                                  setErrors({ ...errors, city: "" });
                                }
                              }}
                              error={Boolean(errors.city)}
                              helperText={errors.city}
                            />
                          )}
                        />
                      </FormControl>
                    </Box>
                  </div>
                  {/* <TextField label="Pincode" required placeholder="Pincode" value={values.pincode} onChange={(e) => {
                                        // Check if entered value is within 6 characters
                                        if (e.target.value.length <= 6) {
                                            setValues({ ...values, pincode: e.target.value });
                                        }
                                    }}
                                        inputProps={{ maxLength: 6 }}


                                        onBlur={() => {
                                            if (!values.pincode.trim()) {
                                                setErrors({ ...errors, pincode: "Pincode is required" });
                                            } else {
                                                setErrors({ ...errors, pincode: "" });
                                            }
                                        }}



                                        error={Boolean(errors.pincode)}
                                        helperText={errors.pincode}></TextField> */}
                  <TextField
                    label="Pincode"
                    required
                    placeholder="Pincode"
                    value={values.pincode}
                    onChange={(e) => {
                      // Check if entered value is within 6 characters
                      if (/^\d{0,6}$/.test(e.target.value)) {
                        setValues({ ...values, pincode: e.target.value });
                      }
                    }}
                    inputProps={{
                      maxLength: 6,
                      pattern: "[0-9]*", // Allows only numeric input
                    }}
                    onBlur={() => {
                      if (!values.pincode.trim()) {
                        setErrors({
                          ...errors,
                          pincode: "Pincode is required",
                        });
                      } else if (!/^\d{6}$/.test(values.pincode)) {
                        setErrors({
                          ...errors,
                          pincode: "Pincode must be exactly 6 digits",
                        });
                      } else {
                        setErrors({ ...errors, pincode: "" });
                      }
                    }}
                    error={Boolean(errors.pincode)}
                    helperText={errors.pincode}
                  />

                  <div
                    className="input"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* <TextField sx={{ width: "47%" }} label="Email" required placeholder=" Email" type="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })}

                                            onBlur={() => {
                                                if (!values.email.trim()) {
                                                    setErrors({ ...errors, email: "Email is required" });
                                                } else {
                                                    setErrors({ ...errors, email: "" });
                                                }
                                            }}



                                            error={Boolean(errors.email)}
                                            helperText={errors.email} >
                                        </TextField> */}

                    <TextField
                      sx={{ width: "47%" }}
                      label="Email"
                      required
                      placeholder="Email"
                      type="email"
                      value={values.email}
                      onChange={(e) =>
                        setValues({ ...values, email: e.target.value })
                      }
                      onBlur={() => {


                        let trimmedValue = values.email.trim(); // Trim leading/trailing spaces
                        setValues({ ...values, email: trimmedValue });
                        if (!values.email.trim()) {
                          setErrors({ ...errors, email: "Email is required" });
                        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                          setErrors({
                            ...errors,
                            email: "Invalid email address",
                          });
                        } else {
                          setErrors({ ...errors, email: "" });
                        }
                      }}

                      error={Boolean(errors.email)}
                      helperText={errors.email}
                    />

                    {/* <TextField sx={{ width: "47%" }} label="Phone Number" required placeholder=" Phone Number "


                                            // inputProps={{ maxLength: 10 }}


                                            inputProps={{
                                                pattern: "^[0-9]*",
                                                onInput: (event) => {
                                                    let value = event.target.value;
                                                    value = value.replace(/\D/g, "");
                                                    if (value.length > 10) {
                                                        value = value.slice(0, 10);
                                                    }


                                                    setValues({ ...values, phoneNumber: value })

                                                }
                                            }}


                                            onBlur={() => {
                                                if (values.phoneNumber.length !== 10) {
                                                    setErrors({ ...errors, phoneNumber: "Phone number must be exactly 10 digits" });
                                                } else {
                                                    setErrors({ ...errors, phoneNumber: "" });
                                                }
                                            }}



                                            value={values.phoneNumber}
                                            error={Boolean(errors.phoneNumber)}
                                            helperText={errors.phoneNumber} /> */}

                    <TextField
                      sx={{ width: "47%" }}
                      label="Phone Number"
                      required
                      placeholder="Phone Number"
                      inputProps={{
                        pattern: "^[0-9]*",
                        maxLength: 10,
                      }}
                      value={values.phoneNumber}
                      onChange={(e) => {
                        let value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        setValues({ ...values, phoneNumber: value });
                      }}
                      onBlur={() => {
                        if (!values.phoneNumber.trim()) {
                          setErrors({
                            ...errors,
                            phoneNumber: "Phone number is required",
                          });
                        } else if (values.phoneNumber.length !== 10) {
                          setErrors({
                            ...errors,
                            phoneNumber:
                              "Phone number must be exactly 10 digits",
                          });
                        } else {
                          setErrors({ ...errors, phoneNumber: "" });
                        }
                      }}
                      error={Boolean(errors.phoneNumber)}
                      helperText={errors.phoneNumber}
                    />
                  </div>

                  <div
                    className="input"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* 
                                        <Autocomplete required
                                            sx={{ width: "47%" }}
                                            options={buildingOptions}
                                            getOptionLabel={(option) => option !== null ? `Id-${option.id}   ${option.name}` : ""} // Assuming 'name' is the property containing the building name
                                            onChange={handleBuildingChange}
                                            // renderInput={(params) => (
                                            //     <TextField
                                            //         {...params}
                                            //         label="Select Building"
                                            //         variant="outlined"
                                            //     />
                                            // )}
                                            renderInput={(params) => (
                                           at XMLHttpRequest.onloadend (http://localhost:3000/static/js/bundle.js:140341:66)         <TextField
                                                    {...params} required
                                                    label="Select Building"


                                                    variant="outlined"
                                                />
                                            )}
                                            renderOption={(props, option) => (
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}{...props}>
                                                    <div>Id-{option.id}</div>
                                                    <div>{option.name}</div>
                                                </div>
                                            )}


                                            onBlur={() => {
                                                if (!values.buildingId) {
                                                    setErrors({ ...errors, buildingId: "Name is required" });
                                                } else {
                                                    setErrors({ ...errors, buildingId: "" });
                                                }
                                            }}



                                            error={Boolean(errors.buildingId)}
                                            helperText={errors.buildingId}
                                        /> */}

                    <Autocomplete
                      required
                      sx={{ width: "47%" }}
                      options={buildingOptions}
                      getOptionLabel={(option) =>
                        option !== null ? `Id-${option.id} ${option.name}` : ""
                      }
                      onChange={handleBuildingChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Select Building"
                          variant="outlined"
                          onBlur={() => {
                            if (!values.buildingId) {
                              setErrors({
                                ...errors,
                                buildingId: "Building ID is required",
                              });
                            } else {
                              setErrors({ ...errors, buildingId: "" });
                            }
                          }}
                          error={Boolean(errors.buildingId)}
                          helperText={errors.buildingId}
                        />
                      )}
                      renderOption={(props, option) => (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                          {...props}
                        >
                          <div>Id-{option.id}</div>
                          <div>{option.name}</div>
                        </div>
                      )}
                    />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "47%",
                      }}
                    >
                      {/* <TextField sx={{ width: "100%", margingRight: "20px" }} label="User Limit" required placeholder="User Limit" type="" value={values.userLimit}
                                                onChange={(e) => {

                                                    const enteredValue = e.target.value;
                                                    const numericValue = parseInt(enteredValue);

                                                    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 1000) {
                                                        setValues({ ...values, userLimit: numericValue });
                                                    } else {

                                                        setValues({ ...values, userLimit: '' });

                                                    }



                                                }}


                                                onBlur={() => {
                                                    if (!values.userLimit) {
                                                        setErrors({ ...errors, userLimit: "Name is required" });
                                                    } else {
                                                        setErrors({ ...errors, userLimit: "" });
                                                    }
                                                }}


                                                error={Boolean(errors.userLimit)}
                                                helperText={errors.userLimit}
                                            ></TextField> */}

                      <TextField
                        sx={{ width: "100%", margingRight: "20px" }}
                        label="User Limit"
                        required
                        placeholder="User Limit"
                        type=""
                        value={values.userLimit}
                        onChange={(e) => {
                          const enteredValue = e.target.value;
                          const numericValue = parseInt(enteredValue);

                          if (
                            !isNaN(numericValue) &&
                            numericValue >= 1 &&
                            numericValue <= 1000
                          ) {
                            setValues({ ...values, userLimit: numericValue });
                          } else {
                            setValues({ ...values, userLimit: "" });
                          }
                        }}
                        onBlur={() => {
                          if (!values.userLimit) {
                            setErrors({
                              ...errors,
                              userLimit: "User Limit is required",
                            });
                          } else {
                            setErrors({ ...errors, userLimit: "" });
                          }
                        }}
                        error={Boolean(errors.userLimit)}
                        helperText={errors.userLimit}
                      />

                      <Typography variant="body2" color="textSecondary">
                        Maximum value for User Limit: 1000
                      </Typography>
                    </div>
                  </div>

                  {/* <TextField label="Industry" required placeholder="Industry" type="text" value={values.industry} onChange={(e) => setValues({ ...values, industry: e.target.value })}

                                        onBlur={() => {
                                            if (!values.industry.trim()) {
                                                setErrors({ ...errors, industry: "Name is required" });
                                            } else {
                                                setErrors({ ...errors, industry: "" });
                                            }
                                        }}


                                        error={Boolean(errors.industry)}
                                        helperText={errors.industry}></TextField>
 */}

                  <TextField
                    label="Industry"
                    required
                    placeholder="Industry"
                    type="text"
                    value={values.industry}
                    // onChange={(e) => {
                    //   const inputValue = e.target.value;
                    //   if (/^[A-Za-z]+$/.test(inputValue) || inputValue === "") {
                    //     setValues({ ...values, industry: inputValue });
                    //     setErrors({ ...errors, industry: "" }); // Clear any previous error message
                    //   } else {
                    //     setErrors({
                    //       ...errors,
                    //       industry: "Industry should only contain letters",
                    //     });
                    //   }
                    // }}


                    //code
                    // onChange={(e) => {
                    //   setValues({ ...values, industry: e.target.value });
                    //   setErrors({ ...errors, industry: "" }); // Clear any previous error message
                    // }}


                    inputProps={{
                     
                      maxLength: 100,
                    }}
                  
                    onChange={(e) => {
                      let value = e.target.value
                        // .replace( "")
                        .replace(/\s{2,}/g, ' ')
                        .slice(0, 100);
                      setValues({ ...values, industry: value });
                    }}
                    // onBlur={() => {
                    //   if (!values.industry.trim()) {
                    //     setErrors({
                    //       ...errors,
                    //       industry: "Industry is required",
                    //     });
                    //   }
                    // }}


                    onBlur={() => {
                      let trimmedValue = values.industry.trim(); // Trim leading/trailing spaces
                      setValues({ ...values, industry: trimmedValue });
                      
                      if (!trimmedValue) {
                        setErrors({
                          ...errors,
                          industry: "Industry is required",
                        });
                      } else {
                        setErrors({ ...errors, industry: "" });
                      }
                    }}
                    error={Boolean(errors.industry)}
                    helperText={errors.industry}
                  />

                  {/* <TextField label="About" required placeholder="About" type="text" value={values.aboutUs} onChange={(e) => setValues({ ...values, aboutUs: e.target.value })}

                                        onBlur={() => {
                                            if (!values.aboutUs.trim()) {
                                                setErrors({ ...errors, aboutUs: "aboutUs is required" });
                                            } else {
                                                setErrors({ ...errors, aboutUs: "" });
                                            }
                                        }}



                                        error={Boolean(errors.aboutUs)}
                                        helperText={errors.aboutUs}></TextField> */}

                  <TextField
                    label="About"
                    required
                    placeholder="About"
                    type="text"
                    value={values.aboutUs}
                    onChange={(e) =>{
                      let value = e.target.value
                      // .replace( "")
                      .replace(/\s{2,}/g, ' ')

                    

                    setValues({ ...values, aboutUs: value })

                    }
                    
                    }

            
                    // onBlur={() => {
                    //   if (!values.aboutUs.trim()) {
                    //     setErrors({ ...errors, aboutUs: "About is required" });
                    //   } else {
                    //     setErrors({ ...errors, aboutUs: "" });
                    //   }
                    // }}





                    onBlur={() => {
                      let trimmedValue = values.aboutUs.trim(); // Trim leading/trailing spaces
                      setValues({ ...values, aboutUs: trimmedValue });
                      
                      if (!trimmedValue) {
                        setErrors({
                          ...errors,
                        aboutUs: "aboutUs is required",
                        });
                      } else {
                        setErrors({ ...errors, name: "" });
                      }
                    }}
                    error={Boolean(errors.aboutUs)}
                    helperText={errors.aboutUs}
                  />

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "15px",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ width: 130, height: 50 }}
                    >
                      Register
                    </Button>
                    <Button
                      onClick={(e) => {
                        navigate("/companyDetails");
                      }}
                      type="button"
                      variant="contained"
                      sx={{ width: 130, height: 50 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>


        <div>
      {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
      <Backdrop
        // style={{ zIndex: 1 }} 
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1}}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
      </Box>
    </>
  );
}
