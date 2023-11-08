// import * as React from 'react';
// import Timeline from '@mui/lab/Timeline';
// import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
// import TimelineSeparator from '@mui/lab/TimelineSeparator';
// import TimelineConnector from '@mui/lab/TimelineConnector';
// import TimelineContent from '@mui/lab/TimelineContent';
// import TimelineDot from '@mui/lab/TimelineDot';
// import { Box, Typography } from '@mui/material';
// import Avatar from '@mui/material/Avatar';
// import ImageIcon from '@mui/icons-material/Image';
// import Chip from '@mui/material/Chip';


// export default function MeetingTimeline() {
//   return (
//     <Timeline position="right"  sx={{
//         [`& .${timelineItemClasses.root}:before`]: {
//           flex: 0,
//           padding: 0,
//         },
//       }}>

//       <TimelineItem>
//         <TimelineSeparator>
//           <TimelineDot color="success" />
//           <TimelineConnector />
//         </TimelineSeparator>
//         <TimelineContent>
//           <Box sx={{padding: "6px 16px",
//     borderRadius: "5px",
//     marginBottom: "15px", color:'white', bgcolor:'#2D3E5F', display:'flex'}}>
//         <Box sx={{width:'7%', bgcolor:'', display:'flex', justifyContent:'center', alignItems:'center'}}>
//         <Avatar sx={{width:'35px', height:'35px'}}>
//             <ImageIcon />
//           </Avatar>
//         </Box>

//         <Box sx={{width:'60%', ml:'0.5em'}}>
//         <Typography sx={{fontWeight:'550', bgcolor:''}}>Nikhil Khuntia</Typography>
//         <Box sx={{display:'flex'}}>
//         <Typography sx={{color:'#959697', fontSize:'15px', bgcolor:''}}>01 NOV | 5.30 PM-6.30 PM</Typography>
//         </Box>
//         </Box>

//         <Box sx={{display:'flex',  justifyContent:'right', alignItems:'center', width:'33%', bgcolor:''}}>
//         <Chip label="Business" sx={{color:'#6CD221', bgcolor:'#6CD2211f'}} />
//         </Box>


//           </Box>
//         </TimelineContent>
//       </TimelineItem>

//       <TimelineItem>
//         <TimelineSeparator>
//           <TimelineDot color="error" />
//           <TimelineConnector />
//         </TimelineSeparator>
//         <TimelineContent>
//           <Box sx={{padding: "6px 16px",
//     borderRadius: "5px",
//     marginBottom: "15px", color:'white', bgcolor:'#2D3E5F', display:'flex'}}>
//         <Box sx={{width:'7%', bgcolor:'', display:'flex', justifyContent:'center', alignItems:'center'}}>
//         <Avatar sx={{width:'35px', height:'35px'}}>
//             <ImageIcon />
//           </Avatar>
//         </Box>

//         <Box sx={{width:'60%', ml:'0.5em'}}>
//         <Typography sx={{fontWeight:'550', bgcolor:''}}>Nikhil Khuntia</Typography>
//         <Box sx={{display:'flex'}}>
//         <Typography sx={{color:'#959697', fontSize:'15px', bgcolor:''}}>01 NOV | 5.30 PM-6.30 PM</Typography>
//         </Box>
//         </Box>

//         <Box sx={{display:'flex',  justifyContent:'right', alignItems:'center', width:'33%', bgcolor:''}}>
//         <Chip label="Casual" sx={{color:'#F9E927', bgcolor:'#F9E9271f'}} />
//         </Box>


//           </Box>
//         </TimelineContent>
//       </TimelineItem>

//       <TimelineItem>
//         <TimelineSeparator>
//           <TimelineDot color="success" />
//           {/* <TimelineConnector /> */}
//         </TimelineSeparator>
//         <TimelineContent>
//           <Box sx={{padding: "6px 16px",
//     borderRadius: "5px",
//     marginBottom: "15px", color:'white', bgcolor:'#2D3E5F', display:'flex'}}>
//         <Box sx={{width:'7%', bgcolor:'', display:'flex', justifyContent:'center', alignItems:'center'}}>
//         <Avatar sx={{width:'35px', height:'35px'}}>
//             <ImageIcon />
//           </Avatar>
//         </Box>

