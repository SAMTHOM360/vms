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


export default function ReceptionistCompanyScreen() {
    const buildingId = sessionStorage.getItem('buildingId');
    const buildingUrl = `http://192.168.12.54:8080/com/getByBuildingId?buildingId=${buildingId}`

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

                <Grid container spacing={3} style={{ margin: "10px", padding: "10px", display: 'flex', justifyContent: "", flexDirection: "column" ,backgroundColor:""}} > 

                <h1 style={{textAlign:"center"}}>Select a Company</h1>
                <Grid container spacing={3} style={{ margin: "10px", padding: "10px", display: 'flex', justifyContent: "space-evenly", flexDirection: "row" ,backgroundColor:""}} >
                    



                    {companyName.map((company) => (
                        <Grid item key={company.id} xs={12} sm={6} md={4} lg={3}>


                            <Card className="gradient" onClick={() => handleCompanyChange(company.id, company.name)} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: "lightblue" }}>
                                <CardMedia
                                    sx={{ height: 130, width: 400 }}
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
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button variant="contained" onClick={handleBack}>Back</Button>
                    </Grid>

                </Grid>



                </Grid>
              
            
        </>




    )
}