// hello from harsh
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Tooltip,
// } from '@mui/material';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import BadgeIcon from '@mui/icons-material/Badge';

// import axios from 'axios';

// const BASE_URL = 'http://192.168.12.58:8080/api/user';

// // Function to get the token from local storage
//   const AuthToken = sessionStorage.getItem('token'); // Replace 'token' with your actual token key.


// const Employee = () => {
//   const [rows, setRows] = useState([]);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [editedItem, setEditedItem] = useState(null);

//   const columns = [
//     // {
//     //   field: 'id',
//     //   headerName: 'ID',
//     //   flex: 0.5,
//     //   width: '100%',
//     //   renderCell: (params) => (
//     //     <Tooltip title={params.row.id}>
//     //       <span>{params.row.id}</span>
//     //     </Tooltip>
//     //   ),
//     // },
//     {
//       field: 'firstname',
//       headerName: 'First Name',
//       flex: 1,
//       cellClassName: 'name-column--cell',
//       renderCell: (params) => (
//         <Tooltip title={params.row.firstname}>
//           <span>{params.row.firstname}</span>
//         </Tooltip>
//       ),
//     },{
//       field: 'lastname',
//       headerName: 'Last Name',
//       flex: 1,
//       cellClassName: 'name-column--cell',
//       renderCell: (params) => (
//         <Tooltip title={params.row.lastname}>
//           <span>{params.row.lastname}</span>
//         </Tooltip>
//       ),
//     },
//     {
//       field: 'email',
//       headerName: 'Email',
//       flex: 1,
//       renderCell: (params) => (
//         <Tooltip title={params.row.email}>
//           <span>{params.row.email}</span>
//         </Tooltip>
//       ),
//     },
//     {
//       field: 'phone',
//       headerName: 'Phone Number',
//       flex: 1,
//       renderCell: (params) => (
//         <Tooltip title={params.row.phone}>
//           <span>{params.row.phone}</span>
//         </Tooltip>
//       ),
//     },
//     {
//       field: 'role',
//       headerName: 'Role',
//       flex: 1,
//       renderCell: (params) => (
//         <Tooltip title={params.row.role.name}>
//           <span>{params.row.role.name}</span>
//         </Tooltip>
//       ),
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 120,
//       editable: false,
//       hide: false,
//       sortable: false,
//       filterable: false,
//       disableColumnFilter: true,
//       disableColumnMenu: true,
//       disableColumnSelector: true,
//       renderCell: (params) => (
//         <div>
//           <IconButton color="primary">
//             <BadgeIcon />
//           </IconButton>
//           <IconButton
//             color="primary"
//             onClick={() => handleEdit(params.row)}
//           >
//             <EditIcon />
//           </IconButton>
//           <IconButton
//             color="secondary"
//             onClick={() => handleDelete(params.row.id)}
//           >
//             <DeleteIcon />
//           </IconButton>
//         </div>
//       ),
//     },
//   ];

//   const axiosInstance = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${AuthToken}`, // Include the token in the headers.
//     },
//   });

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this row?')) {
//       try {
//         // Use axiosInstance to send the request with the token.
//         await axiosInstance.delete(`${BASE_URL}/delete/${id}`);
//         const updatedRows = rows.filter((row) => row.id !== id);
//         setRows(updatedRows);
//         console.log(`Deleted item with ID ${id}`);
//       } catch (error) {
//         console.error('Error deleting item:', error);
//       }
//     }
//   };

//   const handleEdit = (item) => {
//     setEditedItem(item);
//     setOpenEditDialog(true);
//   };

//   const handleEditDialogClose = () => {
//     setOpenEditDialog(false);
//   };

