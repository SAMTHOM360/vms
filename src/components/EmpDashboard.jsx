import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from '../global/Navbar';
import Sidebar from '../global/Sidebar';
import Grid from '@mui/material/Grid';
import { Paper, Box, Typography, Button } from '@mui/material';
import Header from './Header';
import StatBox from './StatBox';

import HandshakeIcon from '@mui/icons-material/Handshake';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import MeetList from './experimentals/MeetList';
import MeetBarChart from './experimentals/MeetBarChart';
import MeetingTimeline from './experimentals/MeetingTimeline';
import TimelineDot from '@mui/lab/TimelineDot';
import axios from 'axios';

const EmpDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [dashboardData, setDashboardData] = useState({
      totalMeetings: '',
          completedMeetings: '',
          pendingMeetings: '' ,
          totalMeetngHours: '',

    })
    const [barchartData, setBarchartData] = useState(null)
    const [timelineData, setTimelineData] = useState(null)



    const adminId = localStorage.getItem('adminId')

    // const BASE_URL1 = 'http://192.168.12.58:8080/api'
    const BASE_URL1 = 'http://192.168.12.54:8080/api'
    const BASE_URL = 'http://192.168.12.54:8080/api'
    


    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

    async function fetchData() {
      try{
        const dashboardResponse = await axios.get(`${BASE_URL1}/meeting/userdashboard?userId=${adminId}`)
        const dashboardTimelineResponse = await axios.get(`${BASE_URL1}/meeting/vis?id=${adminId}`)
        // const userPresentResponse = await axios.get(`${BASE_URL1/user/prese}`)

        const dashboardApiData = dashboardResponse.data.data
        const timelineApiData = dashboardTimelineResponse.data.data
        
        // console.log("DB API DATA", dashboardApiData)
        // console.log("Timeline API DATA", dashboardTimelineResponse.data.data)

        const transformedData = Object.keys(dashboardApiData.meetingsContextDate).map((date) => ({
          date: date,
          ...dashboardApiData[date],
        }));
        

        if(dashboardResponse.status === 200) {

        setBarchartData(dashboardApiData.meetingsContextDate)
        setTimelineData(timelineApiData)

        let hours = dashboardApiData.totalHoursOfMeeting / 3600000
        let hoursFloat = Math.round(hours * 100) / 100

        setDashboardData({
          totalMeetings: dashboardApiData.totalMeetings || '',
          completedMeetings: dashboardApiData.completed || '',
          pendingMeetings: dashboardApiData.pending || '' ,
          totalMeetngHours: hoursFloat || '', 
        })
        
        }
        
      } catch(error){
        console.error('Error fetching data:', error);
      }
    }
    // console.log("dashboard data", dashboardData)
    useEffect(() => {
      fetchData()
    },[])

    // console.log("Bar chart Data", barchartData)
    // console.log("Time Line Data", timelineData)

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
                      title={dashboardData.totalMeetings|| '0'}
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
                      title={dashboardData.pendingMeetings || '0'}
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
                      title={dashboardData.completedMeetings || '0'}
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
                      title={dashboardData.totalMeetngHours || '0'}
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
                    <Typography variant='h5' sx={{color:'#4cceac', mt:'10px', ml:'10px'}}>Meeting Counts</Typography>
                    <Box sx={{width:'95%', height:'100%', }}>
                      <MeetBarChart data={barchartData} />
                      </Box>
                      
                    </Box>
                    </Grid>

                    <Grid 
                    item xs={12} md={12} lg={4.5}
                    >

<Box sx={{width:'100%', background:'#1F2A40',height:'32em', display:'flex',flexDirection:'column', }}>
                      {/* Recent meetings tickets (with explore more dialog) */}
                      <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <Typography variant='h5' sx={{color:'#4cceac', mt:'10px', ml:'10px'}}>Activity Timeline</Typography>
                      <Box sx={{display:'flex',alignItems:'center', mt:'0.5em',mr:'1em', color:'#C1C1C1', fontSize:'14px'}}>
                      <span style={{width:'12px', height:'12px', backgroundColor:'#34E60C', borderRadius:'50%',display:'inline-block'}}></span> <span style={{width:'3px'}}></span> Completed <span style={{width:'10px'}}></span> <span style={{width:'12px', height:'12px', backgroundColor:'red', borderRadius:'50%',display:'inline-block'}}></span> <span style={{width:'3px'}}></span> Rejected
                      </Box>
                      </Box>
                      <Box sx={{overflowY:'auto', width:'100%', mb:'1em',}}>
                      {/* <MeetList /> */}
                      <MeetingTimeline timelineApiData={timelineData} />
                      </Box>
                      
                    </Box>
                      {/* <Grid container spacing={2}>
                      <Grid item xs={12} md={6} lg={12}>
                    <Box sx={{width:'100%', background:'#1F2A40', height:'15.5em', maxHeight:'15.5em', display:'flex',flexDirection:'column', }}>
                      <Typography variant='h5' sx={{color:'#4cceac', mt:'10px', ml:'10px'}}>Activity Timeline</Typography>
                      <Box sx={{overflowY:'auto', width:'100%', mb:'1em',}}>
                      <MeetingTimeline />
                      </Box>
                      
                    </Box>
                        </Grid>

                        <Grid item xs={12} md={6} lg={12}>
                    <Box sx={{width:'100%', background:'blue', height:'15.5em', color:'#fff'}}>
                      Meeting types count PIECHART
                    </Box>
                        </Grid>
                      </Grid> */}
                        
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