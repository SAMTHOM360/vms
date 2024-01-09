import React, { useState, } from "react";
import { useAuth } from "../routes/AuthContext";
import axios from "axios";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import excelFile from "../assets/MultiuserTemplate.xlsx";
// import Loader from "./Loader";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Config from "../Config/Config";

// import * as XLSX from "xlsx";
import * as XLSX from "sheetjs-style"

function BulkUserForm() {
  const { isLimitReached } = useAuth();

  // console.log("isLimitReached", isLimitReached)
  // const BASE_URL = "http://192.168.12.58:8080/api/user";
  const BASE_URL = "http://192.168.12.54:8080/api/user";
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const loggedUserRole = sessionStorage.getItem("loggedUserRole");
  const companyId = sessionStorage.getItem("companyId");
  // const companyName = sessionStorage.getItem("companyName");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const excelHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };


  // EXCEL UPLOAD STARTS -----------------------------------------------------------------------------------------------------------------

  const [isUpload, setIsUpload] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState("");
  const [excelUpData, setExcelUpData] = useState();
  const [btnLoading, setBtnLoading] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [excelDownData, setExcelDownData] = useState({
    totalElement: "",
    successfullyAdded: "",
    failedData: "",
    duplicateData: "",
    downloadLink: "",
    failedDataLink: "",
    duplicateDataLink: "",
  });

  const [failedExcelData, setFailedExcelData] = useState([])
  const [duplicateExcelData, setDuplicateExcelData] = useState([])

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
  
    const files = e.dataTransfer.files;
    const formData = new FormData();
    formData.append("companyId", companyId);
    formData.append("file", files[0]);
  
    let fileName = files[0] ? files[0].name : "";

    if (!formData || !isValidExcelFile(formData)) {
      toast.warn("Please upload a valid Excel file.", {
        toastId: "bulk-emp-warn12",
      });
      // setBtnLoading(false);
      let fileName = "";
      return;
    }


    e.dataTransfer.clearData();

    setExcelUpData(formData);
    setIsUpload(true);
    setIsFileSelected(fileName);
    setIsDragging(false);
  };

  const handleChooseFile = (event) => {
    // debugger
    // console.log("i got hit")
    const excelFile = event.target.files[0];
    const formData = new FormData();
    formData.append("companyId", companyId);
    formData.append("file", excelFile);
    const fileName = excelFile ? excelFile.name : "";
    setExcelUpData(formData);
    setIsUpload(true);
    setIsFileSelected(fileName);

    const fileInput = document.getElementById("fileInputExcel");
    if (fileInput) {
      fileInput.value = ""; // Clear the selected file
    }
    // console.log("FORM DATA", formData)
  };
  // console.log("is upload", isUpload);

  // console.log("FORM DATA:");
  // for (const pair of excelUpData.entries()) {
  //   console.log(pair[0] + ', ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
  // }
  
  // // Get the file name separately
  // const fileName = excelUpData.get("file") instanceof File ? excelUpData?.get("file").name : "";
  // console.log("File Name:", fileName);

  const handleCancel = (e) => {
    e.preventDefault()
    setIsUpload(false);
    const fileInput = document.getElementById("fileInputExcel");
    if (fileInput) {
      fileInput.value = ""; // Clear the selected file
    }
    setIsFileSelected("");
  };


  const isValidExcelFile = (formData) => {
    if (formData && typeof formData.get === 'function') {
      const file = formData.get("file");
  
      if (file && file.name) {
        const lowerCaseFileName = file.name.toLowerCase();
        return lowerCaseFileName.endsWith(".xlsx");
      }
    }
  
    return false;
  };
  


  const handleSaveUpload = async () => {
    // toast.dismiss();
    let url = Config.baseUrl + Config.apiEndPoints.bulkUserFormSaveUpload

    if (!excelUpData || !isValidExcelFile(excelUpData)) {
      toast.warn("Please upload a valid Excel file.", {
        toastId: "bulk-emp-warn2",
      });
      // setBtnLoading(false);
      return;
    }
    try {
      setBtnLoading(true);
      const response = await axios.post(
        `${url}`,
        excelUpData,
        {
          headers: excelHeaders,
        }
        );
        if(response.status === 200) {
        const excelApiData = response.data.data;

        // console.log('dup', excelApiData.duplicateData)
        // console.log('failed', excelApiData.failedData)

        let toastMsg
        if(excelApiData.duplicateData !== 0 && excelApiData.failedData !== 0) {
         toastMsg = "Please check for Duplicate & Failed data."
        }
         if(excelApiData.duplicateData !== 0) {
          toastMsg = "Please check for Duplicate data."
         } 
         if(excelApiData.failedData !== 0) {
          toastMsg = "Please check for Failed data."
         } 



         if(excelApiData.duplicateData === 0 && excelApiData.failedData === 0) {
          toast.success("File uploaded Successfully.", {
            toastId:"bulk-emp-success"
          });

        } else {
          toast.warn(`File uploaded Successfully. ${toastMsg}`, {
            toastId:"bulk-emp-warn1"
          });
        }

         
        
        // toast.success("File uploaded Successfully.");


       
        // console.log("excelApiData", excelApiData);
        if (
          excelApiData.duplicateData !== 0 ||
          excelApiData.failedData !== 0
        ) {
          setIsDownload(true);
        } else {
          setIsDownload(false);
        }

        // setIsDownload(
        //   excelApiData.duplicateData !== 0 ||
        //   excelApiData.failedData !== 0
        // );
        
        setExcelDownData({
          totalElement: excelApiData.totalElement || "",
          successfullyAdded: excelApiData.successfullyAdded || "",
          failedData: excelApiData.failedData || "",
          duplicateData: excelApiData.duplicateData || "",
          downloadLink: excelApiData.downloadLink || "",
          failedDataLink: excelApiData.failedDataLink || "",
          duplicateDataLink: excelApiData.duplicateDataLink || "",
          // failedElement: excelApiData.failedElement || null,
          // duplicateElement: excelApiData.duplicateElement || null,
        });

        if(excelApiData.failedElement) {
          // console.log('i p hit')
          setFailedExcelData(excelApiData.failedElement)
        }

        if(excelApiData.duplicateElement) {
          // console.log('o p hit')
          setDuplicateExcelData(excelApiData.duplicateElement)
        }
        
        setIsUpload(false);
        const fileInput = document.getElementById("fileInputExcel");
        if (fileInput) {
          fileInput.value = "";
        }
        setIsFileSelected("");
      }
      // else if(response.status === 400){
      //   // console.log("400 response", response)
      //   // toast.error("New Employee Added Successfully.");
      // }
    } 
    catch(error){
      // console.error('Error Updating Password:', error);
      if(error.request.status === 400){

        let errMessage = '';


        if (error.response && error.response.data && error.response.data.message) {
          errMessage = error.response.data.message;
          const cleanedMessage = JSON.stringify(errMessage);
          toast.error(JSON.parse(cleanedMessage)+' !!!', {
            toastId:"bulk-emp-error1"
          });
        }
 
 
      }
       else {
        toast.error('Something went wrong !!!', {
          toastId:"bulk-emp-error2"
        });
      }
    }
    setBtnLoading(false)
  }

  // console.log('failedExcelData', failedExcelData)
  // console.log('duplicateExcelData', duplicateExcelData)

  // async function fetchData() {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/getall`, { headers });
  
  //     const apiDataArray = response.data;
  
  //     sessionStorage.setItem("currEmpLength", apiDataArray.length);
  //   } catch(error) {
  //     console.error('Error in getting data: ', error)
  //   }
  // }



  const handleDownloadExcel = () => {
    const fileData = [
      { url: excelDownData.failedDataLink, filename: "Failed Data.xlsx" },
      { url: excelDownData.duplicateDataLink, filename: "Duplicate Data.xlsx" },
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

        setTimeout(() => {
          downloadFile(index + 1);
        }, 1000); 
      }
    };

    downloadFile(0);
  };

  //EXCEL UPLOAD ENDS -----------------------------------------------------------------------------------------------------------------

  // const [loading, setLoading] = useState(false);



  const handleRedirectEmployee =  () => {
    navigate('/employee')
  }

  // const handleTemplateDownload = () => {
  //   const anchor = document.createElement("a");
  //   anchor.style.display = "none";
  //   anchor.href = excelFile;
  //   anchor.download = "MultiuserTemplate.xlsx";

  //   document.body.appendChild(anchor);
  //   anchor.click();
  //   document.body.removeChild(anchor);
  // };


  const XLSX_HEADER_STYLE = {
    font: { bold: true, size: 24, color: { rgb: '000000' } },
    fill: { fgColor: { rgb: '9A9A9A' } },
  };

  const XLSX_NULL_CELL_STYLE = { fill: { fgColor: { rgb: 'FFA500' } } };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // console.log('date', date)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
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
      const cellValue = obj[key] ? obj[key].toString() : '';
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

