import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  Popover,
  Avatar,
  Divider,
  Tooltip,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { InputAdornment } from "@mui/material";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircle from "@mui/icons-material/AccountCircle";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../routes/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar({ toggleSidebar }) {
  // const BASE_URL = 'http://192.168.12.58:8080/api/user';
  const BASE_URL = "http://192.168.12.54:8080/api";

  const AuthToken = sessionStorage.getItem("token");

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

  const adminId = sessionStorage.getItem("adminId");
  const loggedUserName = sessionStorage.getItem("loggedUserName");
  const loggedUserRole = sessionStorage.getItem("loggedUserRole");
  const loggedUserUsername = sessionStorage.getItem("loggedUserUsername");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { logout, autoStatusChange, setAutoStatusChange, bellItemChanged, setBellItemChanged } = useAuth();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [isSUPERADMIN, setIsSUPERADMIN] = useState(false);
  const [isRECEPTIONIST, setIsRECEPTIONIST] = useState(false)

  const [bellAnchorEl, setBellAnchorEl] = useState(null);
  const [bellMenu, setBellMenu] = useState(false);
  const [bellMenuItem, setBellMenuItem] = useState([]);
  const [isBellVisible, setIsBellVisible] = useState(false);
  const [bellBadgeCount, setBellBadgeCount] = useState();

  useEffect(() => {
    if (loggedUserRole === "SUPERADMIN") {
      setIsSUPERADMIN(true);
    } else {
      setIsSUPERADMIN(false);
    }

    if(loggedUserRole === "RECEPTIONIST"){
      setIsRECEPTIONIST(true)
    } else {
      setIsRECEPTIONIST(false)
    }
  }, [loggedUserRole]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchNotification();
  }, [isRECEPTIONIST])

  
  const companyName = sessionStorage.getItem("companyName");

  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    govtId: "",
    image: "",
    dept: {
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
    role: {
      id: "",
      name: "",
    },
    pincode: "",
    empCode: "",
    createdOn: "",
  });

  const [changedItem, setChangedItem] = useState({
    oldpassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    const [statusDotstatus, setStatusDotStatus] = useState();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };

  let statusDot = "#FFFFFF";
  if (autoStatusChange === false) {
    statusDot = "#FF0000";
  }
  if (autoStatusChange === true) {
    statusDot = "#34E60C";
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const calculateTimeAgo = (createdAt) => {
    const notificationTime = new Date(createdAt);
    const currentTime = new Date();

    const timeDifference = currentTime - notificationTime;
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(minutes / 60);

    if (minutes < 1) {
      return "Just now";
    } else if (hours < 1) {
      return `${minutes} min ago`;
    } else if (hours < 24) {
      return `${hours} hr ago`;
    } else {
      return notificationTime.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    }
  };

  async function fetchNotification() {
    // console.log('fetchNotification is getting called by interval')
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/notification/pending-request`,
        { headers }
      );
      // console.log("notfication api data", response.data.data);
      const bellAPiData = response.data.data;

      // console.log("bell api data", bellAPiData);
      if (!bellAPiData || bellAPiData.length === 0) {
        return null;
      }

      const unseenCount = bellAPiData.filter((item) => !item.seen).length;

      const bellmenuItemm = (
        <List
          sx={{
            width: "23em",
          }}
        >
          {bellAPiData.map((dataItem, index) => {
            const bellApiVisiorData = dataItem.meeting.visitor;
            const bellApiUserData = dataItem.meeting.user;

            return (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  // bgcolor: "cyan",
                  padding: 0,
                  userSelect: 'none',
                }}
              >
                <ListItem
                  sx={{
                    display: "flex",
                    width: "100%",
                    paddingX: 1,
                    justifyContent: "space-between",
                    bgcolor: dataItem.seen ? "#DDDDDD" : "#FFFFFF",
                    "&:hover": {
                      bgcolor: dataItem.seen ? "#DDDDDD" : "#E9E9E9",
                    },
                  }}
                >
                  <Avatar sx={{}}>
                    <img
                      src={bellApiVisiorData.imageUrl}
                      alt="No DP"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Avatar>
                  <Box
                    sx={{
                      width: "70%",
                      // bgcolor: "orange",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#3A3E45DE",
                      }}
                    >
                      {/* <Typography
                        component="span"
                        sx={{
                          fontSize: "14px",
                          fontWeight: 900,
                        }}
                      >
                        {bellApiVisiorData.name}
                      </Typography>{" "}
                      has requested an appointment
                      {isRECEPTIONIST && (<Typography component="span">
                        {" "}
                        to{" "}
                        <Typography
                          component="span"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 900,
                          }}
                        >
                          {bellApiUserData.firstName}{" "}{bellApiUserData.lastName}
                        </Typography>
                      </Typography>)
                       }
                      . */}
                      {dataItem.text}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#959697",
                    }}
                  >
                    {calculateTimeAgo(dataItem.createdAt)}
                  </Typography>
                </ListItem>
                <Divider sx={{bgcolor:'#6c6c6c9b'}} />
              </Box>
            );
          })}
        </List>
      );

      if (unseenCount !== 0) {
        setIsBellVisible(true);
      }
      setBellBadgeCount(unseenCount);
      setBellMenuItem(bellmenuItemm);
    } catch (error) {
      console.error("unable to fecth notification apidata: ", error);
    }
  }

  // useEffect(() => {
  //   const IntervalFetchNotification = setInterval(() => {
  //     fetchNotification()
  //   }, 5000);

  //   return () => clearInterval(IntervalFetchNotification)
  // },[])

  useEffect(() => {
    fetchNotification()
  },[bellItemChanged])

  const handleMarkRead = async () => {
    // e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/notification/mark-seen`,
        { headers }
      );
      // console.log("MARK READ RESPONSE", response);
      // handleCloseBellMenu();
      fetchNotification()
    } catch (error) {
      console.error("Unable to mark read: ", error);
    }
  };
