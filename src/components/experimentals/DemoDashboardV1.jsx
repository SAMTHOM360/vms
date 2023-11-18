import React from 'react'
import { useState } from 'react';
import Navbar from '../../global/Navbar';
import Sidebar from '../../global/Sidebar';
import Grid from '@mui/material/Grid';
import { Paper, Box } from '@mui/material';
import Header from '../Header';
import Loader from '../Loader';

const DemoDashboardV1 = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

  return (
    <>
    <Navbar toggleSidebar={toggleSidebar}/>
    <Box sx={{display:"flex", flexGrow: 1, p: 3, pl:'4em'}}>
        <Sidebar open={sidebarOpen} />
        <Grid container spacing={2}>
  <Grid item xs={12} md={12} lg={12}>
  <Paper
      elevation={5}
      sx={{
        display:'flex',
        justifyContent:'space-between',
        // width:'100%',
      height:'4.5em',
      mt:'3em',
      mb:'0.5em' 
      }}
      >
        <Header title="Dashboard" subtitle="Welcome to dashboard" />
    </Paper>

  </Grid>
  <Grid item xs={12} md={12} lg={12}>
  <Paper
        elevation={5}
        sx={{
          // width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          m="20px 0 0 0"
          // display='flex'
          // width="100%"
          maxWidth='90%'
          flexGrow={1}
          height="75vh"


          sx={{
            mb:'1.5em'
          }}
        >
            <div style={{display:'flex', justifyContent:'center',marginTop:'5em', fontSize:'54px'}}>This is Dashboard section</div>
          

        </Box>
      </Paper>

  </Grid>
</Grid>
    </Box>
    </>
  )
}

export default DemoDashboardV1