// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import TablePagination from '@mui/material/TablePagination';
// import Switch from '@mui/material/Switch';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import EditIcon from '@mui/icons-material/Edit';
// import Navbar from '../../global/Navbar';
// import Sidebar from '../../global/Sidebar';

// const label = { inputProps: { 'aria-label': 'Switch demo' } };
// const rowsPerPage = 10;




// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));




// const CompanyTable = () => {
//   const [page, setPage] = useState(0);
//   const [companies, setCompanies] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   useEffect(() => {
//     const apiUrl = 'http://192.168.12.54:8080/com/all';
//     axios
//       .get(apiUrl, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       })
//       .then(response => {
//         const responseData = response.data.data;
//         setCompanies(responseData);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const handleSwitchToggle = (companyId, isActive) => {
//     const payload = {
//       id: companyId,
//       isActive: isActive,
//     };
//     axios
//       .post(`http://192.168.12.54:8080/com/active`, payload, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       })
//       .then(response => {
//         if (isActive) {
//           toast.success(`Company is active.`);
//         } else {
//           toast.success(`Company is deactivated.`);
//         }
//       })
//       .catch(error => {
//         console.error('Error toggling switch:', error);
//       });
//   };

//   const handleSearch = event => {
//     setSearchQuery(event.target.value); // Update search query state
//   };

//   const filteredCompanies = companies.filter(company => {
//     const searchTerm = searchQuery.toLowerCase(); // Convert search query to lowercase
//     return (
//       (company.name?.toLowerCase()?.includes(searchTerm) || '') ||
//       (company.email?.toLowerCase()?.includes(searchTerm) || '') ||
//       (company.phoneNumber?.toLowerCase()?.includes(searchTerm) || '') ||
//       (company.address?.toLowerCase()?.includes(searchTerm) || '') ||
//       (company.industry?.toLowerCase()?.includes(searchTerm) || '') ||
//       (company.state?.name?.toLowerCase()?.includes(searchTerm) || '') ||
//       (company.city?.name?.toLowerCase()?.includes(searchTerm) || '') ||
//       (company.pincode?.toLowerCase()?.includes(searchTerm) || '') ||
//       (company.aboutUs?.toLowerCase()?.includes(searchTerm) || '') ||
//       (company.createdBy?.toLowerCase()?.includes(searchTerm) || '')
//     );
//   });


//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
// <>
// <Navbar toggleSidebar={toggleSidebar}/>
// <div>
// <Sidebar open={sidebarOpen} />
//   <div style={{ display: 'flex', justifyContent: 'center',backgroundColor:"",top:0, marginTop:'5em', marginLeft:'3em' }}>
//       <div style={{ width: '86%',backgroundColor:"" }}>
//         <Grid container>
//           <Grid item xs={12}>
//             <Paper
//             elevation={2}
//               style={{
//                 height: '70px',
                
//                 margin: "10px 0",
//                 backgroundColor: 'aliceblue',
//                 marginTop:"10px"
//               }}
//             >
//               <h2 style={{ color: 'black',marginTop:"",backgroundColor:"" }}>Companies</h2>
//             </Paper>
//           </Grid>
//         </Grid>

//         <Grid container style={{ marginTop: '30px' }}>
//           <Grid item xs={12}>
//             <Item elevation={3} style={{ height: '', margin: '10px' }}>

//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <Link to="/companyreg">
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     style={{ marginTop: "10px", marginBottom: "10px", marginLeft: "10px" }}
//                   >      Add Company
//                   </Button>
//                 </Link>
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={handleSearch}
//                   style={{
//                     position: '',
//                     right: 0,
//                     marginTop:"10px",
//                     marginBottom: "15px",
//                     height: "30px",
//                     marginRight: "10px",
//                     borderRadius: "10px"
//                   }}
//                 />

