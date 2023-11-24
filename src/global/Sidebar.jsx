// import React, { useState } from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import IconButton from "@mui/material/IconButton";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import FeedIcon from "@mui/icons-material/Feed";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import HomeIcon from "@mui/icons-material/Home";
// import PeopleIcon from "@mui/icons-material/People";
// import PersonIcon from "@mui/icons-material/Person";
// import AnalyticsIcon from "@mui/icons-material/Analytics";
// import SettingsIcon from "@mui/icons-material/Settings";
// import InfoIcon from "@mui/icons-material/Info";
// import Groups3Icon from "@mui/icons-material/Groups3";
// import ListAltIcon from "@mui/icons-material/ListAlt";

// import BusinessIcon from "@mui/icons-material/Business";
// import DashboardIcon from "@mui/icons-material/Dashboard";

// import ListItemText from "@mui/material/ListItemText";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../routes/AuthContext";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function Sidenav({ open: propOpen, onClose }) {
//   const { userRole } = useAuth();
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(!propOpen);
//   const [activeListItem, setActiveListItem] = useState();

//   const activeListBgColor = "#2A3550"
//   const inactiveListBgColor = "#141b2d"

//   const handleSelectListItem = (route) => {
//     navigate(route);
//     setActiveListItem(route);
//     sessionStorage.setItem('activeListItem', route)
//   };

//   React.useEffect(() => {
//     setOpen(!propOpen);
//     const storedActiveItem = sessionStorage.getItem('activeListItem');
//     if (storedActiveItem) {
//       setActiveListItem(storedActiveItem);
//     }
//   }, [propOpen]);

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />

