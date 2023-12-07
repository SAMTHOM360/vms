import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/ReceptionistCompanyScreen.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Header from '../Header';
import Config from '../../Config/Config';


export default function ReceptionistCompanyScreen() {
    const buildingId = sessionStorage.getItem('buildingId');
    // const buildingUrl = `http://192.168.12.54:8080/com/getByBuildingId?buildingId=${buildingId}`
    const buildingUrl = Config.baseUrl + Config.apiEndPoints.buildingEndPoint + "?buildingId=" + buildingId

    const [companyName, setCompanyName] = useState([]);


    function fetchCompanies() {

        axios
            .get(buildingUrl, {
                headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
            })
            .then(response => {

                setCompanyName(response.data.data);

                console.log(response.data.data)

            })
            .catch(
                error => {
                    console.log("Error fetching data", error);
                }
            )

    }

    const [selectedCompanyId, setSelectedCompanyId] = useState('');
    const navigate = useNavigate()

    function handleCompanyChange(id, name) {
        setSelectedCompanyId(id);
       
        sessionStorage.setItem('selectedCompanyId', id);
        sessionStorage.setItem('companyName', name)
        let path = `/dashboardreceptionist`;

        navigate(path);


    }



    function handleBack() {

        navigate('/')
    }



    useEffect(() => {

        fetchCompanies();

    }, [])


    console.log(companyName, "companyName")



    return (


        <>
        {/* <Navbar toggleSidebar={toggleSidebar}/> */}
        <Box sx={{display:"flex", flexGrow: 1, p: 2, position:'relative'}}>
            {/* <Sidebar open={sidebarOpen} /> */}
            <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
      <Box
        //   elevation={5}
          sx={{
            display:'flex',
            justifyContent:'space-between',
            // width:'100%',
            minHeight:'4.5em',
          mb:'0.5em',
          mt:'3em',
          }}
          >
            <Header title="Receptionist Company(s)" subtitle="Select a company of your choice" />
        </Box>
    
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
      <Box
            // elevation={5}
            sx={{
              // width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              m="20px 0 0 0"
              // display='flex'
              // width="100%"
              maxWidth='95%'
              flexGrow={1}
              minHeight="75vh"
   
    
              sx={{
                mb:'1.5em'
              }}
            >
                             <Grid container spacing={3} mt='1px' >
                    



                    {companyName.map((company) => (
                        <Grid item key={company.id} xs={12} sm={6} md={4} lg={3}>


                            <Card className="gradient" onClick={() => handleCompanyChange(company.id, company.name)} sx={{ height: '100%',width:'100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: "lightblue",cursor:"pointer" }}>
                                <CardMedia
                                component='img'
                                    sx={{ height: 130, width: 400, objectFit:'contain' }}
                                    image={company.logo}
                                // title={company.name}
                                />
                                <CardContent sx={{ flexGrow: 1, color: "black" }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {company.name}
                                    </Typography>
                                    <Typography gutterBottom component="div">
                                        {company.email}
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>
                    ))}

                    {/* <Box
                    sx={{
                        display:'flex',
                        position:'absolute',
                        bottom:'3em',
                        justifyContent:'center',
                        width:'96%',
                        bgcolor:'orange',

                    }}
                    >


                        <Button variant="contained" sx={{
                            width:'8.5em', height:'3em',
                        }} onClick={handleBack}>Back</Button>

                    </Box> */}
                </Grid>
    
            </Box>
          </Box>
    
      </Grid>
    </Grid>
        </Box>
        </>

    )
}