const handleExportExcelFailedData = () => {


  
  if (Array.isArray(failedExcelData) && failedExcelData.length > 0) {

    // console.log('excel data inside print', failedExcelData)
    let headers = []
    let data ;
    if (loggedUserRole === "SUPERADMIN") {

      headers = ["FIRSTNAME", "LASTNAME", "PHONE", "GENDER", "EMAIL", "DOB", "GOVT_ID", "EMPCODE", "PINCODE", "ROLE", "STATE", "CITY", "DEPARTMENT", "PERMISSION"];

      data = failedExcelData?.map((dataItem, index) => ({
        "FIRSTNAME":  dataItem.firstName || null,
        "LASTNAME":  dataItem.lastName || null,
        "PHONE": dataItem.phone || null,
        "GENDER": dataItem.gender || null,
        "EMAIL": dataItem.email || null,
        // "DOB": dataItem.dob || null,
        "DOB": dataItem.dob ? formatDate(dataItem.dob) : null,
        "GOVT_ID": dataItem.govt_id || null,
        "EMPCODE": dataItem.empCode || null,
        "PINCODE": dataItem.pincode || null,
        "ROLE": dataItem.role || null,
        "STATE": dataItem.state || null,
        "CITY": dataItem.city || null,
        "DEPARTMENT": dataItem.department || null,
        "PERMISSION": dataItem.permission || null,
      }));
    }

    if(loggedUserRole === "ADMIN") {
      headers = ["FIRSTNAME", "LASTNAME", "PHONE", "GENDER", "EMAIL", "DOB", "GOVT_ID", "EMPCODE", "PINCODE", "ROLE", "STATE", "CITY", "DEPARTMENT", "PERMISSION"];


      data = failedExcelData?.map((dataItem, index) => ({
        "FIRSTNAME":  dataItem.firstName || null,
        "LASTNAME":  dataItem.lastName || null,
        "PHONE": dataItem.phone || null,
        "GENDER": dataItem.gender || null,
        "EMAIL": dataItem.email || null,
        // "DOB": dataItem.dob || null,
        "DOB": dataItem.dob ? formatDate(dataItem.dob) : null,
        "GOVT_ID": dataItem.govt_id || null,
        "EMPCODE": dataItem.empCode || null,
        "PINCODE": dataItem.pincode || null,
        "ROLE": dataItem.role || null,
        "STATE": dataItem.state || null,
        "CITY": dataItem.city || null,
        "DEPARTMENT": dataItem.department || null,
        "PERMISSION": dataItem.permission || null,
      }));

  }
    const ws = XLSX.utils.json_to_sheet(data, {
      header: headers,
    });
    
    headers.forEach((key, index) => {
      const headerCell = ws[XLSX.utils.encode_col(index) + '1'];
      if (headerCell) {
        headerCell.s = XLSX_HEADER_STYLE;
      }
    });
    
// data.forEach((dataItem, rowIndex) => {
//   headers.forEach((key, colIndex) => {
//     const cellValue = dataItem[key];
//     const cellAddress = XLSX.utils.encode_col(colIndex) + (rowIndex + 2);

//     ws[cellAddress] = { 
//       v: cellValue === null || cellValue === undefined ? '' : cellValue, 
//       s: {}
//     };

//     if (cellValue === null || cellValue === undefined) {
//       ws[cellAddress].s.fill = XLSX_NULL_CELL_STYLE.fill;
//       ws[cellAddress].s.border = {
//         top: { style: 'thin', color: { rgb: '484848' } }, 
//         bottom: { style: 'thin', color: { rgb: '484848' } },
//         left: { style: 'thin', color: { rgb: '484848' } },
//         right: { style: 'thin', color: { rgb: '484848' } }
//       };
//       delete ws[cellAddress].t;
//     }
//   });
// });

// data.forEach((dataItem, rowIndex) => {
//   headers.forEach((key, colIndex) => {
//     const cellValue = dataItem[key];
//     const cellAddress = XLSX.utils.encode_col(colIndex) + (rowIndex + 2);

//     ws[cellAddress] = { 
//       v: cellValue === null || cellValue === undefined ? '' : cellValue, 
//       // t: 's',  // Set cell type to string
//       s: {}
//     };

//     if (cellValue === null || cellValue === undefined) {
//       ws[cellAddress].s.fill = XLSX_NULL_CELL_STYLE.fill;
//       ws[cellAddress].s.border = {
//         top: { style: 'thin', color: { rgb: '484848' } }, 
//         bottom: { style: 'thin', color: { rgb: '484848' } },
//         left: { style: 'thin', color: { rgb: '484848' } },
//         right: { style: 'thin', color: { rgb: '484848' } }
//       };
//     }
//   });
// });

data.forEach((dataItem, rowIndex) => {
  headers.forEach((key, colIndex) => {
    const cellValue = dataItem[key];
    const cellAddress = XLSX.utils.encode_col(colIndex) + (rowIndex + 2);

    ws[cellAddress] = { 
      v: cellValue === null || cellValue === undefined ? '' : cellValue,
      s: {}
    };

    if (typeof cellValue === 'number' || !isNaN(Number(cellValue))) {
      ws[cellAddress].t = 's'; 
      ws[cellAddress].v = `\u200C${cellValue === null || cellValue === undefined ? '' : cellValue}`;
    }

    if (cellValue === null || cellValue === undefined) {
      ws[cellAddress].s.fill = XLSX_NULL_CELL_STYLE.fill;
      ws[cellAddress].s.border = {
        top: { style: 'thin', color: { rgb: '484848' } }, 
        bottom: { style: 'thin', color: { rgb: '484848' } },
        left: { style: 'thin', color: { rgb: '484848' } },
        right: { style: 'thin', color: { rgb: '484848' } }
      };
    }
  });
});

    

    ws['!cols'] = fitToColumn(data);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX.writeFile(wb, 'Failed_Add_User_Data.xlsx');
  } else {
    alert('Invalid data format for export.');
  }
};


