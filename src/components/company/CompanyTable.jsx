import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableCell, Tooltip } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { Box } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Switch from "@mui/material/Switch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import Navbar from "../../global/Navbar";
import Sidebar from "../../global/Sidebar";
import Header from "../Header";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useAuth } from "../../routes/AuthContext";
import Config from "../../Config/Config";
import InfoIcon from "@mui/icons-material/Info";
import * as XLSX from "xlsx";
import ClearIcon from '@mui/icons-material/Clear';

//loader
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const label = { inputProps: { "aria-label": "Switch demo" } };
const rowsPerPage = 10;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      overflowY: "auto",
    },
  },
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CompanyTable = () => {
  const { setActiveListItem } = useAuth();
  // sessionStorage.setItem('activeListItem', '/companyDetails')
  useEffect(() => {
    setActiveListItem("/companyDetails");
  }, [setActiveListItem]);

  //pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [length, setLength] = useState(0);

  const [reload, setReload] = useState(false);

  const [tempCompany, setTempCompany] = useState("");

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
  const [searchQuery, setSearchQuery] = useState("");

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  //   fetchData(searchQuery, newPage);
  // };

  const [buildingIds, setBuildingIds] = useState([]);
  const [selectedBuildingIds, setSelectedBuildingIds] = useState("");

  // const [companyNames, setCompanyNames] = useState([])
  const [selectedCompanyNames, setSelectedCompanyNames] = useState("");

  //loader
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, [page, rowsPerPage, reload]);

  useEffect(() => {
    fetchBuildingIds();
  }, []);

  useEffect(() => {
    if (page === 0) {
      fetchAllData();
    } else {
      setPage(0);
    }
  }, [selectedBuildingIds, selectedCompanyNames]);

  function fetchAllData() {
    setOpen(true);
    const apiUrl = Config.baseUrl + Config.apiEndPoints.fetchCompanyEndPoint;
    const payload = {
      page: page,
      size: rowsPerPage,
      companyName: selectedCompanyNames,
      buildingId: selectedBuildingIds,
    };

    // const apiUrl = 'http://192.168.12.54:8080/com/all';
    axios
      .post(apiUrl, payload, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((response) => {
        setOpen(false);
        const responseData = response.data.data.companies;
        setLength(response.data.data.totalElements);

        setCompanies(responseData);
      })
      .catch((error) => {
        setOpen(false);
        console.error("Error fetching data:", error);
      });
  }

  //filters

  function handleBuildingIdChange(event, value) {
    if (value !== null) {
      setSelectedBuildingIds(value.id);
    } else {
      setSelectedBuildingIds("");
    }
  }

  function fetchBuildingIds() {
    const buildingUrl =
      Config.baseUrl + Config.apiEndPoints.getBuildingEndPoint;
    axios
      .get(buildingUrl)
      .then((response) => {
        setBuildingIds(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleCompanyNameChange = (event) => {
    if (event.key === "Enter") {
      fetchAllData(selectedCompanyNames);
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
    setOpen(true);
    // console.log(isActive, "isActive");

    const activeDeactiveUrl =
      Config.baseUrl + Config.apiEndPoints.activeDeactiveEndPoint;
    const payload = {
      id: companyId,
      isActive: isActive,
    };

    axios
      // .post(`http://192.168.12.54:8080/com/active`
      .post(activeDeactiveUrl, payload, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((response) => {
        // if (isActive === true) {
        //   toast.success(`Company is active.`);
        // } else  if(isActive === false){
        //   toast.success(`Company is deactivated.`);
        // }

        setOpen(false);
        if (response.data.message) {
          alert(response.data.message);
          setReload(!reload);
        }

        // setPage(0)
      })
      .catch((error) => {
        setOpen(false);
        console.error("Error toggling switch:", error);
      });

    // setReload(true)
  };

  //export
  function downloadFile(url) {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "meeting_details.xlsx");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // function excelExport() {
  //   const exportUrl = Config.baseUrl + Config.apiEndPoints.excelEndPoint;

  //     const payload = {
  //       page: page,
  //       size: rowsPerPage,
  //       companyName: selectedCompanyNames,
  //       buildingId: selectedBuildingIds,
  //     };

  //   axios
  //     .post(exportUrl, payload, {})
  //     .then((response) => {
  //       const url = response.data.data;

  //       downloadFile(url);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }

  // const exportAllDataToExcel = () => {
  //   const wb = XLSX.utils.book_new();
  //   const allCompaniesData = [];

  //   // Loop through each page of companies and accumulate all data
  //   for (let i = 0; i < Math.ceil(length / rowsPerPage); i++) {
  //     const exportUrl =
  //       Config.baseUrl + Config.apiEndPoints.fetchCompanyEndPoint;

  //     // Make sure to fetch data for each page here (if needed) and update the 'companies' state

  //     const payload = {
  //       page: i,
  //       size: rowsPerPage,
  //       companyName: selectedCompanyNames,
  //       buildingId: selectedBuildingIds,
  //     };

  //     // You can also directly use 'companies' state without fetching if it already contains all the data

  //     const pageCompaniesData = companies.map((company, index) => {
  //       return {
  //         "Sl. No": calculateSerialNumber(i * rowsPerPage + index),
  //         "Company Name": company.name,
  //         "Logo": company.logo,
  //         "Email": company.email,
  //         "Phone No": company.phoneNumber,
  //         "Address": company.address,
  //         "Industry": company.industry,
  //         "State": company.state,
  //         "City": company.city,
  //         "Pin Code": company.pincode,
  //         "About Us": company.aboutUs,
  //         "Building Id": company.buildingId,
  //         "Building Name": company.buildingName,
  //         "User Limit": company.userLimit,
  //       };
  //     });

  //     allCompaniesData.push(...pageCompaniesData);
  //   }

  //   const ws = XLSX.utils.json_to_sheet(allCompaniesData);
  //   XLSX.utils.book_append_sheet(wb, ws, "All Companies");

  //   // Save the Excel file
  //   XLSX.writeFile(wb, "all_companies.xlsx");
  // };

  const handleClearSearch = () => {
    setSearchQuery("");
    // Fetch data or perform any other action when the search field is cleared
    fetchAllData();
  };




  const testExcel = async() => {
 
      const payload = {
        page: page,
        size: null,
        companyName: selectedCompanyNames,
        buildingId: selectedBuildingIds,
      };
      const exportUrl = Config.baseUrl + Config.apiEndPoints.excelEndPoint;

  try{
    const response = await axios.post(exportUrl, payload, { responseType: 'arraybuffer',});
  
    const byteArray = new Uint8Array(response.data);
  
    const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    const link = document.createElement('a');
  
    link.href = URL.createObjectURL(blob);
    link.download = 'company_details.xlsx'; 
  
    document.body.appendChild(link);
  
    link.click();
  
    document.body.removeChild(link);
  
    console.log('Download initiated successfully');
  }
  catch(error){
    console.error('error coming', error)
  }
  }

  let timerId;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  

  return (
    <>
      <Box sx={{ display: "flex", flexGrow: 1, p: 3, backgroundColor: "" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "",
                top: 0,
                flexGrow: 1,
              }}
            >
              <div style={{ backgroundColor: "", width: "100%" }}>
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      // elevation={5}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        // width:'100%',
                        minHeight: "4.5em",
                        mt: "3em",
                        mb: "0.5em",
                      }}
                    >
                      <Header
                        title="Companies"
                        subtitle="Get all updates of the companies here."
                      />

                      <Link to="/companyreg">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ margin: "1.2em", height: "3em" }}
                        >
                          {" "}
                          Add Company
                        </Button>
                      </Link>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container style={{ marginTop: "30px" }}>
                  <Grid item xs={12}>
                    <Item elevation={3} style={{ height: "", margin: "10px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "",
                          gap: "20px",
                          backgroundColor: "",
                          marginBottom: "10px",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          label="Company Name"
                          variant="outlined"
                          type="search"
                          value={selectedCompanyNames}
                          // onChange={ (e)handleCompanyNameChange}

                          onChange={(e) => {
                            // Set a new timeout to update the state after 500 milliseconds

                            setSelectedCompanyNames(e.target.value);
                          }}
                          // onChange={(e)=>companyChange(e)}
                          onKeyPress={handleCompanyNameChange}


                          
                        />

                        {/* <div style={{ display: "flex", justifyContent: "yellow" }}> */}
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={buildingIds}
                          getOptionLabel={(option) =>
                            option !== null
                              ? `Id-${option.id}    ${option.name}`
                              : ""
                          }
                          onChange={handleBuildingIdChange}
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              MenuProps={MenuProps}
                              label="Building id"
                              // renderOption={(props, option) => (
                              //   <div style={{ display: '', justifyContent: '', backgroundColor: "red" }} {...props}>
                              //     <div>{`Id-${option.id}`}</div>
                              //     <div>{option.name}</div>
                              //   </div>
                              // )}

                              renderOption={(props, option) => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    backgroundColor: "red",
                                  }}
                                  {...props}
                                >
                                  <div>{`Id-${option.id}`}</div>
                                  <div style={{ marginLeft: "10px" }}>
                                    {option.name}
                                  </div>{" "}
                                  {/* Adjust the margin as needed */}
                                </div>
                              )}
                            />
                          )}
                        />

                        <Button
                          variant="contained"
                          sx={{ marginRight: "" }}
                          onClick={testExcel}
                        >
                          EXPORT EXCEL
                        </Button>

                        {/* </div> */}
                      </div>

                      <TableContainer
                        component={Paper}
                        style={{
                          width: "100%",
                          boxShadow: 6,

                          overflowY: "auto",

                          minHeight: "550px",

                          maxHeight: "550px",

                          // minHeight: "55vh",
                          // maxHeight: { sm: "55vhzIndex: 1,", lg: "61vh" },
                        }}
                      >
                        <Table aria-label="simple table">
                          <TableHead
                            style={{
                              backgroundColor: "#141b2d",
                              position: "sticky",
                              top: 0,
                              zIndex: 1,
                            }}
                          >
                            <TableRow>
                              <TableCell align="center" sx={{ color: "white" }}>
                                <h4>Sl.No</h4>
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                <h4>Company Name</h4>
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ width: "10 em", color: "white" }}
                              >
                                <h4>Logo</h4>
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                <h4>Email</h4>
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                <h4>Phone No.</h4>
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                <h4>Address</h4>
                              </TableCell>

                              <TableCell align="center" sx={{ color: "white" }}>
                                <h4>Industry</h4>
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                <h4>State</h4>
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                <h4>City</h4>
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                <h4>Pin Code</h4>
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                <h4>About Us</h4>
                              </TableCell>

                              <TableCell align="center" sx={{ color: "white" }}>
                                <h4>Building Id</h4>
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                <h4>Building Name</h4>
                              </TableCell>
                              {/* <TableCell align="left">Created By</TableCell> */}
                              <TableCell align="center" sx={{ color: "white" }}>
                                <h4>User Limit</h4>
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                <h4>Actions</h4>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {companies && companies.length > 0 ? (
                              companies
                                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((company, index) => (
                                  <TableRow key={company.id}>
                                    <TableCell>
                                      {calculateSerialNumber(index)}
                                    </TableCell>

                                    <TableCell align="center">
                                      {company.name}
                                    </TableCell>

                                    <TableCell align="center">
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          alignItems: "center",
                                        }}
                                      >
                                        <a
                                          href={company.logo}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <img
                                            src={company.logo}
                                            alt="Company Logo"
                                            style={{
                                              width: "40px",
                                              height: "40px",
                                              marginLeft: "10px",
                                              cursor: "pointer",
                                            }}
                                          />
                                        </a>
                                      </div>
                                    </TableCell>
                                    <TableCell align="center">
                                      {company.email}
                                    </TableCell>
                                    <TableCell align="center">
                                      {company.phoneNumber}
                                    </TableCell>
                                    <TableCell align="center">
                                      {company.address}
                                    </TableCell>

                                    <TableCell align="center">
                                      {company.industry}
                                    </TableCell>
                                    <TableCell align="center">
                                      {company.state.name}
                                    </TableCell>
                                    <TableCell align="center">
                                      {company.city.name}
                                    </TableCell>
                                    <TableCell align="center">
                                      {company.pincode}
                                    </TableCell>
                                    <TableCell align="center">
                                      <Tooltip title={company.aboutUs}>
                                        <span>
                                          {company.aboutUs.length > 15
                                            ? `${company.aboutUs.slice(
                                                0,
                                                15
                                              )}...`
                                            : company.aboutUs}
                                        </span>
                                      </Tooltip>
                                    </TableCell>
                                    {/* <TableCell align="left">{formatDate(company.createdOn)}</TableCell> */}
                                    {/* <TableCell align="left">{company.createdBy}</TableCell> */}

                                    <TableCell align="center">
                                      {company.building.buildingId}
                                    </TableCell>
                                    <TableCell align="center">
                                      {company.building.name}
                                    </TableCell>

                                    <TableCell align="center">
                                      {company.userLimit}
                                    </TableCell>
                                    <TableCell align="center">
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Link to={`/edit/${company.id}`}>
                                          <EditIcon />
                                        </Link>

                                        {/* <Switch
                                        {...label}
                                        defaultChecked={company.isActive}
                                        onChange={() => {
                                          const newActiveStatus = !company.active;
                                          console.log(!company.active,"newActiveStatus")
                                          handleSwitchToggle(company.id, newActiveStatus);

                                        
                                          const updatedCompanies = companies.map(c => {
                                            if (c.id === company.id) {
                                              return { ...c, active: newActiveStatus };
                                            }
                                            return c;
                                          });
                                          setCompanies(updatedCompanies);
                                        }}
                                      /> */}

                                        <Switch
                                          {...label}
                                          defaultChecked={company.isActive}
                                          onChange={() => {
                                            const newActiveStatus =
                                              !company.isActive; // Update to use `isActive` property
                                            console.log(
                                              !company.isActive,
                                              "newActiveStatus"
                                            );
                                            handleSwitchToggle(
                                              company.id,
                                              newActiveStatus
                                            );

                                            const updatedCompanies =
                                              companies.map((c) => {
                                                if (c.id === company.id) {
                                                  return {
                                                    ...c,
                                                    isActive: newActiveStatus,
                                                  }; // Update to set `isActive`
                                                }
                                                return c;
                                              });
                                            setCompanies(updatedCompanies);
                                          }}
                                        />
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={14} align="center">
                                  No data available
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>

                        {/* <TablePagination
                          rowsPerPageOptions={[5, 10, 15,100]}
                          component="div"
                          // count={companies.length}
                          count={length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        /> */}

                        {/* <div
                          style={{
                            position: "sticky",
                            bottom: 0,
                            backgroundColor: "#82889F",
                            
                            zIndex: 1,
                          }}
                        >
                          <TablePagination
                            rowsPerPageOptions={[10, 15, 20, 50, 100]}
                            component="div"
                            count={length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                          />
                        </div> */}
                      </TableContainer>

                      <TablePagination
                        sx={{ bgcolor: "#82889F" }}
                        rowsPerPageOptions={[10, 15, 20, 50, 100]}
                        component="div"
                        count={length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Item>
                  </Grid>
                </Grid>
              </div>
              <ToastContainer />
            </div>
          </Grid>
        </Grid>

        <div>
          {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
          <Backdrop
            // style={{ zIndex: 1 }}
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
            
            open={open}
            // onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </Box>
    </>
  );
};

export default CompanyTable;
