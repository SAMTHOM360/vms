import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
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
        const responseData = response.data.data.companies;
        setLength(response.data.data.totalElements);

        setCompanies(responseData);
      })
      .catch((error) => {
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
    console.log(isActive, "isActive");

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
        if (response.data.message) {
          alert(response.data.message);
          setReload(!reload);
        }

        // setPage(0)
      })
      .catch((error) => {
        console.error("Error toggling switch:", error);
      });

    // setReload(true)
  };


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
                          value={selectedCompanyNames}
                          // onChange={ (e)handleCompanyNameChange}

                          onChange={(e) =>
                            setSelectedCompanyNames(e.target.value)
                          }
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

                        {/* </div> */}
                      </div>

                      <TableContainer
                        component={Paper}
                        style={{
                          width: "100%",
                          boxShadow: 6,
                          // overflowY: "auto",
                          // overflowX:"auto",
                         
                          // maxHeight: "630px",

                          minHeight:'55vh',
                      maxHeight:{sm:'55vh', lg:'61vh',}
                        }}
                      >
                        <Table aria-label="simple table">
                          <TableHead
                            style={{
                              backgroundColor: "#141b2d",
                              position: "sticky",
                              top: 0,
                              zIndex: 10,
                            }}
                          >
                            <TableRow>
                              <TableCell align="center" sx={{ color: "white" }}>
                                <h4>Sl.No</h4>
                              </TableCell>
                              <TableCell align="center" sx={{ color: "white" }}>
                                <h4>Company Name</h4>
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
                              <TableCell
                                align="center"
                                sx={{ width: "10 em", color: "white" }}
                              >
                                <h4>Logo</h4>
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
                            {companies &&
                              companies.length > 0 &&
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
                                      {company.email}
                                    </TableCell>
                                    <TableCell align="center">
                                      {company.phoneNumber}
                                    </TableCell>
                                    <TableCell align="center">
                                      {company.address}
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
                                      {company.aboutUs}
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
                                ))}
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

                        <div
                          style={{
                            position: "sticky",
                            bottom: 0,
                            backgroundColor: "white",
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
                        </div>
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