//   const handleSaveEdit = async () => {
//     try {
//       // Use axiosInstance to send the request with the token.
//       await axiosInstance.put(`${BASE_URL}/adduser/${editedItem.id}`, editedItem);
//       const updatedRows = rows.map((row) =>
//         row.id === editedItem.id ? editedItem : row
//       );
//       setRows(updatedRows);
//       setOpenEditDialog(false);
//       console.log(`Saved changes for item with ID ${editedItem.id}`);
//     } catch (error) {
//       console.error('Error saving changes:', error);
//     }
//   };

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // Include the token in the headers of the GET request.
//         const response = await axiosInstance.get(`${BASE_URL}/getall`, {
//           headers: {
//             Authorization: `Bearer ${AuthToken}`,
//           },
//         });
//         setRows(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     fetchData();
//   }, []);
  

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       alignItems="center"
//     >
//       <Paper
//         elevation={5}
//         sx={{
//           width: '95vw',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Box
//           m="40px 0 0 0"
//           width="95%"
//           height="75vh"
//           sx={{
//             "& .MuiDataGrid-root": {
//               border: 'none',
//             },
//             "& .MuiDataGrid-cell": {
//               borderBottom: 'none',
//             },
//             "& .MuiDataGrid-columnHeaders": {
//               borderBottom: 'none',
//             },
//             "& .MuiDataGrid-footerContainer": {
//               borderTop: 'none',
//             },
//           }}
//         >
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             components={{ Toolbar: GridToolbar }}
//           />
//         </Box>
//       </Paper>

//       <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
//         <DialogTitle>Edit Item (ID: {editedItem ? editedItem.id : ''})</DialogTitle>
//         <DialogContent>
//           {editedItem && (
//             <form>
//               <TextField
//                 sx={{ mt: '2%', mb: '2%' }}
//                 label="First Name"
//                 fullWidth
//                 value={editedItem.firstname}
//                 onChange={(e) =>
//                   setEditedItem({ ...editedItem, name: e.target.value })
//                 }
//               />
//               <TextField
//               sx={{ mt: '2%', mb: '2%' }}
//               label="Last Name"
//               fullWidth
//               value={editedItem.lastname}
//               onChange={(e) =>
//                 setEditedItem({ ...editedItem, name: e.target.value })
//               }
//             />
//               <TextField
//                 sx={{ mt: '2%', mb: '2%' }}
//                 label="Email"
//                 fullWidth
//                 value={editedItem.email}
//                 onChange={(e) =>
//                   setEditedItem({ ...editedItem, email: e.target.value })
//                 }
//               />
//               <TextField
//                 sx={{ mt: '2%', mb: '2%' }}
//                 label="Phone"
//                 fullWidth
//                 value={editedItem.phone}
//                 onChange={(e) =>
//                   setEditedItem({ ...editedItem, phone: e.target.value })
//                 }
//               />
//               <TextField
//                 sx={{ mt: '2%', mb: '2%' }}
//                 label="Role"
//                 fullWidth
//                 value={editedItem.role.name}
//                 onChange={(e) =>
//                   setEditedItem({ ...editedItem, dept: e.target.value })
//                 }
//               />
//             </form>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleEditDialogClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSaveEdit} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Employee;








// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Tooltip,
// } from '@mui/material';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import BadgeIcon from '@mui/icons-material/Badge';

// import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// const BASE_URL = 'http://192.168.12.58:8080/api/user';

// // Function to get the token from local storage
// const AuthToken = sessionStorage.getItem('token'); // Replace 'token' with your actual token key.

// const Employee = () => {
//   // const navigate = useNavigate()
//   const [rows, setRows] = useState([]);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [editedItem, setEditedItem] = useState(null);

