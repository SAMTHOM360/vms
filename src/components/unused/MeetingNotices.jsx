import React from 'react'
import { useState } from 'react';
import Navbar from '../../global/Navbar';
import Sidebar from '../../global/Sidebar';
import Grid from '@mui/material/Grid';
import { Paper, Box } from '@mui/material';
import Header from '../Header';

const MeetingNotices = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

  return (
    <>
    <Navbar toggleSidebar={toggleSidebar}/>
    <Box sx={{display:"flex", flexGrow: 1, p: 3}}>
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
        <Header title="Meetings" subtitle="Get your latest meeting updates" />
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
          background:'cyan'
        }}
      >
        <Box
        //   m="20px 0 0 0"
        //   // display='flex'
        //   // width="100%"
        //   maxWidth='90%'
        //   flexGrow={1}
        //   height="75vh"
          sx={{
            // m:'20px 0 0 0',
            // mt:'1.2em',
             maxWidth:'100%', display:'flex',flexGrow:1, height:'78.2vh', background:'yellow', position:'relative'
          }}
        >
            <Box sx={{position:'relative', flex:'30%', background:'#c12e14'}}> <p>Left container</p></Box>
            <Box sx={{position:'relative', flex:'70%'}}><p>Right container</p></Box>

            {/* <div style={{display:'flex', justifyContent:'center',marginTop:'5em', fontSize:'54px'}}>This is Meeting updates section</div> */}
          

        </Box>
      </Paper>

  </Grid>
</Grid>
    </Box>
    </>
  )
}

export default MeetingNotices