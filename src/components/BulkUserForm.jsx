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

function BulkUserForm() {
  const { isLimitReached } = useAuth();

  // console.log("isLimitReached", isLimitReached)
  // const BASE_URL = "http://192.168.12.58:8080/api/user";
  const BASE_URL = "http://192.168.12.54:8080/api/user";
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  // const loggedUserRole = sessionStorage.getItem("loggedUserRole");
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
  
    const fileName = files[0] ? files[0].name : "";

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

  const handleCancel = (e) => {
    e.preventDefault()
    setIsUpload(false);
    const fileInput = document.getElementById("fileInputExcel");
    if (fileInput) {
      fileInput.value = ""; // Clear the selected file
    }
    setIsFileSelected("");
  };

  // console.log("excel up data", excelUpData);

  const handleSaveUpload = async () => {
    toast.dismiss();
    let url = Config.baseUrl + Config.apiEndPoints.bulkUserFormSaveUpload
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

        let toastMsg
         if(excelApiData.duplicateData !== 0) {
          toastMsg = "Please check for Duplicate data."
         } 
         if(excelApiData.failedDataLink !== 0) {
          toastMsg = "Please check for Failed data."
         } 
         if(excelApiData.duplicateData !== 0 && excelApiData.failedData !== 0) {
          toastMsg = "Please check for Duplicate & Failed data."
         }



         if(excelApiData.duplicateData === 0 && excelApiData.failedData === 0) {
          toast.success("File uploaded Successfully.");

        } else {
          toast.warn(`File uploaded Successfully. ${toastMsg}`);
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
        });
        setIsUpload(false);
        const fileInput = document.getElementById("fileInputExcel");
        if (fileInput) {
          fileInput.value = "";
        }
        setIsFileSelected("");
      }
      else if(response.status === 400){
        // console.log("400 response", response)
        // toast.error("New Employee Added Successfully.");
      }
    } 
    catch(error){
      // console.error('Error Updating Password:', error);
      if(error.request.status === 400){

        let errMessage = '';


        if (error.response && error.response.data && error.response.data.message) {
          errMessage = error.response.data.message;
          const cleanedMessage = JSON.stringify(errMessage);
          toast.error(JSON.parse(cleanedMessage)+' !!!');
        }
 
 
      }
       else {
        toast.error('Something went wrong !!!');
      }
    }
    setBtnLoading(false)
  }

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
                    }}
                  >
                    {isFileSelected
                      ? isFileSelected
                      : "You can Drag & Drop or Press \"+\" to add file"}
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
                      onClick={handleDownloadExcel}
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
