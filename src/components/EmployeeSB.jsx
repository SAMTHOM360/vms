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
import DownloadIcon from "@mui/icons-material/Download";
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

// import * as XLSX from "xlsx";
import * as XLSX from "sheetjs-style";

const Employee = () => {
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
    setActiveListItem("/employee");
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
  // const BASE_URL = 'http://192.168.12.12:8080/api/user';

  let urlAxiosInstance =
    Config.baseUrl + Config.apiEndPoints.employeeSBAxiosInstance;

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
  const isSuperAdmin = loggedUserRole === "SUPERADMIN";

  const [rows, setRows] = useState([]);
  const [AddUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedItem, setEditedItem] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dept: {
      id: "",
      name: "",
    },
    role: "",
    roleName: "",
    isPermission: false,
    empCode: "",
    company: {
      id: null,
    },
  });
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [columns, setColumns] = useState([]);
  const [divText, setDivText] = useState("");
  const [isSUPERADMINAllowed, setIsSUPERADMINAllowed] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isReceptAllowed, setIsReceptAllowed] = useState();
  const navigate = useNavigate();
  const [depts, setDepts] = useState([]);
  const [scopeIsLimitReached, setScopeIsLimitReached] = useState();
  const [excelUrl, setExcelUrl] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exportExcelData, setExportExcelData] = useState([]);

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

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleDelete = async (id) => {
    // toast.dismiss();
    let url = Config.baseUrl + Config.apiEndPoints.employeeSbBDelete;
    if (id == adminId) {
      toast.error("You cannot delete yourself !!!", {
        toastId: "profile-error1",
      });
      return;
    } else {
      if (window.confirm("Are you sure you want to delete this row?")) {
        try {
          const deletePayload = {
            id: id,
            isActive: false,
          };

          const response = await axiosInstance.post(`${url}`, deletePayload, {
            headers,
          });
          // console.log("deleted", response)
          if (response.status === 200) {
            toast.success("User is successfully deleted.", {
              toastId: "emp-success1",
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
    let url = Config.baseUrl + Config.apiEndPoints.employeeSBUserGetById;
    try {
      setLoading(true);
      const itemId = item.id;

      const response = await axiosInstance.get(`${url}/${itemId}`);

      if (response.status === 200) {
        const apiData = response.data.data.data;
        let selectedUserCompanyId = apiData.company
          ? apiData.company.id
            ? apiData.company.id
            : null
          : null;

        await fetchDepts({ selectedCompanyId: selectedUserCompanyId });

        // console.log('handle edit api data', apiData)
        // const departmentIdFromApi = apiData.departmentDto ? apiData.departmentDto.id || "" : "";
        // const isValidDepartmentId = depts.some(dept => dept.id === departmentIdFromApi);

        // console.log('depts', depts)
        // console.log('departmentIdFromApi', departmentIdFromApi)
        // console.log('isValidDepartmentId', isValidDepartmentId)

        setEditedItem({
          id: apiData.id || "",
          firstName: apiData.firstName || "",
          lastName: apiData.lastName || "",
          email: apiData.email || "",
          phone: apiData.phone || "",
          dept: {
            id: apiData.departmentDto ? apiData.departmentDto.id || "" : "",
            // id: isValidDepartmentId ? departmentIdFromApi : "",
            name: apiData.departmentDto ? apiData.departmentDto.name || "" : "",
          },

          role: apiData.role ? apiData.role.id || "" : "",
          roleName: apiData.role ? apiData.role.name || "" : "",
          isPermission: apiData.isPermission || false,
          empCode: apiData.empCode || "",
          company: {
            id: apiData.company
              ? apiData.company.id
                ? apiData.company.id
                : null
              : null,
          },
        });

        setOpenEditDialog(true);
        setLoading(false);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // console.log('depts outside handle edit', depts)

  useEffect(() => {
    // Check the validity of the department ID here
    const departmentIdFromApi = editedItem.dept ? editedItem.dept.id || "" : "";
    const isValidDepartmentId = depts.some(
      (dept) => dept.id === departmentIdFromApi
    );

    // console.log('departmentIdFromApi', departmentIdFromApi);
    // console.log('isValidDepartmentId', isValidDepartmentId);

    // If the department ID is not valid, update it to a valid value
    if (!isValidDepartmentId && depts.length > 0) {
      const validDepartmentId = depts[0].id; // Use the first department ID as a fallback
      const updatedItem = {
        ...editedItem,
        dept: {
          ...editedItem.dept,
          id: validDepartmentId,
        },
      };
      setEditedItem(updatedItem);
    }
  }, [depts, editedItem.dept.id]);

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

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    // toast.dismiss();

    const trimmedFirstName = editedItem.firstName
      ? editedItem.firstName.trim()
      : null;
    const trimmedLastName = editedItem.lastName
      ? editedItem.lastName.trim()
      : null;
    const trimmedEmail = editedItem.email ? editedItem.email.trim() : null;
    // const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  // working somehow
    const emailFormat = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // working efficiently

    if (!emailFormat.test(trimmedEmail)) {
      toast.warn("Invalid email address. Please enter a valid email address.", {
        toastId: "edit-emp-email",
      });
      return;
    }

    if (!trimmedFirstName) {
      toast.warn("First Name is required !!!", {
        toastId: "edit-emp-firstName",
      });
      return;
    }

    if (!trimmedLastName) {
      toast.warn("Last Name is required !!!", {
        toastId: "edit-emp-lastname",
      });
      return;
    }

    if (!trimmedEmail) {
      toast.warn("Email is required !!!", {
        toastId: "edit-emp-emptyEmail",
      });
      return;
    }

    if (editedItem.phone.length !== 10) {
      toast.warn("Phone Number must be of 10 digits !!!", {
        toastId: "edit-emp-phone-warn11",
      });
      return;
    }

    // console.log("edited item role", editedItem)
    let url1 = Config.baseUrl + Config.apiEndPoints.employeeSBAddUser;
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
      empCode: editedItem.empCode,
    };
    // console.log(" edited payload", payload)
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "role",
      "dept",
    ];
    const missingFields = requiredFields.filter((field) => !editedItem[field]);

    // console.log('missing fields', missingFields)

    if (missingFields.length > 0) {
      toast.warn("All fields are required!", {
        toastId: "edit-emp-missFields",
      });
      return;
    }
    // debugger
    try {
      setBtnLoading(true);
      setLoading(true);

      const response = await axios.post(`${url1}`, payload, {
        headers,
      });
      if (response.status === 200) {
        toast.success("Selected user is successfully updated.", {
          toastId: "edit-emp-submitSuccess",
        });
        let url2 = Config.baseUrl + Config.apiEndPoints.employeeSBUserGetById;

        const response = await axiosInstance.get(`${url2}/${editedItem.id}`);
        const updatedData = response.data.data.data;
        // console.log(" updated data", updatedData)

        const updatedRole = updatedData.role || {};
        const updatedRoleName = updatedRole.name || "";
        const updatedDept = updatedData.departmentDto || {};
        const updatedIsPermission = updatedData.isPermission || false;

        const updatedRows = rows.map((row) => {
          if (row.id === editedItem.id) {
            return {
              ...row,
              ...payload,
              role: updatedRoleName,
              dept: updatedDept.name,
              isPermission: updatedIsPermission ? "YES" : "NO",
            };
          }
          return row;
        });
        setRows(updatedRows);
        setOpenEditDialog(false);
      }
    } catch (error) {
      if (error.request.status === 400) {
        // toast.error("Something went wrong !", {
        //   toastId:"edit-emp-error1"
        // });

        let errMessage = "";

        // console.log("got error", error.response)

        // console.log(" holaaa",  error.response.data)
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errMessage = error.response.data.message;
          const cleanedMessage = JSON.stringify(errMessage);
          toast.error(JSON.parse(cleanedMessage) + " !!!", {
            toastId: "userfrom-error5",
          });
        }
      } else if (error.response.status === 401) {
        // alert(
        //   "Error in submitting data:  " +
        //     JSON.stringify(error.response.data.message)
        // );
        toast.error("Something went wrong !", {
          toastId: "edit-emp-editerror2",
        });
      } else {
        toast.error("Something went wrong !", {
          toastId: "edit-emp-editerror3",
        });
        console.error("Error saving changes:", error);
      }
    }
    setBtnLoading(false);
    setLoading(false);
  };

  // console.log('exportExcelData', exportExcelData)

  async function fetchData() {
    let url = Config.baseUrl + Config.apiEndPoints.employeeSBFetchData;
    try {
      setDivText("GETTING EMPLOYEE DATA...");
      setLoading(true);
      const response = await axios.get(`${url}`, { headers });

      // console.log('resoponso', response.data.data)

      const apiDataArray = response.data.data.allUser;
      const currEmpLength = response.data.data.countUser;

      if (response.data.data.excelUrl) {
        let excelURL = response.data.data.excelUrl;
        setExcelUrl(excelURL);
      }

      // console.log("api data users",apiDataArray[2])

      sessionStorage.setItem("currEmpLength", currEmpLength);

      // Get the limit from sessionStorage
      const limit = parseInt(sessionStorage.getItem("limit"), 10);

      // Check if the current employee length is greater than or equal to the limit
      const isAddLimitReached = currEmpLength >= limit;

      // Set the state based on the limit condition
      setScopeIsLimitReached(isAddLimitReached);

      if (!Array.isArray(apiDataArray) || apiDataArray.length === 0) {
        setDivText("NO RECORDS FOUND !!!");
        setLoading(false);
        return;
      }

      setExportExcelData(apiDataArray);

      // const commonColumns = [
      //   {
      //     field: "actions",
      //     align: "center",
      //     headerAlign: "center",
      //     headerName: "Actions",
      //     width: 110,
      //     fixed: true,
      //     editable: false,
      //     // hide: false,
      //     hidePrint: true,
      //     sortable: false,
      //     filterable: false,
      //     disableColumnFilter: true,
      //     disableColumnMenu: true,
      //     disableColumnSelector: true,
      //     renderCell: (params) => (
      //       <div>
      //         <IconButton
      //           color="primary"
      //           onClick={() => handleEdit(params.row)}
      //         >
      //           <EditIcon />
      //         </IconButton>
      //         <IconButton
      //           color="secondary"
      //           onClick={() => handleDelete(params.row.id)}
      //         >
      //           <DeleteIcon />
      //         </IconButton>
      //       </div>
      //     ),
      //   },

      //   {
      //     field: "serialNo",
      //     headerName: "Sl No",
      //     align: "center",
      //     headerAlign: "center",
      //     width: 120,
      //   },

      //   {
      //     field: "name",
      //     headerName: "Name",
      //     // flex: 1,
      //     align: "center",
      //     headerAlign: "center",
      //     width: 400,
      //   },

      //   {
      //     field: "phone",
      //     headerName: "Phone",
      //     // flex: 1,
      //     align: "center",
      //     headerAlign: "center",
      //     width: 180,
      //   },
      //   {
      //     field: "email",
      //     headerName: "Email",
      //     // flex: 1,
      //     align: "center",
      //     headerAlign: "center",
      //     width: 330,
      //   },

      //   {
      //     field: "state",
      //     headerName: "State",
      //     // flex: 1,
      //     align: "center",
      //     headerAlign: "center",
      //     width: 220,
      //   },

      //   {
      //     field: "city",
      //     headerName: "City",
      //     // flex: 1,
      //     align: "center",
      //     headerAlign: "center",
      //     width: 200,
      //   },

      //   {
      //     field: "govtId",
      //     headerName: "Government ID",
      //     // flex: 1,
      //     align: "center",
      //     headerAlign: "center",
      //     width: 190,
      //   },
      //   // {
      //   //   field: "company",
      //   //   headerName: "Company",
      //   //   flex: 1,
      //   //   align: "center",
      //   //   headerAlign: "center",
      //   // },
      //   {
      //     field: "dept",
      //     headerName: "Department",
      //     // flex: 1,
      //     align: "center",
      //     headerAlign: "center",
      //     width: 180,
      //   },
      //   {
      //     field: "role",
      //     headerName: "Role",
      //     // flex: 1,
      //     align: "center",
      //     headerAlign: "center",
      //     width: 180,
      //   },

      //   {
      //     field: "empCode",
      //     headerName: "Employee Code",
      //     // flex: 1,
      //     align: "center",
      //     headerAlign: "center",
      //     width: 180,
      //   },
      // ];

      let gridColumns = [];

      let firstSegment = [
        {
          field: "actions",
          align: "center",
          headerAlign: "center",
          headerName: "Actions",
          width: 110,
          fixed: true,
          editable: false,
          // hide: false,
          hidePrint: true,
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

        {
          field: "serialNo",
          headerName: "Sl No",
          align: "center",
          headerAlign: "center",
          width: 120,
        },

        {
          field: "name",
          headerName: "Name",
          // flex: 1,
          align: "center",
          headerAlign: "center",
          width: 400,
          renderCell: (params) => {
            const apiDataItem = params.row;
            // console.log('apiDataItem', apiDataItem)
            return (
              <div>
                <span style={{ fontSize: "16px" }}>
                  {apiDataItem.firstName}
                </span>{" "}
                <span style={{ fontSize: "16px" }}>{apiDataItem.lastName}</span>{" "}
                <span style={{ fontSize: "13px" }}>
                  ({apiDataItem.empCode ? apiDataItem.empCode : "N/A"})
                </span>
              </div>
            );
          },
        },

        {
          field: "phone",
          headerName: "Phone",
          // flex: 1,
          align: "center",
          headerAlign: "center",
          width: 180,
        },
        {
          field: "email",
          headerName: "Email",
          // flex: 1,
          align: "center",
          headerAlign: "center",
          width: 330,
        },
      ];

      let secondSegment = [
        {
          field: "dept",
          headerName: "Department",
          // flex: 1,
          align: "center",
          headerAlign: "center",
          width: 180,
        },
        {
          field: "role",
          headerName: "Role",
          // flex: 1,
          align: "center",
          headerAlign: "center",
          width: 180,
        },
      ];

      let thirdSegment = [
        {
          field: "govtId",
          headerName: "Government ID",
          // flex: 1,
          align: "center",
          headerAlign: "center",
          width: 190,
        },

        {
          field: "state",
          headerName: "State",
          // flex: 1,
          align: "center",
          headerAlign: "center",
          width: 220,
        },

        {
          field: "city",
          headerName: "City",
          // flex: 1,
          align: "center",
          headerAlign: "center",
          width: 200,
        },
      ];

      // let isPermissionColumn = [];
      // let companyColumn = [];

      let adminSegmentOne = [
        {
          field: "isPermission",
          headerName: "Receptionist Meet Permissions",
          // headerName: 'Receptionist&nbsp;Meet&nbsp;Permissions',

          // flex: 1,
          align: "center",
          headerAlign: "center",
          width: 270,
        },
      ];

      let superadminSegmentOne = [
        {
          field: "company",
          headerName: "Company",
          // flex: 1,
          align: "center",
          headerAlign: "center",
          width: 300,
        },
      ];
      let superadminSegmentTwo = [
        {
          field: "building",
          headerName: "Building",
          // flex: 1,
          align: "center",
          headerAlign: "center",
          width: 350,
          renderCell: (params) => {
            const apiDataItem = params.row;
            // console.log('apiDataItem', apiDataItem)
            return (
              <div>
                <span style={{ fontSize: "15px" }}>
                  {apiDataItem.buildingName}
                </span>{" "}
                <span style={{ fontSize: "13px" }}>
                  ({apiDataItem.buildingId ? apiDataItem.buildingId : "N/A"})
                </span>
              </div>
            );
          },

          // renderCell: (params) => {
          //   const apiDataItem = params.row;
          //   // console.log('apiDataItem', apiDataItem)
          //   return (
          //     <div>
          //       <span style={{ fontSize: '16px' }}>{apiDataItem.firstName}</span> <span style={{ fontSize: '16px' }}>{apiDataItem.lastName}</span> <span style={{ fontSize: '13px' }}>({apiDataItem.empCode ? apiDataItem.empCode : 'N/A'})</span>
          //     </div>
          //   );
          // },
        },
      ];

      // if (loggedUserRole === "ADMIN") {
      //   isPermissionColumn.push({
      //     field: "isPermission",
      //     headerName: "Recpst. Meet Permissions",
      //     // flex: 1,
      //     align: "center",
      //     headerAlign: "center",
      //     width: 220,
      //   });
      // }

      // if (loggedUserRole === "SUPERADMIN") {
      //   companyColumn.push(
      //     {
      //       field: "company",
      //       headerName: "Company",
      //       // flex: 1,
      //       align: "center",
      //       headerAlign: "center",
      //       width: 200,
      //     },
      //     {
      //       field: "buildingId",
      //       headerName: "Building ID",
      //       // flex: 1,
      //       align: "center",
      //       headerAlign: "center",
      //       width: 120,
      //     }
      //   );
      // }

      if (loggedUserRole === "ADMIN") {
        gridColumns = [
          ...firstSegment,
          ...secondSegment,
          ...thirdSegment,
          ...adminSegmentOne,
        ];
      }

      if (loggedUserRole === "SUPERADMIN") {
        gridColumns = [
          ...firstSegment,
          ...superadminSegmentOne,
          ...secondSegment,
          ...superadminSegmentTwo,
          ...thirdSegment,
        ];
      }

      // const gridColumns = [
      //   ...commonColumns,
      //   ...isPermissionColumn,
      //   ...companyColumn,
      // ];

      // console.log(" empSB", apiDataArray);

      const gridRows = apiDataArray.map((apiDataItem, index) => ({
        id: apiDataItem.id,
        serialNo: index + 1,
        firstName: apiDataItem.firstName,
        lastName: apiDataItem.lastName,
        name: `${apiDataItem.firstName} ${apiDataItem.lastName} (${
          apiDataItem.empCode ? apiDataItem.empCode : "N/A"
        })`,
        phone: apiDataItem.phone,
        email: apiDataItem.email,
        // govtId:apiDataItem.govtId,
        state: apiDataItem.state.name ? apiDataItem.state.name : "",
        city: apiDataItem.city.name ? apiDataItem.city.name : "",
        govtId: apiDataItem.govtId
          ? apiDataItem.govtId.length === 12
            ? `${apiDataItem.govtId} (Aadhar)`
            : `${apiDataItem.govtId} (PAN)`
          : "N/A",
        company: apiDataItem.company ? apiDataItem.company.name : "",
        dept: apiDataItem.departmentDto ? apiDataItem.departmentDto.name : "",
        role: apiDataItem.role ? apiDataItem.role.name : "",
        empCode: apiDataItem.empCode ? apiDataItem.empCode : "N/A",
        isPermission: apiDataItem.isPermission ? "YES" : "NO",
        buildingId: apiDataItem.company
          ? apiDataItem.company.building
            ? apiDataItem.company.building.buildingId || ""
            : ""
          : "",

        building: `${
          apiDataItem.company
            ? apiDataItem.company.building
              ? apiDataItem.company.building.name || ""
              : ""
            : ""
        } (${
          apiDataItem.company
            ? apiDataItem.company.building
              ? apiDataItem.company.building.buildingId || ""
              : ""
            : ""
        })`,
        buildingName: apiDataItem.company
          ? apiDataItem.company.building
            ? apiDataItem.company.building.name || ""
            : ""
          : "",
      }));

      setColumns(gridColumns);
      setRows(gridRows);
      setDivText("");
    } catch (error) {
      toast.error("Something went wrong !", {
        toastId: "emp-error6",
      });
      console.error("Error fetching data:", error);
    } finally {
      setDivText("NO RECORDS FOUND !!!");
      setLoading(false);
    }
  }

  const handleDownloadExcel = () => {
    const fileData = [
      { url: excelUrl, filename: "Employee Data.xlsx" },
      // { url: excelDownData.duplicateDataLink, filename: "Duplicate Data.xlsx" },
    ];

    const downloadFile = (index) => {
      if (index < fileData.length) {
        const data = fileData[index];
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = data.url;
        link.download = "TEST 1";

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);

        // setTimeout(() => {
        //   downloadFile(index + 1);
        // }, 1000);
      }
    };

    downloadFile(0);
  };

  async function fetchRoles() {
    let url = Config.baseUrl + Config.apiEndPoints.employeeSBGetAllRole;
    try {
      const response = await axios.get(url, { headers });
      setRoles(response.data.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }
  // const fetchDepts = async () => {
  //   let url = Config.baseUrl + Config.apiEndPoints.employeeSBGetAllDept;
  //   try {
  //     const response = await axios.get(`${url}?companyId=${companyId}`);
  //     const deptApiData = response.data.data;
  //     // console.log("dept data", response.data.data)
  //     setDepts(deptApiData);
  //   } catch (error) {
  //     console.error("Error in fetching depts", error);
  //   }
  // };

  const fetchDepts = async ({ selectedCompanyId }) => {
    let url = Config.baseUrl + Config.apiEndPoints.employeeSBGetAllDept;
    try {
      const response = await axios.get(`${url}?companyId=${selectedCompanyId}`);
      if (response.status === 200) {
        const deptApiData = response.data.data;
        if (deptApiData === null || deptApiData instanceof Error) {
          setDepts([]);
        } else {
          setDepts(deptApiData);
        }
      }
    } catch (error) {
      setDepts([]);
      if (error.response && error.response.status === 400) {
        let errMessage = "";
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errMessage = error.response.data.message;
          const cleanedMessage = JSON.stringify(errMessage);
          toast.error(JSON.parse(cleanedMessage) + " !!!", {
            toastId: "edit-employee-err17",
          });
        }
      } else {
        toast.error("Something went wrong !", {
          toastId: "edit-employee-err18",
        });
        console.error("Error saving changes:", error);
      }
    }
  };

  // useEffect(() => {
  //   fetchDepts();
  // }, [companyId]);

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

  const XLSX_HEADER_STYLE = {
    font: { bold: true, size: 24, color: { rgb: "000000" } },
    fill: { fgColor: { rgb: "9A9A9A" } },
  };

  function fitToColumn(arrayOfObjects) {
    if (!Array.isArray(arrayOfObjects) || arrayOfObjects.length === 0) {
      return [];
    }

    const keys = Object.keys(arrayOfObjects[0]);

    const columnWidths = keys.map((key) => ({
      wch: key.toString().length,
    }));

    keys.forEach((key, index) => {
      columnWidths[index].wch = Math.max(
        columnWidths[index].wch,
        key.toString().length
      );
    });

    arrayOfObjects.forEach((obj) => {
      keys.forEach((key, index) => {
        const cellValue = obj[key] ? obj[key].toString() : "";
        columnWidths[index].wch = Math.max(
          columnWidths[index].wch,
          cellValue.length
        );
      });
    });

    columnWidths.forEach((column) => {
      column.wch += 5;
    });

    return columnWidths;
  }

  const handleExportExcelAllData = () => {
    if (Array.isArray(exportExcelData) && exportExcelData.length > 0) {
      // console.log('cxcel data inside print', exportExcelData)
      let headers = [];
      let data;
      if (loggedUserRole === "SUPERADMIN") {
        headers = [
          "Sl.no",
          "Name",
          "Phone",
          "Email",
          "Company",
          "Department",
          "Role",
          "Building",
          "Government ID",
          "State",
          "City",
        ];

        data = exportExcelData?.map((dataItem, index) => ({
          "Sl.no": index + 1,
          Name: `${dataItem.firstName} ${dataItem.lastName} (${
            dataItem.empCode ? dataItem.empCode : "N/A"
          })`,
          Phone: dataItem.phone,
          Email: dataItem.email,
          Company: dataItem.company
            ? dataItem.company.name
              ? dataItem.company.name
              : ""
            : "",
          Department: dataItem.departmentDto
            ? dataItem.departmentDto.name
              ? dataItem.departmentDto.name
              : ""
            : "",
          Role: dataItem.role
            ? dataItem.role.name
              ? dataItem.role.name
              : ""
            : "",
          Building: `${
            dataItem.company
              ? dataItem.company.building
                ? dataItem.company.building.name
                  ? dataItem.company.building.name
                  : "" || ""
                : ""
              : ""
          } (${
            dataItem.company
              ? dataItem.company.building
                ? dataItem.company.building.buildingId || ""
                : ""
              : ""
          })`,
          "Government ID": dataItem.govtId
            ? dataItem.govtId.length === 12
              ? `${dataItem.govtId} (Aadhar)`
              : `${dataItem.govtId} (PAN)`
            : "N/A",
          State: dataItem.state
            ? dataItem.state.name
              ? dataItem.state.name
              : ""
            : "",
          City: dataItem.city
            ? dataItem.city.name
              ? dataItem.city.name
              : ""
            : "",
        }));
      }

      if (loggedUserRole === "ADMIN") {
        headers = [
          "Sl.no",
          "Name",
          "Phone",
          "Email",
          "Department",
          "Role",
          "Government ID",
          "State",
          "City",
          "Receptionist Meet Permissions",
        ];

        data = exportExcelData?.map((dataItem, index) => ({
          "Sl.no": index + 1,
          Name: `${dataItem.firstName} ${dataItem.lastName} (${
            dataItem.empCode ? dataItem.empCode : "N/A"
          })`,
          Phone: dataItem.phone,
          Email: dataItem.email,
          Department: dataItem.departmentDto ? dataItem.departmentDto.name : "",
          Role: dataItem.role ? dataItem.role.name : "",
          "Government ID": dataItem.govtId
            ? dataItem.govtId.length === 12
              ? `${dataItem.govtId} (Aadhar)`
              : `${dataItem.govtId} (PAN)`
            : "N/A",
          State: dataItem.state.name ? dataItem.state.name : "",
          City: dataItem.city.name ? dataItem.city.name : "",
          "Receptionist Meet Permissions": dataItem.isPermission ? "YES" : "NO",
        }));
      }

      const ws = XLSX.utils.json_to_sheet(data, {
        header: headers,
      });

      headers.forEach((key, index) => {
        const headerCell = ws[XLSX.utils.encode_col(index) + "1"];
        if (headerCell) {
          headerCell.s = XLSX_HEADER_STYLE;
        }
      });

      ws["!cols"] = fitToColumn(data);

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
      XLSX.writeFile(wb, "User_List_All_Data.xlsx");
    } else {
      // console.error('Invalid data format for export.');
      alert("Invalid data format for export.");
    }
  };

  // console.log('excel data outside print', exportExcelData[2]);

  // const handleExportExcelAllData = () => {
  //   if (Array.isArray(exportExcelData) && exportExcelData.length > 0) {
  // //  let maal = exportExcelData.data
  //     console.log('excel data inside print', exportExcelData[0]);

  //     let headers = [];
  //     let data = [];

  //     if (loggedUserRole === "SUPERADMIN") {
  //       console.log('i got hit')
  //       headers = ["Sl.no", "Name", "Phone", "Email", "Company", "Department", "Role", "Building", "Government ID", "State", "City"];

  //       data = exportExcelData?.map((dataItem, index) => ({
  //         "Sl.no": index + 1,
  //         "Email": dataItem.email || "",
  //         // "Name": `${dataItem.firstName} ${dataItem.lastName} (${dataItem.empCode || "N/A"})`,
  //         // "Phone": dataItem.phone || "",
  //         // "Email": dataItem.email || "",
  //         // "Company": dataItem.company?.name || "",
  //         // "Department": dataItem.departmentDto?.name || "",
  //         // "Role": dataItem.role?.name || "",
  //         // "Building": `${dataItem.company?.building?.name || ""} (${dataItem.company?.building?.buildingId || ""})`,
  //         // "Government ID": dataItem.govtId
  //         //   ? dataItem.govtId.length === 12
  //         //     ? `${dataItem.govtId} (Aadhar)`
  //         //     : `${dataItem.govtId} (PAN)`
  //         //   : 'N/A',
  //         // "State": dataItem.state?.name || "",
  //         // "City": dataItem.city?.name || "",
  //       }));
  //     }

  //     if (loggedUserRole === "ADMIN") {
  //       headers = ["Sl.no", "Name", "Phone", "Email", "Department", "Role", "Government ID", "State", "City", "Receptionist Meet Permissions"];

  //       data = exportExcelData?.map((dataItem, index) => ({
  //         "Sl.no": index + 1,
  //         "Name": `${dataItem.firstName} ${dataItem.lastName} (${dataItem.empCode || "N/A"})`,
  //         "Phone": dataItem.phone || "",
  //         "Email": dataItem.email || "",
  //         "Department": dataItem.departmentDto?.name || "",
  //         "Role": dataItem.role?.name || "",
  //         "Government ID": dataItem.govtId
  //           ? dataItem.govtId.length === 12
  //             ? `${dataItem.govtId} (Aadhar)`
  //             : `${dataItem.govtId} (PAN)`
  //           : 'N/A',
  //         "State": dataItem.state?.name || "",
  //         "City": dataItem.city?.name || "",
  //         "Receptionist Meet Permissions": dataItem.isPermission ? "YES" : "NO",
  //       }));
  //     }

  //     const ws = XLSX.utils.json_to_sheet(data, { header: headers });

  //     headers.forEach((key, index) => {
  //       const headerCell = ws[XLSX.utils.encode_col(index) + '1'];
  //       if (headerCell) {
  //         headerCell.s = XLSX_HEADER_STYLE;
  //       }
  //     });

  //     ws['!cols'] = fitToColumn(data);

  //     const wb = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
  //     XLSX.writeFile(wb, 'User_List_All_Data.xlsx');
  //   } else {
  //     // console.error('Invalid data format for export.');
  //     alert('Invalid data format for export.');
  //   }
  // };

  // byteArray Downloader STARTS

  // const testExcel = async() => {
  //   const payload = {
  //     page: 0,
  //     size: 100,
  // }

  // let url = "http://192.168.12.58:8080/com/exportcompanydata"
  // try{
  //   const response = await axios.post(url, payload, { responseType: 'arraybuffer', headers });

  //   const byteArray = new Uint8Array(response.data);

  //   const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  //   const link = document.createElement('a');

  //   link.href = URL.createObjectURL(blob);
  //   link.download = 'yourFileName.xlsx'; // Set your desired file name here

  //   document.body.appendChild(link);

  //   link.click();

  //   document.body.removeChild(link);

  //   console.log('Download initiated successfully');
  // }
  // catch(error){
  //   console.error('error coming', error)
  // }
  // }

  // byteArray Downloader ENDS

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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  minWidth: "31.3em",
                  ml: "2em",
                }}
              >
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
              {/* <Button
              variant="contained"
              onClick={handleDownloadExcel}
              >download</Button> */}
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
                    borderRadius: "0 0 5px 5px",
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
                {rows.length > 0 ? (
                  <>
                    <Box
                      sx={{
                        minWidth: "100%",
                        // bgcolor: "orange",
                        display: "flex",
                        justifyContent: "end",
                        mt: "0.5em",
                        position: "relative",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          position: "absolute",
                          // left:'4.5em',
                          minHeight: "unset",
                          width: "13em",
                          height: "40px",
                          gap: 1,
                          zIndex: 1,
                          // float:'right'
                        }}
                        // onClick={handleDownloadExcel}
                        onClick={handleExportExcelAllData}
                      >
                        <DownloadIcon /> Export Excel
                      </Button>
                    </Box>
                    <DataGrid
                      disableRowSelectionOnClick
                      sx={{ mt: "0.7em" }}
                      rows={rows ?? []}
                      columns={columns}
                      components={{ Toolbar: GridToolbar }}
                      // components={{
                      //   Toolbar: GridToolbar,
                      //   Header: (props) => {
                      //     const { className, ...other } = props;
                      //     return (
                      //       <div className={className}>
                      //         {columns.map((column) => (
                      //           <div
                      //             key={column.field}
                      //             style={{
                      //               display: column.hidePrint ? 'none' : 'flex',
                      //               alignItems: 'center',
                      //             }}
                      //           >
                      //             {column.headerName}
                      //           </div>
                      //         ))}
                      //       </div>
                      //     );
                      //   },
                      //   // ... (other components if needed)
                      // }}
                      pageSizeOptions={[5, 10, 25, 50, 100]}
                      slotProps={{
                        toolbar: {
                          printOptions: {
                            // pageStyle: '.MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }',
                            hideFooter: true,
                            hideToolbar: true,
                          },
                        },
                      }}
                      // initialState={{
                      //   pinnedColumns: {
                      //     left: ['actions'],
                      //     // right: ['actions', 'title', 'director', '...'],
                      //   },
                      // }}
                    />
                  </>
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
                    inputProps={{
                      maxLength: 26,
                      onInput: (event) => {
                        let value = event.target.value;

                        // Remove characters other than lowercase, uppercase, and spaces
                        value = value.replace(/[^a-zA-Z\s]/g, "");

                        // Replace consecutive spaces with a single space
                        value = value.replace(/\s{2,}/g, " ");

                        // Ensure the length does not exceed maxLength
                        if (value.length > 26) {
                          value = value.slice(0, 26);
                        }

                        setEditedItem({
                          ...editedItem,
                          firstName: value,
                        });
                      },
                    }}
                    // onChange={(e) =>
                    //   setEditedItem({
                    //     ...editedItem,
                    //     firstName: e.target.value,
                    //   })
                    // }
                    required
                  />
                  <TextField
                    size="small"
                    sx={{ mt: "1em" }}
                    label="Last Name"
                    fullWidth
                    value={editedItem.lastName}
                    inputProps={{
                      maxLength: 26,
                      onInput: (event) => {
                        let value = event.target.value;

                        // Remove characters other than lowercase, uppercase, and spaces
                        value = value.replace(/[^a-zA-Z\s]/g, "");

                        // Replace consecutive spaces with a single space
                        value = value.replace(/\s{2,}/g, " ");

                        // Ensure the length does not exceed maxLength
                        if (value.length > 26) {
                          value = value.slice(0, 26);
                        }

                        setEditedItem({
                          ...editedItem,
                          lastName: value,
                        });
                      },
                    }}
                    // onChange={(e) =>
                    //   setEditedItem({ ...editedItem, lastName: e.target.value })
                    // }
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
                      pattern: "^[0-9]*",
                      onInput: (e) => {
                        let value = e.target.value;
                        value = value.replace(/\D/g, "");
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

                  <FormControl
                    sx={{ width: "100%", mt: "1em" }}
                    size="small"
                    required
                  >
                    <InputLabel htmlFor="dept">Department</InputLabel>
                    <Select
                      label="Department"
                      name="dept"
                      value={editedItem.dept.id || ""}
                      required
                      onChange={(e) => {
                        const updatedItem = {
                          ...editedItem,
                          dept: { ...editedItem.dept, id: e.target.value },
                        };
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
                      {/* <MenuItem value="" disabled>
                        Select a role
                      </MenuItem> */}
                      {roles &&
                        roles.length > 0 &&
                        roles.map((role) => (
                          <MenuItem key={role.id} value={role.id}>
                            {role.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>

                  {isSUPERADMINAllowed ? (
                    <FormControl
                      sx={{ width: "100%", mt: "1em" }}
                      size="small"
                      fullWidth
                    >
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
                          setEditedItem({
                            ...editedItem,
                            isPermission: e.target.value,
                          });
                        }}
                      >
                        {/* <MenuItem value="true">True</MenuItem>
  <MenuItem value="false">False</MenuItem> */}

                        <MenuItem value="true">YES</MenuItem>
                        <MenuItem value="false">NO</MenuItem>
                      </Select>
                    </FormControl>
                  ) : null}
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