const handleExportExcelDuplicateData = () => {
 
  if (Array.isArray(duplicateExcelData) && duplicateExcelData.length > 0) {

    // const testDate = duplicateExcelData[0].dob

    // console.log('test date', formatDate(testDate))

    // console.log('excel data inside print', duplicateExcelData)
    let headers = []
    let data ;
    if (loggedUserRole === "SUPERADMIN") {

      headers = ["FIRSTNAME", "LASTNAME", "PHONE", "GENDER", "EMAIL", "DOB", "GOVT_ID", "EMPCODE", "PINCODE", "ROLE", "STATE", "CITY", "DEPARTMENT", "PERMISSION"];


      data = duplicateExcelData?.map((dataItem, index) => ({
        "FIRSTNAME":  dataItem.firstName || null,
        "LASTNAME":  dataItem.lastName || null,
        "PHONE": dataItem.phone || null,
        "GENDER": dataItem.gender || null,
        "EMAIL": dataItem.email || null,
        // "DOB": dataItem.dob || null,
        "DOB": dataItem.dob ? formatDate(dataItem.dob) : null,
        "GOVT_ID": dataItem.govt_id || null,
        "EMPCODE": dataItem.empCode || null,
        "PINCODE": dataItem.pincode || null,
        "ROLE": dataItem.role || null,
        "STATE": dataItem.state || null,
        "CITY": dataItem.city || null,
        "DEPARTMENT": dataItem.department || null,
        "PERMISSION": dataItem.permission || null,
      }));
    }

    if(loggedUserRole === "ADMIN") {
      headers = ["FIRSTNAME", "LASTNAME", "PHONE", "GENDER", "EMAIL", "DOB", "GOVT_ID", "EMPCODE", "PINCODE", "ROLE", "STATE", "CITY", "DEPARTMENT", "PERMISSION"];


      data = duplicateExcelData?.map((dataItem, index) => ({
        "FIRSTNAME":  dataItem.firstName || null,
        "LASTNAME":  dataItem.lastName || null,
        "PHONE": dataItem.phone || null,
        "GENDER": dataItem.gender || null,
        "EMAIL": dataItem.email || null,
        // "DOB": dataItem.dob || null,
        "DOB": dataItem.dob ? formatDate(dataItem.dob) : null,
        "GOVT_ID": dataItem.govt_id || null,
        "EMPCODE": dataItem.empCode || null,
        "PINCODE": dataItem.pincode || null,
        "ROLE": dataItem.role || null,
        "STATE": dataItem.state || null,
        "CITY": dataItem.city || null,
        "DEPARTMENT": dataItem.department || null,
        "PERMISSION": dataItem.permission || null,
      }));

  }

  const ws = XLSX.utils.json_to_sheet(data, {
    header: headers,
  });
  
  headers.forEach((key, index) => {
    const headerCell = ws[XLSX.utils.encode_col(index) + '1'];
    if (headerCell) {
      headerCell.s = XLSX_HEADER_STYLE;
    }
  });

  
// data.forEach((dataItem, rowIndex) => {
// headers.forEach((key, colIndex) => {
//   const cellValue = dataItem[key];
//   const cellAddress = XLSX.utils.encode_col(colIndex) + (rowIndex + 2);

//   ws[cellAddress] = { 
//     v: cellValue === null || cellValue === undefined ? '' : cellValue, 
//     s: {}
//   };

//   if (cellValue === null || cellValue === undefined) {
//     ws[cellAddress].s.fill = XLSX_NULL_CELL_STYLE.fill;
//     ws[cellAddress].s.border = {
//       top: { style: 'thin', color: { rgb: '484848' } }, 
//       bottom: { style: 'thin', color: { rgb: '484848' } },
//       left: { style: 'thin', color: { rgb: '484848' } },
//       right: { style: 'thin', color: { rgb: '484848' } }
//     };
//     delete ws[cellAddress].t;
//   }
// });
// });

// data.forEach((dataItem, rowIndex) => {
//   headers.forEach((key, colIndex) => {
//     const cellValue = dataItem[key];
//     const cellAddress = XLSX.utils.encode_col(colIndex) + (rowIndex + 2);

//     ws[cellAddress] = { 
//       v: cellValue === null || cellValue === undefined ? '' : cellValue, 
//       // t: 's',  // Set cell type to string
//       s: {}
//     };

//     if (cellValue === null || cellValue === undefined) {
//       ws[cellAddress].s.fill = XLSX_NULL_CELL_STYLE.fill;
//       ws[cellAddress].s.border = {
//         top: { style: 'thin', color: { rgb: '484848' } }, 
//         bottom: { style: 'thin', color: { rgb: '484848' } },
//         left: { style: 'thin', color: { rgb: '484848' } },
//         right: { style: 'thin', color: { rgb: '484848' } }
//       };
//     }
//   });
// });


data.forEach((dataItem, rowIndex) => {
  headers.forEach((key, colIndex) => {
    const cellValue = dataItem[key];
    const cellAddress = XLSX.utils.encode_col(colIndex) + (rowIndex + 2);

    // Create a new cell object
    ws[cellAddress] = { 
      v: cellValue === null || cellValue === undefined ? '' : cellValue,
      s: {}
    };

    // Check if the cellValue is a number
    if (typeof cellValue === 'number' || !isNaN(Number(cellValue))) {
      ws[cellAddress].t = 's';  // Set cell type to string
      // Append zero-width non-joiner character to the value
      ws[cellAddress].v = `\u200C${cellValue === null || cellValue === undefined ? '' : cellValue}`;
    }

    if (cellValue === null || cellValue === undefined) {
      ws[cellAddress].s.fill = XLSX_NULL_CELL_STYLE.fill;
      ws[cellAddress].s.border = {
        top: { style: 'thin', color: { rgb: '484848' } }, 
        bottom: { style: 'thin', color: { rgb: '484848' } },
        left: { style: 'thin', color: { rgb: '484848' } },
        right: { style: 'thin', color: { rgb: '484848' } }
      };
    }
  });
});



    ws['!cols'] = fitToColumn(data);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX.writeFile(wb, 'Duplicate_Add_User_Data.xlsx');
  } else {
    alert('Invalid data format for export.');
  }
};