//       <Drawer
//         variant="permanent"
//         open={open}
//         PaperProps={{
//           sx: {
//             backgroundColor: "#141b2d",
//             color: "#ffffff",
//           },
//         }}
//       >
//         <DrawerHeader>
//           {/* <IconButton onClick={() => setOpen(!open)}>
//             {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton> */}
//         </DrawerHeader>
//         <List>
//           {userRole === "SUPERADMIN" && (
//             <>
//               <ListItem
//                 disablePadding
//                 sx={{ display: "block",
//                 bgcolor: activeListItem === "/companyDetails" ? activeListBgColor : inactiveListBgColor,
//               }}
//                 onClick={() => handleSelectListItem("/companyDetails")}
//               >
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <DashboardIcon sx={{ color: "#ffffff" }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Companies"
//                     sx={{ opacity: open ? 1 : 0 }}
//                   />
//                 </ListItemButton>
//               </ListItem>

//               <ListItem
//                 disablePadding
//                 sx={{ display: "block", bgcolor: activeListItem === "/employee" ? activeListBgColor : inactiveListBgColor, }}
//                 onClick={() => handleSelectListItem("/employee")}
//               >
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <PeopleIcon sx={{ color: "#ffffff" }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Employees"
//                     sx={{ opacity: open ? 1 : 0 }}
//                   />
//                 </ListItemButton>
//               </ListItem>
//             </>
//           )}

//           {userRole === "ADMIN" && (
//             <>
//               <ListItem
//                 disablePadding
//                 sx={{ display: "block",
//                 bgcolor: activeListItem === "/empdashboard" ? activeListBgColor : inactiveListBgColor,
//                }}
//                 onClick={() => handleSelectListItem("/empdashboard")}
//               >
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <HomeIcon sx={{ color: "#ffffff" }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Dashboard"
//                     sx={{ opacity: open ? 1 : 0 }}
//                   />
//                 </ListItemButton>
//               </ListItem>

//               <ListItem
//                 disablePadding
//                 sx={{ display: "block", bgcolor: activeListItem === "/meetings" ? activeListBgColor : inactiveListBgColor, }}
//                 onClick={() => handleSelectListItem("/meetings")}
//               >
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <DashboardIcon sx={{ color: "#ffffff" }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Meetings"
//                     sx={{ opacity: open ? 1 : 0 }}
//                   />
//                 </ListItemButton>
//               </ListItem>

//               <ListItem
//                 disablePadding
//                 sx={{ display: "block", bgcolor: activeListItem === "/employee" ? activeListBgColor : inactiveListBgColor, }}
//                 onClick={() => handleSelectListItem("/employee")}
//               >
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <PeopleIcon sx={{ color: "#ffffff" }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Employees"
//                     sx={{ opacity: open ? 1 : 0 }}
//                   />
//                 </ListItemButton>
//               </ListItem>

//               {/* <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/userform')}>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : 'auto',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <ListAltIcon sx={{color:'#ffffff'}} />
//               </ListItemIcon>
//               <ListItemText primary='Employee Form' sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem> */}

//               <ListItem
//                 disablePadding
//                 sx={{ display: "block", bgcolor: activeListItem === "/profile" ? activeListBgColor : inactiveListBgColor, }}
//                 onClick={() => handleSelectListItem("/profile")}
//               >
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <PersonIcon sx={{ color: "#ffffff" }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Profile"
//                     sx={{ opacity: open ? 1 : 0 }}
//                   />
//                 </ListItemButton>
//               </ListItem>

//               {/* <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/excelupload')}>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : 'auto',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <PersonIcon sx={{color:'#ffffff'}} />
//               </ListItemIcon>
//               <ListItemText primary='Excel' sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem> */}
//             </>
//           )}

//           {userRole === "RECEPTIONIST" && (
//             <>
//               <ListItem
//                 disablePadding
//                 sx={{ display: "block", bgcolor: activeListItem === "/dashboardreceptionist" ? activeListBgColor : inactiveListBgColor, }}
//                 onClick={() => handleSelectListItem("/dashboardreceptionist")}
//               >
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <DashboardIcon sx={{ color: "#ffffff" }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Dashboard"
//                     sx={{ opacity: open ? 1 : 0 }}
//                   />
//                 </ListItemButton>
//               </ListItem>

//               <ListItem
//                 disablePadding
//                 sx={{ display: "block", bgcolor: activeListItem === "/receptionistdashboard" ? activeListBgColor : inactiveListBgColor, }}
//                 onClick={() => handleSelectListItem("/receptionistdashboard")}
//               >
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Groups3Icon sx={{ color: "#ffffff" }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Meeting List"
//                     sx={{ opacity: open ? 1 : 0 }}
//                   />
//                 </ListItemButton>
//               </ListItem>

//               {/* <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/meetingDetails')}>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : 'auto',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <FeedIcon sx={{color:'#ffffff'}} />
//               </ListItemIcon>
//               <ListItemText primary='Meeting Form' sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem> */}

//               <ListItem
//                 disablePadding
//                 sx={{ display: "block", bgcolor: activeListItem === "/profile" ? activeListBgColor : inactiveListBgColor, }}
//                 onClick={() => handleSelectListItem("/profile")}
//               >
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <PersonIcon sx={{ color: "#ffffff" }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Profile"
//                     sx={{ opacity: open ? 1 : 0 }}
//                   />
//                 </ListItemButton>
//               </ListItem>
//             </>
//           )}

//           {userRole === "EMPLOYEE" && (
//             <>
//               <ListItem
//                 disablePadding
//                 sx={{ display: "block", bgcolor: activeListItem === "/empdashboard" ? activeListBgColor : inactiveListBgColor, }}
//                 onClick={() => handleSelectListItem("/empdashboard")}
//               >
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <DashboardIcon sx={{ color: "#ffffff" }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Dashboard"
//                     sx={{ opacity: open ? 1 : 0 }}
//                   />
//                 </ListItemButton>
//               </ListItem>

//               {/* <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/empmeeting')}> */}
//               <ListItem
//                 disablePadding
//                 sx={{ display: "block", bgcolor: activeListItem === "/meetings" ? activeListBgColor : inactiveListBgColor, }}
//                 onClick={() => handleSelectListItem("/meetings")}
//               >
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Groups3Icon sx={{ color: "#ffffff" }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Meetings"
//                     sx={{ opacity: open ? 1 : 0 }}
//                   />
//                 </ListItemButton>
//               </ListItem>

//               <ListItem
//                 disablePadding
//                 sx={{ display: "block", bgcolor: activeListItem === "/profile" ? activeListBgColor : inactiveListBgColor, }}
//                 onClick={() => handleSelectListItem("/profile")}
//               >
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <PersonIcon sx={{ color: "#ffffff" }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Profile"
//                     sx={{ opacity: open ? 1 : 0 }}
//                   />
//                 </ListItemButton>
//               </ListItem>
//             </>
//           )}
//         </List>
//       </Drawer>
//     </Box>
//   );
// }




















import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FeedIcon from "@mui/icons-material/Feed";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import Groups3Icon from "@mui/icons-material/Groups3";
import ListAltIcon from "@mui/icons-material/ListAlt";

import BusinessIcon from "@mui/icons-material/Business";
import DashboardIcon from "@mui/icons-material/Dashboard";

import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../routes/AuthContext";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidenav({ open: propOpen, onClose }) {
  const { userRole, activeListItem } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(!propOpen);
  // const [activeListItem, setActiveListItem] = useState()

  const activeListBgColor = "#2A3550"
  const inactiveListBgColor = "#141b2d"

  const handleSelectListItem = (route) => {
    navigate(route);
    // setActiveListItem(route);
    // sessionStorage.setItem('activeListItem', route)
  };

  React.useEffect(() => {
    setOpen(!propOpen);
    // const storedActiveItem = sessionStorage.getItem('activeListItem');
    // if (storedActiveItem) {
    //   setActiveListItem(storedActiveItem);
    // }
  }, [propOpen]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#141b2d",
            color: "#ffffff",
          },
        }}
      >
        <DrawerHeader>
          {/* <IconButton onClick={() => setOpen(!open)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
        </DrawerHeader>
        <List>
          {userRole === "SUPERADMIN" && (
            <>
              <ListItem
                disablePadding
                sx={{ display: "block",
                bgcolor: activeListItem === "/companyDetails" ? activeListBgColor : inactiveListBgColor,
              }}
                onClick={() => handleSelectListItem("/companyDetails")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <DashboardIcon sx={{ color: "#ffffff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Companies"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{ display: "block", bgcolor: activeListItem === "/employee" ? activeListBgColor : inactiveListBgColor, }}
                onClick={() => handleSelectListItem("/employee")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <PeopleIcon sx={{ color: "#ffffff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Employees"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {userRole === "ADMIN" && (
            <>
              <ListItem
                disablePadding
                sx={{ display: "block",
                bgcolor: activeListItem === "/empdashboard" ? activeListBgColor : inactiveListBgColor,
               }}
                onClick={() => handleSelectListItem("/empdashboard")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <HomeIcon sx={{ color: "#ffffff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dashboard"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{ display: "block", bgcolor: activeListItem === "/meetings" ? activeListBgColor : inactiveListBgColor, }}
                onClick={() => handleSelectListItem("/meetings")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <DashboardIcon sx={{ color: "#ffffff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Meetings"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{ display: "block", bgcolor: activeListItem === "/employee" ? activeListBgColor : inactiveListBgColor, }}
                onClick={() => handleSelectListItem("/employee")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <PeopleIcon sx={{ color: "#ffffff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Employees"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              {/* <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/userform')}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ListAltIcon sx={{color:'#ffffff'}} />
              </ListItemIcon>
              <ListItemText primary='Employee Form' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem> */}

              <ListItem
                disablePadding
                sx={{ display: "block", bgcolor: activeListItem === "/profile" ? activeListBgColor : inactiveListBgColor, }}
                onClick={() => handleSelectListItem("/profile")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <PersonIcon sx={{ color: "#ffffff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Profile"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              {/* <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/excelupload')}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <PersonIcon sx={{color:'#ffffff'}} />
              </ListItemIcon>
              <ListItemText primary='Excel' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem> */}
            </>
          )}

          {userRole === "RECEPTIONIST" && (
            <>
              <ListItem
                disablePadding
                sx={{ display: "block", bgcolor: activeListItem === "/dashboardreceptionist" ? activeListBgColor : inactiveListBgColor, }}
                onClick={() => handleSelectListItem("/dashboardreceptionist")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <DashboardIcon sx={{ color: "#ffffff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dashboard"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{ display: "block", bgcolor: activeListItem === "/receptionistdashboard" ? activeListBgColor : inactiveListBgColor, }}
                onClick={() => handleSelectListItem("/receptionistdashboard")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Groups3Icon sx={{ color: "#ffffff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Meeting List"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              {/* <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/meetingDetails')}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <FeedIcon sx={{color:'#ffffff'}} />
              </ListItemIcon>
              <ListItemText primary='Meeting Form' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem> */}

              <ListItem
                disablePadding
                sx={{ display: "block", bgcolor: activeListItem === "/profile" ? activeListBgColor : inactiveListBgColor, }}
                onClick={() => handleSelectListItem("/profile")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <PersonIcon sx={{ color: "#ffffff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Profile"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {userRole === "EMPLOYEE" && (
            <>
              <ListItem
                disablePadding
                sx={{ display: "block", bgcolor: activeListItem === "/empdashboard" ? activeListBgColor : inactiveListBgColor, }}
                onClick={() => handleSelectListItem("/empdashboard")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <DashboardIcon sx={{ color: "#ffffff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dashboard"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              {/* <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/empmeeting')}> */}
              <ListItem
                disablePadding
                sx={{ display: "block", bgcolor: activeListItem === "/meetings" ? activeListBgColor : inactiveListBgColor, }}
                onClick={() => handleSelectListItem("/meetings")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Groups3Icon sx={{ color: "#ffffff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Meetings"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                sx={{ display: "block", bgcolor: activeListItem === "/profile" ? activeListBgColor : inactiveListBgColor, }}
                onClick={() => handleSelectListItem("/profile")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <PersonIcon sx={{ color: "#ffffff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Profile"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </Box>
  );
}