//   const columns = [
//     {
//       field: 'firstname',
//       headerName: 'First Name',
//       flex: 1,
//       cellClassName: 'name-column--cell',
//       renderCell: (params) => (
//         <Tooltip title={params.row.firstname}>
//           <span>{params.row.firstname}</span>
//         </Tooltip>
//       ),
//     },
//     {
//       field: 'lastname',
//       headerName: 'Last Name',
//       flex: 1,
//       cellClassName: 'name-column--cell',
//       renderCell: (params) => (
//         <Tooltip title={params.row.lastname}>
//           <span>{params.row.lastname}</span>
//         </Tooltip>
//       ),
//     },
//     {
//       field: 'email',
//       headerName: 'Email',
//       flex: 1,
//       renderCell: (params) => (
//         <Tooltip title={params.row.email}>
//           <span>{params.row.email}</span>
//         </Tooltip>
//       ),
//     },
//     {
//       field: 'phone',
//       headerName: 'Phone Number',
//       flex: 1,
//       renderCell: (params) => (
//         <Tooltip title={params.row.phone}>
//           <span>{params.row.phone}</span>
//         </Tooltip>
//       ),
//     },
//     {
//       field: 'role',
//       headerName: 'Role',
//       flex: 1,
//       renderCell: (params) => (
//         <Tooltip title={params.row.role.name}>
//           <span>{params.row.role.name}</span>
//         </Tooltip>
//       ),
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 120,
//       editable: false,
//       hide: false,
//       sortable: false,
//       filterable: false,
//       disableColumnFilter: true,
//       disableColumnMenu: true,
//       disableColumnSelector: true,
//       renderCell: (params) => (
//         <div>
//           <IconButton color="primary">
//             <BadgeIcon />
//           </IconButton>
//           <IconButton
//             color="primary"
//             // onClick={() => navigate("/Userform", {state: {id: params.row.id}})}
//             onClick={() => handleEdit(params.row)}
//           >
//             <EditIcon />
//           </IconButton>
//           <IconButton
//             color="secondary"
//             onClick={() => handleDelete(params.row.id)}
//           >
//             <DeleteIcon />
//           </IconButton>
//         </div>
//       ),
//     },
//   ];

//   const axiosInstance = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${AuthToken}`, // Include the token in the headers.
//     },
//   });

//   const headers = {
//     Authorization: `Bearer ${AuthToken}`,
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this row?')) {
//       try {
//         // Use axiosInstance to send the request with the token.
//         await axiosInstance.delete(`${BASE_URL}/delete/${id}`);
//         const updatedRows = rows.filter((row) => row.id !== id);
//         setRows(updatedRows);
//         console.log(`Deleted item with ID ${id}`);
//       } catch (error) {
//         console.error('Error deleting item:', error);
//       }
//     }
//   };

//   const handleEdit = (item) => {
//     setEditedItem(item);
//     setOpenEditDialog(true);
//   };

//   const handleEditDialogClose = () => {
//     setOpenEditDialog(false);
//   };
  
//   const handleSaveEdit = async () => {
//     try {

//       const payload = {
//         firstname: editedItem.firstname,
//         lastname: editedItem.lastname,      
//         email: editedItem.email,
//         role: editedItem.role,
//         id:editedItem.id,
//         phone: editedItem.phone
//       };
      
//       console.log(headers)
//       console.log(payload.firstname)

//       // Use axiosInstance to send the request with the token.
//       await axios.post(`${BASE_URL}/getbyid/${editedItem.id}`, payload, {headers});
//       const updatedRows = rows.map((row) =>
//         row.id === editedItem.id ? { ...row, ...payload } : row
//       );
//       setRows(updatedRows);
//       setOpenEditDialog(false);
//       console.log(`Saved changes for item with ID ${editedItem.id}`);
//     } catch (error) {
//       console.error('Error saving changes:', error);
//     }
//   };

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // Include the token in the headers of the GET request.
//         const response = await axios.get(`${BASE_URL}/getall`, {
//           headers: {
//             Authorization: `Bearer ${AuthToken}`,
//           },
//         });
//         setRows(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       alignItems="center"
//     >
//       <Paper
//         elevation={5}
//         sx={{
//           width: '95vw',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Box
//           m="40px 0 0 0"
//           width="95%"
//           height="75vh"
//           sx={{
//             "& .MuiDataGrid-root": {
//               border: 'none',
//             },
//             "& .MuiDataGrid-cell": {
//               borderBottom: 'none',
//             },
//             "& .MuiDataGrid-columnHeaders": {
//               borderBottom: 'none',
//             },
//             "& .MuiDataGrid-footerContainer": {
//               borderTop: 'none',
//             },
//           }}
//         >
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             components={{ Toolbar: GridToolbar }}
//           />
//         </Box>
//       </Paper>

