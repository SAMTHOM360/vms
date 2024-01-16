import React from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineIcon from '@mui/icons-material/Timeline';
import "../../css/Timeline.css";

const TrailModal = ({ onClose }) => {
  return (
    <Modal
      open={true} // Set to true to open the modal
      onClose={onClose}
    //   closeAfterTransition
    //   BackdropComponent={Backdrop}
    //   BackdropProps={{
    //     timeout: 500,
    //   }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* <Fade > */}
      <Paper style={{ padding: '20px', maxWidth: '400px', width: '100%' }}>
          <Typography variant="h5" gutterBottom>
         Meeting Trail
          </Typography>

          {/* Timeline Component */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Timeline>
              <TimelineItem sx={{alignItems:"center",justifyContent:"center"}}>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <TimelineIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography>Event 1</Typography>
                  <Typography>Event details go here...</Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineSeparator sx={{}}>
                  <TimelineDot color="primary">
                    <TimelineIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography>Event 2</Typography>
                  <Typography>Event details go here...</Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>

          {/* Close button */}
          <Button variant="outlined" onClick={onClose} style={{ marginTop: '20px' }}>
            Close
          </Button>
        </Paper>
      {/* </Fade> */}
    </Modal>
  );
};

export default TrailModal;
