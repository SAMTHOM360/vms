import React from "react";
import { useState } from "react";
import Navbar from "../global/Navbar";
import Sidebar from "../global/Sidebar";
import Grid from "@mui/material/Grid";
import {
  Paper,
  Box,
  Chip,
  Typography,
  Avatar,
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

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPresent, setIsPresent] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isAddress, setIsAddress] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePresentOn = () => {
    setIsPresent(true);
  };

  const handlePresentOff = () => {
    setIsPresent(false);
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
                  }}
                >
                  <Avatar sx={{ width: "70px", height: "70px" }}>
                    {/* <ImageIcon /> */}
                    <img src="null" alt="No DP" />
                  </Avatar>
                </Box>
                <Box sx={{ width: "60%", ml: "0.5em" }}>
                  <Typography
                    sx={{ fontSize: "19px", fontWeight: "550", bgcolor: "" }}
                  >
                    SAMTHOM360
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      sx={{ color: "#959697", fontSize: "15px", bgcolor: "" }}
                    >
                      05 NOV | 7.00 PM - 8.00 PM
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

                  {isPresent ?
                    <>
                                        <p>Switch to Absent</p>
                    <Button
                    variant="contained"
                    style={{ backgroundColor: '#21CD10', color: '#074800', fontWeight:'550', width:'7em', marginLeft:'1em'  }}
                    onClick={handlePresentOff}
                    
                  >
                    Present
                  </Button>
                    </>
                                      :
                                      <>
                                          <Typography>Switch to Present</Typography>
                                          <Button
                                          variant="contained"
                                          style={{ backgroundColor: '#FF4646', color: '#550000', fontWeight:'550', width:'7em', marginLeft:'1em'   }}
                                          onClick={handlePresentOn}
                                          
                                        >
                                          Absent
                                        </Button>
                                      </>}
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

                  <Grid item sx={12} sm={12} md={6} lg={6}>
                    <TextField
                      size="small"
                      sx={{ width: "100%", mt: "10px" }}
                      label="First Name"
                      name="firstName"
                      disabled={!isEdit}
                      // value={formData.firstName}
                      inputProps={{ maxLength: 26 }}
                      // onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item sx={12} sm={12} md={6} lg={6}>
                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      label="Last Name"
                      name="lastName"
                      size="small"
                      disabled={!isEdit}
                      // value={formData.lastName}
                      inputProps={{ maxLength: 26 }}
                      // onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item sx={12} sm={12} md={6} lg={6}>
                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      label="Phone"
                      name="phone"
                      disabled
                      size="small"
                      // value={formData.phone}
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
                      required
                    />
                  </Grid>

                  <Grid item sx={12} sm={12} md={6} lg={6}>
                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      label="Email"
                      name="email"
                      type="email"
                      size="small"
                      disabled={!isEdit}
                      // value={formData.email}
                      inputProps={{ maxLength: 126 }}
                      // onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item sx={12} sm={12} md={6} lg={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    </LocalizationProvider>
                  </Grid>

                  <Grid item sx={12} sm={12} md={6} lg={6}>
                    <FormControl sx={{ mt: "10px" }} fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Gender
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={formData.gender}
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
                    </FormControl>
                  </Grid>

                  <Grid item sx={12} sm={12} md={6} lg={6}>
                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      select
                      label="Government ID Type"
                      size="small"
                      disabled={!isEdit}
                      // value={governmentIdType}
                      // onChange={handleChangeGovernmentIdType}
                      fullWidth
                      required
                    >
                      <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
                      <MenuItem value="PAN Card">PAN Card</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item sx={12} sm={12} md={6} lg={6}>
                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      label="Government ID"
                      size="small"
                      disabled={!isEdit}
                      // value={formData.govtId}
                      // onChange={handleChangeGovernmentId}
                      inputProps={
                        {
                          // maxLength: governmentIdType === "Aadhar Card" ? 12 : 10,
                        }
                      }
                      fullWidth
                      required
                      // error={Boolean(error)}
                      // helperText={error || warning}
                    />
                  </Grid>

                  <Grid item sx={12} sm={12} md={12} lg={12}>

<Box sx={{width:'100%', display:'flex',justifyContent: 'flex-end', mt:'1em'}}>
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

                  <Grid item sx={12} sm={12} md={6} lg={6}></Grid>
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

                  <Grid item sx={12} sm={12} md={6} lg={6}>
                    <FormControl sx={{ width: "100%", mt: "10px" }} required>
                      <InputLabel htmlFor="state">State</InputLabel>
                      <Select
                        label="State"
                        name="state"
                        size="small"
                        disabled={!isAddress}
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
                        {/* {states.map((state) => (
<MenuItem key={state.id} value={state.id}>
{state.name}
</MenuItem>
))} */}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item sx={12} sm={12} md={6} lg={6}>
                    <FormControl sx={{ width: "100%", mt: "10px" }} required>
                      <InputLabel htmlFor="city">City</InputLabel>
                      <Select
                        label="City"
                        name="city"
                        size="small"
                        disabled={!isAddress}
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
                        {/* {cities.map((city) => (
<MenuItem key={city.id} value={city.id}>
{city.name}
</MenuItem>
))} */}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item sx={12} sm={12} md={6} lg={6}>
                    <TextField
                      sx={{ width: "100%", mt: "10px" }}
                      label="PIN Code"
                      name="pincode"
                      size="small"
                      disabled={!isAddress}
                      // value={formData.pincode}
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
                      required
                    />
                  </Grid>

                  <Grid item sx={12} sm={12} md={12} lg={12}>

                    <Box sx={{width:'100%', display:'flex',justifyContent: 'flex-end', mt:'1em'}}>
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

                  <Grid item sx={12} sm={12} md={6} lg={6}></Grid>
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

                  <Grid item sx={12} sm={12} md={6} lg={6}>
                  <TextField
                      size="small"
                      sx={{ width: "100%", mt: "10px" }}
                      label="Employee Id"
                      name="empId"
                      disabled
                      // value={formData.firstName}
                      inputProps={{ maxLength: 26, readOnly: true  }}
                      // onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item sx={12} sm={12} md={6} lg={6}>
                  <TextField
                      size="small"
                      sx={{ width: "100%", mt: "10px" }}
                      label="Department"
                      name="dept"
                      disabled
                      // value={formData.firstName}
                      inputProps={{ maxLength: 26, readOnly: true  }}
                      // onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item sx={12} sm={12} md={6} lg={6}></Grid>
                </Grid>
              </Box>

            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Profile;
