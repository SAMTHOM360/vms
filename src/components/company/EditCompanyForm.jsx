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

export default function EditCompanyForm() {
  const { companyId } = useParams();

  const navigate = useNavigate();

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
    buildingId: "",
  });
  console.log(companyData, "companydata");


  const [disabled, setDisabled] = useState(true);




  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  function fetchData() {

    const editCompanyUrl = Config.baseUrl + Config.apiEndPoints.editCompanyEndPoint + companyId
    axios
      // .get(`http://192.168.12.54:8080/com/get/${companyId}`, 

      .get(editCompanyUrl,
      
      {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((response) => {
        const company = response.data.data;
        console.log(response.data.data);


        setCompanyData({
          name: company.name,
          logo: null,
          // image:company.logo,
          address: company.address,
          state: company.state.id,
          city: company.city.id,
          pincode: company.pincode,
          email: company.email,
          phoneNumber: company.phoneNumber,
          industry: company.industry,
          aboutUs: company.aboutUs,
          userLimit: company.userLimit,
          buildingId: company.building.buildingId,
        });
        // console.log(company.city.id,"city");

        setSelectedState(company.state.id); // Set the initial selected state
        setSelectedCity(company.city.id);
        fetchCity(company.state.id);
        setSelectedBuildingId(company.building.buildingId);
        console.log(company.building.buildingId, "buildingId")
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchStates() {

    const stateUrl =Config.baseUrl + Config.apiEndPoints.statesEndPoint
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


    const cityUrl =Config.baseUrl + Config.apiEndPoints.cityEndPoint + selectedState
    axios
      // .get(`http://192.168.12.54:8080/sc/all/${selectedState}`)
      .get(cityUrl)

      .then((response) => {
        setCities(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function fetchCity(selectedState) {
    axios
      .get(`http://192.168.12.54:8080/sc/all/${selectedState}`)

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

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", companyData.name);
      //    formData.append('image', companyData.logo);

      formData.append("address", companyData.address);
      formData.append("state.id", companyData.state);
      formData.append("city.id", companyData.city);
      formData.append("pincode", companyData.pincode);
      formData.append("email", companyData.email);
      formData.append("phoneNumber", companyData.phoneNumber);
      formData.append("industry", companyData.industry);
      formData.append("userLimit", companyData.userLimit);
      formData.append("building.buildingId", companyData.buildingId);
      formData.append("aboutUs", companyData.aboutUs);
      if (companyData.logo) {
        formData.append("image", companyData.logo);
      }
      // if(!companyData.logo){
      //     console.log("image null")
      //     formData.append('image', null);

      // }
      // else{
      //     console.log("image")
      //      formData.append('logo', companyData.logo);
      //     //  formData.append('')

      // }
  const editCompanyUrl = Config.baseUrl +Config.apiEndPoints.editEndPoint + companyId
      await axios.post(
        // `http://192.168.12.54:8080/com/update/${companyId}`
editCompanyUrl
        ,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUpdateSuccess(true);

      toast.success("Company data updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // setCompanyData({

      //     name: "",
      //     logo: "",
      //     address: "",
      //     state: "",
      //     city: "",
      //     pincode: "",
      //     email: "",
      //     phoneNumber: "",
      //     industry: "",
      //     aboutUs: ""

      // })
    } catch (error) {
      console.error("Error updating company data:", error);
    }
  };

  const handleLogoChange = (event) => {

    const logoFile = event.target.files[0];
    setCompanyData({ ...companyData, logo: logoFile });
  };


  //buildingId
  const [buildingOptions, setBuildingOptions] = useState([]);
  const [selectedBuildingId, setSelectedBuildingId] = useState('');

  // const buildingUrl = `http://192.168.12.54:8080/api/building/getAll`;
    // getBuildingEndPoint:"api/building/getAll",
  const buildingUrl = Config.baseUrl +Config.apiEndPoints.getBuildingEndPoint
  

  function fetchBuildingNames() {

    axios
      .get(buildingUrl)
      .then(response => {
        console.log(response.data.data, "buildings")


        setBuildingOptions(response.data.data);
      })
      .catch((error) => {
        console.log(error, "Error fetching data");
      })



  }


  console.log(buildingOptions, "hhh")
  console.log(selectedBuildingId, "mickey")

  // const handleBuildingChange = (event) => {
  //     const selectedBuildingId= event.target.value;
  //     // console.log(selectedState)
  //     setSelectedBuildingId(selectedBuildingId);
  //     setValues({ ...values, buildingId: selectedBuildingId });



  // };
  const handleBuildingChange = (event, newValue) => {

    if (newValue) {
      setSelectedBuildingId(newValue.id);
      setCompanyData({ ...companyData, buildingId: newValue.id });
    } else {
      setSelectedBuildingId(null);
      setCompanyData({ ...companyData, buildingId: "" });
    }
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
                    label="Company Name"
                    placeholder="Company Name "
                    type="text"
                    name="name"
                    value={companyData.name}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, name: e.target.value })
                    }
                    disabled={disabled}

                  ></TextField>

                  {/* <label></label>
            <TextField className="fileInput" type="file" label="Upload Company Logo" InputLabelProps={{ shrink: true }} id="logo" style={{ width: "47%", height: "50px", color: "blue" }} name="logo" value={companyData.logo} onChange={handleInputChange}></TextField> */}

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {/* <label>Upload company Logo</label><br></br> */}

                    {/* <input type="file" value={companyData.logo} onChange={(e) => setCompanyData({ ...companyData, logo: e.target.value })} ></input> */}

                    <label className="custom-file-upload">
                      <input
                        type="file"
                        id="file-input"
                        onChange={handleLogoChange}
                        disabled={disabled}
                      />
                      Upload Company Logo
                    </label>
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

                    label="Email"
                    placeholder=" Email"
                    type="email"
                    name="email"
                    value={companyData.email}
                    // InputProps={{
                    //   readOnly: true,
                    // }}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, email: e.target.value })
                    }
                    disabled={disabled}
                  ></TextField>
                  <TextField
                    sx={{ width: "47%" }}
                    label="Phone Number"
                    placeholder=" Phone Number "
                    type="number"
                    name="phoneNumber"
                    value={companyData.phoneNumber}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, phoneNumber: e.target.value })
                    }
                    disabled={disabled}
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
                    sx={{ width: "47%" }}
                    label="Building Id"
                    placeholder="Building Id"
                    type="number"
                    value={companyData.buildingId}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, buildingId: e.target.value })
                    }
                    disabled={disabled}
                  ></TextField>


                  {/* <Autocomplete sx={{ width: "47%" }}
                    options={buildingOptions}
                    getOptionLabel={(option) => option !== null ? option.name : ""}
                    value={null}
                    // onChange={(e, newVal)=> {}}
                    inputValue={""}
                    // onInputChange={(e, newVal)=>{}}
                    onChange={handleBuildingChange}

                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Building"
                        variant="outlined"
                      />
                    )}
                  /> */}



                  <TextField
                    sx={{ width: "47%" }}
                    label="User Limit"
                    placeholder="User Limit"
                    type="number"
                    value={companyData.userLimit}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, userLimit: e.target.value })
                    }
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
      </Box>
    </>
  );
}