//       <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
//         <DialogTitle>Edit Item (ID: {editedItem ? editedItem.id : ''})</DialogTitle>
//         <DialogContent>
//           {editedItem && (
//             <form>
//               <TextField
//                 sx={{ mt: '2%', mb: '2%' }}
//                 label="First Name"
//                 fullWidth
//                 value={editedItem.firstname}
//                 onChange={(e) =>
//                   setEditedItem({ ...editedItem, firstname: e.target.value })
//                 }
//               />
//               <TextField
//                 sx={{ mt: '2%', mb: '2%' }}
//                 label="Last Name"
//                 fullWidth
//                 value={editedItem.lastname}
//                 onChange={(e) =>
//                   setEditedItem({ ...editedItem, lastname: e.target.value })
//                 }
//               />
//               <TextField
//                 sx={{ mt: '2%', mb: '2%' }}
//                 label="Email"
//                 fullWidth
//                 value={editedItem.email}
//                 onChange={(e) =>
//                   setEditedItem({ ...editedItem, email: e.target.value })
//                 }
//               />
//               <TextField
//                 sx={{ mt: '2%', mb: '2%' }}
//                 label="Phone"
//                 fullWidth
//                 value={editedItem.phone}
//                 onChange={(e) =>
//                   setEditedItem({ ...editedItem, phone: e.target.value })
//                 }
//               />
//               <TextField
//                 sx={{ mt: '2%', mb: '2%' }}
//                 label="Role"
//                 fullWidth
//                 value={editedItem.role.name}
//                 onChange={(e) =>
//                   setEditedItem({ ...editedItem, role: { name: e.target.value } })
//                 }
//               />
//             </form>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleEditDialogClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSaveEdit} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Employee;



















// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Tooltip,
//   Select,
//   MenuItem, 
//   FormControl, 
//   InputLabel,
// } from '@mui/material';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import BadgeIcon from '@mui/icons-material/Badge';
// import axios from 'axios';

// const BASE_URL = 'http://192.168.12.58:8080/api/user';

// // Function to get the token from local storage
// const AuthToken = sessionStorage.getItem('token'); // Replace 'token' with your actual token key.

// const Employee = () => {
//   // Define state variables
//   const [rows, setRows] = useState([]); // To store the data for the table
//   const [openEditDialog, setOpenEditDialog] = useState(false); // To control the edit dialog visibility
//   const [editedItem, setEditedItem] = useState(null); // To store the item being edited
//   const [roles, setRoles] = useState([]);
//   const [selectedRole, setSelectedRole] = useState('');


//   // Define the columns for the data grid
//   const columns = [
//     {
//       field: 'firstname',
//       headerName: 'First Name',
//       flex: 1,
//       cellClassName: 'name-column--cell',
//       renderCell: (params) => (
//         <Tooltip title={params.row.firstname}>
//           <span>{params.row.firstname}</span>
//         </Tooltip>
//       ),
//     },
//     {
//       field: 'lastname',
//       headerName: 'Last Name',
//       flex: 1,
//       cellClassName: 'name-column--cell',
//       renderCell: (params) => (
//         <Tooltip title={params.row.lastname}>
//           <span>{params.row.lastname}</span>
//         </Tooltip>
//       ),
//     },
//     // {
//     //   field: 'gender',
//     //   headerName: 'Gender',
//     //   flex: 1,
//     //   renderCell: (params) => (
//     //     <Tooltip title={params.row.gender}>
//     //       <span>{params.row.gender}</span>
//     //     </Tooltip>
//     //   ),
//     // },
//     {
//       field: 'email',
//       headerName: 'Email',
//       flex: 1,
//       renderCell: (params) => (
//         <Tooltip title={params.row.email}>
//           <span>{params.row.email}</span>
//         </Tooltip>
//       ),
//     },
//     {
//       field: 'phone',
//       headerName: 'Phone Number',
//       flex: 1,
//       renderCell: (params) => (
//         <Tooltip title={params.row.phone}>
//           <span>{params.row.phone}</span>
//         </Tooltip>
//       ),
//     },
//     // {
//     //   field: 'govtid',
//     //   headerName: 'Govt ID',
//     //   flex: 1,
//     //   renderCell: (params) => (
//     //     <Tooltip title={params.row.govtid}>
//     //       <span>
//     //         {params.row?.govtid?.length === 12
//     //           ? `${params.row.govtid} (Adhaar)`
//     //           : params.row.govtid.length === 10
//     //           ? `${params.row.govtid} (PAN)`
//     //           : params.row.govtid}
//     //       </span>
//     //     </Tooltip>
//     //   ),
//     // },
    
