// import React from 'react'
// import { Box, height } from '@mui/system'
// import Grid from '@mui/material/Grid';
// import Lost404 from './Lost404';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../routes/AuthContext';
// import winndowImg from '../assets/spaceWindow.png'

// const NotFound = () => {
//   const {userRole} = useAuth()
//   console.log("gijdhijhih", userRole)

//   let linkTo = '/';
//   if (userRole === 'SUPERADMIN') {
//     linkTo = '/companyDetails';
//   } else if (userRole === 'ADMIN') {
//     linkTo = '/empdashboard';
//   } else if (userRole === 'RECEPTIONIST') {
//     linkTo = '/receptionistdashboard';
//   } else if (userRole === 'EMPLOYEE') {
//     linkTo = '/empdashboard';
//   }
//   return (
// <Box sx={{overflow:'hidden', bgcolor:'orange',
// background: '#57082C',
// background: "linear-gradient(90deg, rgba(87,8,44,1) 0%, rgba(2,0,36,1) 46%)",
// width:'100vw', height:'100vh',}}>
// <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', mt:'10em', height:'55vh',}}>
//             <Box
//             sx={{
//                 width:'32vw',
//             }}>
//                 <Lost404 />
//             </Box>
//         <Box sx={{width:'30vw'}}>
//    <div>
//   <h2>Sorry! We can't seem to find the resource you're looking for.</h2>
//   <p>
//     Please check that the Web site address is spelled correctly.
//     Or go to our home page, and use the menus to navigate to a specific section.
//   </p>
//   <Link to={linkTo}>Go to Home</Link>
// </div>
//         </Box>
//     </Box>
// </Box>
//   )
// }

// export default NotFound

import React from "react";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import Lost404 from "./Lost404";
import { Link } from "react-router-dom";
import { useAuth } from "../routes/AuthContext";
import winndowImg from "../assets/spaceWindow.png";

const NotFound = () => {
  const { userRole } = useAuth();

  let linkTo = "/";
  if (userRole === "SUPERADMIN") {
    linkTo = "/companyDetails";
  } else if (userRole === "ADMIN") {
    linkTo = "/empdashboard";
  } else if (userRole === "RECEPTIONIST") {
    linkTo = "/receptionistdashboard";
  } else if (userRole === "EMPLOYEE") {
    linkTo = "/empdashboard";
  }

  return (
    <Box
      sx={{
        overflow: "hidden",
        bgcolor: "#dedfe1",
        // background: "#57082C",
        // background: "linear-gradient(90deg, rgba(87,8,44,1) 0%, rgba(2,0,36,1) 46%)",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          mt: "10em",
          height: "65vh",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "32vw",
            height: "100%",
            overflow: "hidden",
            background: "#57082C",
            background: "linear-gradient(90deg, rgba(87,8,44,1) 0%, rgba(2,0,36,1) 46%)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "35em",
              top: "5em",
              left: "2.5em",
            }}
          >
            <Lost404 />
          </Box>
          <img
            src={winndowImg}
            alt="Window"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box sx={{ width: "30vw" }}>
          <div>
            <h2>
              Sorry! We can't seem to find the resource you're looking for.
            </h2>
            <p>
              Please check that the Web site address is spelled correctly. Or go
              to our home page, and use the menus to navigate to a specific
              section.
            </p>
            <Link to={linkTo}>Go to Home</Link>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