//               </div>
//               <TableContainer component={Paper} style={{ width: '100%', boxShadow: 6 }}>
//                 <Table aria-label="simple table">
//                   <TableHead style={{ backgroundColor: 'aliceblue' }}>
//                     <TableRow>
//                       <TableCell>ID</TableCell>
//                       <TableCell align="right">Company Name</TableCell>
//                       <TableCell align="right">Email</TableCell>
//                       <TableCell align="right">Phone No.</TableCell>
//                       <TableCell align="right">Address</TableCell>
//                       <TableCell align="right">Logo</TableCell>
//                       <TableCell align="right">Industry</TableCell>
//                       <TableCell align="right">State</TableCell>
//                       <TableCell align="right">City</TableCell>
//                       <TableCell align="right">Pin Code</TableCell>
//                       <TableCell align="right">About Us</TableCell>
//                       <TableCell align="right">Created On</TableCell>
//                       <TableCell align="right">Created By</TableCell>
//                       <TableCell align="right">Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {filteredCompanies
//                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                       .map(company => (
//                         <TableRow key={company.id}>
//                           <TableCell>{company.id}</TableCell>
//                           <TableCell align="right">{company.name}</TableCell>
//                           <TableCell align="right">{company.email}</TableCell>
//                           <TableCell align="right">{company.phoneNumber}</TableCell>
//                           <TableCell align="right">{company.address}</TableCell>
//                           <TableCell align="right">
//                             <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//                               <img
//                                 src={company.logo || ''}
//                                 alt="Company Logo"
//                                 style={{ width: '40px', height: '40px', marginLeft: '10px' }}
//                               />
//                             </div>
//                           </TableCell>
//                           <TableCell align="right">{company.industry}</TableCell>
//                           <TableCell align="right">{company.state.name}</TableCell>
//                           <TableCell align="right">{company.city.name}</TableCell>
//                           <TableCell align="right">{company.pincode}</TableCell>
//                           <TableCell align="right">{company.aboutUs}</TableCell>
//                           <TableCell align="right">{company.createdOn}</TableCell>
//                           <TableCell align="right">{company.createdBy}</TableCell>
//                           <TableCell align="right">
//                             <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//                             <Link to={`/editcompanyform/${company.id}`}>
//                                    <EditIcon />
//                                  </Link>
                                
//                               <Switch
//                                 {...label}
//                                 defaultChecked={company.active}
//                                 onChange={() => {
//                                   const newActiveStatus = !company.active;
//                                   handleSwitchToggle(company.id, newActiveStatus);

//                                   // Update the local state with the new active status
//                                   const updatedCompanies = companies.map(c => {
//                                     if (c.id === company.id) {
//                                       return { ...c, active: newActiveStatus };
//                                     }
//                                     return c;
//                                   });
//                                   setCompanies(updatedCompanies);
//                                 }}
//                               />
//                             </div>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                   </TableBody>
//                 </Table>
//                 <TablePagination
//                   rowsPerPageOptions={[]}
//                   component="div"
//                   count={filteredCompanies.length}
//                   rowsPerPage={rowsPerPage}
//                   page={page}
//                   onPageChange={handleChangePage}
//                 />
//               </TableContainer>
//             </Item>
//           </Grid>
//         </Grid>
//       </div>
//       <ToastContainer />
//     </div>
// </div>
// </>
//   );
// };

// export default CompanyTable;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Box } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Switch from '@mui/material/Switch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from '../../global/Navbar';
import Sidebar from '../../global/Sidebar';
import Header from '../Header';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const rowsPerPage = 10;




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




const CompanyTable = () => {
  const [page, setPage] = useState(0);
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const apiUrl = 'http://192.168.12.54:8080/com/all';
    axios
      .get(apiUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(response => {
        const responseData = response.data.data;
        setCompanies(responseData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);



  function calculateSerialNumber(index) {
    return page * rowsPerPage + index + 1;
}


    const formatDate = (dateString) => {

    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleSwitchToggle = (companyId, isActive) => {
    const payload = {
      id: companyId,
      isActive: isActive,
    };
    axios
      .post(`http://192.168.12.54:8080/com/active`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(response => {
        if (isActive) {
          toast.success(`Company is active.`);
        } else {
          toast.success(`Company is deactivated.`);
        }
      })
      .catch(error => {
        console.error('Error toggling switch:', error);
      });
  };

  const handleSearch = event => {
    setSearchQuery(event.target.value); // Update search query state
  };

  const filteredCompanies = companies.filter(company => {
    const searchTerm = searchQuery.toLowerCase(); // Convert search query to lowercase
    return (
      (company.name?.toLowerCase()?.includes(searchTerm) || '') ||
      (company.email?.toLowerCase()?.includes(searchTerm) || '') ||
      (company.phoneNumber?.toLowerCase()?.includes(searchTerm) || '') ||
      (company.address?.toLowerCase()?.includes(searchTerm) || '') ||
      (company.industry?.toLowerCase()?.includes(searchTerm) || '') ||
      (company.state?.name?.toLowerCase()?.includes(searchTerm) || '') ||
      (company.city?.name?.toLowerCase()?.includes(searchTerm) || '') ||
      (company.pincode?.toLowerCase()?.includes(searchTerm) || '') ||
      (company.aboutUs?.toLowerCase()?.includes(searchTerm) || '') ||
      (company.createdBy?.toLowerCase()?.includes(searchTerm) || '')
    );
  });

   const [sidebarOpen, setSidebarOpen] = useState(true)
   const toggleSidebar = () => {
     setSidebarOpen(!sidebarOpen);
   };

  return (
<>
<Navbar toggleSidebar={toggleSidebar}/>
<Box sx={{display:'flex', flexGrow:1, p:3, width:'100%'}}>
<Sidebar open={sidebarOpen} />
<div style={{ display: 'flex', justifyContent: 'center',backgroundColor:"",top:0, flexGrow:1 }}>
      <div style={{ backgroundColor:"" }}>
        <Grid container>
          <Grid item xs={12}>
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
        </Grid>

        <Grid container style={{ marginTop: '30px' }}>
          <Grid item xs={12}>
            <Item elevation={3} style={{ height: '', margin: '10px' }}>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link to="/companyreg">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px", marginBottom: "10px", marginLeft: "10px" }}
                  >      Add Company
                  </Button>
                </Link>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                  style={{
                    position: '',
                    right: 0,
                    marginTop:"10px",
                    marginBottom: "15px",
                    height: "30px",
                    marginRight: "10px",
                    borderRadius: "10px"
                  }}
                />

              </div>
              <TableContainer component={Paper} style={{ width: '100%', boxShadow: 6 }}>
                <Table aria-label="simple table">
                  <TableHead style={{ backgroundColor: 'aliceblue' }}>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="center">Company Name</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Phone No.</TableCell>
                      <TableCell align="center">Address</TableCell>
                      <TableCell align="center">Logo</TableCell>
                      <TableCell align="center">Industry</TableCell>
                      <TableCell align="center">State</TableCell>
                      <TableCell align="center">City</TableCell>
                      <TableCell align="center">Pin Code</TableCell>
                      <TableCell align="center">About Us</TableCell>
                      <TableCell align="center">Created On</TableCell>
                      <TableCell align="center">Created By</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredCompanies
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((company,index) => (
                        <TableRow key={company.id}>
                          <TableCell>{calculateSerialNumber(index)}</TableCell>
                          <TableCell align="left">{company.name}</TableCell>
                          <TableCell align="left">{company.email}</TableCell>
                          <TableCell align="left">{company.phoneNumber}</TableCell>
                          <TableCell align="left">{company.address}</TableCell>
                          <TableCell align="left">
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <img
                                src={company.logo}
                                alt="Company Logo"
                                style={{ width: '40px', height: '40px', marginLeft: '10px' }}
                              />
                            </div>
                          </TableCell>
                          <TableCell align="left">{company.industry}</TableCell>
                          <TableCell align="left">{company.state.name}</TableCell>
                          <TableCell align="left">{company.city.name}</TableCell>
                          <TableCell align="left">{company.pincode}</TableCell>
                          <TableCell align="left">{company.aboutUs}</TableCell>
                          <TableCell align="left">{formatDate(company.createdOn)}</TableCell>
                          <TableCell align="left">{company.createdBy}</TableCell>
                          <TableCell align="left">
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Link to={`/edit/${company.id}`}>
                                   <EditIcon />
                                 </Link>
                                
                              <Switch
                                {...label}
                                defaultChecked={company.active}
                                onChange={() => {
                                  const newActiveStatus = !company.active;
                                  handleSwitchToggle(company.id, newActiveStatus);

                                  // Update the local state with the new active status
                                  const updatedCompanies = companies.map(c => {
                                    if (c.id === company.id) {
                                      return { ...c, active: newActiveStatus };
                                    }
                                    return c;
                                  });
                                  setCompanies(updatedCompanies);
                                }}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[]}
                  component="div"
                  count={filteredCompanies.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                />
              </TableContainer>
            </Item>
          </Grid>
        </Grid>
      </div>
      <ToastContainer />
    </div>
</Box>
</>
  );
};

export default CompanyTable;





