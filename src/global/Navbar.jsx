

import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import{ Box,
Dialog,
DialogTitle,
DialogContent,
DialogActions,
Button,
TextField, }from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import {InputAdornment} from '@mui/material';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../routes/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const AppBar = styled(MuiAppBar, {})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar({toggleSidebar}) {
  const adminId = localStorage.getItem('adminId')
  const loggedUserName = sessionStorage.getItem('loggedUserName')
  const loggedUserRole = sessionStorage.getItem('loggedUserRole')
  const loggedUserUsername = sessionStorage.getItem('loggedUserUsername')
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false)
  const { logout } =useAuth();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const companyName = sessionStorage.getItem('companyName')

  const [changedItem, setChangedItem] = useState({
    oldpassword: '',
    newPassword:'',
    confirmPassword:'',
  })
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false)

  const [showPassword, setShowPassword] = useState(false);
  const [statusDotstatus, setStatusDotStatus] = useState(false)

  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };

  
  let statusDot = 'red'
  if(statusDotstatus === true){
    statusDot = '#34E60C'
  }



  // const BASE_URL = 'http://192.168.12.58:8080/api/user';
  const BASE_URL = 'http://192.168.12.54:8080/api/user';

  const AuthToken = sessionStorage.getItem('token');


  

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthToken}`,
    },
  });

  const headers = {
    Authorization: `Bearer ${AuthToken}`,
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);

    setTimeout(() => {
      setAnchorEl(null)
    }, 4500);
  };


  async function fetchData() {
    try {
      const response = await axios.get(`${BASE_URL}/getbyid/${adminId}`);
      if (response.status === 200) {
        const apiData = response.data.data.data;

        const formatCreatedOn = apiData.createdOn.split(" ")[0] || "";
        // setFormattedCreatedOn(formatCreatedOn);
        setStatusDotStatus(apiData.isPresent)
        // const apiData = response;
        // console.log("apidata", apiData);
        // setFormData({
        //   id: apiData.id || "",
        //   firstName: apiData.firstName || "",
        //   lastName: apiData.lastName || "",
        //   phone: apiData.phone || "",
        //   email: apiData.email || "",
        //   dob: apiData.dob || "",
        //   gender: apiData.gender || "",
        //   govtId: apiData.govtId || "",
        //   image: apiData.image || "",
        //   departmentDto: {
        //     id: apiData.departmentDto.id || "",
        //     name: apiData.departmentDto.name || "",
        //   },
        //   state: {
        //     id: apiData.state.id || "",
        //     name: apiData.state.name || "",
        //   },
        //   city: {
        //     id: apiData.city.id || "",
        //     name: apiData.city.name || "",
        //   },
        //   role: {
        //     id: apiData.role.id || "",
        //     name: apiData.role.name || "",
        //   },
        //   pincode: apiData.pincode || "",
        //   empCode: apiData.empCode || "",
        //   createdOn: apiData.createdOn || "",
        // });
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 2000); // 1500 milliseconds (1.5 seconds)
  
    return () => {
      // Clear the interval when the component unmounts
      clearInterval(fetchDataInterval);
    };
  }, []);
  

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleChangePasswordDialogOpen = () => {
    setOpenChangePasswordDialog(true)
  }

  const handleChangePasswordDialogClose = () => {
    setOpenChangePasswordDialog(false)
  }

  const handleProfileOpen = () =>{
    navigate('/profile')
  }

  const handleSavePasswordChange = async(e) => {
    e.preventDefault();
    const changePayload = {
      username: loggedUserUsername,
      oldpassword: changedItem.oldpassword,
      newPassword: changedItem.confirmPassword,
    }

    if(changedItem.newPassword != changedItem.confirmPassword){
      toast.warn('Confirm Password mismatched !', {
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
    try {
      setLoading(true)
      const response = await axios.post(`${BASE_URL}/change`, changePayload, {headers})
      if(response.status === 200){
        toast.success('Password has been successfully changed.', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
        handleChangePasswordDialogClose()
        logout()
      }
    } catch (error) {
      const errMessage =error.response.data.message;
      const cleanedMessage = JSON.stringify(errMessage);

      if(error.response.status === 400){
        toast.warn('Old '+JSON.parse(cleanedMessage)+'.', {
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
        toast.error('Something went Wrong !', {
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
      
      console.error('Error saving changes:', error.response.data.message);
    }
    setLoading(false)
  }

  const { authenticated, setAuthenticated } = useAuth();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');

    if (confirmLogout) {

      toast.success('Successfully logged out.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      logout()
      navigate('/');
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
    elevation={2}
    sx={{
      // overflow: "visible",
      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      mt: '2.6em',
      mr: '7em',
      width:'15em',
      height:'23em',

    }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

<MenuItem 
      onClick={handleProfileOpen}
      sx={{
        height:'2em',
        fontSize:'15px'
      }}
      >
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <PersonIcon />
        </IconButton>
        <p style={{paddingLeft:'2.2em'}}>Profile</p>
      </MenuItem><hr />

            <MenuItem 
      onClick={handleChangePasswordDialogOpen}
      sx={{
        height:'2em',
        fontSize:'15px',
      }}
      >
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <SyncLockIcon />
        </IconButton>
        <p>Change Password</p>
      </MenuItem><hr />
      <MenuItem onClick={handleLogout}
      sx={{
        height:'2em',
        fontSize:'15px',
      }}
            >
      <IconButton
              size="small"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>

            <p style={{paddingLeft:'2em'}}>Logout</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
              size="large"
              // edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleLogout}
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem 
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
      <IconButton
              size="large"
              // edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleLogout}
              color="inherit"
              // sx={{mr:'1em'}}
            >
              <LogoutIcon  />
            </IconButton>
            <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Loader isLoading={loading} />
      <AppBar position="fixed" elevation={4} sx={{ background: '#141b2d' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, color:'#ffffff' }}
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', color:'#ffffff' } }}
          >
            {/* <span style={{fontSize:'19px'}}>VMS</span>  */}
            <span style={{fontSize:'20px'}}>{companyName}</span> <span style={{fontSize:'23px',marginLeft:'0.4em', marginRight:'0.4em', fontWeight:'500'}}> | </span> <span style={{fontSize:'18px',marginTop:'0.2em', marginRight:'0.1em'}}>VMS</span>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <span style={{fontSize:'20px'}}>{loggedUserName}</span> <span style={{fontSize:'23px',marginLeft:'0.4em', marginRight:'0.4em', fontWeight:'500'}}> | </span> <span style={{fontSize:'18px',marginTop:'0.2em', marginRight:'0.1em'}}>{loggedUserRole}</span>
          <Box sx={{ display: { xs: 'none', md: 'flex', color:'#ffffff',position:'relative' } }}>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}


    <div 
    // onClick={handleStatusUpdate}
      style={{
        position:'absolute',
        top:'2.2em',
        left:'0.8em',
        zIndex:1,
        width: '13px',
        height: '13px',
        backgroundColor: statusDot, // Change the color to represent "present" or "absent"
        borderRadius: '50%',
        border: '2px solid #fff',
      }}
    />

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              // sx={{
              //   display: 'flex',
              //   alignItems: 'center',
              // }}
            >
              <AccountCircle sx={{fontSize:'40px'}} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle sx={{fontSize:'40px'}} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {renderMenu}
      <Dialog open={openChangePasswordDialog} onClose={handleChangePasswordDialogClose} PaperProps={{ sx: { mt:'5em', borderRadius:'15px'},}}>
        <DialogTitle sx={{textAlign:'center', fontSize:'29px', fontWeight:'600'}}>Update Password</DialogTitle>
        <DialogContent >
          {changedItem && (
            <form style={{width:'32.5em'}}>
              <TextField
                sx={{ mt: '2%', mb: '2%' }}
                type={showPassword ? 'text' : 'password'}
                label="Old Password"
                fullWidth
                inputProps={{ maxLength: 16 }}
                value={changedItem.oldpassword}
                onChange={(e) =>
                  setChangedItem({ ...changedItem, oldpassword: e.target.value })
                }
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
              <TextField
                sx={{ mt: '2%', mb: '2%' }}
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                inputProps={{ maxLength: 16 }}
                value={changedItem.newPassword}
                onChange={(e) =>
                  setChangedItem({ ...changedItem, newPassword: e.target.value })
                }
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
              <TextField
                sx={{ mt: '2%', mb: '2%' }}
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                inputProps={{ maxLength: 16 }}
                value={changedItem.confirmPassword}
                onChange={(e) =>
                  setChangedItem({ ...changedItem, confirmPassword: e.target.value })
                }
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
            </form>
          )}
        </DialogContent>
        <DialogActions
        sx={{display:'flex',justifyContent:'space-between', mr:'1em', mb:'1em',ml:'1em'}}
        >
          <Button variant='contained' onClick={handleChangePasswordDialogClose} color="secondary" sx={{width:'6em'}}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSavePasswordChange} color="primary" sx={{width:'6em'}}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
