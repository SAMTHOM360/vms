import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, TextField, Typography, IconButton, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAuth } from '../routes/AuthContext';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import image1 from "../assets/office2_0.jpg"
import image2 from "../assets/rapidsoft-technologies_logo.png"
import Loader from './Loader';

function LoginForm({ }) {
  const navigate = useNavigate(); 
const BASE_URL = 'http://192.168.12.54:8080';
const BASE_URL2 = 'http://192.168.12.54:8080/api/user';

  const { authenticated, setAuthenticated, logout } = useAuth();
  const { setUserRoleAndAuth } = useAuth();
  const [loading, setLoading] = useState(false)
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] = useState(false)
  const [isItemVisible1, setItemVisible1] = useState(false);
  const [isItemVisible2, setItemVisible2] = useState(true);

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [updateCreds, setUpdateCreds] = useState ({
    username:'',
    otp:'',
    newPassword:'',
    confirmPassword:'',
  })

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });

    setUpdateCreds({
      ...updateCreds,
      [name]:value,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(`${BASE_URL}/token`, credentials);

      if(response.status === 200){
        toast.success('Successfully Logged In', {
          position: "top-right",
          autoClose: 4000,
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
    const loggedUserUsername = response.data.username

    const companyId = response.data.company_id
    const companyName = response.data.company_name
    const adminId = response.data.id


    setUserRoleAndAuth(loggedUserRole);

    sessionStorage.setItem('token', token);
    sessionStorage.setItem('loggedUserName', loggedUserName);
    sessionStorage.setItem('loggedUserRole', loggedUserRole);
    sessionStorage.setItem('loggedUserUsername', loggedUserUsername)
    sessionStorage.setItem('companyId', companyId)
    sessionStorage.setItem('companyName', companyName)


    localStorage.setItem('token', token);
    localStorage.setItem('companyId', companyId);
    localStorage.setItem('adminId', adminId)

    setAuthenticated(true);
    if (loggedUserRole === 'SUPERADMIN') {
      navigate('/companyDetails');
    } else if (loggedUserRole === 'ADMIN') {
      navigate('/dashboard');
    } else if (loggedUserRole === 'RECEPTIONIST') {
      navigate('/receptionistdashboard')
    } else if (loggedUserRole === 'EMPLOYEE') {
      navigate('/empdashboard')
    }
    else {
      navigate('*');
    }
      }
    } catch (error) {
      if(error.request.status === 400){
        toast.error('Incorrect username or password', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        }       else{
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
    setLoading(false)
  };

  const appStyle = {
    backgroundImage: `url(${image1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    
  };

  const handleForgotPasswordOpen = () => {
    setOpenForgotPasswordDialog(true)
  }

  const handleForgotPasswordClose = () => {
    setOpenForgotPasswordDialog(false)
    setUpdateCreds({
      username:'',
      otp:'',
      newPassword:'',
      confirmPassword:'',
    })
    setTimeout(() => {
      handleBackToGetOtp()
    }, 200);
    
  }

  const handleGetOTP = async() => {
    // debugger
    if (!updateCreds.username){

      toast.warn('Username can\'t be empty.', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    return

  }

    const getOtpPayload = updateCreds.username

    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL2}/getotp?username=${getOtpPayload}`)
      if(response.status === 200){
        toast.success('OTP sent successfully. Please check your mail.', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
        console.log("get otp", response)
        setItemVisible1(true)
        setItemVisible2(false)
      } else {
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
    } catch(error){
      if(error.request.status === 400){
        toast.error('User not found !!!', {
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
    setLoading(false)
  };

  const handleUpdatePassword = async() => {
    const updatePasswordPayload = {
      username: updateCreds.username,
      otp: updateCreds.otp,
      newPassword: updateCreds.newPassword,
    }

    try{
      setLoading(true)
      const response = await axios.post(`${BASE_URL2}/forgot`, updatePasswordPayload)
      if(response.status === 200){
        toast.success('Password updated succesfully.', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
      handleForgotPasswordClose()
      logout()
      }
    } catch(error){
      // console.error('Error Updating Password:', error);
      if(error.request.status === 400){
        const errMessage =error.response.data.message;
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
    setLoading(false)
  }

  const handleBackToGetOtp = () => {
    setItemVisible1(false)
    setItemVisible2(true)
  }

  return (
    <Box sx={{
        height: '100vh',
        width: '100vw',
    }} style={appStyle}>
      <Loader isLoading={loading} />

        <Box sx={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              bgcolor:'#d9d9d98f',
        }}>

        <Paper elevation={7} sx={{ height: "400px", width: "600px",display:'flex', bgcolor:'#ffffffd8', borderRadius:'15px'}}>
      <form onSubmit={handleSubmit}
      style={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%', }}
      >

<Box display='flex'>
<img src={image2} alt="Logo" style={{ width: '100px', height: '40px', marginRight:'1.5em', marginTop:'1.2em' }} />

<Typography 
variant='h5' 
sx={{
    fontSize: "25px",
    fontWeight:'550', 
    color: "#66666", 
    mt: 2.5,
    }}
    >
    Visitor Management System
    </Typography>
</Box>


        <TextField
            id="username"
            name="username"
            label="Enter Username"
            variant="outlined"
            sx={{ width: "80%", mt:'3em'  }}
            value={credentials.username}
            onChange={handleChange}
            required
        />

        <TextField
            id="password"
            name="password"
            label="Enter Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            sx={{ width: "80%", mt:'3em'  }}
            value={credentials.password}
            onChange={handleChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            required
        />
        <Button
            variant="contained"
            sx={{ mt: 4, width: "10em", height:'3em' }}
            type="submit"
        >
            Login
        </Button>
      <Typography sx={{color:'grey', cursor:'pointer', mt:'1em',     textDecoration: 'none', // Initially, no underline
    '&:hover': {
      textDecoration: 'underline', // Underline on hover
    },}} onClick= {handleForgotPasswordOpen}>Forgot Password</Typography>
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
        PaperProps={{ sx: { borderRadius:'15px'},}}>
        <DialogTitle sx={{textAlign:'center', fontSize:'29px', fontWeight:'600'}}>Change Password</DialogTitle>
        <DialogContent >
            <form style={{width:'32.5em'}}>

              {isItemVisible2 && (
                              <TextField
                              sx={{ mt: '2%', mb: '2%' }}
                              label="Username"
                              name="username"
                              fullWidth
                              value={updateCreds.username}
                              inputProps={{ maxLength: 10, }}
                              onChange={handleChange}
                              required
                            />
              )}

              {/* <TextField
                sx={{ mt: '2%', mb: '2%' }}
                label="OTP"
                fullWidth
                // value={editedItem.lastName}
                inputProps={{ maxLength: 26 }}
                // onChange={(e) =>
                //   setEditedItem({ ...editedItem, lastName: e.target.value })
                // }
                required
              /> */}

{isItemVisible1 && (
        <TextField
          sx={{ mt: '2%', mb: '2%' }}
          label="OTP"
          name='otp'
          fullWidth
          onChange={handleChange}
          inputProps={{ maxLength: 26 }}
          required
        />
      )}

      {isItemVisible1 && (
                      <TextField
                      sx={{ mt: '2%', mb: '2%' }}
                      label="New Password"
                      name='newPassword'
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      onChange={handleChange}
                      inputProps={{ maxLength: 16 }}
                      // value={changedItem.newPassword}
                      // onChange={(e) =>
                      //   setChangedItem({ ...changedItem, newPassword: e.target.value })
                      // }
                      InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={togglePasswordVisibility}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    required
                    />
      )}

      {isItemVisible1 && (
                      <TextField
                      sx={{ mt: '2%', mb: '2%' }}
                      label="Confirm Password"
                      name='confirmPassword'
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      onChange={handleChange}
                      inputProps={{ maxLength: 16 }}
                      // value={changedItem.confirmPassword}
                      // onChange={(e) =>
                      //   setChangedItem({ ...changedItem, confirmPassword: e.target.value })
                      // }
                      InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={togglePasswordVisibility}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    required
                    />
      )}





            </form>
        </DialogContent>
        <DialogActions
        sx={{display:'flex',justifyContent:'space-between', mr:'1em', mb:'1em',ml:'1em'}}
        >
          {isItemVisible2 && (
                      <Button variant='contained' 
                      onClick={handleForgotPasswordClose} 
                      color="secondary" sx={{width:'7em'}}>
                        Cancel
                      </Button>
          )}


          {isItemVisible1 && (
                      <Button variant='contained' 
                      onClick={handleBackToGetOtp} 
                      color="secondary" sx={{width:'7em'}}>
                        Back
                      </Button>
          )}

          {isItemVisible2 && (
                      <Button variant='contained' 
                      onClick={handleGetOTP} 
                      color="primary" sx={{width:'7em'}}>
                        Get OTP
                      </Button>
          )}

          {isItemVisible1 && (
                      <Button variant='contained' 
                      onClick={handleUpdatePassword} 
                      color="primary" sx={{width:'7em'}}>
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
