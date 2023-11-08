import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../global/Navbar";
import Sidebar from "../global/Sidebar";
import Grid from "@mui/material/Grid";
import axios from "axios";
import {
  Paper,
  Box,
  Chip,
  Typography,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  Button,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import Header from "./Header";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Label } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

import CameraAltIcon from "@mui/icons-material/CameraAlt";

const Profile = () => {
  const BASE_URL = "http://192.168.12.54:8080/api/user";
  // const BASE_URL = "http://192.168.12.58:8080/api/user";
  const IMG_RESPONSE_URL = "http://192.168.12.54:8080/vis/upload";
  // const IMG_RESPONSE_URL = "http://192.168.12.58:8080/vis/upload";

  const AuthToken = sessionStorage.getItem("token");
  const adminId = localStorage.getItem("adminId");

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AuthToken}`,
    },
  });

  const headers = {
    Authorization: `Bearer ${AuthToken}`,
  };

  const ImgHeaders = {
    Authorization: `Bearer ${AuthToken}`,
    "Content-Type": "multipart/form-data",
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPresent, setIsPresent] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [uploadImgDialog, setUploadImgDialog] = useState(false);
  const [formattedCreatedOn, setFormattedCreatedOn] = useState("");
  const [tempImgLink, setTempImgLink] = useState('')

  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    governmentIdType: "",
    govtId: "",
    image: "",
    departmentDto: {
      id: "",
      name: "",
    },
    state: {
      id: "",
      name: "",
    },
    role: {
      id: "",
      name: "",
    },
    city: {
      id: "",
      name: "",
    },
    pincode: "",
    empCode: "",
    createdOn: "",
  });

  // let governmentIdType
  // if(formData.govtId === 12){
  //   governmentIdType = "ADHAAR CARD"
  // } else if(formData.govtId === 10) {
  //   governmentIdType=
  // }

  // let governmentIdType = "";
  // if (formData.govtId.length === 12) {
  //   governmentIdType = "ADHAAR CARD";
  // } else if (formData.govtId.length === 10) {
  //   governmentIdType = "PAN CARD";
  // }

  const [statusOnPayload, setStatusOnPayload] = useState({
    id: adminId,
    isActive: true,
  });

  const [statusOffPayload, setStatusOffPayload] = useState({
    id: adminId,
    isActive: false,
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  async function fetchData() {
    try {
      const response = await axios.get(`${BASE_URL}/getbyid/${adminId}`);
      if (response.status === 200) {
        const apiData = response.data.data.data;

        const formatCreatedOn = apiData.createdOn.split(" ")[0] || "";
        setFormattedCreatedOn(formatCreatedOn);
        setIsPresent(apiData.isPresent)
        // const apiData = response;
        console.log("apidata", apiData);
        setFormData({
          id: apiData.id || "",
          firstName: apiData.firstName || "",
          lastName: apiData.lastName || "",
          phone: apiData.phone || "",
          email: apiData.email || "",
          dob: apiData.dob || "",
          gender: apiData.gender || "",
          govtId: apiData.govtId || "",
          image: apiData.image || "",
          departmentDto: {
            id: apiData.departmentDto.id || "",
            name: apiData.departmentDto.name || "",
          },
          state: {
            id: apiData.state.id || "",
            name: apiData.state.name || "",
          },
          city: {
            id: apiData.city.id || "",
            name: apiData.city.name || "",
          },
          role: {
            id: apiData.role.id || "",
            name: apiData.role.name || "",
          },
          pincode: apiData.pincode || "",
          empCode: apiData.empCode || "",
          createdOn: apiData.createdOn || "",
        });

        if (apiData.govtId.length === 12) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            governmentIdType: "ADHAAR CARD" || "", // Make sure imgResponseApiData is not undefined
          }));
        } else if (apiData.govtId.length === 10) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            governmentIdType: "PAN CARD" || "", // Make sure imgResponseApiData is not undefined
          }));
        }
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  console.log("FORM DATA", formData);

  const handlePresentOn = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/present`,
        statusOnPayload,
        { headers }
      );
      const statusApiData = response;

      console.log("statusApiData", statusApiData);
      setIsPresent(true);
    } catch (error) {
      console.error("Catched Error: ", error);
    }
  };

  const handlePresentOff = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/present`,
        statusOffPayload,
        { headers }
      );
      const statusApiData = response;

      console.log("statusApiData", statusApiData);
      setIsPresent(false);
    } catch (error) {
      console.error("Catched Error: ", error);
    }
  };

  const handleEditOn = () => {
    setIsEdit(true);
  };

  const handleEditOff = () => {
    setIsEdit(false);
  };

  const handleAddressOn = () => {
    setIsAddress(true);
  };

  const handleAddressOff = () => {
    setIsAddress(false);
  };

  const handleUploadImgDialogOpen = () => {
    setUploadImgDialog(true);
  };

  const handleUploadImgDialogClose = () => {
    setUploadImgDialog(false);
  };

  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.createElement("video");
      document.body.appendChild(videoElement);

      videoElement.srcObject = stream;
      await videoElement.play();

      // Capture a frame from the video
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      const capturedImage = canvas.toDataURL("image/jpeg");

      console.log("captured Image", capturedImage);

      // Close the camera stream and remove the video element
      videoElement.srcObject.getVideoTracks().forEach((track) => track.stop());
      document.body.removeChild(videoElement);

      // Handle the captured image (e.g., display or upload it)
    } catch (error) {
      console.error("Error capturing image from camera:", error);
    }
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.post(`${IMG_RESPONSE_URL}`, formData, {
          headers: ImgHeaders,
        });
        const imgResponseApiData = response.data.data;
        setTempImgLink(imgResponseApiData)
        console.log("imgResponseApiData", imgResponseApiData);

        const fileInput = document.getElementById("fileInputProfilePic");
        if (fileInput) {
          fileInput.value = "";
        }
        setIsUpload(true);
      } catch (error) {
        console.error("unable to send: ", error);
      }
    }
  };

  const handleSubmitImgUpload = async () => {
    const imgPayload = {
      id: formData.id,
      image: tempImgLink,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      role: {
        id: formData.role.id,
      },
    };

    try {
      const response = await axios.post(`${BASE_URL}/adduser`, imgPayload, {
        headers: headers,
      });

      const submitImgApiData = response;
      console.log("submitImgApiData", submitImgApiData);
      handleUploadImgDialogClose();
      setTempImgLink('')
      fetchData()
    } catch (error) {
      console.error("unable to submit image  ", error);
    }
  };

  // async function handleStatusUpdate() {

  //   try{
  //     const response = await axios.post(`${BASE_URL}/present`, statusPayload, {headers})
  //     const statusApiData = response

  //     console.log("statusApiData", statusApiData)
  //   } catch(error) {
  //     console.error("Catched Error: ", error)
  //   }
  // }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Box sx={{ display: "flex", flexGrow: 1, p: 3 }}>
        <Sidebar open={sidebarOpen} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                // width:'100%',
                height: "4.5em",
                mt: "3em",
                mb: "0.5em",
              }}
            >
              <Header title="Profile" subtitle="This is profile segment" />
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              elevation={5}
              sx={{
                // width: '100%',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "4.5em",
                  // borderRadius: "5px",
                  marginBottom: "15px",
                  // color: "white",
                  // bgcolor: "#2D3E5F",
                  display: "flex",
                  alignItems: "center",
                  paddingX: "1em",
                  mt: "1em",
                  mb: "3em",
                }}
              >
                <Box
                  sx={{
                    width: "85px",
                    height: "100%",
                    bgcolor: "",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Avatar sx={{ width: "70px", height: "70px" }}>
                    {/* <ImageIcon /> */}
                    <img src={formData.image} alt="No DP" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </Avatar>
                  <IconButton
                    color="primary"
                    onClick={handleUploadImgDialogOpen}
                    sx={{ position: "absolute", bottom: -5, right: -4 }}
                  >
                    <CameraAltIcon color="primary" 
                    // sx={{ color: "#FF5733" }} 
                    />
                  </IconButton>
                </Box>
                <Box sx={{ width: "60%", ml: "0.5em" }}>
                  <Typography
                    sx={{ fontSize: "19px", fontWeight: "550", bgcolor: "" }}
                  >
                    {formData.firstName} {formData.lastName}
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      sx={{ color: "#959697", fontSize: "17px", bgcolor: "" }}
                    >
                      {formData.departmentDto.name}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                    width: "35%",
                    bgcolor: "",
                  }}
                >
                  {/* <FormControlLabel
                    labelPlacement="start"
                    control={
                      <Switch
                        checked={isPresent}
                        onChange={handleToggle}
                        // color={isPresent ? "success" : "error"}
                        style={{ color: isPresent ? "green" : "red" }}
                      />
                    }
                    label={
                      <Typography variant="body2" component="div">
                        {isPresent ? "Switch to Absent" : "Switch to Present"}
                      </Typography>
                    }
                  /> */}

                  {isPresent ? (
                    <>
                      <p>Switch to Absent</p>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#21CD10",
                          color: "#074800",
                          fontWeight: "550",
                          width: "7em",
                          marginLeft: "1em",
                        }}
                        onClick={handlePresentOff}
                      >
                        Present
                      </Button>
                    </>
                  ) : (
                    <>
                      <Typography>Switch to Present</Typography>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#FF4646",
                          color: "#550000",
                          fontWeight: "550",
                          width: "7em",
                          marginLeft: "1em",
                        }}
                        onClick={handlePresentOn}
                      >
                        Absent
                      </Button>
                    </>
                  )}
                </Box>
              </Box>

              <hr
                style={{
                  width: "90%",
                  borderTop: "2px solid #EBEBEB",
                  marginBottom: "3em",
                }}
              />

              <Box
                sx={{
                  width: "100%",
                  // height: "4.5em",
                  // borderRadius: "5px",
                  marginBottom: "15px",
                  // color: "white",
                  // bgcolor: "#2D3E5F",
                  display: "flex",
                  alignItems: "center",
                  paddingX: "1em",
                  mb: "3em",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        mb: "1.5em",
                      }}
                    >
                      <Typography sx={{ fontSize: "19px", fontWeight: "550" }}>
                        Basic Info
                      </Typography>

                      {isEdit ? (
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ height: "3em", fontSize: "10px" }}
                          onClick={handleEditOff}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ height: "3em", fontSize: "10px" }}
                          onClick={handleEditOn}
                        >
                          Edit
                        </Button>
                      )}
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      size="small"
                      sx={{ width: "100%", mt: "10px" }}
                      label="First Name"
                      name="firstName"
                      disabled={!isEdit}
                      value={formData.firstName}
                      inputProps={{ maxLength: 26 }}
                      InputLabelProps={{ shrink: true }}
                      // onChange={handleChange}
                      required={isEdit}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      label="Last Name"
                      name="lastName"
                      size="small"
                      disabled={!isEdit}
                      value={formData.lastName}
                      inputProps={{ maxLength: 26 }}
                      InputLabelProps={{ shrink: true }}
                      // onChange={handleChange}
                      required={isEdit}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      label="Phone"
                      name="phone"
                      disabled
                      size="small"
                      value={formData.phone}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        pattern: "^[0-9]*",
                        onInput: (event) => {
                          let value = event.target.value;
                          value = value.replace(/\D/g, "");
                          if (value.length > 10) {
                            value = value.slice(0, 10);
                          }
                          // setFormData({
                          //   ...formData,
                          //   phone: value,
                          // });
                        },
                      }}
                      required={isEdit}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      label="Email"
                      name="email"
                      type="email"
                      size="small"
                      disabled
                      value={formData.email}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ maxLength: 126 }}
                      // onChange={handleChange}
                      required={isEdit}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ width: "100%", mt: "10px" }}
                        label="Date of Birth"
                        format="YYYY/MM/DD"
                        disabled={!isEdit}
                        // shouldDisableDate={shouldDisableDate}
                        // onChange={handleDateChange}
                        slotProps={{
                          // field: { clearable: true, onClear: () => setCleared(true) },
                          textField: { size: "small" },
                        }}
                      />
                    </LocalizationProvider> */}

                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      label="Date of Birth"
                      name="dob"
                      size="small"
                      disabled
                      value={formData.dob}
                      inputProps={{ maxLength: 26 }}
                      InputLabelProps={{ shrink: true }}
                      // onChange={handleChange}
                      required={isEdit}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    {/* <FormControl sx={{ mt: "10px" }} fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Gender
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.gender}
                        label="Gender"
                        size="small"
                        disabled={!isEdit}
                        // onChange={handleChangeGender}
                        required
                      >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Others"}>Others</MenuItem>
                      </Select>
                    </FormControl> */}

                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      label="Gender"
                      name="gender"
                      size="small"
                      disabled
                      value={formData.gender}
                      inputProps={{ maxLength: 26 }}
                      InputLabelProps={{ shrink: true }}
                      // onChange={handleChange}
                      required={isEdit}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      // select
                      label="Government ID Type"
                      size="small"
                      disabled
                      value={formData.governmentIdType}
                      InputLabelProps={{ shrink: true }}
                      // onChange={handleChangeGovernmentIdType}
                      fullWidth
                      required={isEdit}
                    >
                      <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
                      <MenuItem value="PAN Card">PAN Card</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      label="Government ID"
                      size="small"
                      disabled
                      value={formData.govtId}
                      InputLabelProps={{ shrink: true }}
                      // onChange={handleChangeGovernmentId}
                      inputProps={
                        {
                          // maxLength: governmentIdType === "Aadhar Card" ? 12 : 10,
                        }
                      }
                      fullWidth
                      required={isEdit}
                      // error={Boolean(error)}
                      // helperText={error || warning}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: "1em",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        disabled={!isEdit}
                        sx={{ height: "3em", fontSize: "10px" }}
                        onClick={handleEditOff}
                      >
                        save
                      </Button>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
                </Grid>
              </Box>

              <hr
                style={{
                  width: "90%",
                  borderTop: "2px solid #EBEBEB",
                  marginBottom: "3em",
                }}
              />

              <Box
                sx={{
                  width: "100%",
                  // height: "4.5em",
                  // borderRadius: "5px",
                  marginBottom: "15px",
                  // color: "white",
                  // bgcolor: "#2D3E5F",
                  display: "flex",
                  alignItems: "center",
                  paddingX: "1em",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        mb: "1.5em",
                      }}
                    >
                      <Typography sx={{ fontSize: "19px", fontWeight: "550" }}>
                        Address Info
                      </Typography>

                      {isAddress ? (
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ height: "3em", fontSize: "10px" }}
                          onClick={handleAddressOff}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ height: "3em", fontSize: "10px" }}
                          onClick={handleAddressOn}
                        >
                          Edit
                        </Button>
                      )}
                    </Box>
                  </Grid>

                  {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      size="small"
                      sx={{ width: "100%", mt: "10px" }}
                      label="First Name"
                      name="firstName"
                      disabled={!isAddress}
                      // value={formData.firstName}
                      inputProps={{ maxLength: 26 }}
                      // onChange={handleChange}
                      required
                    />
                  </Grid> */}

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    {/* <FormControl sx={{ width: "100%", mt: "10px" }} required>
                      <InputLabel htmlFor="state">State</InputLabel>
                      <Select
                        label="State"
                        name="state"
                        size="small"
                        disabled
                        // value={formData.state.id || ''}
                        // onChange={handleChange}
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
                    </FormControl> */}

                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      label="State"
                      name="state"
                      size="small"
                      disabled
                      value={formData.state.name}
                      InputLabelProps={{ shrink: true }}
                      // onChange={handleChange}
                      required={isAddress}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    {/* <FormControl sx={{ width: "100%", mt: "10px" }} required>
                      <InputLabel htmlFor="city">City</InputLabel>
                      <Select
                        label="City"
                        name="city"
                        size="small"
                        disabled
                        // value={formData.city.id || ''}
                        // onChange={handleChange}
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
                    </FormControl> */}

                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      label="City"
                      name="city"
                      size="small"
                      disabled
                      value={formData.city.name}
                      InputLabelProps={{ shrink: true }}
                      // onChange={handleChange}
                      required={isAddress}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      label="PIN Code"
                      name="pincode"
                      size="small"
                      disabled={!isAddress}
                      value={formData.pincode}
                      inputProps={{
                        pattern: "^[0-9]*",
                        onInput: (event) => {
                          let value = event.target.value;
                          value = value.replace(/\D/g, "");
                          if (value.length > 6) {
                            value = value.slice(0, 6);
                          }
                          // setFormData({
                          //   ...formData,
                          //   pincode: value,
                          // });
                        },
                      }}
                      InputLabelProps={{ shrink: true }}
                      required={isAddress}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: "1em",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        disabled={!isAddress}
                        sx={{ height: "3em", fontSize: "10px" }}
                        onClick={handleAddressOff}
                      >
                        save
                      </Button>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
                </Grid>
              </Box>

              <hr
                style={{
                  width: "90%",
                  borderTop: "2px solid #EBEBEB",
                  marginBottom: "3em",
                }}
              />

              <Box
                sx={{
                  width: "100%",
                  // height: "4.5em",
                  // borderRadius: "5px",
                  marginBottom: "15px",
                  // color: "white",
                  // bgcolor: "#2D3E5F",
                  display: "flex",
                  alignItems: "center",
                  paddingX: "1em",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        mb: "1.5em",
                      }}
                    >
                      <Typography sx={{ fontSize: "19px", fontWeight: "550" }}>
                        Company Info
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      size="small"
                      sx={{ width: "100%", mt: "10px" }}
                      label="Joined On"
                      name="joinedOn"
                      disabled
                      // value={formattedCreatedOn}
                      InputLabelProps={{ shrink: true }}
                      // onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      size="small"
                      sx={{ width: "100%", mt: "10px" }}
                      label="Employee Id"
                      name="empId"
                      disabled
                      value={formData.empCode}
                      InputLabelProps={{ shrink: true }} // onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      size="small"
                      sx={{ width: "100%", mt: "10px" }}
                      label="Department"
                      name="dept"
                      disabled
                      value={formData.departmentDto.name}
                      InputLabelProps={{ shrink: true }} // onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Dialog open={uploadImgDialog} onClose={handleUploadImgDialogClose} PaperProps={{ sx: { width: "100%", maxWidth: "520px!important", mt:'5em', borderRadius:'15px',ml:'6em'},}}>
          <DialogContent sx={{display:'flex',justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
            <Box sx={{width:'150px', height:'150px', bgcolor:'cyan', mb:'2em', display:'flex', alignItems:'center', justifyContent:'center'}}>
              {tempImgLink? 
            <img src={tempImgLink} alt="No DP" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> 
            :
            "No image is chosen"  
            }
             
            </Box>

            <Box sx={{width:'100%', display:'flex', justifyContent:'center'}}>
            {/* <Button variant="outlined" onClick={handleCapture}>
              Capture from Camera
            </Button> */}
            <Button
              variant="contained"
              component="label"
              onChange={handleFileUpload}
            >
              Upload from Device
              <input
                type="file"
                accept="image/*" // Specify that only image files are allowed
                style={{ display: "none" }} // Hide the input element
                id="fileInputProfilePic"
                hidden
                // onChange={handleFileUpload}
              />
            </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Box sx={{width:'100%', display:'flex', justifyContent:'space-between'}}>
            <Button
              variant="contained"
              onClick={handleUploadImgDialogClose}
              color="secondary"
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmitImgUpload}
              color="primary"
              disabled={!isUpload}
            >
              submit
            </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Profile;
