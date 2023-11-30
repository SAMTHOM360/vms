import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAuth } from "../routes/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import image1 from "../assets/office2_0.jpg";
import image2 from "../assets/rapidsoft+report+colour+logo.png";
import Loader from "./Loader";

function LoginForm() {
  const navigate = useNavigate();
  const BASE_URL = "http://192.168.12.54:8080";
  // const BASE_URL = 'http://192.168.12.58:8080';


  const OTP_URL = "http://192.168.12.54:8080/api/user";
  // const OTP_URL = "http://192.168.12.58:8080/api/user";

  const OWNER = "https://www.rapidsofttechnologies.com/";

  const { authenticated, setAuthenticated, logout, setIsNavBar, setIsSideBar } =
    useAuth();
  const { setUserRoleAndAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] =
    useState(false);
  const [isItemVisible1, setItemVisible1] = useState(false);
  const [isItemVisible2, setItemVisible2] = useState(true);
  const [usernameErrors, setUsernameErrors] = useState({
    errorMessage: "",
    warningMessage: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({
    errorMessage: "",
    warningMessage: "",
  });

  const [changeUserErrors, setChangeUserErrors] = useState({
    errorMessage: "",
    warningMessage: "",
  });

  const [otpErrors, setOtpErrors] = useState({
    errorMessage: "",
    warningMessage: "",
  });

  const [newPasswordErrors, setNewPasswordErrors] = useState({
    errorMessage: "",
    warningMessage: "",
  });

  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState({
    errorMessage: "",
    warningMessage: "",
  });

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [updateCreds, setUpdateCreds] = useState({
    username: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCustomChange = (e) => {
    let { name, value } = e.target;
    let errorMessage = "";
    let warningMessage = "";

    // Logic for username

    if (name === "username") {
      if (/^\d{0,10}$/.test(value) || value === "") {
        if (value.length === 10) {
          warningMessage = "";
        } else if (value.length > 0) {
          warningMessage = "Username must contain exactly 10 digits.";
        } else if (value.length < 10) {
          warningMessage = "Username must contain exactly 10 digits.";
        } else {
          warningMessage = "";
        }
      } else {
        errorMessage = "Username must contain exactly 10 digits.";
      }
      setUsernameErrors({
        errorMessage,
        warningMessage,
      });
    }

    // Logic for password
    if (name === "password") {
      if (value) {
        if (value.length === 16) {
          warningMessage = "";
        } else if (value.length < 4) {
          errorMessage = "Password must be at least 4 characters.";
        } else if (value.length < 16) {
          warningMessage = "Password must be at least 4 characters.";
        } else {
          warningMessage = "";
        }
      } else {
        errorMessage = "Password must be at least 4 characters.";
      }

      setPasswordErrors({
        errorMessage,
        warningMessage,
      });
    }

    if (name === "username") {
      value = value.replace(/[^0-9]/g, "");
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
    }

    if (name === "password") {
      if (value.length > 16) {
        value = value.slice(0, 16);
      }
    }

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleCustomUpdateChange = (e) => {
    let { name, value } = e.target;

    let errorMessage = "";
    let warningMessage = "";

    if (name === "username") {
      if (/^\d{0,10}$/.test(value) || value === "") {
        if (value.length === 10) {
          warningMessage = "";
        } else if (value.length > 0) {
          warningMessage = "Username must contain exactly 10 digits.";
        } else if (value.length < 10) {
          warningMessage = "Username must contain exactly 10 digits.";
        } else {
          warningMessage = "";
        }
      } else {
        errorMessage = "Username must contain exactly 10 digits.";
      }
      setChangeUserErrors({
        errorMessage,
        warningMessage,
      });
    }

    if (name === "otp") {
      if (/^\d{0,10}$/.test(value) || value === "") {
        if (value.length === 6) {
          warningMessage = "";
        } else if (value.length > 0) {
          warningMessage = "OTP must contain exactly 6 digits.";
        } else if (value.length < 6) {
          warningMessage = "OTP must contain exactly 6 digits.";
        } else {
          warningMessage = "";
        }
      } else {
        errorMessage = "OTP must contain exactly 6 digits.";
      }
      setOtpErrors({
        errorMessage,
        warningMessage,
      });
    }

    if (name === "newPassword") {
      if (value) {
        if (value.length === 16) {
          warningMessage = "";
        } else if (value.length < 4) {
          errorMessage = "Must be at least 4 characters.";
        } else if (value.length < 16) {
          warningMessage = "Must be at least 4 characters.";
        } else {
          warningMessage = "";
        }
      } else {
        errorMessage = "Must be at least 4 characters.";
      }

      setNewPasswordErrors({
        errorMessage,
        warningMessage,
      });
    }

    if (name === "username") {
      value = value.replace(/[^0-9]/g, "");
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
    }

    if (name === "otp") {
      value = value.replace(/[^0-9]/g, "");
      if (value.length > 6) {
        value = value.slice(0, 6);
      }
    }

    if (name === "newPassword") {
      if (value.length > 16) {
        value = value.slice(0, 16);
      }
    }

    if (name === "confirmPassword") {
      if (value.length > 16) {
        value = value.slice(0, 16);
      }
    }

    setUpdateCreds({
      ...updateCreds,
      [name]: value,
    });
  };

  const handleNewToConfirmPasswordCompare = () => {
    let errorMessage = "";

    if (updateCreds.confirmPassword !== updateCreds.newPassword) {
      errorMessage = "Not matching with new password";
    } else {
      errorMessage = "";
    }

    setConfirmPasswordErrors({ errorMessage });
  };

  useEffect(() => {
    setIsNavBar(false);
    setIsSideBar(false);
  });

  useEffect(() => {
    handleNewToConfirmPasswordCompare();
  }, [updateCreds]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnLoading(true);
      const response = await axios.post(`${BASE_URL}/token`, credentials);

      if (response.status === 200) {
        toast.success("Successfully Logged In", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const token = response.data.token;
        const loggedUserName = response.data.name;
        const loggedUserRole = response.data.role;
        const loggedUserUsername = response.data.username;

        const companyId = response.data.company_id;
        const companyName = response.data.company_name;
        const adminId = response.data.id;
        const limit = response.data.limit;
        const buildingId = response.data.buildingId

        setUserRoleAndAuth(loggedUserRole);

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("loggedUserName", loggedUserName);
        sessionStorage.setItem("loggedUserRole", loggedUserRole);
        sessionStorage.setItem("loggedUserUsername", loggedUserUsername);
        sessionStorage.setItem("companyId", companyId);
        sessionStorage.setItem("companyName", companyName);
        sessionStorage.setItem("limit", limit);
        sessionStorage.setItem('isSideBarPinned', true)
        sessionStorage.setItem("buildingId",buildingId);

        // localStorage.setItem('token', token);
        // localStorage.setItem('companyId', companyId);
        // localStorage.setItem('adminId', adminId)

        sessionStorage.setItem("token", token);
        // sessionStorage.setItem("companyId", companyId);
        sessionStorage.setItem("adminId", adminId);

        setAuthenticated(true);
        if (loggedUserRole === "SUPERADMIN") {
          navigate("/companyDetails");
          // sessionStorage.setItem("activeListItem", "/companyDetails");
        } else if (loggedUserRole === "ADMIN") {
          navigate("/empdashboard");
          // sessionStorage.setItem("activeListItem", "/empdashboard");
        } else if (loggedUserRole === "RECEPTIONIST") {
          navigate("/receptionistcompanyscreen");
          // sessionStorage.setItem("activeListItem", "/dashboardreceptionist");
        } else if (loggedUserRole === "EMPLOYEE") {
          navigate("/empdashboard");
          // sessionStorage.setItem("activeListItem", "/empdashboard");
        } else {
          navigate("*");
        }
      }
    } catch (error) {
      if (error.request.status === 400) {
        toast.error("Incorrect username or password", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
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
      }
    }
    setBtnLoading(false);
  };

  const appStyle = {
    backgroundImage: `url(${image1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const handleForgotPasswordOpen = () => {
    setOpenForgotPasswordDialog(true);
  };

  const handleForgotPasswordClose = () => {
    setOpenForgotPasswordDialog(false);
    setUpdateCreds({
      username: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    });
    setTimeout(() => {
      handleBackToGetOtp();
    }, 200);
  };

  const handleGetOTP = async () => {
    if (!updateCreds.username) {
      toast.warn("Username can't be empty.", {
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

    const getOtpPayload = updateCreds.username;

    try {
      setLoading(true);
      const response = await axios.get(
        `${OTP_URL}/getotp?username=${getOtpPayload}`
      );
      console.log("get otp", response);
      if (response.status === 200) {
        toast.success("OTP sent successfully. Please check your mail.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setItemVisible1(true);
        setItemVisible2(false);
      } else {
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
      }
    } catch (error) {
      if (error.request.status === 400) {
        toast.error("User not found !!!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
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
      }
    }
    setLoading(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const updatePasswordPayload = {
      username: updateCreds.username,
      otp: updateCreds.otp,
      newPassword: updateCreds.newPassword,
    };

    if (
      updatePasswordPayload.otp.trim() === "" ||
      updatePasswordPayload.newPassword.trim() === ""
    ) {
      toast.warn("Please fill all details !!", {
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

    console.log("updatePasswordPayload.otp:", updatePasswordPayload.otp);
    console.log(
      "updatePasswordPayload.newPassword:",
      updatePasswordPayload.newPassword
    );

    if (updateCreds.newPassword != updateCreds.confirmPassword) {
      toast.error("New and Confirm passwords mismatched !!!", {
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

    try {
      setLoading(true);
      const response = await axios.post(
        `${OTP_URL}/forgot`,
        updatePasswordPayload
      );
      if (response.status === 200) {
        toast.success("Password updated succesfully.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleForgotPasswordClose();
        logout();
      }
    } catch (error) {
      // console.error('Error Updating Password:', error);
      if (error.request.status === 400) {
        const errMessage = error.response.data.message;
        const cleanedMessage = JSON.stringify(errMessage);
        toast.error(JSON.parse(cleanedMessage) + " !!!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
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
      }
    }
    setLoading(false);
  };

  const handleBackToGetOtp = () => {
    setItemVisible1(false);
    setItemVisible2(true);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
      }}
      style={appStyle}
    >
      <Loader isLoading={loading} />

      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          bgcolor: "#d9d9d98f",
        }}
      >
        <Paper
          elevation={7}
          sx={{
            height: "575px",
            width: "470px",
            display: "flex",
            bgcolor: "#ffffff",
            borderRadius: "5px",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              display="flex"
              sx={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "1em",
              }}
            >
              <img
                src={image2}
                alt="Logo"
                style={{
                  width: "280.90px",
                  height: "80px",
                  marginTop: "1.2em",
                }}
              />
              <hr style={{ width: "100%" }} />

              <Typography
                variant="h5"
                sx={{
                  fontSize: "18px",
                  fontWeight: "550",
                  color: "#66666",
                  mt: 1.5,
                }}
              >
                VISITOR MANAGEMENT SYSTEM
              </Typography>
            </Box>

            <div
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "center",
                marginTop: "2em",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: "16px",
                  // fontWeight:'550',
                  fontWeight: "bold",
                  color: "#66666",
                }}
              >
                SIGN IN
              </Typography>
            </div>
            <TextField
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              inputProps={{
                maxLength: 10,
              }}
              size="small"
              sx={{
                width: "80%",
                mt: "1em",
              }}
              value={credentials.username}
              onChange={handleCustomChange}
              error={Boolean(usernameErrors.errorMessage)}
              helperText={
                usernameErrors.errorMessage || usernameErrors.warningMessage
              }
              required
            />

            <TextField
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              size="small"
              sx={{ width: "80%", mt: "2em" }}
              value={credentials.password}
              onChange={handleCustomChange}
              InputProps={{
                maxLength: 16,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(passwordErrors.errorMessage)}
              helperText={
                passwordErrors.errorMessage || passwordErrors.warningMessage
              }
              required
            />
            <div
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "end",
                marginTop: "1em",
              }}
            >
              <Typography
                sx={{
                  color: "grey",
                  cursor: "pointer",
                  fontSize: "15px",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={handleForgotPasswordOpen}
              >
                Forgot Password
              </Typography>
            </div>

            <Button
              variant="contained"
              sx={{ mt: 4, width: "10em", height: "3em" }}
              type="submit"
              // color='secondary'
              disabled={btnLoading}
            >
              {btnLoading ? <CircularProgress size="2em" /> : "Login"}
            </Button>

            <Box
              sx={{
                width: "80%",
                display: "flex",
                justifyContent: "center",
                mt: "3em",
              }}
            >
              <Typography sx={{ fontSize: "14px", color: "#0000008a" }}>
                Copyright ©{" "}
                <Link
                  href={OWNER}
                  color="inherit"
                  underline="hover"
                  target="_blank"
                >
                  Rapidsoft Technologies Pvt. Ltd
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Dialog
            open={openForgotPasswordDialog}
            onClose={handleForgotPasswordClose}
            PaperProps={{ sx: { borderRadius: "5px" } }}
          >
            <DialogTitle
              sx={{ textAlign: "center", fontSize: "29px", fontWeight: "600" }}
            >
              Change Password
            </DialogTitle>
            <DialogContent>
              <form style={{ width: "380px" }}>
                {isItemVisible2 && (
                  <TextField
                    size="small"
                    sx={{ mt: "1em" }}
                    label="Username"
                    name="username"
                    fullWidth
                    value={updateCreds.username}
                    inputProps={{ maxLength: 10 }}
                    onChange={handleCustomUpdateChange}
                    error={Boolean(changeUserErrors.errorMessage)}
                    helperText={
                      changeUserErrors.errorMessage ||
                      changeUserErrors.warningMessage
                    }
                    required
                  />
                )}

                {isItemVisible1 && (
                  <TextField
                    size="small"
                    sx={{ mt: "1em" }}
                    label="OTP"
                    name="otp"
                    fullWidth
                    value={updateCreds.otp}
                    onChange={handleCustomUpdateChange}
                    inputProps={{ maxLength: 6 }}
                    error={Boolean(otpErrors.errorMessage)}
                    helperText={
                      otpErrors.errorMessage || otpErrors.warningMessage
                    }
                    required
                  />
                )}

                {isItemVisible1 && (
                  <TextField
                    size="small"
                    sx={{ mt: "1em" }}
                    label="New Password"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    onChange={handleCustomUpdateChange}
                    value={updateCreds.newPassword}
                    InputProps={{
                      maxLength: 16,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(newPasswordErrors.errorMessage)}
                    helperText={
                      newPasswordErrors.errorMessage ||
                      newPasswordErrors.warningMessage
                    }
                    required
                  />
                )}

                {isItemVisible1 && (
                  <TextField
                    size="small"
                    sx={{ mt: "1em" }}
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    onChange={handleCustomUpdateChange}
                    inputProps={{ maxLength: 16 }}
                    value={updateCreds.confirmPassword}
                    InputProps={{
                      maxLength: 16,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(confirmPasswordErrors.errorMessage)}
                    helperText={
                      confirmPasswordErrors.errorMessage ||
                      confirmPasswordErrors.warningMessage
                    }
                    required
                  />
                )}
              </form>
            </DialogContent>
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mr: "1em",
                mb: "1em",
                ml: "1em",
              }}
            >
              {isItemVisible2 && (
                <Button
                  variant="contained"
                  onClick={handleForgotPasswordClose}
                  color="secondary"
                  sx={{ width: "7em" }}
                >
                  Cancel
                </Button>
              )}

              {isItemVisible1 && (
                <Button
                  variant="contained"
                  onClick={handleBackToGetOtp}
                  color="secondary"
                  sx={{ width: "7em" }}
                >
                  Back
                </Button>
              )}

              {isItemVisible2 && (
                <Button
                  variant="contained"
                  onClick={handleGetOTP}
                  color="primary"
                  sx={{ width: "7em" }}
                >
                  Get OTP
                </Button>
              )}

              {isItemVisible1 && (
                <Button
                  variant="contained"
                  onClick={handleUpdatePassword}
                  color="primary"
                  sx={{ width: "7em" }}
                >
                  Change
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginForm;