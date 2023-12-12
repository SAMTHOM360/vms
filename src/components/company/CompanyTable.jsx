
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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useAuth } from '../../routes/AuthContext';
import Config from '../../Config/Config';

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
  const { setActiveListItem } = useAuth()
  // sessionStorage.setItem('activeListItem', '/companyDetails')
  useEffect(() => {
    setActiveListItem('/companyDetails')
  }, [setActiveListItem])


//pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [length,setLength] = useState(0);


  function calculateSerialNumber(page, rowsPerPage, index) {
    return page * rowsPerPage + index + 1;

}


const handleChangePage = (event, newPage) => {
  setPage(newPage);
  // fetchAllData();
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  // setPage(0);
};


  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  //   fetchData(searchQuery, newPage);
  // };





  const [buildingIds, setBuildingIds] = useState([])
  const [selectedBuildingIds, setSelectedBuildingIds] = useState('')


  // const [companyNames, setCompanyNames] = useState([])
  const [selectedCompanyNames, setSelectedCompanyNames] = useState('')


  useEffect(() => {

    fetchAllData()

  }, [page,rowsPerPage]);


useEffect(() => {
  fetchBuildingIds()

},[])

  useEffect(() => {

    if (page === 0) {

        fetchAllData();

    } else {
        setPage(0);
    }

}, [selectedBuildingIds])



  function fetchAllData() {
    const apiUrl = Config.baseUrl + Config.apiEndPoints.fetchCompanyEndPoint;
    const payload = {

      "page": page,
      "size": rowsPerPage,
      "companyName": selectedCompanyNames,
      "buildingId": selectedBuildingIds

    }
    console.log(apiUrl, "apiURl")
    // const apiUrl = 'http://192.168.12.54:8080/com/all';
    axios
      .post(apiUrl, payload, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      })
      .then((response) => {
        

        const responseData = response.data.data.companies;
        setLength(response.data.data.totalElements);


        setCompanies(responseData);

        // const extractedBuildingIds = responseData.map(company => ({
        //   label: company.building.buildingId,
        //   value: company.building.buildingId,
        // }));

        // setBuildingIds(extractedBuildingIds)

        // const extractedCompanyNames = responseData.map(company => ({
        //   label: company.name,
        //   value: company.name,
        // }));

        // setCompanyNames(extractedCompanyNames)





      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }

  // const fetchData = (searchTerm, pageNumber) => {
  //   // const apiUrl = `http://192.168.12.54:8080/com/all?search=${searchTerm}&page=${pageNumber}`;

  //   const apiUrl = Config.baseUrl + Config.apiEndPoints.fetchCompanyEndPoint + "?search=" + searchTerm + "&page=" + pageNumber
  //   axios
  //     .get(apiUrl, {
  //       headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
  //     })
  //     .then(response => {
  //       const responseData = response.data.data.companies;
  //       console.log(responseData, "now")
  //       setCompanies(responseData);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // };


  //filters




  function handleBuildingIdChange(event, value) {


    if (value !== null) {

      console.log(value.id, "value")
      setSelectedBuildingIds(value.id);

    } else {
      setSelectedBuildingIds('');
    }


  }


  function fetchBuildingIds() {

    const buildingUrl = Config.baseUrl + Config.apiEndPoints.getBuildingEndPoint
    axios
      .get(buildingUrl)
      .then(response => {


        setBuildingIds(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })

  }

  const handleCompanyNameChange = (event) => {
    if (event.key === 'Enter') {
   fetchAllData(selectedCompanyNames)
    }
  };
  


  // useEffect(() => {

  //   // setPage(0)
  //   fetchAllData()


  // }, [selectedBuildingIds])



  function calculateSerialNumber(index) {
    return page * rowsPerPage + index + 1;
  }


  const formatDate = (dateString) => {

    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleSwitchToggle = (companyId, isActive) => {

    const activeDeactiveUrl = Config.baseUrl + Config.apiEndPoints.activeDeactiveEndPoint;
    const payload = {
      id: companyId,
      isActive: isActive,
    };
    axios
      // .post(`http://192.168.12.54:8080/com/active`
      .post(activeDeactiveUrl
        , payload, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
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

  // const handleSearch = event => {
  //   setPage(0)
  //   setSearchQuery(event.target.value);
  //   // Update search query state
  //   fetchData(event.target.value, 0); //
  // };





  // const filteredCompanies = companies.filter(company => {
  //   const searchTerm = searchQuery.toLowerCase(); // Convert search query to lowercase

  //   const dataString = `
  //     ID: ${company.id}
  //     Company Name: ${company.name}
  //     Email: ${company.email}
  //     Phone No.: ${company.phoneNumber}
  //     Address: ${company.address}
  //     Logo: ${company.logo}
  //     Industry: ${company.industry}
  //     State: ${company.state?.name}
  //     City: ${company.city?.name}
  //     Pin Code: ${company.pincode}
  //     About Us: ${company.aboutUs}
  //     Building Id: ${company.building?.buildingId}
  //     Building Name: ${company.building?.name}
  //     User Limit: ${company.userLimit}
  //   `;

  //   const cleanData = dataString.toLowerCase(); // Convert data string to lowercase

  //   return cleanData.includes(searchTerm);
  // });





 


  const [sidebarOpen, setSidebarOpen] = useState(true)
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  console.log(page,"companies")
  return (
    <>
      <Box sx={{ display: "flex", flexGrow: 1, p: 3, backgroundColor: "" }}>

        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: "", top: 0, flexGrow: 1 }}>
              <div style={{ backgroundColor: "", width: "100%" }}>
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      // elevation={5}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        // width:'100%',
                        minHeight: '4.5em',
                        mt: '3em',
                        mb: '0.5em'
                      }}
                    >

                      <Header title="Companies" subtitle="Get all updates of the companies here." />

                      <Link to="/companyreg">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ margin: '1.2em', height: '3em' }}
                        >      Add Company
                        </Button>
                      </Link>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container style={{ marginTop: '30px' }}>
                  <Grid item xs={12}>
                    <Item elevation={3} style={{ height: '', margin: '10px' }}>

                      <div style={{ display: "flex", justifyContent: "", backgroundColor: "" }}>


                        <div style={{ display: "flex", justifyContent: "" }}>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={buildingIds}

                            getOptionLabel={(option) => option !== null ? `Id-      ${option.id}   ${option.name}` : ""}
                            onChange={handleBuildingIdChange}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Search by building id" 
                            renderOption={(props, option) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: "red" }} {...props}>
            <div>{`Id-${option.id}`}</div>
            <div>{option.name}</div>
        </div>
    )}
                            />}
                          />



                          <TextField id="outlined-basic" label="Outlined" variant="outlined"

                          value={selectedCompanyNames}
                          // onChange={ (e)handleCompanyNameChange}
                          
                          onChange={(e) => setSelectedCompanyNames(e.target.value)}
                          onKeyPress={handleCompanyNameChange} 

                                          
                        />




                        </div>
                        {/* <input
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={handleSearch}
                          style={{
                            position: '',
                            right: 0,
                            marginTop: "10px",
                            marginBottom: "15px",
                            height: "30px",
                            marginRight: "10px",
                            borderRadius: "10px"
                          }}
                        /> */}


                      </div>


                      <TableContainer component={Paper} style={{ width: '100%', boxShadow: 6 }}>
                        <Table aria-label="simple table">
                          <TableHead style={{ backgroundColor: '#2b345386' }}>
                            <TableRow>
                              <TableCell><h4>Sl.No</h4></TableCell>
                              <TableCell align="left"><h4>Company Name</h4></TableCell>
                              <TableCell align="left"><h4>Email</h4></TableCell>
                              <TableCell align="left"><h4>Phone No.</h4></TableCell>
                              <TableCell align="left"><h4>Address</h4></TableCell>
                              <TableCell align="left" sx={{ width: "10 em" }}><h4>Logo</h4></TableCell>
                              <TableCell align="left"><h4>Industry</h4></TableCell>
                              <TableCell align="left"><h4>State</h4></TableCell>
                              <TableCell align="left"><h4>City</h4></TableCell>
                              <TableCell align="left"><h4>Pin Code</h4></TableCell>
                              <TableCell align="left"><h4>About Us</h4></TableCell>
                              <TableCell align="left"><h4>Building Id</h4></TableCell>
                              <TableCell align="left"><h4>Building Name</h4></TableCell>
                              {/* <TableCell align="left">Created By</TableCell> */}
                              <TableCell align="left"><h4>User Limit</h4></TableCell>
                              <TableCell align="left"><h4>Actions</h4></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {companies && companies.length > 0 && companies
                              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((company, index) => (
                                <TableRow key={company.id}>
                                  <TableCell>{calculateSerialNumber(index)}</TableCell>
                                 
                                  <TableCell align="left">{company.name}</TableCell>
                                  <TableCell align="left">{company.email}</TableCell>
                                  <TableCell align="left">{company.phoneNumber}</TableCell>
                                  <TableCell align="left">{company.address}</TableCell>
                                  <TableCell align="left">
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                      <a href={company.logo} target="_blank" rel="noopener noreferrer">
                                        <img
                                          src={company.logo}
                                          alt="Company Logo"
                                          style={{ width: '40px', height: '40px', marginLeft: '10px', cursor: 'pointer' }}
                                        />
                                      </a>
                                    </div>
                                  </TableCell>
                                  <TableCell align="left">{company.industry}</TableCell>
                                  <TableCell align="left">{company.state.name}</TableCell>
                                  <TableCell align="left">{company.city.name}</TableCell>
                                  <TableCell align="left">{company.pincode}</TableCell>
                                  <TableCell align="left">{company.aboutUs}</TableCell>
                                  {/* <TableCell align="left">{formatDate(company.createdOn)}</TableCell> */}
                                  {/* <TableCell align="left">{company.createdBy}</TableCell> */}


                                  <TableCell align="left">{company.building.buildingId}</TableCell>
                                  <TableCell align="left">{company.building.name}</TableCell>

                                  <TableCell align="left">{company.userLimit}</TableCell>
                                  <TableCell align="left">
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                      <Link to={`/edit/${company.id}`}>
                                        <EditIcon />
                                      </Link>

                                      <Switch
                                        {...label}
                                        defaultChecked={company.isActive}
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
                          rowsPerPageOptions={[5,10,15]}
                          component="div"
                          // count={companies.length}
                          count={length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </TableContainer>
                    </Item>
                  </Grid>
                </Grid>
              </div>
              <ToastContainer />
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CompanyTable;



