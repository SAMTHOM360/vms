import React from 'react'
import { Box, height } from '@mui/system'
import Grid from '@mui/material/Grid';
import Lost404 from './Lost404';
import { Link } from 'react-router-dom';
import { useAuth } from '../routes/AuthContext';

const NotFound = () => {
  const {userRole} = useAuth()
  console.log("gijdhijhih", userRole)

  let linkTo = '/';
  if (userRole === 'SUPERADMIN') {
    linkTo = '/companyDetails';
  } else if (userRole === 'ADMIN') {
    linkTo = '/empdashboard';
  } else if (userRole === 'RECEPTIONIST') {
    linkTo = '/receptionistdashboard';
  } else if (userRole === 'EMPLOYEE') {
    linkTo = '/empdashboard';
  }
  return (
<Box sx={{overflow:'hidden'}}>
<Box sx={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', mt:'10em', height:'55vh',}}>
            <Box
            sx={{
                width:'32vw',
            }}>
                <Lost404 />
            </Box>
        <Box sx={{width:'30vw'}}>
   <div>
  <h2>Sorry! We can't seem to find the resource you're looking for.</h2>
  <p>
    Please check that the Web site address is spelled correctly.
    Or go to our home page, and use the menus to navigate to a specific section.
  </p>
  <Link to={linkTo}>Go to Home</Link>
</div>
        </Box>
    </Box>
</Box>
  )
}

export default NotFound