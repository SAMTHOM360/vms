import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Autocomplete,
  TextareaAutosize,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import Navbar from "../../global/Navbar";
import Sidebar from "../../global/Sidebar";
import Header from "../Header";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/AuthContext";
import Config from "../../Config/Config";
import { styled } from "@mui/system";

const Building = () => {
  // const blue = {
  //     100: '#DAECFF',
  //     200: '#b6daff',
  //     400: '#3399FF',
  //     500: '#007FFF',
  //     600: '#0072E5',
  //     900: '#003A75',
  //   };

  //   const grey = {
  //     50: '#F3F6F9',
  //     100: '#E5EAF2',
  //     200: '#DAE2ED',
  //     300: '#C7D0DD',
  //     400: '#B0B8C4',
  //     500: '#9DA8B7',
  //     600: '#6B7A90',
  //     700: '#434D5B',
  //     800: '#303740',
  //     900: '#1C2025',
  //   };

  //   const Textarea = styled(TextareaAutosize)(
  //     ({ theme }) => `
  //     width: 320px;
  //     font-family: 'IBM Plex Sans', sans-serif;
  //     font-size: 17px;
  //     font-weight: 400;
  //     line-height: 1.5;
  //     padding: 12px;
  //     border-radius: 12px 12px 0 12px;
  //     color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  //     background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  //     border: 1px solid #c4c4c4;
  //     // box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  //     &:hover {
  //       border-color: #616161;
  //     }

  //     &:focus {
  //       outline: 0;
  //       border-color: #007AFF;
  //     //   box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  //     border: 2px solid #007AFF;
  //     }

  //     // firefox
  //     &:focus-visible {
  //       outline: 0;
  //     }
  //   `,
  //   );

  const {
    isLimitReached,
    setIsNavBar,
    setIsSideBar,
    setActiveListItem,
    isSideBarPinned,
    isOpenforGridTable,
  } = useAuth();

  // console.log("isLimitReached", isLimitReached)
  // sessionStorage.setItem('activeListItem', '/employee')
  useEffect(() => {
    setActiveListItem("/building");
  }, [setActiveListItem]);
  const AuthToken = sessionStorage.getItem("token");
  const loggedUserRole = sessionStorage.getItem("loggedUserRole");
  const limit = sessionStorage.getItem("limit");
  const adminId = sessionStorage.getItem("adminId");
  const currEmpLength = sessionStorage.getItem("currEmpLength") || "0";
  const companyIdStr = sessionStorage.getItem("companyId");
  const companyId = parseInt(companyIdStr, 10);
  // console.log("admin id",currEmpLength)

  const BASE_URL = "http://192.168.12.54:8080/api/user";
  // const BASE_URL = 'http://192.168.12.58:8080/api/user';

  let urlAxiosInstance =
    Config.baseUrl + Config.apiEndPoints.buildingAxiosInstance;

  const axiosInstance = axios.create({
    baseURL: urlAxiosInstance,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AuthToken}`,
    },
  });

  const headers = {
    Authorization: `Bearer ${AuthToken}`,
  };

  const [rows2, setRows2] = useState([]);
  const [columns2, setColumns2] = useState([]);
  const [openBuildingDialog, setOpenBuildingDialog] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [divText, setDivText] = useState("");
  const [isSUPERADMINAllowed, setIsSUPERADMINAllowed] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isReceptAllowed, setIsReceptAllowed] = useState();
  const navigate = useNavigate();
  const [depts, setDepts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditOn, setIsEditOn] = useState(false);
  const [isSameData, setIsSameData] = useState(false)
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [buildingFormData, setBuildingFormData] = useState({
    id: null,
    name: "",
    address: "",
    state: {
      id: null,
      name: "",
    },
    city: {
      id: null,
      name: "",
    },
  });
  const [editedBuildingData, setEditedBuildingData] = useState({
    id:null,
    name: "",
    address: "",
    state: {
      id: null,
      name: "",
    },
    city: {
      id: null,
      name: "",
    },
  });

  let buildingFormTitle = "Add";

  if (isEditOn) {
    buildingFormTitle = "Edit";
  } else {
    buildingFormTitle = "Add";
  }

  const handleBuildingDialogOpen = () => {
    setOpenBuildingDialog(true);
  };

  const handleBuildingDialogClose = () => {
    setOpenBuildingDialog(false);
    setBuildingFormData({
      id: null,
      name: "",
      address: "",
      state: {
        id: null,
        name: "",
      },
      city: {
        id: null,
        name: "",
      },
    });
    setIsEditOn(false);
    setBtnLoading(false);
  };

  const fetchBuildings = async () => {
    let url = Config.baseUrl + Config.apiEndPoints.rolesAndDeptsGetAllDept;

    try {
      setLoading(true);
      let url = Config.baseUrl + Config.apiEndPoints.buildingGetAll;
      const response = await axios.get(
        // `http://192.168.12.54:8080/api/building/getAll`,
        url,
        { headers }
      );
      //   const response = await axios.get(`${url}?companyId=${companyId}`);
      const deptApiData = response.data.data;
      // console.log('deptApiData',deptApiData)

      if (!Array.isArray(deptApiData) || deptApiData.length === 0) {
        console.error(
          "API response does not contain the expected array or the array is empty:",
          deptApiData
        );
        setLoading(false);
        return;
      }

      const gridColumns = [
        {
          field: "actions",
          align: "center",
          headerAlign: "center",
          headerName: "Actions",
          width: 110,
          fixed: true,
          editable: false,
          hide: false,
          sortable: false,
          filterable: false,
          disableColumnFilter: true,
          disableColumnMenu: true,
          disableColumnSelector: true,
          renderCell: (params) => (
            <div>
              <IconButton
                color="primary"
                onClick={() => handleEditBuilding(params.row)}
              >
                <EditIcon />
              </IconButton>
            </div>
          ),
        },
        {
          field: "serialNo",
          headerName: "Sl No",
          align: "center",
          headerAlign: "center",
          width: 120,
        },
        {
          field: "buildingName",
          headerName: "Building Name",
          width: 330,
          // flex:1,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "buildingId",
          headerName: "Building Id",
          width: 180,
          // flex:1,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "address",
          headerName: "Address",
          width: 400,
          // flex:1,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "city",
          headerName: "City",
          width: 270,
          // flex:1,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "state",
          headerName: "State",
          width: 230,
          // flex:1,
          align: "center",
          headerAlign: "center",
        },
      ];

      const gridRows = deptApiData.map((apiDataItem, index) => ({
        id: apiDataItem.id,
        serialNo: index + 1,
        buildingName: apiDataItem.name ? apiDataItem.name : "N/A",
        buildingId: apiDataItem.id ? apiDataItem.id : "N/A",
        address: apiDataItem.address ? apiDataItem.address : "N/A",
        city: apiDataItem.city
          ? apiDataItem.city.name
            ? apiDataItem.city.name
            : "N/A"
          : "N/A",
        cityId: apiDataItem.city
          ? apiDataItem.city.id
            ? apiDataItem.city.id
            : null
          : null,
        state: apiDataItem.state
          ? apiDataItem.state.name
            ? apiDataItem.state.name
            : "N/A"
          : "N/A",
        stateId: apiDataItem.state
          ? apiDataItem.state.id
            ? apiDataItem.state.id
            : null
          : null,
      }));

      setColumns2(gridColumns);
      setRows2(gridRows);
    } catch (error) {
      console.error("Error in fetching depts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  useEffect(() => {
    let url1 = Config.baseUrl + Config.apiEndPoints.buildingGetAllState;
    axios
      // .get("http://192.168.12.54:8080/api/state/all")
      .get(url1)
      .then((response) => {
        setStates(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching states", error);
      });
  }, []);

  const fetchCities = async (stateId) => {
    let url = Config.baseUrl + Config.apiEndPoints.buildingGetAllCity;
    try {
      let response = await axios.get(`${url}/${stateId}`);
      setCities(response.data.data);
    } catch (error) {
      console.error("Error fetching cities", error);
      setCities([]);
    }
  };

  const handleSubmitBuilding = async (e) => {
    // toast.dismiss()
    e.preventDefault();

    let url = Config.baseUrl + Config.apiEndPoints.buildingSubmitBuilding;

    const trimmedBuildingName = buildingFormData.name
      ? buildingFormData.name.trim()
      : null;
    const trimmedBuildingAddress = buildingFormData.address
      ? buildingFormData.address.trim()
      : null;

    if (
      !buildingFormData.name ||
      !buildingFormData.state.id ||
      !buildingFormData.city.id ||
      !buildingFormData.address
    ) {
      toast.warn("All fields are mandatory", {
        toastId: "build-warn1",
      });
      return;
    }

    if (buildingFormData.name) {
      if (!trimmedBuildingName) {
        toast.warn("Building name can't be empty !!!", {
          toastId: "build-warn2",
        });
        return;
      }
    }

    if (buildingFormData.address) {
      if (!trimmedBuildingAddress) {
        toast.warn("Address can't be empty !!!", {
          toastId: "build-warn3",
        });
        return;
      }
    }

    const payload = {
      // name: buildingFormData.name ? buildingFormData.name : null,
      name: trimmedBuildingName,
      state: {
        id: buildingFormData.state
          ? buildingFormData.state.id
            ? buildingFormData.state.id
            : null
          : null,
      },

      city: {
        id: buildingFormData.city
          ? buildingFormData.city.id
            ? buildingFormData.city.id
            : null
          : null,
      },
      // address: buildingFormData.address ? buildingFormData.address : null,
      address: trimmedBuildingAddress,
    };

    // console.log("submit payload", payload);

    try {
      setBtnLoading(true);
      // const response = await axios.post(`http://192.168.12.54:8080/api/building/save`, payload, {headers})
      const response = await axios.post(url, payload, { headers });
      // console.log("submit response", response);

      if (response.status === 200) {
        setBuildingFormData({
          id: "",
          name: "",
          address: "",
          state: {
            id: "",
            name: "",
          },
          city: {
            id: "",
            name: "",
          },
        });
        handleBuildingDialogClose();
        fetchBuildings();
      }
    } catch (error) {
      if (error.request.status === 400) {
        let errMessage = "";

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errMessage = error.response.data.message;
          const cleanedMessage = JSON.stringify(errMessage);
          toast.error(JSON.parse(cleanedMessage), {
            toastId: "building-error9",
          });
        }
      } else {
        toast.error("Something went wrong !!!", {
          toastId: "bulk-emp-error10",
        });
      }
      // console.error('unable to add a building', error)
    } finally {
      setBtnLoading(false);
    }
  };

  const handleEditBuilding = async (item) => {
    let url = Config.baseUrl + Config.apiEndPoints.buildingGetByBuildingId;

    try {
      const response = await axios.get(`${url}/${item.id}`, { headers });

      if (response.status === 200) {
        const GetByBuildingIdData = response.data.data;
        // console.log("GetByBuildingIdData", GetByBuildingIdData);
        setBuildingFormData({
          id: GetByBuildingIdData.buildingId
            ? GetByBuildingIdData.buildingId
            : null,
          name: GetByBuildingIdData.name ? GetByBuildingIdData.name : "",
          address: GetByBuildingIdData.address
            ? GetByBuildingIdData.address
            : "",
          state: {
            id: GetByBuildingIdData.state
              ? GetByBuildingIdData.state.id
                ? GetByBuildingIdData.state.id
                : null
              : null,
            name: GetByBuildingIdData.state
              ? GetByBuildingIdData.state.id
                ? GetByBuildingIdData.state.name
                : ""
              : "",
          },
          city: {
            id: GetByBuildingIdData.state
              ? GetByBuildingIdData.city.id
                ? GetByBuildingIdData.city.id
                : null
              : null,
            name: GetByBuildingIdData.state
              ? GetByBuildingIdData.city.id
                ? GetByBuildingIdData.city.name
                : ""
              : "",
          },
        });

        setEditedBuildingData({
          id: GetByBuildingIdData.buildingId
            ? GetByBuildingIdData.buildingId
            : null,
          name: GetByBuildingIdData.name ? GetByBuildingIdData.name : "",
          address: GetByBuildingIdData.address
            ? GetByBuildingIdData.address
            : "",
          state: {
            id: GetByBuildingIdData.state
              ? GetByBuildingIdData.state.id
                ? GetByBuildingIdData.state.id
                : null
              : null,
            name: GetByBuildingIdData.state
              ? GetByBuildingIdData.state.id
                ? GetByBuildingIdData.state.name
                : ""
              : "",
          },
          city: {
            id: GetByBuildingIdData.state
              ? GetByBuildingIdData.city.id
                ? GetByBuildingIdData.city.id
                : null
              : null,
            name: GetByBuildingIdData.state
              ? GetByBuildingIdData.city.id
                ? GetByBuildingIdData.city.name
                : ""
              : "",
          },
        })
        setIsEditOn(true);
        fetchCities(item.stateId ? item.stateId : "");
        handleBuildingDialogOpen();
      }
    } catch (error) {
      if (error.request.status === 400) {
        let errMessage = "";

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errMessage = error.response.data.message;
          const cleanedMessage = JSON.stringify(errMessage);
          toast.error(JSON.parse(cleanedMessage), {
            toastId: "building-error14",
          });
        }
      } else {
        toast.error("Something went wrong !!!", {
          toastId: "bulk-emp-error15",
        });
      }
    }
  };

  const areObjectsEqual = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      const val1 = obj1[key];
      const val2 = obj2[key];

      if (typeof val1 === 'object' && val1 !== null) {
        if (!areObjectsEqual(val1, val2)) {
          return false;
        }
      } else if (val1 !== val2) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    setIsSameData(areObjectsEqual(buildingFormData, editedBuildingData));
  },[buildingFormData])


  // console.log('isSameData', isSameData)

  // console.log("building form data", buildingFormData);
  // console.log("edied building", editedBuildingData);

  // console.log('cities', cities)

  const handleUpdateBuilding = async (e) => {
    // toast.dismiss()
    e.preventDefault();

    const trimmedBuildingName = buildingFormData.name
      ? buildingFormData.name.trim()
      : null;
    const trimmedBuildingAddress = buildingFormData.address
      ? buildingFormData.address.trim()
      : null;

    if (
      !buildingFormData.name ||
      !buildingFormData.state.id ||
      !buildingFormData.city.id ||
      !buildingFormData.address
    ) {
      toast.warn("All fields are mandatory", {
        toastId: "build-warn11",
      });
      return;
    }

    if (buildingFormData.name) {
      if (!trimmedBuildingName) {
        toast.warn("Building name can't be empty !!!", {
          toastId: "build-warn12",
        });
        return;
      }
    }

    if (buildingFormData.address) {
      if (!trimmedBuildingAddress) {
        toast.warn("Address can't be empty !!!", {
          toastId: "build-warn13",
        });
        return;
      }
    }

    let url = Config.baseUrl + Config.apiEndPoints.buildingUpdateBuilding;
    const payload = {
      id: buildingFormData.id,
      // name: buildingFormData.name,
      name: trimmedBuildingName,
      // address: buildingFormData.address,
      address: trimmedBuildingAddress,

      city: {
        id: buildingFormData.city.id,
      },
      state: {
        id: buildingFormData.state.id,
      },
    };

    try {
      setBtnLoading(true);
      const response = await axios.post(url, payload, { headers });
      if (response.status === 200) {
        toast.success("Building successfully updated.", {
          toastId: "building-update-building",
        });
        setBuildingFormData({
          id: null,
          name: "",
          address: "",
          state: {
            id: null,
            name: "",
          },
          city: {
            id: null,
            name: "",
          },
        });
        setEditedBuildingData({
          id: null,
          name: "",
          address: "",
          state: {
            id: null,
            name: "",
          },
          city: {
            id: null,
            name: "",
          },
        })
        handleBuildingDialogClose();
        fetchBuildings();
      }
    } catch (error) {
      if (error.request.status === 400) {
        let errMessage = "";

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errMessage = error.response.data.message;
          const cleanedMessage = JSON.stringify(errMessage);
          toast.error(JSON.parse(cleanedMessage), {
            toastId: "building-error12",
          });
        }
      } else {
        toast.error("Something went wrong !!!", {
          toastId: "bulk-emp-error13",
        });
      }
      // console.error('unable to add a building', error)
    } finally {
      setBtnLoading(false);
    }
  };

  //   console.log("buildingFormData", buildingFormData);
  // console.log("edited buildingData", editedBuildingData);

  return (
    <>
      {/* <Navbar toggleSidebar={toggleSidebar}/> */}
      <Loader isLoading={loading} />
      <Box sx={{ display: "flex", flexGrow: 1, p: 3 }}>
        {/* <Sidebar open={sidebarOpen} /> */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                minHeight: "4.5em",
                mt: "3em",
                mb: "0.5em",
                borderRadius: "5px",
              }}
            >
              <Header title="Buildings" subtitle="This is buildings section" />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  minWidth: "31.3em",
                  ml: "2em",
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={{ marginLeft: "1.2em", height: "3em", width: "12em" }}
                  onClick={handleBuildingDialogOpen}
                >
                  Add Building
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              elevation={5}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                overflowX: "hidden",
                flexDirection: "column",
                // bgcolor:'orange',
                maxWidth: isSideBarPinned
                  ? isOpenforGridTable
                    ? "83.5vw"
                    : "93.5vw"
                  : "93.5vw",
                flexGrow: 1,
                minHeight: "75vh",
                pb: "1.5em",
              }}
            >
              <Box
                m="2px 0 0 0"
                flexGrow={1}
                height="74vh"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  "& .name-column--cell": {
                    color: "#2e7c67",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#2b345386",
                    borderBottom: "none",
                    fontSize: "17px",

                    "& .MuiDataGrid-row.Mui-selected": {
                      backgroundColor: "#ffffff",
                    },
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: "#e2e2e25a",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: "#2b345386",
                  },
                  // "& .MuiCheckbox-root": {
                  //     color: `${colors.greenAccent[200]} !important`,
                  //   },
                  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `#141414 !important`,
                  },
                  mb: "1.5em",
                  // maxWidth: "105em",
                  // maxWidth: "95%",
                  width: "100%",
                  borderRadius: "5px",
                  // bgcolor:'cyan',
                  // overflowX:'auto'
                }}
              >
                {rows2.length > 0 ? (
                  <DataGrid
                    rows={rows2 ?? []}
                    columns={columns2}
                    components={{ Toolbar: GridToolbar }}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "1em",
                      fontSize: "25px",
                      fontWeight: "600",
                      width: "100%",
                    }}
                  >
                    NO RECORDS FOUND !!!
                  </div>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Dialog
            open={openBuildingDialog}
            //   onClose={handleDeptDialogClose}
            PaperProps={{
              sx: { mt: "5em", borderRadius: "5px", height: "465px" },
            }}
          >
            <DialogTitle
              sx={{ textAlign: "center", fontSize: "29px", fontWeight: "600" }}
            >
              {buildingFormTitle} Building Form
            </DialogTitle>
            <DialogContent>
              <form style={{ width: "380px" }}>
                <TextField
                  size="small"
                  sx={{ mt: "1em" }}
                  label="Building Name"
                  fullWidth
                  value={buildingFormData.name}
                  inputProps={{ maxLength: 35 }}
                  onChange={(e) => {
                    // const inputValue = e.target.value.replace(
                    //   /[^a-zA-Z0-9_]/g,
                    //   ""
                    // );

                    const inputValue = e.target.value.replace(/\s+/g, " ");
                    setBuildingFormData({
                      ...buildingFormData,
                      name: inputValue,
                    });
                  }}
                  required
                  // helperText="Only digits, letters, and _ are allowed."
                />

                <Autocomplete
                  disablePortal
                  id="state-autocomplete"
                  size="small"
                  sx={{ width: "100%", mt: "1em" }}
                  options={states}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    states.find(
                      (state) => state.id === buildingFormData.state.id
                    ) || null
                  }
                  onChange={(event, newValue) => {
                    const newStateId = newValue ? newValue.id : "";
                    setBuildingFormData({
                      ...buildingFormData,
                      state:
                        {
                          id: newValue ? newValue.id : "",
                          name: newValue ? newValue.name : "",
                        } || "",
                      city: { id: "" },
                    });

                    // console.log('selected state', newValue);

                    fetchCities(newValue ? newValue.id : "");
                  }}
                  ListboxProps={{
                    style: {
                      maxHeight: "150px",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="State"
                      name="state"
                      required
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />

                {/* <Autocomplete
  disablePortal
  id="city-autocomplete"
  size="small"
  sx={{ width: "100%", mt: "1em" }}
  options={cities}
  getOptionLabel={(option) => option.name || ""}
  value={
    buildingFormData.city.id
      ? buildingFormData.city
      : null
  }
  onChange={(event, newValue) => {
    setBuildingFormData({
      ...buildingFormData,
      city: {
        id: newValue ? newValue.id : "",
        name: newValue ? newValue.name : "",
      },
    });
  }}
  ListboxProps={{
    style: {
      maxHeight: "150px",
    },
  }}
  renderInput={(params) => (
    <TextField {...params} label="City" name="city" required />
  )}
  isOptionEqualToValue={(option, value) =>
    value === null || option.id === value.id
  }
/> */}

                <Autocomplete
                  disablePortal
                  id="city-autocomplete"
                  size="small"
                  sx={{ width: "100%", mt: "1em" }}
                  options={cities}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    buildingFormData.city && buildingFormData.city.id
                      ? buildingFormData.city
                      : null
                  }
                  onChange={(event, newValue) => {
                    setBuildingFormData({
                      ...buildingFormData,
                      city: {
                        id: newValue ? newValue.id : "",
                        name: newValue ? newValue.name : "",
                      },
                    });
                  }}
                  ListboxProps={{
                    style: {
                      maxHeight: "150px",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="City" name="city" required />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    value === null ||
                    (option.id === value.id && option.name === value.name)
                  }
                />

                <TextField
                  size="small"
                  sx={{ mt: "1em" }}
                  label="Address"
                  fullWidth
                  value={buildingFormData.address}
                  inputProps={{ maxLength: 100 }}
                  onChange={(e) => {
                    let inputValue = e.target.value;
                    // inputValue = inputValue.replace(/[^a-zA-Z0-9_:, ']/g, '');
                    inputValue = inputValue.replace(/\s+/g, " ");

                    setBuildingFormData({
                      ...buildingFormData,
                      address: inputValue,
                    });
                  }}
                  required
                />

                {/* <Textarea
                  placeholder="Type in here…"
                  //   defaultValue="Try to put text longer than 4 lines."
                  minRows={2}
                  maxRows={4}
                  maxLength={50}
                  style={{ 
                    resize: "none", 
                    width: "100%", 
                    height:"4em",
                    marginTop: "1em",

                 }}
                /> */}
              </form>
            </DialogContent>
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mr: "1em",
                mb: "1em",
                ml: "1em",
              }}
            >
              <Button
                variant="contained"
                onClick={handleBuildingDialogClose}
                color="secondary"
                sx={{ width: "6em" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={isEditOn ? handleUpdateBuilding : handleSubmitBuilding}
                color="primary"
                sx={{ width: "6em" }}
                // disabled={btnLoading}
                disabled={btnLoading || (isEditOn && isSameData)}
              >
                {btnLoading ? <CircularProgress size="2em" /> : "Save"}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </>
  );
};

export default Building;
