import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';


import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import StarBorder from '@mui/icons-material/StarBorder';

// -----------------------------------------------------------------------


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';


// ---------------------------------------------------------------------------
export default function MeetList() {

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    };


  return (
    <>
   
    <List sx={{ width: '100%',  
    // bgcolor: '#1F2A40',  
    }}>
      <ListItem onClick={handleClick}>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Photos" secondary="Jan 9, 2014"   sx={{
    '& .MuiListItemText-primary': {
      color: 'white', // Set the primary text color to white
    },
    '& .MuiListItemText-secondary': {
      color: 'grey', // Set the secondary text color to grey
    },
  }} />
   {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>

      <Divider variant="inset" component="li"   sx={{
    backgroundColor: 'grey',
  }} />
    </List>

<Accordion   sx={{
    backgroundColor: '#1F2A40',
    color:'#fff',
    borderBottom: '1px solid grey',

        '& .MuiAccordionSummary-expandIcon': {
          color: 'white',
        },
  }}>
<AccordionSummary
  expandIcon={<ExpandMoreIcon sx={{color:'white'}} />}
  aria-controls="panel1a-content"
  id="panel1a-header"
>
<Box sx={{width:'50px', display:'flex', justifyContent:'center', alignItems:'center'}} >
<Avatar>
            <ImageIcon />
          </Avatar>
</Box>
<Box>                  <ListItemText primary="Photos" secondary="Jan 9, 2014"   sx={{
    '& .MuiListItemText-primary': {
      color: 'white', // Set the primary text color to white
    },
    '& .MuiListItemText-secondary': {
      color: 'grey', // Set the secondary text color to grey
    },
  }} /></Box>
</AccordionSummary>
<AccordionDetails>
  <Typography>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    malesuada lacus ex, sit amet blandit leo lobortis eget.
  </Typography>
</AccordionDetails>
</Accordion>

<Accordion   sx={{
    backgroundColor: '#1F2A40',
    color:'#fff',
    borderBottom: '1px solid grey',
  }}>
<AccordionSummary
  expandIcon={<ExpandMoreIcon sx={{color:'white'}} />}
  aria-controls="panel1a-content"
  id="panel1a-header"
>
<Box sx={{width:'50px', display:'flex', justifyContent:'center', alignItems:'center'}} >
<Avatar>
            <ImageIcon />
          </Avatar>
</Box>
<Box>                  <ListItemText primary="Photos" secondary="Jan 9, 2014"   sx={{
    '& .MuiListItemText-primary': {
      color: 'white', // Set the primary text color to white
    },
    '& .MuiListItemText-secondary': {
      color: 'grey', // Set the secondary text color to grey
    },
  }} /></Box>
</AccordionSummary>
<AccordionDetails>
  <Typography>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    malesuada lacus ex, sit amet blandit leo lobortis eget.
  </Typography>
</AccordionDetails>
</Accordion>

<Accordion   sx={{
    backgroundColor: '#1F2A40',
    color:'#fff',
    borderBottom: '1px solid grey',
  }}>
<AccordionSummary
  expandIcon={<ExpandMoreIcon sx={{color:'white'}} />}
  aria-controls="panel1a-content"
  id="panel1a-header"
>
<Box sx={{width:'50px', display:'flex', justifyContent:'center', alignItems:'center'}} >
<Avatar>
            <ImageIcon />
          </Avatar>
</Box>
<Box>                  <ListItemText primary="Photos" secondary="Jan 9, 2014"   sx={{
    '& .MuiListItemText-primary': {
      color: 'white', // Set the primary text color to white
    },
    '& .MuiListItemText-secondary': {
      color: 'grey', // Set the secondary text color to grey
    },
  }} /></Box>
</AccordionSummary>
<AccordionDetails>
  <Typography>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    malesuada lacus ex, sit amet blandit leo lobortis eget.
  </Typography>
</AccordionDetails>
</Accordion>

</>
  );
}