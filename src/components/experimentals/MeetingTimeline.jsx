import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Chip from '@mui/material/Chip';


export default function MeetingTimeline() {
  return (
    <Timeline position="right"  sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Box sx={{padding: "6px 16px",
    borderRadius: "5px",
    marginBottom: "15px", bgcolor:'white', display:'flex'}}>
        <Box sx={{width:'7%', bgcolor:'#E26F03', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Avatar sx={{width:'35px', height:'35px'}}>
            <ImageIcon />
          </Avatar>
        </Box>

        <Box sx={{width:'60%'}}>
        <Typography sx={{fontWeight:'550', bgcolor:'#038FE2'}}>Nikhil Khuntia (TCS)</Typography>
        <Typography sx={{color:'grey', fontSize:'15px', bgcolor:'#03E2A5'}}>5.30 PM</Typography>
        </Box>

        <Box sx={{display:'flex',  justifyContent:'right', alignItems:'center', width:'33%', bgcolor:'red'}}>
        <Chip label="success" color="success" />
        </Box>


          </Box>
        </TimelineContent>
      </TimelineItem>


      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="success" />
        </TimelineSeparator>
        <TimelineContent>Success</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}