//         <Box sx={{width:'60%', ml:'0.5em'}}>
//         <Typography sx={{fontWeight:'550', bgcolor:''}}>Nikhil Khuntia</Typography>
//         <Box sx={{display:'flex'}}>
//         <Typography sx={{color:'#959697', fontSize:'15px', bgcolor:''}}>01 NOV | 5.30 PM-6.30 PM</Typography>
//         </Box>
//         </Box>

//         <Box sx={{display:'flex',  justifyContent:'right', alignItems:'center', width:'33%', bgcolor:''}}>
//         <Chip label="InterView" sx={{color:'#FF8A52', bgcolor:'#FF8A521f'}} />
//         </Box>


//           </Box>
//         </TimelineContent>
//       </TimelineItem>

//     </Timeline>
//   );
// }
















import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Chip from '@mui/material/Chip';
import { TimelineConnector } from '@mui/lab';
import { useState } from 'react';

export default function MeetingTimeline({ timelineApiData }) {

  if (!timelineApiData || timelineApiData.length === 0) {
    return null;
  }

  function formatMeetingStartDateTime(timestamp) {
    if (timestamp === '') {
      return ' N/A';
    }
    const date = new Date(timestamp);
  
    const meetingDate = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
    const meetingStartTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    
    return `${meetingDate} | ${meetingStartTime}`;
  }

  function formatMeetingEndDateTime(timestamp) {
    if (timestamp === '') {
      return ' N/A';
    }
  
    const date = new Date(timestamp);
    const meetingEndTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  
    return ` ${meetingEndTime}`;
  }


  return (
    <Timeline position="right" sx={{
      [`& .${timelineItemClasses.root}:before`]: {
        flex: 0,
        padding: 0,
      },
    }}>
      {timelineApiData.map((dataItem, index) => {


const meetingStartDateTime = dataItem.meetingStartDateTime || '';
const meetingEndDateTime = dataItem.meetingEndDateTime || '';
const formattedMeetingStartDateTime = formatMeetingStartDateTime(meetingStartDateTime);
const formattedMeetingEndDateTime = formatMeetingEndDateTime(meetingEndDateTime)
// console.log(formattedMeetingDateTime);

let dotColor = 'grey'
if(dataItem){
  if(dataItem.status === 'COMPLETED'){
    dotColor = '#34E60C'
  } else if(dataItem.status === 'CANCELLED'){
  dotColor = 'red'
}
}

let chipText = 'Others'
let chipColor = '#E9E9E9';
let chipBgColor = '#E2E2E21f';
if (dataItem) {
  if (dataItem.context === 'BUSINESS') {
    chipText = 'Business'
    chipColor = '#6CD221';
    chipBgColor = '#6CD2211f';
  } else if (dataItem.context === 'CASUAL') {
    chipText = 'Casual'
    chipColor = '#F9E927';
    chipBgColor = '#F9E9271f';
  } else if (dataItem.context === 'INTERVIEW') {
    chipText = 'Interview'
    chipColor = '#FF8A52';
    chipBgColor = '#FF8A521f';
  }
}

        if (dataItem && (dataItem.status === 'COMPLETED' || dataItem.status === 'CANCELLED')) {

          // console.log("dataitem data", dataItem)

          return (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot  sx={{
                  background: dotColor,
                }}/>
                {index !== timelineApiData.length - 2 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Box sx={{ padding: "6px 16px", borderRadius: "5px", marginBottom: "15px", color: 'white', bgcolor: '#2D3E5F', display: 'flex' }}>
                  <Box sx={{ width: '7%', bgcolor: '', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar sx={{ width: '35px', height: '35px' }}>
                      {/* <ImageIcon /> */}
                      <img src={dataItem.visitor.imageUrl} alt="No DP" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </Avatar>
                  </Box>
                  <Box sx={{ width: '60%', ml: '0.5em' }}>
                    <Typography sx={{ fontWeight: '550', bgcolor: '' }}>{dataItem.visitor.name}</Typography>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ color: '#959697', fontSize: '15px', bgcolor: '' }}>{formattedMeetingStartDateTime} -{formattedMeetingEndDateTime}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center', width: '33%', bgcolor: '' }}>
                    <Chip label={chipText} sx={{ color: chipColor, bgcolor: chipBgColor }} />
                  </Box>
                </Box>
              </TimelineContent>
            </TimelineItem>
          );
        }
        return null;
      })}
    </Timeline>
  );
}
