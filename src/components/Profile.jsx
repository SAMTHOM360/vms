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
import CircularProgress from "@mui/material/CircularProgress";
import Loader from "./Loader";

import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../routes/AuthContext";
import Config from "../Config/Config";

const Profile = () => {
  // sessionStorage.setItem('activeListItem', '/profile')
  const BASE_URL = "http://192.168.12.54:8080/api/user";
  // const BASE_URL = "http://192.168.12.58:8080/api/user";
  const IMG_RESPONSE_URL = "http://192.168.12.54:8080/vis/upload";
  // const IMG_RESPONSE_URL = "http://192.168.12.58:8080/vis/upload";

  const AuthToken = sessionStorage.getItem("token");
  // const adminId = localStorage.getItem("adminId");
  const adminId = sessionStorage.getItem("adminId");
  const loggedUserRole = sessionStorage.getItem("loggedUserRole");

  let urlAxiosInstance =
    Config.baseUrl + Config.apiEndPoints.profileAxiosInstance;

  const axiosInstance = axios.create({
    baseURL: urlAxiosInstance,
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

  const { setAutoStatusChange, setActiveListItem } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPresent, setIsPresent] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [uploadImgDialog, setUploadImgDialog] = useState(false);
  const [formattedCreatedOn, setFormattedCreatedOn] = useState("");
  const [tempImgLink, setTempImgLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [editBtnLoading, setEditBtnLoading] = useState(false);
  const [AddressBtnLoading, setAddressBtnLoading] = useState(false);
  const [companyBtnLoading, setCompanyBtnLoading] = useState(false);
  const [UploadImgBtnLoading, setUploadImgBtnLoading] = useState(false);
  const [isUserAllowed, setIsUserAllowed] = useState();
  const [UploadFromDeviceBtnLoading, setUploadFromDeviceBtnLoading] =
    useState(false);

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
    buildingId: "",
    isPermission: "",
  });
  const [editedBasicInfo, setEditedBasicInfo] = useState();
  const [editedAddressInfo, setEditedAddressInfo] = useState();
  const [editedCompanyInfo, setEditedCompanyInfo] = useState();
  useEffect(() => {
    setActiveListItem("/profile");
  }, [setActiveListItem]);

  useEffect(() => {
    fetchData();
  }, []);

useEffect(() => {
  if (loggedUserRole === "ADMIN") {
    setIsUserAllowed(true);
  } else {
    setIsUserAllowed(false);
  }
}, [loggedUserRole])

  const statusOnPayload = {
    id: adminId,
    isActive: true,
  };

  const statusOffPayload = {
    id: adminId,
    isActive: false,
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  async function fetchData() {
    let url = Config.baseUrl + Config.apiEndPoints.profileGetById;
    // debugger
    try {
      setLoading(true);
      const response = await axios.get(`${url}/${adminId}`);
      if (response.status === 200) {
        const apiData = response.data.data.data;
        // console.log(" profile data", apiData);

        const formatCreatedOn = apiData.createdOn.split(" ")[0] || "";
        setFormattedCreatedOn(formatCreatedOn);
        setIsPresent(apiData.isPresent);
        setFormData({
          id: apiData.id ? apiData.id || "" : "",
          firstName: apiData.firstName ? apiData.firstName || "" : "",
          lastName:apiData.lastName ? apiData.lastName || "" : "",
          phone: apiData.phone ? apiData.phone || "" : "",
          email: apiData.email ?  apiData.email || "" : "",
          dob: apiData.dob ?  apiData.dob || "" : "",
          gender: apiData.gender ?  apiData.gender || "" : "",
          govtId: apiData.govtId ?  apiData.govtId || "" : "",
          image: apiData.image ?  apiData.image || "" : "",
          departmentDto: {
            id: apiData.departmentDto ? apiData.departmentDto.id || "" : "",
            name: apiData.departmentDto ? apiData.departmentDto.name || "" : "",
          },
          state: {
            id: apiData.state ? apiData.state.id || "" : "",
            name: apiData.state ? apiData.state.name || "" : "",
          },
          city: {
            id: apiData.city ? apiData.city.id || "" : "",
            name: apiData.city ? apiData.city.name || "" : "",
          },
          role: {
            id: apiData.role ? apiData.role.id || "" : "",
            name: apiData.role ? apiData.role.name || "" : "",
          },
          pincode: apiData.pincode ?  apiData.pincode || "" : "",
          empCode: apiData.empCode ? apiData.empCode || "" : "",
          createdOn: apiData.createdOn ?  apiData.createdOn || "" : "",
          buildingId: apiData.departmentDto
            ? apiData.departmentDto.company.building
              ? apiData.departmentDto.company.building.buildingId || ""
              : ""
            : "",
          isPermission: apiData.isPermission ? apiData.isPermission || false : false,
        });

        if (apiData.govtId && apiData.govtId.length === 12) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            governmentIdType: "ADHAAR CARD" || "",
          }));
        } else if (apiData.govtId && apiData.govtId.length === 10) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            governmentIdType: "PAN CARD" || "",
          }));
        }
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      toast.error("Something went wrong !");
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  }
  const handlePresentOn = async () => {
    toast.dismiss()
    let url = Config.baseUrl + Config.apiEndPoints.profilePresent;
    try {
      setLoading(true);
      const response = await axios.post(`${url}`, statusOnPayload, { headers });

      if (response.status === 200) {
        toast.success("Status updated successfully");
        setIsPresent(true);
        setAutoStatusChange(true);
      }
    } catch (error) {
      toast.error("Something went wrong !");
      console.error("Catched Error: ", error);
    }
    setLoading(false);
  };

  const handlePresentOff = async () => {
    toast.dismiss()
    let url = Config.baseUrl + Config.apiEndPoints.profilePresent;

    try {
      setLoading(true);

      // const response = await axios.post(
      //   `${BASE_URL}/present`,
      //   statusOffPayload,
      //   { headers: headers }
      // );

      const response = await axios.post(`${url}`, statusOffPayload, {
        headers: headers,
      });
      if (response.status === 200) {
        toast.success("Status updated successfully");
        setIsPresent(false);
        setAutoStatusChange(false);
      }
    } catch (error) {
      toast.error("Something went wrong !");
      console.error("Catched Error: ", error);
    }
    setLoading(false);
  };

  const handleEditOn = () => {
    setIsEdit(true);
    setEditedBasicInfo({
      id: formData.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      role: {
        id: formData.role.id,
      },
      empCode: formData.empCode,
    });
  };

  const handleEditOff = () => {
    setIsEdit(false);
    setEditedBasicInfo({
      id: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      role: {
        id: "",
      },
      empCode: "",
    });
  };

  const handleAddressOn = () => {
    setIsAddress(true);
    setEditedAddressInfo({
      id: formData.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      role: {
        id: formData.role.id,
      },
      pincode: formData.pincode,
      empCode: formData.empCode,
    });
  };

  const handleAddressOff = () => {
    setIsAddress(false);
    setEditedAddressInfo({
      id: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      role: {
        id: "",
      },
      pincode: "",
      empCode: "",
    });
  };

  const handleCompanyOn = () => {
    setIsCompany(true);
    setEditedCompanyInfo({
      id: formData.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      role: {
        id: formData.role.id,
      },
      empCode: formData.empCode,
      isPermission: formData.isPermission,
    });
  };

  const handleCompanyOff = () => {
    setIsCompany(false);
    setEditedCompanyInfo({
      id: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      role: {
        id: "",
      },
      empCode: "",
      isPermission: "",
    });
  };

  const handleUploadImgDialogOpen = () => {
    setUploadImgDialog(true);
  };

  const handleUploadImgDialogClose = () => {
    const fileInput = document.getElementById("fileInputProfilePic");
    if (fileInput) {
      fileInput.value = "";
    }

    setTempImgLink("");
    setUploadImgDialog(false);
  };

  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.createElement("video");
      document.body.appendChild(videoElement);

      videoElement.srcObject = stream;
      await videoElement.play();

      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      const capturedImage = canvas.toDataURL("image/jpeg");

      videoElement.srcObject.getVideoTracks().forEach((track) => track.stop());
      document.body.removeChild(videoElement);
    } catch (error) {
      console.error("Error capturing image from camera:", error);
    }
  };

  const handleFileUpload = async (event) => {
    toast.dismiss()
    event.preventDefault();
    let url = Config.baseUrl + Config.apiEndPoints.profileConvertImg;
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        setUploadFromDeviceBtnLoading(true);
        // const response = await axios.post(`${IMG_RESPONSE_URL}`, formData, {
        //   headers: ImgHeaders,
        // });

        const response = await axios.post(`${url}`, formData, {
          headers: ImgHeaders,
        });
        const imgResponseApiData = response.data.data;
        setTempImgLink(imgResponseApiData);

        const fileInput = document.getElementById("fileInputProfilePic");
        if (fileInput) {
          fileInput.value = "";
        }
        setIsUpload(true);
      } catch (error) {
        toast.error("Something went wrong !");
        console.error("unable to send: ", error);
      } finally {
        setUploadFromDeviceBtnLoading(false);
      }
    }
  };

  const handleSubmitImgUpload = async () => {
    toast.dismiss()
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
      empCode: formData.empCode,
    };

    let url = Config.baseUrl + Config.apiEndPoints.profileAddUser;

    try {
      setUploadImgBtnLoading(true);
      // const response = await axios.post(`${BASE_URL}/adduser`, imgPayload, {
      //   headers: headers,
      // });

      const response = await axios.post(`${url}`, imgPayload, {
        headers: headers,
      });

      if (response.status === 200) {
        toast.success("Profile Picture updated successfully");

        const submitImgApiData = response;
        handleUploadImgDialogClose();
        setTempImgLink("");
        fetchData();
      }
    } catch (error) {
      toast.error("Something went wrong !");
      console.error("unable to submit image  ", error);
    } finally {
      setUploadImgBtnLoading(false);
    }
  };

  const handleBasicInfoUpdate = async () => {
    toast.dismiss()
    let url = Config.baseUrl + Config.apiEndPoints.profileAddUser;

    try {
      setEditBtnLoading(true);
      // const response = await axios.post(`${BASE_URL}/adduser`, editedBasicInfo, {
      //   headers: headers,
      // });
      const response = await axios.post(`${url}`, editedBasicInfo, {
        headers: headers,
      });

      if (response.status === 200) {
        toast.success("Basic info updated successfully");

        const submitApiData = response;
        handleUploadImgDialogClose();
        setTempImgLink("");
        setIsEdit(false);
        setEditedBasicInfo({
          id: "",
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          role: {
            id: "",
          },
          empCode: "",
        });
        fetchData();
      }
    } catch (error) {
      toast.error("Something went wrong !");
      console.error("unable to submit basic info  ", error);
    } finally {
      setEditBtnLoading(false);
    }
  };

  const HandleAddressInfoUpdate = async () => {
    toast.dismiss()
    let url = Config.baseUrl + Config.apiEndPoints.profileAddUser;

    try {
      setAddressBtnLoading(true);
      // const response = await axios.post(`${BASE_URL}/adduser`, editedAddressInfo, {
      //   headers: headers,
      // });

      const response = await axios.post(`${url}`, editedAddressInfo, {
        headers: headers,
      });

      if (response.status === 200) {
        toast.success("Address info updated successfully");

        const submitApiData = response;
        handleUploadImgDialogClose();
        setTempImgLink("");
        setIsAddress(false);
        setEditedAddressInfo({
          id: "",
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          role: {
            id: "",
          },
          pincode: "",
          empCode: "",
        });
        fetchData();
      }
    } catch (error) {
      toast.error("Something went wrong !");
      console.error("unable to submit address info  ", error);
    } finally {
      setAddressBtnLoading(false);
    }
  };

  const HandleCompanyInfoUpdate = async () => {
    toast.dismiss()
    let url = Config.baseUrl + Config.apiEndPoints.profileAddUser;

    try {
      setCompanyBtnLoading(true);
      // const response = await axios.post(`${BASE_URL}/adduser`, editedAddressInfo, {
      //   headers: headers,
      // });

      const response = await axios.post(`${url}`, editedCompanyInfo, {
        headers: headers,
      });

      if (response.status === 200) {
        toast.success("Company info updated successfully");

        const submitApiData = response;
        handleUploadImgDialogClose();
        setTempImgLink("");
        setIsCompany(false);
        setEditedCompanyInfo({
          id: "",
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          role: {
            id: "",
          },
          empCode: "",
          isPermission: "",
        });
        fetchData();
      }
    } catch (error) {
      toast.error("Something went wrong !");
      console.error("unable to submit company info  ", error);
    } finally {
      setCompanyBtnLoading(false);
    }
  };

  // console.log('basic data', editedBasicInfo)
  // console.log('address data', editedAddressInfo)
  // console.log("company data", editedCompanyInfo);

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
                    <img
                      src={formData.image}
                      alt="No DP"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Avatar>
                  <IconButton
                    color="primary"
                    onClick={handleUploadImgDialogOpen}
                    sx={{ position: "absolute", bottom: -5, right: -4 }}
                  >
                    <CameraAltIcon
                      color="primary"
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
                      value={
                        isEdit ? editedBasicInfo.firstName : formData.firstName
                      }
                      // inputProps={{ maxLength: 26 }}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        maxLength: 26,
                        onInput: (event) => {
                          if (isEdit) {
                            let value = event.target.value;

                            // Remove characters other than lowercase, uppercase, and spaces
                            value = value.replace(/[^a-zA-Z\s]/g, "");

                            // Replace consecutive spaces with a single space
                            value = value.replace(/\s{2,}/g, " ");

                            // Ensure the length does not exceed maxLength
                            if (value.length > 26) {
                              value = value.slice(0, 26);
                            }

                            setEditedBasicInfo({
                              ...editedBasicInfo,
                              firstName: value,
                            });
                          }
                        },
                      }}
                      // onChange={(e) =>
                      //   setEditedBasicInfo({ ...editedBasicInfo, firstName: e.target.value })
                      // }
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
                      value={
                        isEdit ? editedBasicInfo.lastName : formData.lastName
                      }
                      // inputProps={{ maxLength: 26 }}
                      inputProps={{
                        maxLength: 26,
                        onInput: (event) => {
                          if (isEdit) {
                            let value = event.target.value;

                            // Remove characters other than lowercase, uppercase, and spaces
                            value = value.replace(/[^a-zA-Z\s]/g, "");

                            // Replace consecutive spaces with a single space
                            value = value.replace(/\s{2,}/g, " ");

                            // Ensure the length does not exceed maxLength
                            if (value.length > 26) {
                              value = value.slice(0, 26);
                            }

                            setEditedBasicInfo({
                              ...editedBasicInfo,
                              lastName: value,
                            });
                          }
                        },
                      }}
                      InputLabelProps={{ shrink: true }}
                      // onChange={(e) =>
                      //   setEditedBasicInfo({ ...editedBasicInfo, lastName: e.target.value })
                      // }
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
                        maxLength: 10,
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
                        disabled={!isEdit || editBtnLoading}
                        sx={{ height: "3em", fontSize: "10px" }}
                        onClick={handleBasicInfoUpdate}
                        // disabled={btnLoading}
                      >
                        {editBtnLoading ? (
                          <CircularProgress size="2em" />
                        ) : (
                          "Save"
                        )}
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
                      value={
                        isAddress ? editedAddressInfo.pincode : formData.pincode
                      }
                      // onChange={(e) =>
                      //   setEditedAddressInfo({ ...editedAddressInfo, pincode: e.target.value })
                      // }
                      inputProps={{
                        pattern: "^[0-9]*",
                        maxLength: 6,
                        onInput: (event) => {
                          if (isAddress) {
                            let value = event.target.value;

                            // Remove non-numeric characters
                            value = value.replace(/\D/g, "");

                            // Ensure the length does not exceed 6
                            if (value.length > 6) {
                              value = value.slice(0, 6);
                            }

                            setEditedAddressInfo({
                              ...editedAddressInfo,
                              pincode: value,
                            });
                          }
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
                        disabled={!isAddress || AddressBtnLoading}
                        sx={{ height: "3em", fontSize: "10px" }}
                        onClick={HandleAddressInfoUpdate}
                      >
                        {AddressBtnLoading ? (
                          <CircularProgress size="2em" />
                        ) : (
                          "Save"
                        )}
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

                      {isUserAllowed ? (
                        isCompany ? (
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ height: "3em", fontSize: "10px" }}
                            onClick={handleCompanyOff}
                          >
                            Cancel
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ height: "3em", fontSize: "10px" }}
                            onClick={handleCompanyOn}
                          >
                            Edit
                          </Button>
                        )
                      ) : null}
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      size="small"
                      sx={{ width: "100%", mt: "10px" }}
                      label="Joined On"
                      name="joinedOn"
                      disabled
                      value={formattedCreatedOn}
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
                      InputLabelProps={{ shrink: true }}
                      // onChange={handleChange}
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
                      InputLabelProps={{ shrink: true }}
                      // onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      size="small"
                      sx={{ width: "100%", mt: "10px" }}
                      label="Building Id"
                      name="buildingId"
                      disabled
                      value={formData.buildingId}
                      InputLabelProps={{ shrink: true }}
                      // onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    {isCompany ? (
                      <FormControl
                        sx={{ width: "100%", mt: "10px" }}
                        size="small"
                        fullWidth
                      >
                        <InputLabel id="approval-label">
                          Can Receptionist Approve/Reject meets?
                        </InputLabel>
                        <Select
                          labelId="approval-label"
                          name="isPermission"
                          value={
                            isCompany
                              ? editedCompanyInfo.isPermission
                              : formData.isPermission
                          }
                          label="Can Receptionist Approve/Reject meets?"
                          onChange={(e) => {
                            // setIsReceptAllowed(e.target.value);
                            setEditedCompanyInfo({
                              ...editedCompanyInfo,
                              isPermission: e.target.value,
                            });
                          }}
                        >
                          <MenuItem value="true">YES</MenuItem>
                          <MenuItem value="false">NO</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      <TextField
                        size="small"
                        sx={{ width: "100%", mt: "10px" }}
                        label="Can Receptionist Approve/Reject meets?"
                        name="buildingId"
                        disabled
                        value={formData.isPermission ? "YES" : "NO"}
                        InputLabelProps={{ shrink: true }}
                        // onChange={handleChange}
                      />
                    )}
                    {/* <TextField
                      size="small"
                      sx={{ width: "100%", mt: "10px" }}
                      label="Can Receptionist Approve/Reject meets?"
                      name="buildingId"
                      disabled
                      value={formData.isPermission ? "YES" : "NO"}
                      InputLabelProps={{ shrink: true }}
                      // onChange={handleChange}
                    /> */}
                    {/* 
                    <FormControl
                      sx={{ width: "100%", mt: "1em" }}
                      size="small"
                      fullWidth
                    >
                      <InputLabel id="approval-label">
                      Can Receptionist Approve/Reject meets?
                      </InputLabel>
                      <Select
                        labelId="approval-label"
                        name="isPermission"
                        value={editedItem.isPermission}
                        label="Can Receptionist Approve/Reject meets?"
                        onChange={(e) => {
                          setIsReceptAllowed(e.target.value);
                          setEditedItem({
                            ...editedItem,
                            isPermission: e.target.value,
                          });
                        }}
                      >
                     
                        <MenuItem value="true">YES</MenuItem>
                        <MenuItem value="false">NO</MenuItem>
                      </Select>
                    </FormControl> */}
                  </Grid>

                  {isUserAllowed ?

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
    disabled={!isCompany || companyBtnLoading}
    sx={{ height: "3em", fontSize: "10px" }}
    onClick={HandleCompanyInfoUpdate}
    // disabled={btnLoading}
  >
    {companyBtnLoading ? (
      <CircularProgress size="2em" />
    ) : (
      "Save"
    )}
  </Button>
</Box>
</Grid>

:

null
                  
                }



                  <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Dialog
          open={uploadImgDialog}
          onClose={handleUploadImgDialogClose}
          PaperProps={{
            sx: {
              width: "100%",
              maxWidth: "520px!important",
              mt: "5em",
              borderRadius: "15px",
              ml: "6em",
            },
          }}
        >
          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "250px",
                height: "250px",
                bgcolor: "#EDEDED",
                color: "#848484",
                mb: "2em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5px",
              }}
            >
              {tempImgLink ? (
                <img
                  src={tempImgLink}
                  alt="No DP"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                "Choose an image"
              )}
            </Box>

            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              {/* <Button variant="outlined" onClick={handleCapture}>
              Capture from Camera
            </Button> */}
              <Button
                variant="contained"
                component="label"
                onChange={handleFileUpload}
                disabled={UploadFromDeviceBtnLoading}
              >
                {UploadFromDeviceBtnLoading ? (
                  <CircularProgress size="2em" />
                ) : (
                  "Upload from Device"
                )}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="fileInputProfilePic"
                  hidden
                  // onChange={handleFileUpload}
                />
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
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
                disabled={!isUpload || UploadImgBtnLoading}
              >
                {UploadImgBtnLoading ? <CircularProgress size="2em" /> : "SAVE"}
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Profile;
