import React, { useState } from 'react';
import { Paper, Box, Button } from '@mui/material';
import Header from '../Header';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Navbar from '../../global/Navbar';
import Sidebar from '../../global/Sidebar';

const ExcelUpload = () => {
  const BASE_URL = 'http://192.168.12.58:8080/api/user';
  const AuthToken = sessionStorage.getItem('token');
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${AuthToken}`,
    },
  });
  const headers = {
    Authorization: `Bearer ${AuthToken}`,
  };
  const companyId = sessionStorage.getItem('companyId');

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isUpload, setIsUpload] = useState(false);
  const [excelUpData, setExcelUpData] = useState({
    companyId: companyId,
    file: '',
  });

  const handleUpload = (event) => {
    const excelFile = event.target.files[0];
    const formData = new FormData();
    formData.append('companyId', companyId);
    formData.append('file', excelFile);
    setExcelUpData(formData);
    setIsUpload(true);
    console.log("FORM DATA", formData)
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSaveUpload = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/excel/upload`, excelUpData, {
        headers: {
          Authorization: `Bearer ${AuthToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const excelApiData = response;
      console.log("excelApiData", excelApiData);
      setIsUpload(false);
    } catch (error) {
      console.error("Excel API error: ", error);
    }
  };


  const handleDownloadExcel = () => {
    // Define the URL of the file to download
    const fileUrl = 'http://192.168.12.58:8080/api/user/download/excel?filename=6d1b409a-58df-4797-8b7f-8720ad7fe1eb.xlsx';
    const fileUrl2 = 'http://192.168.12.54:8080/api/user/download/excel?filename=3baa522c-f032-45e6-9787-1d14237015fb.xlsx';

    // Create an anchor element to trigger the download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'excel-file.xlsx'; // Optional: You can specify the download filename here

    // Trigger a click event on the anchor element to start the download
    link.click();
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Box sx={{ display: "flex", flexGrow: 1, p: 3 }}>
        <Sidebar open={sidebarOpen} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              elevation={5}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '4.5em',
                mt: '3em',
                mb: '0.5em'
              }}
            >
              <Header title="Dashboard" subtitle="Welcome to dashboard" />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              elevation={5}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                m="20px 0 0 0"
                maxWidth='90%'
                flexGrow={1}
                height="75vh"
                sx={{
                  mb: '1.5em'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5em', fontSize: '54px', gap: '10px' }}>
                  <Button
                    variant="contained"
                    component="label"
                    onChange={handleUpload}
                  >
                    Upload File
                    <input
                      type="file"
                      hidden
                    />
                  </Button>

                  <Button variant="contained" component="label" onClick={handleSaveUpload} disabled={!isUpload}>
                    Upload
                  </Button>

                  <Button variant="contained" component="label" onClick={handleDownloadExcel}>
                    download
                  </Button>
                </div>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ExcelUpload;