const handleExcelDownload = () => {
  if(excelDownData.failedData && excelDownData.failedData !==0) {
    handleExportExcelFailedData()
  }

  if(excelDownData.duplicateData && excelDownData.duplicateData !==0) {
    handleExportExcelDuplicateData()
  }
}

  return (
    <>
      {/* <Loader isLoading={loading} /> */}
      <Box sx={{display:"flex", flexGrow: 1, p: 3,}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
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
                title="Employee Form"
                subtitle="You can add employees of your choice"
              />
            </Box>
          </Grid>

          {isLimitReached
          ?
          <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems:'center',
            width: "100%",
            height: "75vh",
            // mt: "-5em",
          }}
        >
          <Typography sx={{fontSize:'50px'}}>You have reached max limit</Typography>
        </Box>
          :
          <>


             <Grid item xs={12} md={12} lg={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent:'flex-start',
                  alignItems: "center",
                  width: "100%",
                  height: "75vh",
                  paddingTop: "2em",
                  flexGrow:1,
                }}
              >
                <Paper
           elevation={1}
           sx={{
               display: 'flex',
               justifyContent: 'center',
               width:'50%',
              //  height: '4.5em',
              //  mt: '3em',
               mb: '0.5em'
           }}
           >
                <Box sx={{ width: "95%",
                // bgcolor: "#EBEBEB", 
                margin:'2em' 
                }}>
                  <Box
                        className={`file-drop-area ${isDragging ? 'dragging' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    sx={{
                      bgcolor: "#EBEBEB",
                      width: "100%",
                      height: "15em",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "5px 5px 0 0",
                      border: "2px dashed #A6A6A6",
                      borderBottom: "none", 
                      wordBreak:'break-word',
                      textAlign:'center',
                      color:'#5A5A5A'
                    }}
                  >
                    {isFileSelected
                      ? isFileSelected
                      : "You can Drag & Drop or Press \"+\" to add file. Only \".xlsx\" files are allowed"}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      bgcolor: "#F7F7F7",
                      borderRadius: "0 0 5px 5px",
                      border: "2px dashed #A6A6A6",
                      borderTop:"none",
                      // mb:'2em'
                    }}
                  >
                    <Box sx={{ width: "85px", mr: "10px" }}>
                      <Button
                        variant="contained"
                        component="label"
                        sx={{
                          width: "100%",
                          height: "44px",
                          borderRadius: "0px",
                          bgcolor: isUpload ? "#FF503B" : "#45D836",
                          "&:hover": {
                            backgroundColor: isUpload? "#922F24" : "#1B7D00",
                            color: "white",
                          },
                          boxShadow: "none",
                          elevation: 0,
                        }}
                        // onChange={isUpload ? null : handleChooseFile } 
                        onClick={isUpload ? handleCancel : undefined} 
                      >
                        <AddIcon
                          sx={{
                            fontSize: "40px",
                            transform: isUpload ? "rotate(45deg)" : "none",
                            transition: "transform 500ms ease-in-out",
                          }}
                        />
                        {isUpload ? '' : (
                          <input
                            type="file"
                            hidden
                            id="fileInputExcel"
                            accept=".xlsx"
                            onChange={handleChooseFile}
                          />
                        )}
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "#ACACAC",
                        width: "80%",
                      }}
                    >
                      <Typography>Add your excel file here.</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      color: "#8A8A8A",
                      width: "100%",
                      mb: "2em",
                    }}
                  >
                    <Typography>
                      What to upload?{" "}
                      <a
                        href={excelFile}
                        download="Multiuser Template.xlsx"
                        style={{ color: "#5A5A5A" }}
                      >
                        Get Template
                      </a>
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: "2em",
                      paddingX: "1em",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ width: "9em", height: "44px" }}
                      onClick={handleRedirectEmployee}
                    >
                      Back
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!isUpload}
                      sx={{
                        width: "9em",
                        height: "44px",
                        pointerEvents: btnLoading ? "none" : "auto",
                        backgroundColor: btnLoading
                          ? "rgba(0, 0, 0, 0.12)"
                          : "primary.main",
                        "&:hover": {
                          backgroundColor: btnLoading
                            ? "rgba(0, 0, 0, 0.12)"
                            : "primary.dark", 
                        },
                      }}
                      onClick={handleSaveUpload}
                    >
                      {btnLoading ? (
                        <>
                          <CircularProgress
                            size="2em"
                            // sx={{ color: "rgba(0, 0, 0, 0.5)" }}
                          />
                        </>
                      ) : (
                        "Upload"
                      )}
                    </Button>
                  </Box>

                  <Box sx={{ mb: "2em" }}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Total Records</TableCell>
                            <TableCell>Successfully Added</TableCell>
                            <TableCell>Failed Data</TableCell>
                            <TableCell>Duplicate Data</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              {excelDownData.totalElement || "0"}
                            </TableCell>
                            <TableCell>
                              {excelDownData.successfullyAdded || "0"}
                            </TableCell>
                            <TableCell>
                              {excelDownData.failedData || "0"}
                            </TableCell>
                            <TableCell>
                              {excelDownData.duplicateData || "0"}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      mb: "2em",
                    }}
                  >
                    <Button
                      variant="contained"
                      // component="label"
                      disabled={!isDownload}
                      color="error"
                      sx={{ width: "9em", height: "44px" }}
                      // onClick={handleDownloadExcel}
                      onClick={handleExcelDownload}
                    >
                      Download
                    </Button>
                  </Box>
                </Box>
              </Paper>
              </Box>
            </Grid>
          </>
          }


        </Grid>
        </Box>
    </>
  );
}

export default BulkUserForm;
