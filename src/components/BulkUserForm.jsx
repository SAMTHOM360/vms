// import React, { useState, useEffect, useCallback } from "react";
// import { useAuth } from "../routes/AuthContext";
// import axios from "axios";
// import { Box } from "@mui/system";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import Grid from "@mui/material/Grid";
// import { toast } from "react-toastify";
// import excelFile from "../assets/MultiuserTemplate.xlsx";

// import Navbar from "../global/Navbar";
// import Sidebar from "../global/Sidebar";
// import Loader from "./Loader";
// import Header from "./Header";
// import { useNavigate } from "react-router-dom";
// import { Divider, Paper, Typography } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import CircularProgress from "@mui/material/CircularProgress";

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";

// const BulkUserForm = () => {
//     const { isLimitReached } = useAuth();

//     // console.log("isLimitReached", isLimitReached)
//     // const BASE_URL = "http://192.168.12.58:8080/api/user";
//     const BASE_URL = "http://192.168.12.54:8080/api/user";
//     const navigate = useNavigate();

//     const token = sessionStorage.getItem("token");
//     const loggedUserRole = sessionStorage.getItem("loggedUserRole");
//     const companyId = sessionStorage.getItem("companyId");
//     const companyName = sessionStorage.getItem("companyName");

//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };

//     const excelHeaders = {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     };

//   return (
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               // justifyContent:'flex-start',
//               alignItems: "center",
//               width: "100%",
//               height: "75vh",
//               paddingTop: "2em",
//               flexGrow:1,
//             }}
//           >
//             <Paper
//        elevation={1}
//        sx={{
//            display: 'flex',
//            justifyContent: 'center',
//            width:'50%',
//           //  height: '4.5em',
//           //  mt: '3em',
//            mb: '0.5em'
//        }}
//        >
//             <Box sx={{ width: "95%",
//             // bgcolor: "#EBEBEB",
//             margin:'2em'
//             }}>
//               <Box
//                     className={`file-drop-area ${isDragging ? 'dragging' : ''}`}
//                     onDragOver={handleDragOver}
//                     onDragLeave={handleDragLeave}
//                     onDrop={handleDrop}
//                 sx={{
//                   bgcolor: "#EBEBEB",
//                   width: "100%",
//                   height: "15em",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   borderRadius: "5px 5px 0 0",
//                   border: "2px dashed #A6A6A6",
//                   borderBottom: "none",
//                 }}
//               >
//                 {isFileSelected
//                   ? isFileSelected
//                   : "You can Drag & Drop or Press \"+\" to add file"}
//               </Box>

//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "row",
//                   width: "100%",
//                   bgcolor: "#F7F7F7",
//                   borderRadius: "0 0 5px 5px",
//                   border: "2px dashed #A6A6A6",
//                   borderTop:"none",
//                   // mb:'2em'
//                 }}
//               >
//                 <Box sx={{ width: "85px", mr: "10px" }}>
//                   <Button
//                     variant="contained"
//                     component="label"
//                     sx={{
//                       width: "100%",
//                       height: "44px",
//                       borderRadius: "0px",
//                       bgcolor: isUpload ? "#FF503B" : "#45D836",
//                       "&:hover": {
//                         backgroundColor: isUpload? "#922F24" : "#1B7D00",
//                         color: "white",
//                       },
//                       boxShadow: "none",
//                       elevation: 0,
//                     }}
//                     // onChange={isUpload ? null : handleChooseFile } // Conditionally set onChange
//                     onClick={isUpload ? handleCancel : undefined} // Conditionally set onClick
//                   >
//                     <AddIcon
//                       sx={{
//                         fontSize: "40px",
//                         transform: isUpload ? "rotate(45deg)" : "none",
//                         transition: "transform 500ms ease-in-out",
//                       }}
//                     />
//                     {isUpload ? '' : (
//                       <input
//                         type="file"
//                         hidden
//                         id="fileInputExcel"
//                         onChange={handleChooseFile}
//                       />
//                     )}
//                   </Button>
//                 </Box>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     color: "#ACACAC",
//                     width: "80%",
//                   }}
//                 >
//                   <Typography>Add your excel file here.</Typography>
//                 </Box>
//               </Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   alignItems: "center",
//                   color: "#8A8A8A",
//                   width: "100%",
//                   mb: "2em",
//                 }}
//               >
//                 <Typography>
//                   What to upload?{" "}
//                   <a
//                     href={excelFile}
//                     download="Multiuser Template.xlsx"
//                     style={{ color: "#5A5A5A" }}
//                   >
//                     Get Template
//                   </a>
//                 </Typography>
//               </Box>

//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   mb: "2em",
//                   paddingX: "1em",
//                 }}
//               >
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   sx={{ width: "9em", height: "44px" }}
//                   onClick={handleBack}
//                 >
//                   Back
//                 </Button>

//                 <Button
//                   variant="contained"
//                   color="primary"
//                   disabled={!isUpload}
//                   sx={{
//                     width: "9em",
//                     height: "44px",
//                     pointerEvents: btnLoading ? "none" : "auto",
//                     backgroundColor: btnLoading
//                       ? "rgba(0, 0, 0, 0.12)"
//                       : "primary.main",
//                     "&:hover": {
//                       backgroundColor: btnLoading
//                         ? "rgba(0, 0, 0, 0.12)"
//                         : "primary.dark", // Change color on hover
//                     },
//                   }}
//                   onClick={handleSaveUpload}
//                 >
//                   {btnLoading ? (
//                     <>
//                       <CircularProgress
//                         size="2em"
//                         // sx={{ color: "rgba(0, 0, 0, 0.5)" }}
//                       />
//                     </>
//                   ) : (
//                     "Upload"
//                   )}
//                 </Button>
//               </Box>

//               <Box sx={{ mb: "2em" }}>
//                 <TableContainer>
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Total Records</TableCell>
//                         <TableCell>Successfully Added</TableCell>
//                         <TableCell>Unsuccessfully Added</TableCell>
//                         <TableCell>Duplicate Data</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       <TableRow>
//                         <TableCell>
//                           {excelDownData.totalElement || "0"}
//                         </TableCell>
//                         <TableCell>
//                           {excelDownData.successfullyAdded || "0"}
//                         </TableCell>
//                         <TableCell>
//                           {excelDownData.falidData || "0"}
//                         </TableCell>
//                         <TableCell>
//                           {excelDownData.duplicateData || "0"}
//                         </TableCell>
//                       </TableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Box>

//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   width: "100%",
//                   mb: "2em",
//                 }}
//               >
//                 <Button
//                   variant="contained"
//                   // component="label"
//                   disabled={!isDownload}
//                   color="error"
//                   sx={{ width: "9em", height: "44px" }}
//                   onClick={handleDownloadExcel}
//                 >
//                   Download
//                 </Button>
//               </Box>
//             </Box>
//           </Paper>
//           </Box>

//   )
// }

// export default BulkUserForm

