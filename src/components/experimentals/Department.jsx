import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Box, Button, TextField, Typography } from '@mui/material';

const Department = () => {
    const companyIdStr = sessionStorage.getItem("companyId");
    const companyId = parseInt(companyIdStr,10)
    const [ formData, setFormData] = useState({
        deptName:'',
    })
    const [ depts, setDepts] = useState([])
    
    const BASE_URL = 'http://192.168.12.12:8080/api/department'

    const handleAddDept = async(e) => {
        e.preventDefault()
        const payload = {
            name:formData.deptName,
            company: {
                id: companyId,
            }
        }

        try{
            const response = await axios.post(`${BASE_URL}/create`, payload)

            console.log("dept add response", response)
            fetchDepts()
            setFormData({
                deptName:'',
            })
        } catch(error) {
            console.error("error in adding dept", error)
        }
    }

    const fetchDepts = async () => {
        try{
          const response = await axios.get(`${BASE_URL}/user-count-department?companyId=${companyId}`)
          const deptApiData = response.data.data
          console.log("dept data", response.data.data)
          setDepts(deptApiData)
        } catch(error) {
          console.error("Error in fetching depts", error)
        }
      }

      useEffect(() => {
        fetchDepts()
      }, [])

      const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
      }

      console.log("depts from department", depts)


  return (
    <>
    <Box sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100vw',
        height:'100vh',
    }}>
    <TextField
    label='Department Name'
    name='deptName'
    value={formData.deptName}
    inputProps={{ maxLength: 26 }}
    onChange={handleChange}
    required
    />

    <Button
    variant='container'
    color='primary'
    onClick={handleAddDept}
    >
        Add department
    </Button>
    <Box sx={{
        bgcolor:'orange'
    }}>
        {depts.map((dataItem, index) => (
            <Typography key={index}>
                {dataItem.departmentId}  {dataItem.departmentName}  {dataItem.userCount}
            </Typography>
        ))}

{/* {depts.map((dataItem, index) => (
        <Typography key={index}>
            {dataItem.id} {dataItem.name}
        </Typography>
    ))} */}

    </Box>
    </Box>
    </>
  )
}

export default Department