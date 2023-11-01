import React from 'react'
import { useState } from 'react';
import Navbar from '../global/Navbar';
import Sidebar from '../global/Sidebar';
import Grid from '@mui/material/Grid';
import { Paper, Box, Typography } from '@mui/material';
import Header from './Header';
import StatBox from './StatBox';

import HandshakeIcon from '@mui/icons-material/Handshake';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import MeetList from './experimentals/MeetList';
import MeetBarChart from './experimentals/MeetBarChart';

const EmpDashboard = () => {
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
  <Box
      // elevation={5}
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
    </Box>

  </Grid>
  <Grid item xs={12} md={12} lg={12}>
  <Box
        // elevation={5}
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
          maxWidth='100%'
          flexGrow={1}
          height="auto"
          // sx={{
          //   "& .MuiDataGrid-root": {
          //     border: 'none',
          //   },
          // //   "& .MuiDataGrid-cell": {
          // //     borderBottom: 'none',
          // //   },
          //   "& .MuiDataGrid-columnHeaders": {
          //     borderBottom: 'none',
          //   },
          // //   "& .MuiDataGrid-footerContainer": {
          // //     borderTop: 'none',
          // //   },
          // }}

          sx={{
            mb:'1.5em'
          }}
        >
            <Grid container spacing={2} mt='1px'>

                    <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Box sx={{width:'100%', background:'#1F2A40', height:'10em', display:'flex',justifyContent:'center', alignItems:'center'}}>
                    <StatBox
                      title="12,361"
                      subtitle="Total Meetings"
                      // progress="0.75"
                      // increase="+14%"
                      icon={
                        <Diversity2Icon sx={{color: '#3da58a', fontSize:"36px"}} 
                          />
          }
          />
                    </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Box sx={{width:'100%', background:'#1F2A40', height:'10em', display:'flex',justifyContent:'center', alignItems:'center'}}>
                    <StatBox
                      title="12,361"
                      subtitle="Pending Meetings"
                      // progress="0.75"
                      // increase="+14%"
                      icon={
                        <PendingActionsIcon sx={{color: '#3da58a', fontSize:"36px"}} 
                          />
          }
          />
                    </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Box sx={{width:'100%', background:'#1F2A40', height:'10em', display:'flex',justifyContent:'center', alignItems:'center'}}>
                    <StatBox
                      title="12,361"
                      subtitle="Completed Meetings"
                      // progress="0.75"
                      // increase="+14%"
                      icon={
                        <HandshakeIcon sx={{color: '#3da58a', fontSize:"36px"}} 
                          />
          }
          />
                    </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Box sx={{width:'100%', background:'#1F2A40', height:'10em', display:'flex',justifyContent:'center', alignItems:'center'}}>
                    <StatBox
                      title="12,361"
                      subtitle="Total Meeting Hours"
                      // progress="0.75"
                      // increase="+14%"
                      icon={
                        <HourglassBottomIcon sx={{color: '#3da58a', fontSize:"36px"}} 
                          />
          }
          />
                    </Box>
                    </Grid>

                    <Grid item xs={12} md={12} lg={7.5}>
                    <Box sx={{width:'100%', background:'#1F2A40', height:'32em', display:'flex',flexDirection:'column',}}>
                    <Typography variant='h5' sx={{color:'#4cceac', mt:'10px', ml:'10px'}}>Meeting Performance</Typography>
                    <Box sx={{width:'100%', height:'100%' }}>
                      <MeetBarChart />
                      </Box>
                      
                    </Box>
                    </Grid>

                    <Grid 
                    item xs={12} md={12} lg={4.5}
                    >
                      <Grid container spacing={2}>
                      <Grid item xs={12} md={6} lg={12}>
                    <Box sx={{width:'100%', background:'#1F2A40', height:'15.5em', maxHeight:'15.5em', display:'flex',flexDirection:'column', }}>
                      {/* Recent meetings tickets (with explore more dialog) */}
                      <Typography variant='h5' sx={{color:'#4cceac', mt:'10px', ml:'10px'}}>Recent Meetings</Typography>
                      <Box sx={{overflowY:'auto'}}>
                      <MeetList />
                      </Box>
                      
                    </Box>
                        </Grid>

                        <Grid item xs={12} md={6} lg={12}>
                    <Box sx={{width:'100%', background:'blue', height:'15.5em', color:'#fff'}}>
                      Meeting types count PIECHART
                    </Box>
                        </Grid>
                      </Grid>
                        
                    </Grid>

            </Grid>        

        </Box>
      </Box>

  </Grid>
</Grid>
    </Box>
    </>
  )
}

export default EmpDashboard