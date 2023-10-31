import React from 'react'
import { useState } from 'react';
import Navbar from '../global/Navbar';
import Sidebar from '../global/Sidebar';
import Grid from '@mui/material/Grid';
import { Paper, Box } from '@mui/material';
import Header from './Header';

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
                        <Box sx={{width:'100%', background:'orange', height:'10em'}}>

                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Box sx={{width:'100%', background:'orange', height:'10em'}}>

</Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Box sx={{width:'100%', background:'orange', height:'10em'}}>

</Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Box sx={{width:'100%', background:'orange', height:'10em'}}>

</Box>
                    </Grid>

                    <Grid item xs={12} md={12} lg={7.5}>
                    <Box sx={{width:'100%', background:'orange', height:'32em'}}>

</Box>
                    </Grid>

                    <Grid 
                    item xs={12} md={12} lg={4.5}
                    >
                        <Grid item xs={6} md={6} lg={12}>
                    <Box sx={{width:'100%', background:'orange', height:'15.5em', mb:'1em'}}></Box>
                        </Grid>

                        <Grid item xs={6} md={6} lg={12}>
                    <Box sx={{width:'100%', background:'blue', height:'15.5em'}}></Box>
                        </Grid>
                        
                    </Grid>
                    

                                
            </Grid>        

        </Box>
      </Paper>

  </Grid>
</Grid>
    </Box>
    </>
  )
}

export default EmpDashboard