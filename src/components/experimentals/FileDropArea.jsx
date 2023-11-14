// import React, { useState } from 'react';

// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Avatar,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { Box, Typography } from "@mui/material";
// import IconButton from "@mui/material/IconButton";
// import ImageIcon from "@mui/icons-material/Image";




// const FileDropArea = () => {
//   const [openMeetDialog, setOpenMeetDialog] = useState(true);

//   const handleMeetDialogOpen = async () => {
//     setOpenMeetDialog(true);
//   };
//   const handleMeetDialogClose = async () => {
//     setOpenMeetDialog(false);
//   };

  

//   return (
//     <>
//     {/* <Button 
//     variant='contained'
//     color='primary'
//     onClick={handleMeetDialogOpen}
//     >
//       Open
//     </Button> */}
//           <Dialog
//         open={openMeetDialog}
//         // onClose={handleMeetDialogClose}
//         PaperProps={{
//           sx: {
//             mt: "5em",
//             borderRadius: "5px",
//             width: "400px",
//             height: "550px",
//           },
//         }}
//       >
//         <DialogTitle
//           sx={{
//             textAlign: "right",
//             fontSize: "29px",
//             fontWeight: "600",
//             height: "2em",
//           }}
//         >
//           <IconButton
//             onClick={handleMeetDialogClose}
//             sx={{ mt: "-1em", mr: "-0.7em" }}
//           >
//             <CloseIcon sx={{ color: "#FF3636" }} />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent
//           sx={{
//             overflow: "hidden",
//             padding: "0",
//             position: "relative",
//             display:'flex',
//             // flexDirection:'column',
//             justifyContent:'center'
//           }}
//         >
//           <Box
//             sx={{
//               position: "absolute",
//               mt: "-3em",
//               ml: "-1em",
//               minWidth: "200%",
//               minHeight: "40%",
//               bgcolor: "cyan",
//               transform: "rotate(10deg)",
//               transformOrigin: "center",
//               // position: 'absolute',
//               // top: '50%',
//               // left: '50%',
//               // Translate the box to center it after rotation
//               // transform: 'translate(-50%, -50%) rotate(45deg)',
//             }}
//           ></Box>

//           <Box sx={{position:'absolute',top:'4em', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
//           <Avatar sx={{ width: "100px", height: "100px", }}>
//             <ImageIcon />
//             {/* <img
//               src={formData.image}
//               alt="No DP"
//               style={{ width: "100%", height: "100%", objectFit: "cover" }}
//             /> */}
//           </Avatar>
//           <Typography
//           sx={{
//             fontSize:'18px',
//             fontWeight:'550',
//             mt:'0.2em'
//           }}
//           >SAMTHOM 360</Typography>
//            <Typography
//            sx={{
//             fontSize:'12px',
//             fontWeight:'800',
//             color:'#5A5A5A'
//            }}
//            >(TCS)</Typography>  {/* if company is present */}
//           </Box>

//           <Box
//           sx={{
//             bgcolor:'orange',
//             width:'100%',
//             height:'200px',
//             // position:'relative',
//             mt:'14em',
//             pt:'0.5em',
//             pl:'1em',
//           }}
//           >
//             <Typography>Meeting Type: INTERVIEW</Typography>
//             <Typography>Meet Time: </Typography>
//             <Typography>Remarks: </Typography>
//             <Typography>Phone No.: 1234567890</Typography>
//             <Typography>Email: Abc@test.com</Typography>
//           </Box>
//         </DialogContent>
//         <DialogActions
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             mr: "1em",
//             mb: "1em",
//             ml: "1em",
//           }}
//         >
//           <Button
//             variant="contained"
//             onClick={handleMeetDialogClose}
//             // color="secondary"
//             sx={{
//               width: "6em",
//               bgcolor: "#DA2B2B",
//               "&:hover": {
//                 backgroundColor: "#9F3327",
//                 color: "white",
//               },
//             }}
//           >
//             Reject
//           </Button>
//           <Button
//             variant="contained"
//             // onClick={handleSaveEdit}
//             color="primary"
//             sx={{
//               width: "6em",
//               bgcolor: "#349E2A",
//               "&:hover": {
//                 backgroundColor: "#1B7D00",
//                 color: "white",
//               },
//             }}
//           >
//             Approve
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default FileDropArea;


















import React, { useState } from 'react';

const FileDropArea = () => {
  const [filterType, setFilterType] = useState('today');

  const generateDatePayload = () => {
    const currentDate = new Date();
    let fromDate, toDate;

    switch (filterType) {
      case 'today':
        fromDate = currentDate.toISOString().split('T')[0];
        toDate = fromDate;
        break;
      case 'thisWeek':
        const currentDayOfWeek = currentDate.getDay();
        const diffFromMonday = currentDayOfWeek - 1;
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - diffFromMonday);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        fromDate = startOfWeek.toISOString().split('T')[0];
        toDate = endOfWeek.toISOString().split('T')[0];
        break;
      case 'thisMonth':
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        fromDate = formatDate(firstDayOfMonth);
        toDate = formatDate(lastDayOfMonth);
        break;
      // Add more cases for other filters if needed

      default:
        // Default case
        fromDate = '';
        toDate = '';
        break;
    }

    const payload = {
      user: {
        id: 3, // Your user ID
      },
      fromDate,
      toDate,
    };

    console.log(payload); 
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <button onClick={() => setFilterType('today')}>Today</button>
      <button onClick={() => setFilterType('thisWeek')}>This Week</button>
      <button onClick={() => setFilterType('thisMonth')}>This Month</button>
      {/* Add more buttons for other filters if needed */}
      <button onClick={generateDatePayload}>Generate Payload</button>
    </div>
  );
};

export default FileDropArea;