//     {
//       field: 'role',
//       headerName: 'Role',
//       flex: 1,
//       renderCell: (params) => (
//         <Tooltip title={params.row.role.name}>
//           <span>{params.row.role.name}</span>
//         </Tooltip>
//       ),
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 120,
//       editable: false,
//       hide: false,
//       sortable: false,
//       filterable: false,
//       disableColumnFilter: true,
//       disableColumnMenu: true,
//       disableColumnSelector: true,
//       renderCell: (params) => (
//         <div>
//           <IconButton color="primary">
//             <BadgeIcon />
//           </IconButton>
//           <IconButton
//             color="primary"
//             onClick={() => handleEdit(params.row)}
//           >
//             <EditIcon />
//           </IconButton>
//           <IconButton
//             color="secondary"
//             onClick={() => handleDelete(params.row.id)}
//           >
//             <DeleteIcon />
//           </IconButton>
//         </div>
//       ),
//     },
//   ];

//   // Create an Axios instance with headers
//   const axiosInstance = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${AuthToken}`, // Include the token in the headers.
//     },
//   });

//   // Define headers separately
//   const headers = {
//     Authorization: `Bearer ${AuthToken}`,
//   };

//   // Function to handle item deletion
//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this row?')) {
//       try {
//         // Use axiosInstance to send the DELETE request with the token.
//         await axiosInstance.delete(`${BASE_URL}/delete/${id}`);
//         // Update the state to set isActive to false for the deleted row
//         const updatedRows = rows.map((row) =>
//           row.id === id ? { ...row, isActive: false } : row
//         );
//         setRows(updatedRows);
//         console.log(`Deleted item with ID ${id} and set isActive to false`);
//       } catch (error) {
//         console.error('Error deleting item:', error);
//       }
//     }
//   };
  

//   // Function to handle item editing
//   const handleEdit = (item) => {
//     setEditedItem(item);
//     setOpenEditDialog(true);
//   };

//   // Function to close the edit dialog
//   const handleEditDialogClose = () => {
//     setOpenEditDialog(false);
//   };
  
//   // Function to save edited item
//   const handleSaveEdit = async () => {
//     try {
//       // Prepare the payload with edited data
//       const payload = {
//         firstname: editedItem.firstname,
//         lastname: editedItem.lastname,      
//         email: editedItem.email,
//         id: editedItem.id,
//         phone: editedItem.phone,
//         role: {
//           id: editedItem.role.id,
//         },      };

//       // Use axiosInstance to send the PUT request with the token to update the item
//       await axios.post(`${BASE_URL}/adduser `, payload, { headers });
      
//       // Update the state with the edited item
//       const updatedRows = rows.map((row) =>
//         row.id === editedItem.id ? { ...row, ...payload } : row
//       );
//       setRows(updatedRows);
//       setOpenEditDialog(false);
//       console.log(`Saved changes for item with ID ${editedItem.id}`);
//     } catch (error) {
//       console.error('Error saving changes:', error);
//     }
//   };

//   // Fetch data from the API when the component mounts
//   useEffect(() => {
//     async function fetchData() {
//       console.log("fetchData is called")
//       try {
//         // Include the token in the headers of the GET request.
//         const response = await axios.get(`${BASE_URL}/getall`, {
//           headers: {
//             Authorization: `Bearer ${AuthToken}`,
//           },
//         });
//         // Set the fetched data in the state
//         setRows(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     fetchData();