// console.log('why should')
  async function fetchData() {
    try {
      const response = await axios.get(`${BASE_URL}/user/getbyid/${adminId}`);
      if (response.status === 200) {
        const apiData = response.data.data.data;
        // console.log("nav data", apiData)

        const formatCreatedOn = apiData.createdOn.split(" ")[0] || "";
        // setFormattedCreatedOn(formatCreatedOn);
        setStatusDotStatus(apiData.isPresent);
        setAutoStatusChange(apiData.isPresent);

        // const apiData = response;
        // console.log("apidata", apiData);
        setFormData({
          id: apiData.id || "",
          firstName: apiData.firstName || "",
          lastName: apiData.lastName || "",
          // phone: apiData.phone || "",
          // email: apiData.email || "",
          // dob: apiData.dob || "",
          // gender: apiData.gender || "",
          // govtId: apiData.govtId || "",
          // image: apiData.image || "",
          dept: {
            id: apiData.departmentDto ? apiData.departmentDto.id || "" : "",
            name: apiData.departmentDto ? apiData.departmentDto.name || "" : "",
          },
          // state: {
          //   id: apiData.state.id || "",
          //   name: apiData.state.name || "",
          // },
          // city: {
          //   id: apiData.city.id || "",
          //   name: apiData.city.name || "",
          // },
          // role: {
          //   id: apiData.role.id || "",
          //   name: apiData.role.name || "",
          // },
          // pincode: apiData.pincode || "",
          // empCode: apiData.empCode || "",
          // createdOn: apiData.createdOn || "",
        });
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleOpenBellMenu = (event) => {
    setBellAnchorEl(event.currentTarget);
    setBellMenu(true);
  };

  const handleCloseBellMenu = () => {
    setBellAnchorEl(null);
    setBellMenu(false);
    handleMarkRead()

    // Other logic as needed
  };

  // useEffect(() => {
  //   const handleDocumentClick = (event) => {
  //     if (anchorEl && !anchorEl.contains(event.target)) {
  //       handleMenuClose();
  //     }
  //   };

  //   document.addEventListener('mousedown', handleDocumentClick);

  //   return () => {
  //     document.removeEventListener('mousedown', handleDocumentClick);
  //   };
  // }, [anchorEl]);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
    // handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleChangePasswordDialogOpen = () => {
    setOpenChangePasswordDialog(true);
  };

  const handleChangePasswordDialogClose = () => {
    setOpenChangePasswordDialog(false);
  };

  const handleProfileOpen = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleChangeCompanyScreen =() => {
    navigate("/receptionistcompanyscreen");
    handleMenuClose();
  }

  const handleSavePasswordChange = async (e) => {
    e.preventDefault();
    const changePayload = {
      username: loggedUserUsername,
      oldpassword: changedItem.oldpassword,
      newPassword: changedItem.confirmPassword,
    };

    if (changedItem.newPassword != changedItem.confirmPassword) {
      toast.warn("Confirm Password mismatched !", {
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
        `${BASE_URL}/user/change`,
        changePayload,
        {
          headers,
        }
      );
      if (response.status === 200) {
        toast.success("Password has been successfully changed.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleChangePasswordDialogClose();
        logout();
      }
    } catch (error) {
      const errMessage = error.response.data.message;
      const cleanedMessage = JSON.stringify(errMessage);

      if (error.response.status === 400) {
        toast.warn("Old " + JSON.parse(cleanedMessage) + ".", {
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
        toast.error("Something went Wrong !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      console.error("Error saving changes:", error.response.data.message);
    }
    setLoading(false);
  };

  const { authenticated, setAuthenticated } = useAuth();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      toast.success("Successfully logged out.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      logout();
      navigate("/");
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      elevation={2}
      sx={{
        // zIndex:1500,
        // overflow: "visible",
        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        mt: "2.6em",
        // bgcolor:'red'
        // mr: "7em",
      }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
  

<Box
            sx={{
              // display:'flex',
              display: {xs: 'flex', sm:'flex', md:'none'},
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'center',
              mb:'0.5em',
              // bgcolor:'red'
              userSelect:'none',
            }}
          >
            <Typography
              component={"span"}
              sx={{
                // fontSize: { xs: "17px", sm: "20px" },
                fontSize:'19px',
                fontWeight:'600'
                
              }}
            >
              {formData.firstName} {formData.lastName}
            </Typography>
            <Typography
              component={"span"}
              sx={{
                fontSize:'15px'
              }}
            >
              ({loggedUserRole})
            </Typography>
          </Box>


      {isSUPERADMIN
        ? null
        : [
            <MenuItem
              key="profileMenuItem"
              onClick={handleProfileOpen}
              sx={{
                height: "2em",
                fontSize: "15px",
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
              <Typography sx={{ paddingLeft:'1.2em' ,width:'100%', textAlign:'center' }}>Profile</Typography>
            </MenuItem>,
            <hr key="profileMenuDivider" />,
          ]}


{isRECEPTIONIST
        ? [
          <MenuItem
            key="receptComScreenItem"
            onClick={handleChangeCompanyScreen}
            sx={{
              height: "2em",
              fontSize: "15px",
            }}
          >
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              sx={{
                transform: 'scaleX(-1)' 
              }}
            >
              <ExitToAppIcon />
            </IconButton>
            <Typography sx={{ paddingLeft:'1.2em' ,width:'100%', textAlign:'center' }}>Change Company</Typography>
          </MenuItem>,
          <hr key="receptComScreenDivider" />
                    ]
        : 
        null
        }

      <MenuItem
        onClick={handleChangePasswordDialogOpen}
        sx={{
          height: "2em",
          fontSize: "15px",
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
        <Typography 
        sx={{ paddingLeft: "1.2em", width:'100%', textAlign:'center' }}
        >Change Password</Typography>
      </MenuItem>
      <hr />
      <MenuItem
        onClick={handleLogout}
        sx={{
          height: "2em",
          fontSize: "15px",
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

        <Typography sx={{ paddingLeft:'1.2em' ,width:'100%', textAlign:'center' }}>Logout</Typography>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
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
        <Typography>Notifications</Typography>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Typography>Profile</Typography>
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
          <LogoutIcon />
        </IconButton>
        <Typography>Logout</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Loader isLoading={loading} />
      <AppBar position="fixed" elevation={4} sx={{ background: "#141b2d", }}>
        <Toolbar>
          <Box sx={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
          }}>

       
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, color: "#ffffff" }}
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "block", sm: "flex" },
              alignItems: "center",
              color: "#ffffff",
              fontSize: { xs: "17px", sm: "20px" },
              userSelect:'none'
            }}
          >
            {/* <span style={{fontSize:'19px'}}>VMS</span>  */}
            <Typography
              component={"span"}
              sx={{
                fontSize: { xs: "17px", sm: "20px" },
              }}
            >
              {companyName}
            </Typography>{" "}
            <Typography
              component={"span"}
              sx={{
                fontSize: { xs: "20px", sm: "23px" },
                marginLeft: "0.4em",
                marginRight: "0.4em",
                fontWeight: "500",
              }}
            >
              {" "}
              |{" "}
            </Typography>{" "}
            <Typography
              component={"span"}
              sx={{
                fontSize: { xs: "16px", sm: "19px" },
                // marginTop: "0.2em",
                // marginRight: "0.1em",
              }}
            >
              {/* VMS */}
              {formData.dept.name}
            </Typography>
          </Typography>

          </Box>


          <Box sx={{ flexGrow: 1,
             bgcolor:'cyan',
              minWidth:'12em',
               }} />

          <Box sx={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            // bgcolor:'red',
          }}>

         
          <Typography
            sx={{
              display: {xs: 'none', sm: "none", md: "flex" },
              alignItems: "center",
              color: "#ffffff",
              fontSize: { xs: "17px", sm: "20px" },
              userSelect:'none'
            }}
          >
            <Typography
              component={"span"}
              sx={{
                fontSize: { xs: "17px", sm: "20px" },
              }}
            >
              {formData.firstName} {formData.lastName}
            </Typography>{" "}
            <Typography
              component={"span"}
              sx={{
                fontSize: { xs: "20px", sm: "23px" },
                marginLeft: "0.4em",
                marginRight: "0.4em",
                fontWeight: "500",
              }}
            >
              {" "}
              |{" "}
            </Typography>{" "}
            <Typography
              component={"span"}
              sx={{
                fontSize: { xs: "16px", sm: "19px" },
                // marginTop: {xs: '', sm:'0.2em'},
                marginRight: "0.1em",
              }}
            >
              {loggedUserRole}
            </Typography>
          </Typography>

          {isSUPERADMIN ? null :
                    <IconButton
                    size="large"
                    // aria-label="show 17 new notifications"
                    color="inherit"
                    onClick={handleOpenBellMenu}
                    sx={{
                      // ml: "0.5em",
                    }}
                  >
                    <Badge badgeContent={bellBadgeCount} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
          }


          <Popover
            open={bellMenu}
            anchorEl={bellAnchorEl}
            onClose={handleCloseBellMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box
              sx={{
                minWidth: "100%",
                height: "2.5em",
                display: "flex",
                paddingX: "0.5em",
                justifyContent: "space-between",
                alignItems: "center",
                // bgcolor:'orange'
              }}
            >
              <Typography
                sx={{
                  fontSize: "17px",
                  fontWeight: 900,
                  color: "#313541DE",
                }}
              >
                Notifications
              </Typography>
              {/* <Tooltip title="Mark as all read" arrow>
                <IconButton
                  size="small"
                  onClick={handleMarkRead}
                  sx={{
                    color: "#4ECD29",
                    "&:hover": { color: "#37981B" },
                  }}
                >
                  <CheckCircleOutlineIcon />
                </IconButton>
              </Tooltip> */}
            </Box>
            <Box
              sx={{
                minWidth: "100%",
                height: "300px",
                overflowY: "auto",
                // bgcolor:'cyan'
              }}
            >
              {bellMenuItem}
            </Box>
          </Popover>

          <Box
            sx={{
              display: {
                xs: "flex",
                md: "flex",
                color: "#ffffff",
                position: "relative",
                bgcolor:'orange'
              },
            }}
          >
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}

            {isSUPERADMIN ? null : (
              <div
                // onClick={handleStatusUpdate}
                style={{
                  position: "absolute",
                  top: "2.2em",
                  left: "0.8em",
                  zIndex: 1,
                  width: "13px",
                  height: "13px",
                  backgroundColor: statusDot, // Change the color to represent "present" or "absent"
                  borderRadius: "50%",
                  border: "2px solid #fff",
                }}
              />
            )}

            {/* <div
              // onClick={handleStatusUpdate}
              style={{
                position: "absolute",
                top: "2.2em",
                left: "0.8em",
                zIndex: 1,
                width: "13px",
                height: "13px",
                backgroundColor: statusDot, // Change the color to represent "present" or "absent"
                borderRadius: "50%",
                border: "2px solid #fff",
              }}
            /> */}

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              // sx={{
              //   display: 'flex',
              //   alignItems: 'center',
              // }}
            >
              <AccountCircle sx={{ fontSize: "40px" }} />
            </IconButton>
          </Box>
          {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle sx={{ fontSize: "40px" }} />
            </IconButton>
          </Box> */}
           </Box>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {renderMenu}

      <Dialog
        open={openChangePasswordDialog}
        onClose={handleChangePasswordDialogClose}
        PaperProps={{ sx: { mt: "5em", borderRadius: "5px" } }}
      >
        <DialogTitle
          sx={{ textAlign: "center", fontSize: "29px", fontWeight: "600" }}
        >
          Update Password
        </DialogTitle>
        <DialogContent>
          {changedItem && (
            <form style={{ width: "380px" }}>
              <TextField
                size="small"
                sx={{ mt: "1em" }}
                type={showPassword ? "text" : "password"}
                label="Old Password"
                fullWidth
                inputProps={{ maxLength: 16 }}
                value={changedItem.oldpassword}
                onChange={(e) =>
                  setChangedItem({
                    ...changedItem,
                    oldpassword: e.target.value,
                  })
                }
                InputProps={{
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
                required
              />
              <TextField
                size="small"
                sx={{ mt: "1em" }}
                label="New Password"
                type={showPassword2 ? "text" : "password"}
                fullWidth
                inputProps={{ maxLength: 16 }}
                value={changedItem.newPassword}
                onChange={(e) =>
                  setChangedItem({
                    ...changedItem,
                    newPassword: e.target.value,
                  })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility2} edge="end">
                        {showPassword2 ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
              <TextField
                size="small"
                sx={{ mt: "1em" }}
                label="Confirm Password"
                type={showPassword3 ? "text" : "password"}
                fullWidth
                inputProps={{ maxLength: 16 }}
                value={changedItem.confirmPassword}
                onChange={(e) =>
                  setChangedItem({
                    ...changedItem,
                    confirmPassword: e.target.value,
                  })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility3} edge="end">
                        {showPassword3 ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
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
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mr: "1em",
            mb: "1em",
            ml: "1em",
          }}
        >
          <Button
            variant="contained"
            onClick={handleChangePasswordDialogClose}
            color="secondary"
            sx={{ width: "6em" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSavePasswordChange}
            color="primary"
            sx={{ width: "6em" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
