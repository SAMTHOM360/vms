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

const Employee = () => {
  const { isLimitReached, setIsNavBar, setIsSideBar, setActiveListItem } =
    useAuth();

  // console.log("isLimitReached", isLimitReached)
  // sessionStorage.setItem('activeListItem', '/employee')
  useEffect(() => {
    setActiveListItem('/employee')
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
  // const BASE_URL = 'http://192.168.12.12:8080/api/user';

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AuthToken}`,
    },
  });

  const headers = {
    Authorization: `Bearer ${AuthToken}`,
  };
  const isSuperAdmin = loggedUserRole === "SUPERADMIN";

  const [rows, setRows] = useState([]);
  const [AddUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [columns, setColumns] = useState([]);
  const [divText, setDivText] = useState("");
  const [isSUPERADMINAllowed, setIsSUPERADMINAllowed] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [ isReceptAllowed, setIsReceptAllowed ] = useState()
  const navigate = useNavigate();
  const [ depts, setDepts ] = useState([])
  const [scopeIsLimitReached, setScopeIsLimitReached] = useState()
  let formattedHead;

  if (loggedUserRole === "SUPERADMIN") {
    formattedHead = "Admins";
  } else {
    formattedHead = "Employees";
  }

  let formatedLimit;
  if (loggedUserRole === "ADMIN") {
    formatedLimit = `/${limit}`;
  } else if (loggedUserRole === "SUPERADMIN") {
    formatedLimit = "";
  } else {
    formatedLimit = "0";
  }

  const handleIsSUPERADMINAllowed = () => {
    if (loggedUserRole) {
      if (loggedUserRole === "SUPERADMIN") {
        setIsSUPERADMINAllowed(false);
      } else {
        setIsSUPERADMINAllowed(true);
      }
    }
  };

  useEffect(() => {
    handleIsSUPERADMINAllowed();
  }, [loggedUserRole]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleDelete = async (id) => {
    if (id == adminId) {
      toast.error("You cannot delete yourself !!!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else {
      if (window.confirm("Are you sure you want to delete this row?")) {
        try {
          const deletePayload = {
            id: id,
            isActive: false,
          };

          const response = await axiosInstance.post(
            `${BASE_URL}/delete`,
            deletePayload,
            { headers }
          );
          // console.log("deleted", response)
          if (response.status === 200) {
            toast.success("User is succesfully deleted.", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            const updatedRows = rows.map((row) =>
              row.id === id ? { ...row, isActive: true } : row
            );
            setRows(updatedRows);
            // console.log(`Deleted item with ID ${id} and set isActive to false`);
            fetchData();
          }
        } catch (error) {
          console.error("Error deleting item:", error);
        }
      }
    }
  };

  const handleEdit = async (item) => {
    try {
      setLoading(true);
      const itemId = item.id;

      const response = await axiosInstance.get(`${BASE_URL}/getbyid/${itemId}`);

      if (response.status === 200) {
        const apiData = response.data.data.data;

        console.log('handle edit api data', apiData)

        setEditedItem({
          id: apiData.id || "",
          firstName: apiData.firstName || "",
          lastName: apiData.lastName || "",
          email: apiData.email || "",
          phone: apiData.phone || "",
          dept: {
            id: apiData.departmentDto ? apiData.departmentDto.id || "" : "",
            name: apiData.departmentDto ? apiData.departmentDto.name || "" : "",
          },

          role: apiData.role ?  apiData.role.id || "" : "",
          roleName: apiData.role ? apiData.role.name || "" : "",
          isPermission: apiData.isPermission || "",
        });

        setOpenEditDialog(true);
        setLoading(false)
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleOpenSingleUserForm = () => {
    // setAddUserDialogOpen(true)
    navigate("/userform");
  };

  const handleOpenBulkUsersForm = () => {
    // setAddUserDialogOpen(true)
    navigate("/bulkform");
  };

  const handleAddDialogClose = () => {
    setAddUserDialogOpen(false);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleSaveEdit = async () => {
    // console.log("edited item role", editedItem)
    const payload = {
      firstName: editedItem.firstName,
      lastName: editedItem.lastName,
      email: editedItem.email,
      id: editedItem.id,
      phone: editedItem.phone,
      role: {
        id: editedItem.role,
      },
      departmentDto: {
        id: editedItem.dept.id,
      },
      isPermission: editedItem.isPermission,
    };
    try {
      setBtnLoading(true);
      setLoading(true);

      const response = await axios.post(`${BASE_URL}/adduser`, payload, {
        headers,
      });
      if (response.status === 200) {
        toast.success("Selected user is successfully updated.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const response = await axiosInstance.get(
          `${BASE_URL}/getbyid/${editedItem.id}`
        );
        const updatedData = response.data.data.data;
        console.log(" updated data", updatedData)

        const updatedRole = updatedData.role || {};
        const updatedRoleName = updatedRole.name || "";
        const updatedDept = updatedData.departmentDto || {}
        const updatedIsPermission= updatedData.isPermission || ""

        const updatedRows = rows.map((row) => {
          if (row.id === editedItem.id) {
            return { ...row, ...payload, role: updatedRoleName, dept: updatedDept.name, isPermission: updatedIsPermission ? 'YES' : 'NO'
          };
          }
          return row;
        });
        setRows(updatedRows);
        setOpenEditDialog(false);
      } if (response.status === 400) {
        console.error('got the error')
      }
    } catch (error) {
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
 
 
      } else if (error.response.status === 401) {
        alert(
          "Error in submitting data:  " +
            JSON.stringify(error.response.data.message)
        );
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
        console.error("Error saving changes:", error);
      }
    }
    setBtnLoading(false);
    setLoading(false);
  };





















  async function fetchData() {
    try {
      setDivText("GETTING EMPLOYEE DATA...");
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/getall`, { headers });
  
      const apiDataArray = response.data.data.allUser;
      const currEmpLength = response.data.data.countUser

      console.log("api data users",apiDataArray)
  
      sessionStorage.setItem("currEmpLength", currEmpLength);


          // Get the limit from sessionStorage
    const limit = parseInt(sessionStorage.getItem("limit"), 10);

    // Check if the current employee length is greater than or equal to the limit
    const isAddLimitReached = currEmpLength >= limit;

    // Set the state based on the limit condition
    setScopeIsLimitReached(isAddLimitReached);


  
      if (!Array.isArray(apiDataArray) || apiDataArray.length === 0) {
        setDivText("NO DATA FOUND !!!");
        setLoading(false);
        return;
      }
  
      const commonColumns = [
        {
          field: "serialNo",
          headerName: "Sl No",
          align: "center",
          headerAlign: "center",
        },
        {
          field: "firstName",
          headerName: "First Name",
          flex: 1,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "lastName",
          headerName: "Last Name",
          flex: 1,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "phone",
          headerName: "Phone",
          flex: 1,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "email",
          headerName: "Email",
          flex: 1,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "company",
          headerName: "Company",
          flex: 1,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "dept",
          headerName: "Department",
          flex: 1,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "role",
          headerName: "Role",
          flex: 1,
          align: "center",
          headerAlign: "center",
        },
        // {
        //   field: "actions",
        //   align: "center",
        //   headerAlign: "center",
        //   headerName: "Actions",
        //   width: 110,
        //   editable: false,
        //   hide: false,
        //   sortable: false,
        //   filterable: false,
        //   disableColumnFilter: true,
        //   disableColumnMenu: true,
        //   disableColumnSelector: true,
        //   renderCell: (params) => (
        //     <div>
        //       <IconButton
        //         color="primary"
        //         onClick={() => handleEdit(params.row)}
        //       >
        //         <EditIcon />
        //       </IconButton>
        //       <IconButton
        //         color="secondary"
        //         onClick={() => handleDelete(params.row.id)}
        //       >
        //         <DeleteIcon />
        //       </IconButton>
        //     </div>
        //   ),
        // },
      ];
  
      let additionalColumns = [
        {
          field: "actions",
          align: "center",
          headerAlign: "center",
          headerName: "Actions",
          width: 110,
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
  
      if (loggedUserRole !== "SUPERADMIN") {
        additionalColumns.push({
          field: "isPermission",
          headerName: "Meet Crosscheck",
          flex: 1,
          align: "center",
          headerAlign: "center",
        });
      }
  
      const gridColumns = [...commonColumns, ...additionalColumns];
  
      const gridRows = apiDataArray.map((apiDataItem, index) => ({
        id: apiDataItem.id,
        serialNo: index + 1,
        firstName: apiDataItem.firstName,
        lastName: apiDataItem.lastName,
        phone: apiDataItem.phone,
        email: apiDataItem.email,
        company: apiDataItem.company ? apiDataItem.company.name : "",
        dept: apiDataItem.departmentDto ? apiDataItem.departmentDto.name : "",
        role: apiDataItem.role ? apiDataItem.role.name : "",
        isPermission: apiDataItem.isPermission ? "YES" : "NO",
      }));
  
      setColumns(gridColumns);
      setRows(gridRows);
      setDivText("");
    } catch (error) {
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
      console.error("Error fetching data:", error);
    } finally {
      setDivText("NO DATA FOUND !!!");
      setLoading(false);
    }
  }
  






























  // async function fetchData() {
  //   try {
  //     setDivText("GETTING EMPLOYEE DATA...");
  //     setLoading(true);
  //     const response = await axios.get(`${BASE_URL}/getall`, { headers });

  //     const apiDataArray = response.data;

  //     // console.log("apidata index 0", apiDataArray[0].departmentDto);
  //     // console.log("apidata ", apiDataArray);

  //     sessionStorage.setItem("currEmpLength", apiDataArray.length);

  //     if (!Array.isArray(apiDataArray) || apiDataArray.length === 0) {
  //       // console.error(
  //       //   "API response does not contain the expected array or the array is empty:",
  //       //   apiDataArray
  //       // );
  //       setDivText("NO DATA FOUND !!!");
  // setLoading(false);
  //       return;
  //     }

  //     const gridColumns = [
  //       {
  //         field: "serialNo",
  //         headerName: "Sl No",
  //         align: "center",
  //         headerAlign: "center",
  //       },
  //       {
  //         field: "firstName",
  //         headerName: "First Name",
  //         flex: 1,
  //         align: "center",
  //         headerAlign: "center",
  //       },
  //       {
  //         field: "lastName",
  //         headerName: "Last Name",
  //         flex: 1,
  //         align: "center",
  //         headerAlign: "center",
  //       },
  //       {
  //         field: "phone",
  //         headerName: "Phone",
  //         flex: 1,
  //         align: "center",
  //         headerAlign: "center",
  //       },
  //       {
  //         field: "email",
  //         headerName: "Email",
  //         flex: 1,
  //         align: "center",
  //         headerAlign: "center",
  //       },
  //       {
  //         field: "company",
  //         headerName: "Company",
  //         flex: 1,
  //         align: "center",
  //         headerAlign: "center",
  //       },
  //       {
  //         field: "dept",
  //         headerName: "Department",
  //         flex: 1,
  //         align: "center",
  //         headerAlign: "center",
  //       },
  //       {
  //         field: "role",
  //         headerName: "Role",
  //         flex: 1,
  //         align: "center",
  //         headerAlign: "center",
  //       },
  //       {
  //         field: "isPermission",
  //         headerName: "Meet Crosscheck",
  //         flex: 1,
  //         align: "center",
  //         headerAlign: "center",

  //       },
  //       {
  //         field: "actions",
  //         align: "center",
  //         headerAlign: "center",
  //         headerName: "Actions",
  //         width: 110,
  //         editable: false,
  //         hide: false,
  //         sortable: false,
  //         filterable: false,
  //         disableColumnFilter: true,
  //         disableColumnMenu: true,
  //         disableColumnSelector: true,
  //         renderCell: (params) => (
  //           <div>
  //             <IconButton
  //               color="primary"
  //               onClick={() => handleEdit(params.row)}
  //             >
  //               <EditIcon />
  //             </IconButton>
  //             <IconButton
  //               color="secondary"
  //               onClick={() => handleDelete(params.row.id)}
  //             >
  //               <DeleteIcon />
  //             </IconButton>
  //           </div>
  //         ),
  //       },
  //     ];


  //   console.log("Grid Columns:", gridColumns);

  //     const gridRows = apiDataArray.map((apiDataItem, index) => ({
  //       id: apiDataItem.id,
  //       serialNo: index + 1,
  //       firstName: apiDataItem.firstName,
  //       lastName: apiDataItem.lastName,
  //       phone: apiDataItem.phone,
  //       email: apiDataItem.email,
  //       company: apiDataItem.company ? apiDataItem.company.name : "",
  //       dept: apiDataItem.departmentDto ? apiDataItem.departmentDto.name : "",
  //       role: apiDataItem.role ? apiDataItem.role.name : "",
  //       // isPermission: apiDataItem.isPermission
  //       isPermission: apiDataItem.isPermission ? "YES" : "NO",
  //     }));

  //     setColumns(gridColumns);
  //     setRows(gridRows);
  //     setDivText("");
  //   } catch (error) {
  //     toast.error("Something went wrong !", {
  //       position: "top-right",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     console.error("Error fetching data:", error);
  //   }
  //   setDivText("NO DATA FOUND !!!");
  //   setLoading(false);
  // }


  // async function fetchData() {
  //   try {
  //     const fetchPromise = axios.get(`${BASE_URL}/getall`, { headers });

  //     const response = await Promise.race([
  //       fetchPromise,
  //       new Promise((_, reject) => {
  //         setTimeout(() => {
  //           reject(new Error("Timeout exceeded"));
  //         }, 10000);
  //       }),
  //     ]);

  //     const apiDataArray = response.data;

  //     // console.log("apidata index 0", apiDataArray[0].departmentDto);
  //     // console.log("apidata ", apiDataArray);

  //     sessionStorage.setItem("currEmpLength", apiDataArray.length);

  //     if (!Array.isArray(apiDataArray) || apiDataArray.length === 0) {
  //       console.error(
  //         "API response does not contain the expected array or the array is empty:",
  //         apiDataArray
  //       );
  //       return;
  //     }

  //     const gridColumns = [
  //       {
  //         field: "serialNo",
  //         headerName: "Sl No",
  //         align: "center",
  //         headerAlign: "center",
  //       },
  //       {
  //         field: "firstName",
  //         headerName: "First Name",
  //         flex: 1,
  //         align: "center",
  //         headerAlign: "center",
  //       },
  //       {
  //         field: "lastName",
  //         headerName: "Last Name",
  //         flex: 1,
  //         align: "center",
  //         headerAlign: "center",
  //       },
  //       {
  //         field: "phone",
  //         headerName: "Phone",
  //         flex: 1,
  //         align: "center",
  //         headerAlign: "center",
  //       },
  //       {
  //         field: "email",
  //         headerName: "Email",
  //         flex: 1,
  //         align: "center",
  //         headerAlign: "center",
  //       },
  //       {
  //         field: "company",
  //         headerName: "Company",
  //         flex: 1,
  //         align: "center",
  //         headerAlign: "center",
  //       },
  //       {
  //         field: "dept",
  //         headerName: "Department",
  //         flex: 1,
  //         align: "center",
  //         headerAlign: "center",
  //       },
  //       {
  //         field: "role",
  //         headerName: "Role",
  //         flex: 1,
  //         align: "center",
  //         headerAlign: "center",
  //       },
  //       {
  //         field: "isPermission",
  //         headerName: "Meet Crosscheck",
  //         flex: 1,
  //         align: "center",
  //         headerAlign: "center",
  //       },
  //       {
  //         field: "actions",
  //         align: "center",
  //         headerAlign: "center",
  //         headerName: "Actions",
  //         width: 110,
  //         editable: false,
  //         hide: false,
  //         sortable: false,
  //         filterable: false,
  //         disableColumnFilter: true,
  //         disableColumnMenu: true,
  //         disableColumnSelector: true,
  //         renderCell: (params) => (
  //           <div>
  //             <IconButton
  //               color="primary"
  //               onClick={() => handleEdit(params.row)}
  //             >
  //               <EditIcon />
  //             </IconButton>
  //             <IconButton
  //               color="secondary"
  //               onClick={() => handleDelete(params.row.id)}
  //             >
  //               <DeleteIcon />
  //             </IconButton>
  //           </div>
  //         ),
  //       },
  //     ];

  //     const gridRows = apiDataArray.map((apiDataItem, index) => ({
  //       id: apiDataItem.id,
  //       serialNo: index + 1,
  //       firstName: apiDataItem.firstName,
  //       lastName: apiDataItem.lastName,
  //       phone: apiDataItem.phone,
  //       email: apiDataItem.email,
  //       company: apiDataItem.company ? apiDataItem.company.name : "",
  //       dept: apiDataItem.departmentDto ? apiDataItem.departmentDto.name : "",
  //       role: apiDataItem.role ? apiDataItem.role.name : "",
  //       // isPermission: apiDataItem.isPermission
  //       isPermission: apiDataItem.isPermission ? "YES" : "NO",
  //     }));

  //     setColumns(gridColumns);
  //     setRows(gridRows);
  //     setDivText("");
  //   } catch (error) {
  //     toast.error("Something went wrong !", {
  //       position: "top-right",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setDivText("NO DATA FOUND !!!");
  //   setLoading(false);
  //   }
    
  // }



  async function fetchRoles() {
    try {
      const response = await axios.get(
        "http://192.168.12.54:8080/api/role/getall", { headers }
      );
      setRoles(response.data.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }
  const fetchDepts = async () => {
    try{
      const response = await axios.get(`http://192.168.12.54:8080/api/department/companyId?companyId=${companyId}`)
      const deptApiData = response.data.data
      // console.log("dept data", response.data.data)
      setDepts(deptApiData)
    } catch(error) {
      console.error("Error in fetching depts", error)
    }
  }

  useEffect(() => {
    fetchDepts()
  }, [companyId])

  useEffect(() => {
    fetchData();
    fetchRoles();
    setIsNavBar(true);
    setIsSideBar(true);
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Loader isLoading={loading} />
      <Box sx={{ display: "flex", flexGrow: 1, p: 3 }}>
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
              <Header
                title={formattedHead}
                subtitle={`List of ${formattedHead} for Future Reference`}
              />
              <Box sx={{ display: "flex", alignItems: "center", justifyContent:'end', minWidth:'31.3em', ml:'2em' }}>
                <Typography
                  sx={{ fontSize: "20px", fontWeight: "550", color: "#949494" }}
                >
                  {formattedHead}: {currEmpLength}
                  {formatedLimit}
                </Typography>
                {scopeIsLimitReached ? (
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ margin: "1.2em", height: "3em" }}
                    disabled
                  >
                    Max Limit Reached
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ marginLeft: "1.2em", height: "3em", width: "11em" }}
                      onClick={handleOpenSingleUserForm}
                    >
                      Add a User
                    </Button>

                    {isSUPERADMINAllowed ? (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ margin: "1.2em", height: "3em", width: "11em" }}
                        onClick={handleOpenBulkUsersForm}
                      >
                        Add Bulk Users
                      </Button>
                    ) : null}
                  </>
                )}
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
                // overflowX:'hidden'
              }}
            >
              <Box
                m="20px 0 0 0"
                flexGrow={1}
                height="75vh"
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
                  maxWidth: "95%",
                  borderRadius: "5px",
                }}
              >
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
                    {divText}
                  </div>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Dialog
            open={AddUserDialogOpen}
            onClose={handleAddDialogClose}
            PaperProps={{
              sx: {
                width: "100%",
                maxWidth: "380px!important",
                mt: "5em",
                borderRadius: "15px",
                ml: "6em",
              },
            }}
          >
            <DialogTitle
              sx={{ textAlign: "center", fontSize: "29px", fontWeight: "600" }}
            >
              New User Form
            </DialogTitle>
            <DialogContent sx={{ height: "37em" }}>
              <UserForm
                closeDialog={handleAddDialogClose}
                // fetchData={fetchData}
              />
            </DialogContent>
          </Dialog>

          <Dialog
            open={openEditDialog}
            onClose={handleEditDialogClose}
            PaperProps={{ sx: { mt: "5em", borderRadius: "5px" } }}
          >
            <DialogTitle
              sx={{ textAlign: "center", fontSize: "29px", fontWeight: "600" }}
            >
              Update Form
            </DialogTitle>
            <DialogContent>
              {editedItem && (
                <form style={{ width: "380px" }}>
                  <TextField
                    size="small"
                    sx={{ mt: "1em" }}
                    label="First Name"
                    fullWidth
                    value={editedItem.firstName}
                    inputProps={{ maxLength: 26 }}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        firstName: e.target.value,
                      })
                    }
                    required
                  />
                  <TextField
                    size="small"
                    sx={{ mt: "1em" }}
                    label="Last Name"
                    fullWidth
                    value={editedItem.lastName}
                    inputProps={{ maxLength: 26 }}
                    onChange={(e) =>
                      setEditedItem({ ...editedItem, lastName: e.target.value })
                    }
                    required
                  />
                  <TextField
                    size="small"
                    sx={{ mt: "1em" }}
                    label="Email"
                    type="email"
                    fullWidth
                    value={editedItem.email}
                    inputProps={{ maxLength: 126 }}
                    onChange={(e) =>
                      setEditedItem({ ...editedItem, email: e.target.value })
                    }
                    required
                  />
                  <TextField
                sx={{ mt: "1em" }}
                label="Phone"
                size="small"
                fullWidth
                value={editedItem.phone}
                inputProps={{
                  pattern: '^[0-9]*',
                  onInput: (e) => {
                    let value = e.target.value;
                    value = value.replace(/\D/g, ''); 
                    if (value.length > 10) {
                      value = value.slice(0, 10);
                    }
                    setEditedItem({
                      ...editedItem,
                      phone: value,
                    });
                  },
                }}
                required
              />