//     async function fetchRoles() {
//       console.log("fetchRoles is called");
//       try {
//         const response = await axios.get('http://192.168.12.58:8080/api/role/getall');
//         setRoles(response.data.data);
//       } catch (error) {
//         console.error('Error fetching roles:', error);
//       }
//     }
  
//     fetchRoles();
//   }, []);
  

//   console.log('rows:', rows);


//   // Render the component
//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       alignItems="center"
//     >
//       <Paper
//         elevation={5}
//         sx={{
//           width: '95vw',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Box
//           m="40px 0 0 0"
//           width="95%"
//           height="75vh"
//           sx={{
//             "& .MuiDataGrid-root": {
//               border: 'none',
//             },
//             "& .MuiDataGrid-cell": {
//               borderBottom: 'none',
//             },
//             "& .MuiDataGrid-columnHeaders": {
//               borderBottom: 'none',
//             },
//             "& .MuiDataGrid-footerContainer": {
//               borderTop: 'none',
//             },
//           }}
//         >

//           {rows && rows.length > 0 ? (
//             <DataGrid
//               rows={rows ?? []}
//               columns={columns}
//               components={{ Toolbar: GridToolbar }}
//             />
//           ) : (
//             <div>Loading...</div>
//           )}

//         </Box>
//       </Paper>

//       <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
//         <DialogTitle>Edit Item (ID: {editedItem ? editedItem.id : ''})</DialogTitle>
//         <DialogContent>
//           {editedItem && (
//             <form>
//               <TextField
//                 sx={{ mt: '2%', mb: '2%' }}
//                 label="First Name"
//                 fullWidth
//                 value={editedItem.firstname}
//                 onChange={(e) =>
//                   setEditedItem({ ...editedItem, firstname: e.target.value })
//                 }
//               />
//               <TextField
//                 sx={{ mt: '2%', mb: '2%' }}
//                 label="Last Name"
//                 fullWidth
//                 value={editedItem.lastname}
//                 onChange={(e) =>
//                   setEditedItem({ ...editedItem, lastname: e.target.value })
//                 }
//               />
//               <TextField
//                 sx={{ mt: '2%', mb: '2%' }}
//                 label="Email"
//                 fullWidth
//                 value={editedItem.email}
//                 onChange={(e) =>
//                   setEditedItem({ ...editedItem, email: e.target.value })
//                 }
//               />
//               <TextField
//                 sx={{ mt: '2%', mb: '2%' }}
//                 label="Phone"
//                 fullWidth
//                 value={editedItem.phone}
//                 onChange={(e) =>
//                   setEditedItem({ ...editedItem, phone: e.target.value })
//                 }
//               />

// <FormControl fullWidth sx={{ mt: '2%', mb: '2%' }}>
//   <InputLabel>Role</InputLabel>
//   <Select
//     value={selectedRole}
//     onChange={(e) => setSelectedRole(e.target.value)}
//   >
//     {roles.map((role) => (
//       <MenuItem key={role.id} value={role.name}>
//         {role.name}
//       </MenuItem>
//     ))}
//   </Select>
// </FormControl>

//             </form>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleEditDialogClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSaveEdit} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Employee;

























import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tooltip,
  Select,
  MenuItem, 
  FormControl, 
  InputLabel,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BadgeIcon from '@mui/icons-material/Badge';
import axios from 'axios';

const BASE_URL = 'http://192.168.12.58:8080/api/user';

// Function to get the token from local storage
const AuthToken = sessionStorage.getItem('token'); // Replace 'token' with your actual token key.
// console.log(AuthToken)

