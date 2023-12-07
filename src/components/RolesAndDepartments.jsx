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
import UserForm from "./UserFormSB";
import Navbar from "../global/Navbar";
import Sidebar from "../global/Sidebar";
import Header from "./Header";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../routes/AuthContext";
import Config from "../Config/Config";

const RolesAndDepartments = () => {

  const { isLimitReached, setIsNavBar, setIsSideBar, setActiveListItem } =
  useAuth();

// console.log("isLimitReached", isLimitReached)
// sessionStorage.setItem('activeListItem', '/employee')
useEffect(() => {
  setActiveListItem('/rolesanddepts')
}, [setActiveListItem])
const AuthToken = sessionStorage.getItem("token");
const loggedUserRole = sessionStorage.getItem("loggedUserRole");
const limit = sessionStorage.getItem("limit");
const adminId = sessionStorage.getItem("adminId");
const currEmpLength = sessionStorage.getItem("currEmpLength") || "0";
const companyIdStr = sessionStorage.getItem("companyId");
const companyId = parseInt(companyIdStr,10)
// console.log("admin id",currEmpLength)

const BASE_URL = "http://192.168.12.54:8080/api/user";
// const BASE_URL = 'http://192.168.12.58:8080/api/user';

let urlAxiosInstance = Config.baseUrl + Config.apiEndPoints.rolesAndDeptsAxiosInstance

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

const [rows, setRows] = useState([]);
const [columns, setColumns] = useState([]);
const [rows2, setRows2] = useState([]);
const [columns2, setColumns2] = useState([]);
const [AddUserDialogOpen, setAddUserDialogOpen] = useState(false);
const [openEditDialog, setOpenEditDialog] = useState(false);
const [openRoleDialog, setOpenRoleDialog] = useState(false)
const [openDeptDialog, setOpenDeptDialog] = useState(false)
const [editedItem, setEditedItem] = useState(null);
const [roles, setRoles] = useState([]);
const [selectedRole, setSelectedRole] = useState("");
const [selectedDept, setSelectedDept] = useState("");
const [divText, setDivText] = useState("");
const [isSUPERADMINAllowed, setIsSUPERADMINAllowed] = useState(false);
const [btnLoading, setBtnLoading] = useState(false);
const [ isReceptAllowed, setIsReceptAllowed ] = useState()
const navigate = useNavigate();
const [ depts, setDepts ] = useState([])

const [roleFormData, setRoleFormData] = useState({
  name:''
})


const [deptFormData, setDeptFormData] = useState({
  name:'',
  company: {
    id: companyId,
  },
})


async function fetchRoles() {
  let url = Config.baseUrl + Config.apiEndPoints.rolesAndDeptsGetAllRole
  try {
    // const response = await axios.get(
    //   "http://192.168.12.54:8080/api/role/getall", { headers }
    // );

    const response = await axios.get(
      url, { headers }
    );

    const roleApiData = response.data.data
    // console.log('roleApiData',roleApiData)


    if (!Array.isArray(roleApiData) || roleApiData.length === 0) {
      console.error(
        "API response does not contain the expected array or the array is empty:",
        roleApiData
      );
      return;
    }

    const gridColumns = [
      {
        field: "serialNo",
        headerName: "Sl No",
        align: "center",
        headerAlign: "center",
      },
      {
        field: "roleName",
        headerName: "Role Name",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
    ];

    const gridRows = roleApiData.map((apiDataItem, index) => ({
      id: apiDataItem.id,
      serialNo: index + 1,
      roleName: apiDataItem.name,

    }));

    setColumns(gridColumns);
    setRows(gridRows);
  } catch (error) {
    console.error("Error fetching roles:", error);
  }
}
const fetchDepts = async () => {
  let url = Config.baseUrl + Config.apiEndPoints.rolesAndDeptsGetAllDept

  try{
    // const response = await axios.get(`http://192.168.12.54:8080/api/department/companyId?companyId=${companyId}`)
    const response = await axios.get(`${url}?companyId=${companyId}`)
    const deptApiData = response.data.data
    // console.log('deptApiData',deptApiData)

    if (!Array.isArray(deptApiData) || deptApiData.length === 0) {
      console.error(
        "API response does not contain the expected array or the array is empty:",
        deptApiData
      );
      return;
    }

    const gridColumns = [
      {
        field: "serialNo",
        headerName: "Sl No",
        align: "center",
        headerAlign: "center",
      },
      {
        field: "deptName",
        headerName: "Department Name",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
    ];

    const gridRows = deptApiData.map((apiDataItem, index) => ({
      id: apiDataItem.id,
      serialNo: index + 1,
      deptName: apiDataItem.name,

    }));

    setColumns2(gridColumns);
    setRows2(gridRows);
  } catch(error) {
    console.error("Error in fetching depts", error)
  }
}

useEffect(() => {
  fetchRoles()
  fetchDepts()
}, [])



const handleRoleDialogOpen = () => {
  setOpenRoleDialog(true);
};

const handleRoleDialogClose = () => {
  setOpenRoleDialog(false);
};


const handleSubmitAddDept = async(e) => {
  e.preventDefault()
  const payload = {
    name:  deptFormData.name,
    company: {
      id:deptFormData.company.id
    }
  }
  let url = Config.baseUrl + Config.apiEndPoints.rolesAndDeptsCreateDept

  try{
    setBtnLoading(true)
    // const response = await axiosInstance.post('http://192.168.12.54:8080/api/department/create', payload, {headers})
    const response = await axiosInstance.post(url, payload, {headers})
    // console.log('role submit response', response)
    if (response.status >= 200 && response.status < 300) {
      toast.success('Dept added successfully.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      setOpenDeptDialog(false);
      setDeptFormData({
        name: '',
        company: {
          id: companyId,
        },
      });
      fetchDepts();
    } else {
      // Log the error details for unsuccessful responses
      console.error('Received unsuccessful response:', response);
    }

  } catch(error) {
    if(error.request.status === 400){

      let errMessage = '';


      if (error.response && error.response.data && error.response.data.message) {
        errMessage = error.response.data.message;
        const cleanedMessage = JSON.stringify(errMessage);
        toast.error(JSON.parse(cleanedMessage)+' !!!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
      }


    } else {
    toast.error("Something went wrong !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.error("unable to add Dept: ", error)
  }
  }

  setBtnLoading(false)

}


const handleDeptDialogOpen = () => {
  setOpenDeptDialog(true);
};

const handleDeptDialogClose = () => {
  setOpenDeptDialog(false);
};

const handleSubmitAddRole = async(e) => {
  e.preventDefault()
  const payload = {
    name:  roleFormData.name,
  }
  let url = Config.baseUrl + Config.apiEndPoints.rolesAndDeptsCreateRole

  try{
    setBtnLoading(true)
    const response = await axiosInstance.post(url, payload, {headers})
    // console.log('role submit response', response)
    if(response.status === '200'){
      toast.success("Role added succesfully.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });


      setOpenRoleDialog(false)
      setRoleFormData({
        name:'',
      })
      fetchRoles()
    }

  } catch(error) {
    toast.error("Something went wrong !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.error("unable to add role: ", error)
  }
  setBtnLoading(false)

}

  return (
    <>
    {/* <Navbar toggleSidebar={toggleSidebar}/> */}
    <Box sx={{display:"flex", flexGrow: 1, p: 3,}}>
        {/* <Sidebar open={sidebarOpen} /> */}
        <Grid container spacing={2}>
  <Grid item xs={12} md={12} lg={12}>
  <Box
      elevation={5}
      sx={{
        display:'flex',
        justifyContent:'space-between',
        // width:'100%',
        minHeight:'4.5em',
      mt:'3em',
      mb:'0.5em' 
      }}
      >
        <Header title="Roles & Departments" subtitle="Get all lists of Roles  & Departments" />
        <Box sx={{ display: "flex", alignItems: "center", justifyContent:'end', minWidth:'31.3em', ml:'2em' }}> 
        {/* <Button
                      variant="contained"
                      size="small"
                      sx={{ marginLeft: "1.2em", height: "3em", width: "11em" }}
                      onClick={handleRoleDialogOpen}
                    >
                      Add a Role
                    </Button> */}

                    <Button
                      variant="contained"
                      size="small"
                      sx={{ marginLeft: "1.2em", height: "3em", width: "12em" }}
                      onClick={handleDeptDialogOpen}
                    >
                      Add Department
                    </Button>
        </Box>
    </Box>

  </Grid>
  <Grid item xs={12} md={12} lg={12}>
  <Paper
        elevation={2}
        sx={{
          // width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          m="20px 0 0 0"
        //   display='flex'
          // width="100%"
          maxWidth='90%'
          flexGrow={1}
          minHeight="75vh"
          // sx={{
          //   "& .MuiDataGrid-root": {
          //     border: 'none',
          //   },
          // //   "& .MuiDataGrid-cell": {
          // //     borderBottom: 'none',
          // //   },
          //   "& .MuiDataGrid-columnHeaders": {
          //     borderBottom: 'none',
          //   },
          // //   "& .MuiDataGrid-footerContainer": {
          // //     borderTop: 'none',
          // //   },
          // }}

          sx={{
            mb:'1.5em',
            display:'flex',
            // flexDirection:'row'
            gap:2
          }}
        >

          <Box sx={{
            display:'flex', width:'50%', minHeight:'100%',flexDirection:'column',
          }}>

<Box
                          sx={{
                            minHeight: "3vh",
                            overflow: "hidden",
                            pl: "1em",
                            background: "hsla(0, 0%, 100%, 1)",
                            background:
                              "linear-gradient(90deg, hsla(0, 0%, 100%, 1) 0%, hsla(0, 0%, 84%, 1) 100%)",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#3d3d3d",
                              fontSize: "28px",
                              fontWeight: "bold",
                            }}
                          >
                            Roles
                          </Typography>
                          {/* <Typography
                            variant="h7"
                            sx={{ mt: "5px" }}
                            color="#666666"
                          >
                            Get latest status of meetings.
                          </Typography> */}
                        </Box>

<Box sx={{display:'flex', width:'100%', height:'70vh',

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

        }}> 

{rows.length > 0 ? (
                  <DataGrid
                    rows={rows ?? []}
                    columns={columns}
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
                    }}
                  >

                    No Data
                  </div>
                )}
        
        
        </Box>    

          </Box>
          
   

          <Box sx={{
            display:'flex', width:'50%', minHeight:'100%',flexDirection:'column', 
          }}>

<Box
                          sx={{
                            minHeight: "3vh",
                            overflow: "hidden",
                            pl: "1em",
                            background: "hsla(0, 0%, 100%, 1)",
                            background:
                              "linear-gradient(90deg, hsla(0, 0%, 100%, 1) 0%, hsla(0, 0%, 84%, 1) 100%)",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#3d3d3d",
                              fontSize: "28px",
                              fontWeight: "bold",
                            }}
                          >
                            Departments
                          </Typography>
                          {/* <Typography
                            variant="h7"
                            sx={{ mt: "5px" }}
                            color="#666666"
                          >
                            Get latest status of meetings.
                          </Typography> */}
                        </Box>

<Box sx={{display:'flex', width:'100%', height:'70vh',
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
                  
        }}>


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
                    }}
                  >

                    No Data
                  </div>
                )}
          
          </Box>          

          </Box>


   

        </Box>
      </Paper>

  </Grid>
</Grid>
    </Box>



    <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >

    <Dialog
            open={openRoleDialog}
            onClose={handleRoleDialogClose}
            PaperProps={{ sx: { mt: "5em", borderRadius: "5px" } }}
          >
            <DialogTitle
              sx={{ textAlign: "center", fontSize: "29px", fontWeight: "600" }}
            >
              Add Role Form
            </DialogTitle>
            <DialogContent>
             
                <form style={{ width: "380px",}}>
                  <TextField
                    size="small"
                    sx={{ mt: "1em",}}
                    label="Role Name"
                    fullWidth
                    value={roleFormData.name}
                    inputProps={{ maxLength: 26 }}
                    onChange={(e) =>
                      setRoleFormData({
                        ...roleFormData,
                        name: e.target.value,
                      })
                    }
                    required
                  />

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
                onClick={handleRoleDialogClose}
                color="secondary"
                sx={{ width: "6em" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmitAddRole}
                color="primary"
                sx={{ width: "6em" }}
                disabled={btnLoading}
              >
                              {btnLoading ? <CircularProgress size="2em" /> : "Save"}
              </Button>
            </DialogActions>
          </Dialog>





          <Dialog
            open={openDeptDialog}
            onClose={handleDeptDialogClose}
            PaperProps={{ sx: { mt: "5em", borderRadius: "5px" } }}
          >
            <DialogTitle
              sx={{ textAlign: "center", fontSize: "29px", fontWeight: "600" }}
            >
              Add Dept Form
            </DialogTitle>
            <DialogContent>
             
                <form style={{ width: "380px",}}>
                  <TextField
                    size="small"
                    sx={{ mt: "1em",}}
                    label="Department Name"
                    fullWidth
                    value={deptFormData.name}
                    inputProps={{ maxLength: 26 }}
                    onChange={(e) =>
                      setDeptFormData({
                        ...deptFormData,
                        name: e.target.value,
                      })
                    }
                    required
                  />

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
                onClick={handleDeptDialogClose}
                color="secondary"
                sx={{ width: "6em" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmitAddDept}
                color="primary"
                sx={{ width: "6em" }}
                disabled={btnLoading}
              >
                              {btnLoading ? <CircularProgress size="2em" /> : "Save"}
              </Button>
            </DialogActions>
          </Dialog>

          </Box>








          
    </>
  )
}

export default RolesAndDepartments