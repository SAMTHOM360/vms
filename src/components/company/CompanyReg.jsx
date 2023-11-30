import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, Grid } from '@mui/material';
import '../../css/CompanyReg.css';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../global/Navbar';
import Sidebar from '../../global/Sidebar';
import Loader from '../Loader';


export default function CompanyReg() {

    const url = "http://192.168.12.54:8080/com/add";
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        logo: "",
        address: "",
        state: "",
        city: "",
        pincode: "",
        email: "",
        phoneNumber: "",
        industry: "",
        aboutUs: "",
        userLimit: "",
        buildingId: "",

    })


    const [errors, setErrors] = useState({
        name: "",
        logo: "",
        address: "",
        state: "",
        city: "",
        pincode: "",
        email: "",
        phoneNumber: "",
        industry: "",
        userLimit: "",
        aboutUs: "",
        buildingId: "",

    })

    const [logoUpdated, setLogoUpdated] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        const pincodeRegex = /^\d{6}$/;

        const phoneNumberRegex = /^\d{10}$/;


        const newErrors = {};

        // Check for empty fields and validate their content
        if (!values.name) {
            newErrors.name = "Name is required";
        }

        if (!values.logo) {
            newErrors.logo = "Logo is required";
        }

        if (!values.address) {
            newErrors.address = "Address is required";
        }

        if (!values.state) {
            newErrors.state = "State is required";
        }

        if (!values.city) {
            newErrors.city = "City is required";
        }

        if (!values.pincode || !values.pincode.match(pincodeRegex)) {
            newErrors.pincode = "Pincode must be exactly 6 digits";
        }

        if (!values.email || !values.email.match(emailRegex)) {
            newErrors.email = "Invalid email address";
        }

        if (!values.phoneNumber || !values.phoneNumber.match(phoneNumberRegex)) {
            newErrors.phoneNumber = "Phone number must be exactly 10 digits";
        }

        if (!values.industry) {
            newErrors.industry = "Industry is required";
        }

        if (!values.userLimit) {
            newErrors.userLimit = "User Limit is required";
        }

        if (!values.buildingId) {
            newErrors.userLimit = "User Limit is required";
        }

        if (!values.aboutUs) {
            newErrors.aboutUs = "About is required";
        }


        setErrors(newErrors); // Update errors state

        if (Object.keys(newErrors).length === 0) {

            try {

                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('image', values.logo);
                formData.append('address', values.address);
                formData.append('state.id', values.state);
                formData.append('city.id', values.city);
                formData.append('pincode', values.pincode);
                formData.append('email', values.email);
                formData.append('phoneNumber', values.phoneNumber);
                formData.append('Industry', values.industry);
                formData.append('aboutUs', values.aboutUs);
                formData.append('userLimit', values.userLimit);
                formData.append('building.id', values.buildingId);

                const res = await axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`
                    },

                });
                alert("form submitted");
                navigate('/companyDetails')
                console.log()
                // setIsSubmitted(true);
                setValues({
                    name: "",
                    logo: "",
                    address: "",
                    state: "",
                    city: "",
                    pincode: "",
                    email: "",
                    phoneNumber: "",
                    industry: "",
                    aboutUs: "",
                    userLimit: "",
                    buildingId: "",

                });
                setLogoUpdated(false);



            } catch (error) {

                console.log(error)
            }
        }


    }

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');



    function fetchStates() {

        axios.get("http://192.168.12.54:8080/sc/states")

            .then((response) => {
                setStates(response.data.data);

            })

            .catch((error) => {
                console.log(error);
            })

    }

    useEffect(() => {

        fetchStates();
    }, []);


    const handleStateChange = (event) => {
        const selectedState = event.target.value;
        // console.log(selectedState)
        setSelectedState(selectedState);
        setValues({ ...values, state: selectedState });

        axios.get(`http://192.168.12.54:8080/sc/all/${selectedState}`)

            .then((response) => {
                setCities(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });

    };


    const handleCityChange = (event) => {
        const selectedCity = event.target.value;
        setSelectedCity(selectedCity);
        setValues({ ...values, city: selectedCity });
        // setSelectedCity(selectedCity);
    };

    const handleLogoChange = (event) => {
        const logoFile = event.target.files[0];
        setValues({ ...values, logo: logoFile });
        setLogoUpdated(true); 
        alert("Company logo updated successfully");
    };

    return (
        <>
            <Box sx={{ display: "flex", flexGrow: 1, p: 3, }}>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                        <div className='img'>


                            <form onSubmit={(e) => handleSubmit(e)}>

                                <Box
                                    display="flex" flexDirection='column'
                                    maxWidth={800}
                                    margin='auto'
                                    marginTop={3}
                                    padding={3}
                                    borderRadius={2}
                                    gap={5}
                                    elevation={2}
                                    boxShadow={"5px 5px 10px #ccc"}
                                >
                                    <Typography sx={{ margin: "auto" }} fontSize={20} variant={'h1'}>Company Registration Form</Typography>
                                    <div className="input" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>



                                        <TextField sx={{ width: "47%" }} placeholder="Company Name " type="text" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })}
                                            error={Boolean(errors.name)}
                                            helperText={errors.name}

                                        ></TextField>

                                        <label className="custom-file-upload">
                                            <input type="file" id="file-input" onChange={handleLogoChange} />
                                            Upload Company Logo
                                        </label>
                                    </div>


                                    <TextField placeholder="Company Address" type="text" value={values.address} onChange={(e) => setValues({ ...values, address: e.target.value })} error={Boolean(errors.address)}
                                        helperText={errors.address}></TextField>
                                    <div
                                        className="input"
                                        style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "20px" }}
                                    >

                                        <div>

                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Select State</InputLabel>
                                                    <Select
                                                        sx={{ width: '300px' }}

                                                        // value={selectedState}
                                                        value={values.state}

                                                        onChange={handleStateChange}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"

                                                        label="Select State"
                                                    >
                                                        <MenuItem value="-"
                                                            placeholder='Select State' >

                                                        </MenuItem>
                                                        {states.map((state) => (
                                                            <MenuItem key={state.id} value={state.id}>
                                                                {state.name}
                                                            </MenuItem>
                                                        ))}

                                                    </Select>
                                                </FormControl>
                                            </Box>

                                        </div>




                                        {/* <Select

            sx={{ width: '47%' }}
            id="state-select"
            value={selectedState}
            // onChange={(e) => setValues({...values,state:e.target.value})}
            // value={selectedState}
            onChange={handleStateChange}
        >


            <MenuItem value="-"
                placeholder='Select State' >
                <em>Select State</em>
            </MenuItem>
            {states.map((state) => (
                <MenuItem key={state.id} value={state.id}>
                    {state.name}
                </MenuItem>
            ))}
        </Select>

        <Select
            sx={{ width: '47%' }}


            value={selectedCity}
            onChange={handleCityChange}

        >

            <MenuItem value="-" placeholder='Select City'>
                <em>Select City</em>
            </MenuItem>
            {cities.map((city) => (

                <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
            ))}
        </Select> */}


                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Select City</InputLabel>
                                                <Select
                                                    sx={{ width: '300px' }}

                                                    // value={selectedCity}
                                                    value={values.city}

                                                    onChange={handleCityChange}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Select City">

                                                    <MenuItem value="-"
                                                        placeholder='Select City' >

                                                    </MenuItem>
                                                    {cities.map((city) => (
                                                        <MenuItem key={city.id} value={city.id}>
                                                            {city.name}
                                                        </MenuItem>
                                                    ))}

                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </div>
                                    <TextField type="number" placeholder="Pincode" value={values.pincode} onChange={(e) => {
                                        // Check if entered value is within 6 characters
                                        if (e.target.value.length <= 6) {
                                            setValues({ ...values, pincode: e.target.value });
                                        }
                                    }}
                                        inputProps={{ maxLength: 6 }} error={Boolean(errors.pincode)}
                                        helperText={errors.pincode}></TextField>

                                    <div className="input" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <TextField sx={{ width: "47%" }} placeholder=" Email" type="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} error={Boolean(errors.email)}
                                            helperText={errors.email} >
                                        </TextField>
                                        <TextField sx={{ width: "47%" }} placeholder=" Phone Number " type="number" inputProps={{ maxLength: 10 }} value={values.phoneNumber} onChange={(e) => {

                                            if (e.target.value.length <= 10) {
                                                setValues({ ...values, phoneNumber: e.target.value });
                                            }
                                        }} error={Boolean(errors.phoneNumber)}
                                            helperText={errors.phoneNumber}></TextField>
                                    </div>

                                    <div className='input' style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >


                                        <TextField sx={{ width: "47%" }} placeholder="Building Id" type="number" value={values.buildingId} inputProps={{ maxLength: 1 }} // Set the maxLength attribute to restrict the input length to 1 digit

                                            onChange={(e) => {
                                                // Check if entered value is within 1 digit
                                                if (e.target.value.length <= 1) {
                                                    setValues({ ...values, buildingId: e.target.value });
                                                }
                                            }} error={Boolean(errors.buildingId)}
                                            helperText={errors.buildingId}></TextField>


                                        <TextField sx={{ width: "47%" }} placeholder="User Limit" type="number" value={values.userLimit} onChange={(e) => setValues({ ...values, userLimit: e.target.value })} error={Boolean(errors.userLimit)}
                                            helperText={errors.userLimit}></TextField>

                                    </div>

                                    <TextField placeholder="Industry" type="text" value={values.industry} onChange={(e) => setValues({ ...values, industry: e.target.value })} error={Boolean(errors.industry)}
                                        helperText={errors.industry}></TextField>





                                    <TextField placeholder="About" type="text" value={values.aboutUs} onChange={(e) => setValues({ ...values, aboutUs: e.target.value })} error={Boolean(errors.aboutUs)}
                                        helperText={errors.aboutUs}></TextField>

                                    <div style={{ display: "flex", flexDirection: "row", gap: "15px", justifyContent: "center" }}>
                                        <Button type="submit" variant="contained" sx={{ width: 130, height: 50 }}  >Register</Button>
                                        <Button onClick={(e) => {
                                            navigate('/companyDetails')
                                        }} type="button" variant="contained" sx={{ width: 130, height: 50 }} >Back</Button>


                                    </div>


                                </Box>
                            </form>
                        </div>

                    </Grid>

                </Grid>

                {/* {isSubmitted && (
                <div style={{ textAlign: 'center' }}>
                    <ToastContainer position="top-center"  />
                    {toast.success('Company added successfully')}
                </div>
            )} */}

                {/* <ToastContainer position="top-center" /> */}

            </Box>

        </>

    )
}















