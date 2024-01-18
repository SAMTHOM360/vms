import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
// import './CompanyReg.css';
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/EditCompany.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../global/Navbar";
import Sidebar from "../../global/Sidebar";
import Loader from "../Loader";
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import Config from "../../Config/Config";


//loader
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function EditCompanyForm() {
  const { companyId } = useParams();

  const navigate = useNavigate();



  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const pincodeRegex = /^\d{6}$/;

  // const phoneNumberRegex = /^\+?[0-9]{1,3}(-|\s)?[0-9]{3,14}$/;
  const phoneNumberRegex = /^\+?[0-9]{1,3}(-|\s)?[0-9]{3,14}$/;

  const [companyData, setCompanyData] = useState({
    name: "",
    logo: null,
    address: "",
    state: "",
    city: "",
    pincode: "",
    email: "",
    phoneNumber: "",
    industry: "",
    aboutUs: "",
    userLimit: "",
    buildingId: { id: null, name: "" },
    // buildingId: ""
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

  })





  // console.log(companyData, "companydata");


  const [disabled, setDisabled] = useState(true);




  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");


  const [imageUrl, setImageUrl] = useState(null);

  const [logo, setLogo] = useState(null)

  function fetchData() {

    const editCompanyUrl = Config.baseUrl + Config.apiEndPoints.editCompanyEndPoint + "?id="+ companyId
    axios
      // .get(`http://192.168.12.54:8080/com/get/${companyId}`, 

      .get(editCompanyUrl,

        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        })
      .then((response) => {
        const company = response.data.data;
        // console.log(response.data.data);


        setCompanyData({
          name: company.name,
          logo: null,
          image: company.logo,
          address: company.address,
          state: company.state.id,
          city: company.city.id,
          pincode: company.pincode,
          email: company.email,
          phoneNumber: company.phoneNumber,
          industry: company.industry,
          aboutUs: company.aboutUs,
          userLimit: company.userLimit,
          buildingId: company.building,
        });
        // console.log(company.city.id,"city");

        setSelectedState(company.state.id); // Set the initial selected state
        setSelectedCity(company.city.id);
        fetchCity(company.state.id);
        setSelectedBuildingId(company.building);
        setImageUrl(company.image)
        // console.log(company.logo,"logo")
        // console.log(company.building.buildingId, "buildingId")
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchStates() {

    const stateUrl = Config.baseUrl + Config.apiEndPoints.statesEndPoint
    axios
      // .get("http://192.168.12.54:8080/sc/states")

      .get(stateUrl)

      .then((response) => {
        // console.log("Company Data", companyData);

        setStates(response.data.data);

        // console.log(response.data.data,"states");
      })

      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchStates();
    fetchData();
    fetchBuildingNames();

    // fetchCity(selectedState);
  }, []);

 

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setCompanyData({ ...companyData, state: selectedState });
    setSelectedState(selectedState);


    
    axios
     
      // .get(cityUrl)

      .then((response) => {
        setCities(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function fetchCity(selectedState) {



    const cityUrl = Config.baseUrl + Config.apiEndPoints.cityEndPoint + `/${selectedState}`
    axios
      // .get(`http://192.168.12.54:8080/sc/all/${selectedState}`)

      .get(cityUrl)

      .then((response) => {
        setCities(response.data.data);
        // console.log(selectedState,"xxx")
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;

    setCompanyData({ ...companyData, city: selectedCity });
    setSelectedCity(selectedCity);
  };

  //logo handling



  const [logoUpdated, setLogoUpdated] = useState(false);


  const MAX_FILE_SIZE = 5 * 1024 * 1024;


  const handleImageClick = () => {
    let img = imageUrl || companyData.image
    if (img) {
      const newWindow = window.open();
      newWindow.document.write(`<img src="${img}" alt="Uploaded Logo"/>`);
    }
  };



  const handleLogoChange = (event) => {

    setOpen(false)
    const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    const logoFile = event.target.files[0];


    if (!logoFile) {

    
      return;
    }


    // Check if file format is allowed
    if (!allowedExtensions.includes(logoFile.type)) {
      // setOpen(false)

      alert("Allowed file formats: .jpg, .jpeg, .png")
      resetFileInput()
      // setErrors({
      //     ...errors,
      //     logo: "Allowed file formats: .jpg, .jpeg, .png"
      // });
      return;
    }

    // Check if file size exceeds the limit
    // if (logoFile.size > MAX_FILE_SIZE) {
    //   // setOpen(false)
    //   alert("Maximum file size exceeded (5MB)");
    //   // setErrors({ ...errors, logo: "Maximum file size exceeded (5MB)" });
    //   return;
    // }

         // Check if file extension is JFIF
  const isJFIF = logoFile.name.toLowerCase().endsWith(".jfif");
  if (isJFIF) {
    alert("Allowed file formats: .jpg, .jpeg, .png");
    resetFileInput();
    return;
  }


    const fileSizeInMB = logoFile.size / (1024 * 1024);
    const minSizeInMB = 0.001;
    const maxSizeInMB = 5; 

    if (fileSizeInMB < minSizeInMB || fileSizeInMB > maxSizeInMB) {

     
      alert(`File size should be between 1KB and 5MB`);
      resetFileInput()
     
      return;
    }


    // Proceed with normal logo upload process
    setCompanyData({ ...companyData, logo: logoFile });
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




  const [updateSuccess, setUpdateSuccess] = useState(false);


  const [buildingIdError, setBuildingIdError] = useState("");
  // console.log(buildingIdError, "buildingIdError");

//loader
const [open, setOpen] = React.useState(false);
// const handleClose = () => {
//   setOpen(false);
// };


  const handleSave = async (e) => {
   

    e.preventDefault();
    // console.log(companyData, "companydata")

    const newErrors = {};


    // if (!companyData.buildingId ===  {id:null, name:""}) {
    //   setBuildingIdError("Building Id is required");
    // } else {
    //   setBuildingIdError(""); // No error
    // }

    // Check for empty fields and validate their content
    if (!companyData.name) {
      newErrors.name = "Name is required";
    }
    // if (!companyData.logo) {
    //   newErrors.logo = "Company Logo is required";
    // }


    if (!companyData.address) {
      newErrors.address = "Address is required";
    }

    if (!companyData.state) {
      newErrors.state = "State is required";
    }

    if (!companyData.city) {
      newErrors.city = "City is required";
    }

    if (!companyData.pincode || !companyData.pincode.match(pincodeRegex)) {
      newErrors.pincode = "Pincode must be exactly 6 digits";
    }

    if (!companyData.email || !companyData.email.match(emailRegex)) {
      newErrors.email = "Invalid email address";
    }

    if (!companyData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!phoneNumberRegex.test(companyData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }

    if (!companyData.industry) {
      newErrors.industry = "Industry is required";
    }




    if (!companyData.userLimit) {
      newErrors.userLimit = "User Limit is required";
    }

    if (!companyData.buildingId.buildingId) {
      newErrors.buildingId = "Building Id is required";
    }

    if (!companyData.aboutUs) {
      newErrors.aboutUs = "About is required";
    }


    setErrors(newErrors);



    if (Object.keys(newErrors).length === 0) {
      setOpen(true); 

      try {
        const formData = new FormData();
        formData.append("name", companyData.name);


        if (companyData.logo) {
          // Only append the image if it exists
          formData.append('image', companyData.logo);

        }


        // if(companyData.buildingId.buildingId){
        //   formData.append("building.buildingId", companyData.buildingId.buildingId);

        // }


        //  formData.append('image', companyData.logo);

        formData.append("address", companyData.address);
        formData.append("state.id", companyData.state);
        formData.append("city.id", companyData.city);
        formData.append("pincode", companyData.pincode);
        formData.append("email", companyData.email);
        formData.append("phoneNumber", companyData.phoneNumber);
        formData.append("industry", companyData.industry);
        formData.append("userLimit", companyData.userLimit);
        formData.append("building.buildingId", companyData.buildingId.buildingId);
        formData.append("aboutUs", companyData.aboutUs);

        const editCompanyUrl = Config.baseUrl + Config.apiEndPoints.editEndPoint + "?id=" + companyId

        const res = await
        axios.post(
          // `http://192.168.12.54:8080/com/update/${companyId}`
          editCompanyUrl
          ,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )



        if (res.status === 200) {

          setOpen(false); 

          alert("Form submitted successfully");

     
          setLogoUpdated(false);
          navigate('/companyDetails');

      }

      // else if (res.status === 409) {

      //     alert(res.data.message);
      // } 




  } catch (error) {
    setOpen(false); 
      if (error.response && error.response.status === 409) {

          alert(error.response.data.message);
      }

      else if(error.response){
          alert(error.response.data.error);
      }

      console.log(error)
  }
         



       
      
    };

    // navigate('/companyDetails')


  }

  // const handleLogoChange = (event) => {

  //   const logoFile = event.target.files[0];
  //   setCompanyData({ ...companyData, logo: logoFile });
  // };


  //buildingId
  const [buildingOptions, setBuildingOptions] = useState([]);
  const [selectedBuildingId, setSelectedBuildingId] = useState('');

  // const buildingUrl = `http://192.168.12.54:8080/api/building/getAll`;
  // getBuildingEndPoint:"api/building/getAll",
  const buildingUrl = Config.baseUrl + Config.apiEndPoints.getBuildingEndPoint


  function fetchBuildingNames() {

    axios
      .get(buildingUrl)
      .then(response => {



        setBuildingOptions(response.data.data);
      })
      .catch((error) => {
        console.log(error, "Error fetching data");
      })



  }





  // const handleBuildingChange = (event) => {
  //     const selectedBuildingId= event.target.value;
  //     // console.log(selectedState)
  //     setSelectedBuildingId(selectedBuildingId);
  //     setValues({ ...values, buildingId: selectedBuildingId });



  // };
  const handleBuildingChange = (event, newValue) => {
    // console.log(newValue, "newval")

    if (newValue) {
      setSelectedBuildingId(newValue.id);
      setCompanyData({ ...companyData, buildingId: { id: newValue.id, buildingId: newValue.buildingId, name: newValue.name } });

      // setCompanyData({ ...companyData, buildingId: { buildingId: newValue.id, name: newValue.name } });
    } else {
      setSelectedBuildingId(null);
      setCompanyData({ ...companyData, buildingId: { id: null, buildingId: null, name: "" } });
    }

    // setCompanyData({
    //   ...companyData,
    //   building: newValue
    // });


  };




  function handleCancel() {
    navigate("/companyDetails");
  }

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexGrow: 1, p: 3, }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <form>
              <Box
                display="flex"
                flexDirection="column"
                maxWidth={800}
                margin="auto"
                marginTop={8}
                padding={3}
                borderRadius={2}
                gap={5}
                elevation={2}
                // align-alignItems={'center'}
                // justifyContent={"center"}
                boxShadow={"5px 5px 10px #ccc"}
              >
                <Typography sx={{ margin: "auto" }} fontSize={20} variant={"h1"}>
                  Edit Company Registration Form
                </Typography>
                <div
                  className="input"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    sx={{ width: "47%" }}
                    label="Company Name" required
                    placeholder="Company Name "
                    type="text"
                    name="name"
                    value={companyData.name}
                    // onChange={(e) =>
                    //   setCompanyData({ ...companyData, name: e.target.value })
                    // }


                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue.length <= 40 || inputValue === '') {
                          setCompanyData({ ...companyData, name: inputValue });
                          setErrors({ ...errors, name: '' }); // Clear any previous error message
                      } else {
                          setErrors({ ...errors, name: 'Company Name should be at most 40 characters' });
                      }
                  }}
                  // onBlur={() => {
                  //     if (!companyData.name.trim()) {
                  //         setErrors({ ...errors, name: 'Company Name is required' });
                  //     }
                  // }}




                  onBlur={() => {
                    let trimmedName = companyData.name.trim(); // Trim leading/trailing spaces
                    setCompanyData({ ...companyData, name: trimmedName });
                
                    if (!trimmedName) {
                      setErrors({ ...errors, name: 'Company Name is required' });
                    }
                  }}
                    error={Boolean(errors.name)}
                    helperText={errors.name}

                  // disabled={disabled}

                  ></TextField>

                  {/* <label></label>
            <TextField className="fileInput" type="file" label="Upload Company Logo" InputLabelProps={{ shrink: true }} id="logo" style={{ width: "47%", height: "50px", color: "blue" }} name="logo" value={companyData.logo} onChange={handleInputChange}></TextField> */}

                  {/* <div style={{ display: "flex", flexDirection: "column" }}>
               

                    <label className="custom-file-upload">
                      <input
                        type="file"
                        id="file-input"
                        onChange={handleLogoChange}
                        disabled={disabled}
                      />
                      Upload Company Logo
                    </label>
                  </div> */}


                  <div style={{ display: "flex", flexDirection: "column", gap: "" }} >
                    <label
                    >

                      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                        {(imageUrl || companyData.image) && (

                          <img
                            src={imageUrl || companyData.image}
                            // src={companyData.logo}
                            alt="Uploaded Logo"
                            style={{ width: '60px', height: '60px', objectFit: 'cover', marginLeft: '10px', cursor: 'pointer' }}
                            onClick={handleImageClick}
                          />

                        )}
                        <span className={`custom-file-upload${logoUpdated ? ' updated' : ''}`}>
                          <input type="file" accept="image/jpeg, image/jpg, image/png,image/jfif" id="file-input" required onChange={handleLogoChange} />
                          Upload Company Logo
                        </span>

                      </div>



                    </label>
                    <Typography variant="caption" color="black" sx={{ fontSize: "15px" }}>
                      Allowed file formats: .jpg, .jpeg, .png
                    </Typography>
                    <Typography
                        variant="caption"
                        color="black"
                        sx={{ fontSize: "15px" }}
                      >
                        Logo size (1Kb - 5Mb)
                      </Typography>


                  </div>
                </div>

                <TextField
                  label="Company Address"
                  type="text"
                  name="address"
                  value={companyData.address}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, address: e.target.value })
                  }
                  disabled={disabled}


                ></TextField>
                <div
                  className="input"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <div>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Select State
                        </InputLabel>
                        <Select
                          sx={{ width: "350px" }}
                          onChange={handleStateChange}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Select State"
                          name="state"
                          value={companyData.state}
                          disabled={disabled}
                        >
                          <MenuItem value="-" placeholder="Select State"></MenuItem>
                          {states.map((state) => (
                            <MenuItem key={state.id} value={state.id}>
                              {state.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </div>

                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Select City
                      </InputLabel>
                      <Select
                        sx={{ width: "350px" }}
                        onChange={handleCityChange}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select City"
                        name="city"
                        value={companyData.city}
                        disabled={disabled}
                      >
                        <MenuItem value="-" placeholder="Select City"></MenuItem>
                        {cities.map((city) => (
                          <MenuItem key={city.id} value={city.id}>
                            {city.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <TextField

                  label="Pincode"
                  placeholder="Pincode"
                  name="pincode"
                  value={companyData.pincode}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, pincode: e.target.value })
                  }
                  error={Boolean(errors.pincode)}
                  helperText={errors.pincode}

                  disabled={disabled}
                ></TextField>

                <div
                  className="input"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    sx={{
                      width: "47%",
                      backgroundColor: "",
                      color: "white",
                    }}

                    label="Email" required
                    placeholder=" Email"
                    type="email"
                    name="email"



                    value={companyData.email}

                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    // InputProps={{
                    //   readOnly: true,
                    // }}
                    // onChange={(e) =>
                    //   setCompanyData({ ...companyData, email: e.target.value })
                    // }

                    onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                    onBlur={() => {
                        if (!companyData.email.trim()) {
                            setErrors({ ...errors, email: "Email is required" });
                        } else if (!/\S+@\S+\.\S+/.test(companyData.email)) {
                            setErrors({ ...errors, email: "Invalid email address" });
                        } else {
                            setErrors({ ...errors, email: "" });
                        }
                    }}





               
                  ></TextField>
                  <TextField
                    sx={{ width: "47%" }}
                    label="Phone Number"
                    required
                    placeholder=" Phone Number "
                    inputProps={{ maxLength: 10 }}

                    name="phoneNumber"
                    value={companyData.phoneNumber}
                    // onChange={(e) => {
                    //   const input = e.target.value;
                    //   const numericValue = input.replace(/\D/g, ''); // Remove non-numeric characters
                    //   if (numericValue.length > 10) {
                    //     return;
                    //   }
                    //   setCompanyData({ ...companyData, phoneNumber: numericValue });
                    // }}


                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setCompanyData({ ...companyData, phoneNumber: value });
                  }}
                  onBlur={() => {
                      if (!companyData.phoneNumber.trim()) {
                          setErrors({ ...errors, phoneNumber: "Phone number is required" });
                      } else if (companyData.phoneNumber.length !== 10) {
                          setErrors({ ...errors, phoneNumber: "Phone number must be exactly 10 digits" });
                      } else {
                          setErrors({ ...errors, phoneNumber: "" });
                      }
                  }}




                    error={Boolean(errors.phoneNumber)}
                    helperText={errors.phoneNumber}

                  // disabled={disabled}
                  ></TextField>
                </div>


                <TextField
                  label="Industry"
                  placeholder="Industry"
                  type="text"
                  name="industry"
                  value={companyData.industry}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, industry: e.target.value })
                  }
                  error={Boolean(errors.industry)}
                  helperText={errors.industry}

                  disabled={disabled}
                ></TextField>

                <div
                  className="input"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >

                  <Autocomplete sx={{ width: "47%" }}
                    options={buildingOptions}
                    getOptionLabel={(option) => option !== null ? option.name : ""}
                    value={companyData.buildingId}
                    // onChange={(e, newVal)=> {}}
                    // inputValue={""}
                    // onInputChange={(e, newVal)=>{}}
                    onChange={(e, newVal) => handleBuildingChange(e, newVal)}

                    onBlur={() => {
                      if (!companyData.buildingId) {
                          setErrors({ ...errors, buildingId: "Building ID is required" });
                      } else {
                          setErrors({ ...errors, buildingId: "" });
                      }
                  }}



                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Building"
                        required
                        variant="outlined"
                        error={Boolean(errors.buildingId)}
                        helperText={errors.buildingId}
                      // helperText={buildingIdError} // Render helper text based on buildingIdError state
                      // error={Boolean(buildingIdError)} // Set error state based on buildingIdError
                      // Other props...
                      />
                    )}
                  />

                  <TextField
                    sx={{ width: "47%" }}
                    label="User Limit" required
                    placeholder="User Limit"

                    value={companyData.userLimit}


                    error={Boolean(errors.userLimit)}
                    helperText={errors.userLimit}

                    // onChange={(e) => {

                    //   const enteredValue = e.target.value;
                    //   const numericValue = parseInt(enteredValue);

                    //   if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 1000) {
                    //     setCompanyData({ ...companyData, userLimit: numericValue });
                    //   } else {

                    //     setCompanyData({ ...companyData, userLimit: '' });

                    //   }
                    // }}


                    onChange={(e) => {
                      const enteredValue = e.target.value;
                      const numericValue = parseInt(enteredValue);

                      if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 1000) {
                          setCompanyData({ ...companyData, userLimit: numericValue });
                      } else {
                          setCompanyData({ ...companyData, userLimit: '' });
                      }
                  }}
                  onBlur={() => {
                      if (!companyData.userLimit) {
                          setErrors({ ...errors, userLimit: "User Limit is required" });
                      } else {
                          setErrors({ ...errors, userLimit: "" });
                      }
                  }}
                  ></TextField>
                </div>

                <TextField
                  label="About"
                  placeholder="About"
                  type="text"
                  name="aboutUs"
                  value={companyData.aboutUs}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, aboutUs: e.target.value })
                  }
                  disabled={disabled}
                ></TextField>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "15px",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ width: 130, height: 50 }}
                    onClick={handleSave}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={handleCancel}
                    type="button"
                    variant="contained"
                    sx={{ width: 130, height: 50 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </form>
          </Grid>
        </Grid>

        <div>
      {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
      <Backdrop
        // style={{ zIndex: 1 }} 
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1}}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
      </Box>
    </>
  );
}