const Employee = () => {
  // Define state variables
  const [rows, setRows] = useState([]); // To store the data for the table
  const [openEditDialog, setOpenEditDialog] = useState(false); // To control the edit dialog visibility
  const [editedItem, setEditedItem] = useState(null); // To store the item being edited
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [apiData, setApiData] = useState([]);
  

  // Create an Axios instance with headers
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthToken}`, // Include the token in the headers.
    },
  });

  // Define headers separately
  const headers = {
    Authorization: `Bearer ${AuthToken}`,
  };

  async function fetchData() {
    try {
      const response = await axios.get(`${BASE_URL}/getall`, {
        headers: {
          Authorization: `Bearer ${AuthToken}`,
        },
      });

      const apiDataArray = response.data.data;
      console.log("apiDataArray", apiDataArray);

      if (!Array.isArray(apiDataArray) || apiDataArray.length === 0) {
        console.error('API response does not contain the expected array or the array is empty:', apiDataArray);
        return;
      }

      // Define columns for the grid
      const gridColumns = [
        { field: 'firstname', headerName: 'First Name', flex: 1 },
        { field: 'lastname', headerName: 'Last Name', flex: 1 },
        { field: 'phone', headerName: 'Phone', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'role', headerName: 'Role', flex: 1 },
        {
          field: 'actions',
          headerName: 'Actions',
          width: 120,
          editable: false,
          hide: false,
          sortable: false,
          filterable: false,
          disableColumnFilter: true,
          disableColumnMenu: true,
          disableColumnSelector: true,
          renderCell: (params) => (
            <div>
              <IconButton color="primary">
                <BadgeIcon />
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => handleEdit(params.row)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => handleDelete(params.row.id)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ),
        },
      ];

      // Create an array with rows by mapping all items in apiDataArray
      const gridRows = apiDataArray.map((apiDataItem) => ({
        id: apiDataItem.id,
        firstname: apiDataItem.firstname,
        lastname: apiDataItem.lastname,
        phone: apiDataItem.phone,
        email: apiDataItem.email,
        role: apiDataItem.role.name,
      }));

      console.log("gridRows", gridRows);

      // Set the columns and rows in the state
      setColumns(gridColumns);
      setRows(gridRows);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Function to handle item deletion
  // const handleDelete = async (id) => {
  //   if (window.confirm('Are you sure you want to delete this row?')) {
  //     try {
  //       // Use axiosInstance to send the DELETE request with the token.
  //       await axiosInstance.post(`${BASE_URL}/delete`);
  //       // Update the state to set isActive to false for the deleted row
  //       const updatedRows = rows.map((row) =>
  //         row.id === id ? { ...row, isActive: false } : row
  //       );
  //       setRows(updatedRows);
  //       console.log(`Deleted item with ID ${id} and set isActive to false`);
  //     } catch (error) {
  //       console.error('Error deleting item:', error);
  //     }
  //   }
  // };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      try {
        // Prepare the payload for the delete request
        const deletePayload = {
          id: id,
          isActive: false,
        };
  
        // Use axiosInstance to send the POST request with the token.
        await axiosInstance.post(`${BASE_URL}/delete`, deletePayload, {headers});
  
        // Update the state to set isActive to false for the deleted row
        const updatedRows = rows.map((row) =>
          row.id === id ? { ...row, isActive: true } : row
        );
        setRows(updatedRows);
        console.log(`Deleted item with ID ${id} and set isActive to false`);
        fetchData();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };
  

  // Function to handle item editing
  // const handleEdit = async (item) => {
  //   try {
  //     // Replace `1` with the ID of the row you want to edit
  //     const itemId = 1;
      
  //     // Fetch the data for the specified ID from the API
  //     const response = await axiosInstance.get(`${BASE_URL}/id?id=${itemId}`);
      
  //     // Check if the API request was successful
  //     if (response.status === 200) {
  //       // Retrieve the data from the API response
  //       const apiData = response.data.data;
  
  //       // Update the state variables for the dialog content fields
  //       setSelectedRole(apiData.role); // Assuming role is an object in the API response
  //       setEditedItem({
  //         ...item,
  //         firstname: apiData.firstname,
  //         lastName: apiData.lastName,
  //         email: apiData.email,
  //         phone: apiData.phone,
  //       });
  
  //       // Open the edit dialog
  //       setOpenEditDialog(true);
  //     } else {
  //       console.error('Error fetching data:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  const handleEdit = async (item) => {
    try {
      // Replace `1` with the ID of the row you want to edit
      const itemId = item.id;
  
      // Fetch the data for the specified ID from the API
      const response = await axiosInstance.get(`${BASE_URL}/getbyid/${itemId}`);
  
      // Check if the API request was successful
      if (response.status === 200) {
        // Retrieve the data from the API response
        const apiData = response.data.data;
        console.log("Api Data", apiData)
  
        // Update the state variables for the dialog content fields
        setEditedItem({
          id:apiData.id,
          firstname: apiData.firstname || '',
          lastname: apiData.lastname || '',
          email: apiData.email || '',
          phone: apiData.phone || '',
          role: apiData.role.id || '', // Adjust based on the actual structure
        });
  
        // Open the edit dialog
        setOpenEditDialog(true);
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  console.log('editedItem', editedItem)
  

  // Function to close the edit dialog
  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };
  
  // Function to save edited item
  const handleSaveEdit = async () => {
    try {
      // Prepare the payload with edited data
      const payload = {
        firstname: editedItem.firstname,
        lastname: editedItem.lastname,      
        email: editedItem.email,
        id: editedItem.id,
        phone: editedItem.phone,
          role: {
            id: editedItem.role,
          },
        };
        console.log("payload",payload.role)

      // Use axiosInstance to send the PUT request with the token to update the item
      await axios.post(`${BASE_URL}/adduser`, payload, { headers });
      
      // Update the state with the edited item
      const updatedRows = rows.map((row) =>
        row.id === editedItem.id ? { ...row, ...payload } : row
      );
      setRows(updatedRows);
      setOpenEditDialog(false);
      console.log(`Saved changes for item with ID ${editedItem.id}`);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  // Fetch data from the API when the component mounts

  useEffect(() => {

    fetchData();



    async function fetchRoles() {
      console.log("fetchRoles is called");
      try {
        const response = await axios.get('http://192.168.12.58:8080/api/role/getall');
        setRoles(response.data.data);
        console.log("bugga", response.data.data)
        console.log("Role data",response.data.data)
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    }
  
    fetchRoles();
  }, []);
  
  

  console.log('rows:', rows);


  // Render the component
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        elevation={5}
        sx={{
          width: '95vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          m="40px 0 0 0"
          width="95%"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: 'none',
            },
            "& .MuiDataGrid-cell": {
              borderBottom: 'none',
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: 'none',
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: 'none',
            },
          }}
        >

          {rows.length > 0 ? (
            <DataGrid
              rows={rows ?? []}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          ) : (
            <div style={{display:'flex', justifyContent:'center',marginTop:'5em', fontSize:'54px'}}>Loading...</div>
          )}


            {/* <DataGrid
              rows={rows}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            /> */}

        </Box>
      </Paper>

      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Item (ID: {editedItem ? editedItem.id : ''})</DialogTitle>
        <DialogContent>
          {editedItem && (
            <form>
              <TextField
                sx={{ mt: '2%', mb: '2%' }}
                label="First Name"
                fullWidth
                value={editedItem.firstname}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, firstname: e.target.value })
                }
              />
              <TextField
                sx={{ mt: '2%', mb: '2%' }}
                label="Last Name"
                fullWidth
                value={editedItem.lastname}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, lastname: e.target.value })
                }
              />
              <TextField
                sx={{ mt: '2%', mb: '2%' }}
                label="Email"
                fullWidth
                value={editedItem.email}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, email: e.target.value })
                }
              />
              <TextField
                sx={{ mt: '2%', mb: '2%' }}
                label="Phone"
                fullWidth
                value={editedItem.phone}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, phone: e.target.value })
                }
              />

<FormControl fullWidth sx={{ mt: '2%', mb: '2%' }}>
  <InputLabel>Role</InputLabel>
  <Select
    value={selectedRole}
    onChange={(e) => {
      // Update the selectedRole state
      setSelectedRole(e.target.value);
      // Update the editedItem's role property with the selected role's ID
      setEditedItem({ ...editedItem, role: e.target.value });
    }}
  >
    <MenuItem value="" disabled>
      Select a role
    </MenuItem>
    {roles && roles.length > 0 && roles.map((role) => (
      <MenuItem key={role.id} value={role.id}>
        {role.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Employee;