<FormControl sx={{ width: "100%", mt: "1em" }} size="small" required>
                      <InputLabel htmlFor="dept">Department</InputLabel>
                      <Select
                        label="Department"
                        name="dept"
                        value={editedItem.dept.id || ""}
                        
                        required
                        onChange={(e) => {
                          const updatedItem = { ...editedItem, dept: { ...editedItem.dept, id: e.target.value } };
                          setSelectedDept(e.target.value);
                          setEditedItem(updatedItem);
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 150,
                            },
                          },
                        }}
                    
                      >
                        {depts.map((dept) => (
                          <MenuItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                  <FormControl fullWidth size="small" sx={{ mt: "1em" }}>
                    <InputLabel required>Role</InputLabel>
                    <Select
                      label="Role"
                      value={editedItem.role}
                      required
                      onChange={(e) => {
                        setSelectedRole(e.target.value);
                        setEditedItem({ ...editedItem, role: e.target.value });
                      }}
                      disabled={
                        loggedUserRole === editedItem.roleName ? true : false
                      }
                    >
                      <MenuItem value="" disabled>
                        Select a role
                      </MenuItem>
                      {roles &&
                        roles.length > 0 &&
                        roles.map((role) => (
                          <MenuItem key={role.id} value={role.id}>
                            {role.name}
                          </MenuItem>
                          
                        ))}
                    </Select>
                  </FormControl>


                  { isSUPERADMINAllowed ?

<FormControl sx={{ width: "100%", mt: "1em" }} size="small" fullWidth>
<InputLabel id="approval-label">
  Can Receptionist approve meet?
</InputLabel>
<Select
  labelId="approval-label"
  name="isPermission"
  value={editedItem.isPermission}
  label="Can Receptionist approve meet?"
  onChange={(e) => {
    setIsReceptAllowed(e.target.value);
    setEditedItem({ ...editedItem, isPermission: e.target.value });
  }}
>
  {/* <MenuItem value="true">True</MenuItem>
  <MenuItem value="false">False</MenuItem> */}

  <MenuItem value="true">YES</MenuItem>
  <MenuItem value="false">NO</MenuItem>
</Select>
</FormControl>

:
null
                  
                }
                </form>
              )}
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
                onClick={handleEditDialogClose}
                color="secondary"
                sx={{ width: "6em" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSaveEdit}
                color="primary"
                sx={{ width: "6em" }}
                disabled={btnLoading}
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

export default Employee;
