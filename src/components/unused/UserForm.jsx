// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// // import DatePicker from 'react-datepicker';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // import dayjs from 'dayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import Autocomplete from '@mui/material/Autocomplete';
// // import 'react-datepicker/dist/react-datepicker.css';
// // import { useLocation } from 'react-router-dom';
// import '../css/FormInput.css'

// function UserForm(authenticated) {
//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     image:'',
//     email: '',
//     phone: '',
//     dob: new Date(),
//     gender: '',
//     govtId: '',
//     pinCode: '',
//     company: {
//       id: 1,
//     },
//     role: {
//       id: '',
//       name: '',
//     },
//     state: {
//       id: '',
//       name: '', // Add name property to store the selected state name
//     },
//     city: {
//       id: '',
//       name: ''
//     },
//   });
//   // const [gender, setGender] = useState('');
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [roles, setRoles] = useState([]);

// // const location = useLocation()
//   const token = sessionStorage.getItem('token');
//   // console.log(token)

//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };

//   const shouldDisableDate = (date) => {
//     return date < new Date().setDate(new Date().getDate() - 1);
//   };

  

//   //ADHAAR STARTS
//   const [governmentIdType, setGovernmentIdType] = useState('');
//   const [error, setError] = useState('');
//   const [warning, setWarning] = useState('');
  
//   const handleChangeGovernmentIdType = (event) => {
//     setGovernmentIdType(event.target.value);
//     setError('');
//     setWarning('');
//   };

//   const handleChangeGender = (event) => {
//     const value = event.target.value;

//     setFormData({
//       ...formData,
//       gender: value,
//     });
//   };
  
  
//   const handleChangeGovernmentId = (event) => {
//     const value = event.target.value;
  
//     // Validate based on the selected government ID type
//     let errorMessage = '';
//     let warningMessage = '';
  
//     if (governmentIdType === 'Aadhar Card') {
//       if (/^\d{0,12}$/.test(value)) { // Allow only digits
//         if (value.length === 12) {
//           warningMessage = '';
//         } else if (value.length > 0) {
//           warningMessage = 'Aadhar Card must be 12 digits.';
//         } else {
//           warningMessage = '';
//         }
//       } else {
//         errorMessage = 'Aadhar Card must be 12 digits.';
//       }
//     } else if (governmentIdType === 'PAN Card') {
//       if (/^[A-Z0-9]{0,10}$/.test(value)) { // Allow uppercase letters and digits
//         if (value.length === 10) {
//           warningMessage = '';
//         } else if (value.length > 0) {
//           warningMessage = 'PAN Card must be 10 characters, uppercase letters, and digits only.';
//         } else {
//           warningMessage = '';
//         }
//       } else {
//         errorMessage = 'PAN Card must be 10 characters, uppercase letters, and digits only.';
//       }
//     }
  
//     // Set the error and warning messages
//     setError(errorMessage);
//     setWarning(warningMessage);
//   };
  
  
//   //ADHAAR ENDS


//   useEffect(() => {

//     // location.state && getById()
//     // Fetch states from the backend
//     axios
//       .get('http://192.168.12.58:8080/api/state/all')
//       .then((response) => {
//         setStates(response.data.data); // Extract the array from the "data" property
//       })
//       .catch((error) => {
//         console.error('Error fetching states', error);
//       });

//     // Fetch roles from the backend
//     axios
//       .get('http://192.168.12.58:8080/api/role/getall')
//       .then((response) => {
//         setRoles(response.data.data); // Extract the array from the "data" property
//       })
//       .catch((error) => {
//         console.error('Error fetching roles', error);
//       });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

  
//     if (name === 'gender') {
//       // Ensure name is correctly set to 'gender' in your <Select> component
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     } 
    
//     if(name === 'govtId') {
//       // Handle other fields
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
  
//     // Handle the "State" field separately
//     if (name === 'state') {
//       const selectedState = states.find((state) => state.id === value);
//       setFormData({
//         ...formData,
//         [name]: {
//           id: value,
//           name: selectedState ? selectedState.name : '', // Store the selected state name
//         },
//         // Only reset the "id" property of the city object
//         city: {
//           id: '',
//         },
//       });
  
//       // Fetch cities based on the selected state
//       fetchCities(value);
//     } else if (name === 'city') {
//       // Handle the "City" field
//       const selectedCity = cities.find((city) => city.id === value);
//       setFormData({
//         ...formData,
//         [name]: {
//           id: value,
//           name: selectedCity ? selectedCity.name : '', // Store the selected city name
//         },
//       });
//     } else if (name === 'role') {
//       // Handle the "Role" field
//       const selectedRole = roles.find((role) => role.id === value);
//       setFormData({
//         ...formData,
//         [name]: {
//           id: value,
//           name: selectedRole ? selectedRole.name : '', // Store the selected role name
//         },
//       });
//     } else {
//       // For other fields, update the formData normally
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };
  
//   // const handleChange = (name, newValue) => {
//   //   if (name === 'state') {
//   //     const selectedState = states.find((state) => state.id === newValue?.id);
//   //     setFormData((prevData) => ({
//   //       ...prevData,
//   //       [name]: {
//   //         id: newValue?.id || '',
//   //         name: selectedState ? selectedState.name : '',
//   //       },
//   //       city: {
//   //         id: '', // Reset the city when the state changes
//   //         name: '', // Also reset the city name
//   //       },
//   //     }));
  
//   //     // Fetch cities based on the selected state
//   //     fetchCities(newValue?.id);
//   //   } else if (name === 'city') {
//   //     const selectedCity = cities.find((city) => city.id === newValue?.id);
//   //     setFormData((prevData) => ({
//   //       ...prevData,
//   //       [name]: {
//   //         id: newValue?.id || '',
//   //         name: selectedCity ? selectedCity.name : '',
//   //       },
//   //     }));
//   //   } else if (name === 'role') {
//   //     const selectedRole = roles.find((role) => role.id === newValue?.id);
//   //     setFormData((prevData) => ({
//   //       ...prevData,
//   //       [name]: {
//   //         id: newValue?.id || '',
//   //         name: selectedRole ? selectedRole.name : '',
//   //       },
//   //     }));
//   //   } else {
//   //     setFormData((prevData) => ({
//   //       ...prevData,
//   //       [name]: newValue || '',
//   //     }));
//   //   }
//   // };
  
  
  
  


//   const fetchCities = async (stateId) => {
//     try {
//       const response = await axios.get(
//         `http://192.168.12.58:8080/api/city/${stateId}`
//       );
//       setCities(response.data.data);
//     } catch (error) {
//       console.error('Error fetching cities', error);
//       setCities([]); // Set cities to an empty array in case of an error
//     }
//   };

//   const handleDateChange = (date) => {

//     if (date < new Date()) {
//       // Prevent the date from being selected
//       return;
//     }

//     setFormData({
//       ...formData,
//       dob: date,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.dob) {
//       alert('Date of birth is required');
//       return;
//     }

//     // Create a user object in the required format
//     const user = {
//       id: null,
//       firstname: formData.firstname,
//       image:'alt img',
//       lastname: formData.lastname,
//       email: formData.email,
//       phone: formData.phone,
//       dob: formData.dob.toISOString().split('T')[0],
//       gender: formData.gender,
//       govtId: formData.govtId,
//       pinCode: formData.pinCode,
//       company: {
//         id: 1,
//       },
//       role: {
//         id: formData.role.id,
//       },
//       state: {
//         id: formData.state.id,

//       },
//       city: {
//         id: formData.city.id,
//       },
//     };

//     try {
//       await axios.post('http://192.168.12.58:8080/api/user/adduser', user, {headers});  //SMRUTI BHAI
//       alert('User data submitted successfully');
//     } catch (error) {
//       alert('Error submitting user data');
//     }
//   };

//   return (
//     <form
//       style={{ display: 'flex', flexDirection: 'column', alignItems:'center'}}
//       onSubmit={handleSubmit}
//     >
//       <TextField
//         className='inputField'
//         label="First Name"
//         name="firstname"
//         value={formData.firstname}
//         onChange={handleChange}
//         required
//       />
//       <TextField
//         className='inputField'
//         label="Last Name"
//         name="lastname"
//         value={formData.lastname}
//         onChange={handleChange}
//         required
//       />
//         <TextField
//           className='inputField'
//           label="Phone"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//         />
//       <TextField
//         className='inputField'
//         label="Email"
//         name="email"
//         type="email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//       />
//       {/* <DatePicker
//         sx={{ marginBottom: '15px' }}
//         selected={formData.dob}
//         onChange={handleDateChange}
//         dateFormat="yyyy-MM-dd"
//         isClearable
//         showYearDropdown
//         scrollableYearDropdown
//         yearDropdownItemNumber={15}
//       /> */}
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//           className='inputField'
//           label="Date of Birth"
//           format="YYYY/MM/DD"
//           // shouldDisableDate={shouldDisableDate}
//           selected={formData.dob}
//           onChange={handleDateChange}

//           />
//           </LocalizationProvider>

//           <FormControl className='inputField' fullWidth>
//   <InputLabel id="demo-simple-select-label">Gender</InputLabel>
//   <Select
//     labelId="demo-simple-select-label"
//     id="demo-simple-select"
//     value={formData.gender}
//     label="Gender"
//     onChange={handleChangeGender}
//     required
//   >
//     <MenuItem value={'Male'}>Male</MenuItem>
//     <MenuItem value={'Female'}>Female</MenuItem>
//     <MenuItem value={'Transgender'}>Others</MenuItem>
//   </Select>
// </FormControl>



//       <FormControl className='inputField' required>
//         <InputLabel htmlFor="state">State</InputLabel>
//         <Select
//           label="State"
//           name="state"
//           value={formData.state.id || ''}
//           onChange={handleChange}
//           required
//         >
//           {states.map((state) => (
//             <MenuItem key={state.id} value={state.id}>
//               {state.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

// {/* <Autocomplete
//   className='inputField'
//   options={states}
//   getOptionLabel={(state) => state.name}
//   value={
//     states.find((state) => state.id === formData.state.id) || { id: '', name: '' }
//   }
//   onChange={(event, newValue) => handleChange('state', newValue)}
//   isOptionEqualToValue={(option, value) => option.id === value.id}
//   renderInput={(params) => (
//     <TextField
//       {...params}
//       label="State"
//       name="state"
//       required
//     />
//   )}
// /> */}



//       <FormControl className='inputField' required>
//         <InputLabel htmlFor="city">City</InputLabel>
//         <Select
//           label="City"
//           name="city"
//           value={formData.city.id || ''}
//           onChange={handleChange}
//           required
//         >
//           {cities.map((city) => (
//             <MenuItem key={city.id} value={city.id}>
//               {city.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

// {/* <Autocomplete
//   className='inputField'
//   options={cities}
//   getOptionLabel={(city) => city.name}
//   value={
//     cities.find((city) => city.id === formData.city.id) || { id: '', name: '' }
//   }
//   onChange={(event, newValue) => handleChange('city', newValue)}
//   isOptionEqualToValue={(option, value) => option.id === value.id}
//   renderInput={(params) => (
//     <TextField
//       {...params}
//       label="City"
//       name="city"
//       required
//     />
//   )}
// /> */}



// <TextField
//  className='inputField'
//   select
//   label="Government ID Type"
//   value={governmentIdType}
//   onChange={handleChangeGovernmentIdType}
//   fullWidth
//   required
// >
//   <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
//   <MenuItem value="PAN Card">PAN Card</MenuItem>
// </TextField>
// <TextField
//  className='inputField'
//   label="Government ID"
//   value={formData.govtId} // Make sure this is set to formData.govtId
//   onChange={handleChangeGovernmentId}
//   fullWidth
//   required
//   error={Boolean(error)}
//   helperText={error || warning}
//   inputProps={{
//     maxLength: governmentIdType === 'Aadhar Card' ? 12 : 10,
//     pattern: governmentIdType === 'Aadhar Card' ? '^[0-9]*$' : '^[A-Z0-9]*$',
//     onInput: (event) => {
//       let value = event.target.value;
//       if (governmentIdType === 'Aadhar Card') {
//         value = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
//         if (value.length > 12) {
//           value = value.slice(0, 12); // Truncate to 12 characters if it exceeds the limit
//         }
//       } else if (governmentIdType === 'PAN Card') {
//         value = value.replace(/[^A-Z0-9]/g, ''); // Remove non-alphanumeric characters
//         if (value.length > 10) {
//           value = value.slice(0, 10); // Truncate to 10 characters if it exceeds the limit
//         }
//       }
//       setFormData({
//         ...formData,
//         govtId: value, // Update formData.govtId as you type
//       });
//     },
//   }}
  
// />



//       <FormControl className='inputField' required>
//         <InputLabel htmlFor="role">Role</InputLabel>
//         <Select
//           label="Role"
//           name="role"
//           value={formData.role.id || ''}
//           onChange={handleChange}
//           required
//         >
//           {roles.map((role) => (
//             <MenuItem key={role.id} value={role.id}>
//               {role.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

// {/* <Autocomplete
//   className='inputField'
//   options={roles}
//   getOptionLabel={(role) => role.name}
//   value={
//     roles.find((role) => role.id === formData.role.id) || { id: '', name: '' }
//   }
//   onChange={(event, newValue) => handleChange('role', newValue)}
//   isOptionEqualToValue={(option, value) => option.id === value.id}
//   renderInput={(params) => (
//     <TextField
//       {...params}
//       label="Role"
//       name="role"
//       required
//     />
//   )}
// /> */}
//       <TextField
//         className='inputField'
//         label="PIN Code"
//         name="pinCode"
//         value={formData.pinCode}
//         onChange={handleChange}
//         required
//       />
//       <Button type="submit" variant="contained" color="primary" sx={{width:'25%', height:'44px', mt:'15px'}}>
//         Submit
//       </Button>
//     </form>
//   );
// }

// export default UserForm;
















// // import React, { useState } from 'react';
// // import TextField from '@mui/material/TextField';
// // import MenuItem from '@mui/material/MenuItem';

// // function GovernmentIdForm() {
// //   const [governmentIdType, setGovernmentIdType] = useState('');
// //   const [governmentId, setGovernmentId] = useState('');
// //   const [error, setError] = useState('');
// //   const [warning, setWarning] = useState('');

// //   const handleChangeGovernmentIdType = (event) => {
// //     setGovernmentIdType(event.target.value);
// //     setGovernmentId(''); // Clear the governmentId field when the type changes
// //     setError('');
// //     setWarning('');
// //   };

// //   const handleChangeGovernmentId = (event) => {
// //     const value = event.target.value;

// //     // Validate based on the selected government ID type
// //     if (governmentIdType === 'Aadhar Card') {
// //       if (/^\d{0,12}$/.test(value)) {
// //         setGovernmentId(value);

// //         if (value.length === 12) {
// //           setError('');
// //           setWarning('');
// //         } else if (value.length > 0) {
// //           setError('');
// //           setWarning('Aadhar Card must be 12 digits.');
// //         } else {
// //           setError('');
// //           setWarning('');
// //         }
// //       } else {
// //         setError('Aadhar Card must be 12 digits.');
// //         setWarning('');
// //       }
// //     } else if (governmentIdType === 'PAN Card') {
// //       if (/^[A-Z0-9]{0,10}$/.test(value)) {
// //         setGovernmentId(value);

// //         if (value.length === 10) {
// //           setError('');
// //           setWarning('');
// //         } else if (value.length > 0) {
// //           setError('');
// //           setWarning('PAN Card must be 10 characters, uppercase letters and digits only.');
// //         } else {
// //           setError('');
// //           setWarning('');
// //         }
// //       } else {
// //         setError('PAN Card must be 10 characters, uppercase letters and digits only.');
// //         setWarning('');
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //       <TextField
// //         select
// //         label="Government ID Type"
// //         value={governmentIdType}
// //         onChange={handleChangeGovernmentIdType}
// //         fullWidth
// //       >
// //         <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
// //         <MenuItem value="PAN Card">PAN Card</MenuItem>
// //       </TextField>
// //       <TextField
// //         label="Government ID"
// //         value={governmentId}
// //         onChange={handleChangeGovernmentId}
// //         fullWidth
// //         error={Boolean(error)}
// //         helperText={error || warning}
// //         inputProps={{
// //           maxLength: governmentIdType === 'Aadhar Card' ? 12 : 10,
// //           pattern: governmentIdType === 'Aadhar Card' ? '[0-9]*' : '[A-Z0-9]*',
// //         }}
// //       />
// //     </div>
// //   );
// // }

// // export default GovernmentIdForm;










import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import DatePicker from 'react-datepicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Autocomplete from '@mui/material/Autocomplete';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useLocation } from 'react-router-dom';
import '../css/FormInput.css'

function UserForm(authenticated) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    image:'',
    email: '',
    phone: '',
    // dob: new Date(),
    dob:null,
    gender: '',
    govtId: '',
    pinCode: '',
    company: {
      id: 1,
    },
    role: {
      id: '',
      name: '',
    },
    state: {
      id: '',
      name: '', // Add name property to store the selected state name
    },
    city: {
      id: '',
      name: ''
    },
  });
  const [gender, setGender] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [roles, setRoles] = useState([]);

// const location = useLocation()
  const token = sessionStorage.getItem('token');
  // console.log(token)

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const shouldDisableDate = (date) => {
    return date < new Date().setDate(new Date().getDate() - 1);
  };

  

  //ADHAAR STARTS
  const [governmentIdType, setGovernmentIdType] = useState('');
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  
  const handleChangeGovernmentIdType = (event) => {
    setGovernmentIdType(event.target.value);
    setError('');
    setWarning('');
  };

  const handleChangeGender = (event) => {
    const value = event.target.value;

    setFormData({
      ...formData,
      gender: value,
    });
  };
  
  
  const handleChangeGovernmentId = (event) => {
    const value = event.target.value;
  
    // Validate based on the selected government ID type
    let errorMessage = '';
    let warningMessage = '';
  
    if (governmentIdType === 'Aadhar Card') {
      if (/^\d{0,12}$/.test(value)) { // Allow only digits
        if (value.length === 12) {
          warningMessage = '';
        } else if (value.length > 0) {
          warningMessage = 'Aadhar Card must be 12 digits.';
        } else {
          warningMessage = '';
        }
      } else {
        errorMessage = 'Aadhar Card must be 12 digits.';
      }
    } else if (governmentIdType === 'PAN Card') {
      if (/^[A-Z0-9]{0,10}$/.test(value)) { // Allow uppercase letters and digits
        if (value.length === 10) {
          warningMessage = '';
        } else if (value.length > 0) {
          warningMessage = 'PAN Card must be 10 characters, uppercase letters, and digits only.';
        } else {
          warningMessage = '';
        }
      } else {
        errorMessage = 'PAN Card must be 10 characters, uppercase letters, and digits only.';
      }
    }
  
    // Set the error and warning messages
    setError(errorMessage);
    setWarning(warningMessage);
  };
  
  
  //ADHAAR ENDS


  useEffect(() => {

    // location.state && getById()
    // Fetch states from the backend
    axios
      .get('http://192.168.12.58:8080/api/state/all')
      .then((response) => {
        setStates(response.data.data); // Extract the array from the "data" property
      })
      .catch((error) => {
        console.error('Error fetching states', error);
      });

    // Fetch roles from the backend
    axios
      .get('http://192.168.12.58:8080/api/role/getall')
      .then((response) => {
        setRoles(response.data.data); // Extract the array from the "data" property
      })
      .catch((error) => {
        console.error('Error fetching roles', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

  
    if (name === 'gender') {
      // Ensure name is correctly set to 'gender' in your <Select> component
      setFormData({
        ...formData,
        [name]: value,
      });
    } 
    
    if(name === 'govtId') {
      // Handle other fields
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  
    // Handle the "State" field separately
    if (name === 'state') {
      const selectedState = states.find((state) => state.id === value);
      setFormData({
        ...formData,
        [name]: {
          id: value,
          name: selectedState ? selectedState.name : '', // Store the selected state name
        },
        // Only reset the "id" property of the city object
        city: {
          id: '',
        },
      });
  
      // Fetch cities based on the selected state
      fetchCities(value);
    } else if (name === 'city') {
      // Handle the "City" field
      const selectedCity = cities.find((city) => city.id === value);
      setFormData({
        ...formData,
        [name]: {
          id: value,
          name: selectedCity ? selectedCity.name : '', // Store the selected city name
        },
      });
    } else if (name === 'role') {
      // Handle the "Role" field
      const selectedRole = roles.find((role) => role.id === value);
      setFormData({
        ...formData,
        [name]: {
          id: value,
          name: selectedRole ? selectedRole.role : '', // Store the selected role name
        },
      });
    } else {
      // For other fields, update the formData normally
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  
  


  const fetchCities = async (stateId) => {
    try {
      console.log("stateID", stateId)
      const response = await axios.get(
        `http://192.168.12.58:8080/api/city/${stateId}`
      );
      setCities(response.data.data);
    } catch (error) {
      console.error('Error fetching cities', error);
      setCities([]); // Set cities to an empty array in case of an error
    }
  };

  const handleDateChange = (date) => {

    if (date < new Date()) {
      // Prevent the date from being selected
      return;
    }

    setFormData({
      ...formData,
      dob: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.dob) {
      alert('Date of birth is required');
      return;
    }

    // Create a user object in the required format
    const user = {
      id: '',
      firstname: formData.firstname,
      image:'alt img',
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob.toISOString().split('T')[0],
      gender: formData.gender,
      govtId: formData.govtId,
      address: "123 Main St",
      empCode: "EMP001",
      pinCode: formData.pinCode,
      company: {
        id: 1,
      },
      role: {
        id: formData.role.id,
      },
      state: {
        id: formData.state.id,

      },
      city: {
        id: formData.city.id,
      },
    };

    try {
      await axios.post('http://192.168.12.58:8080/api/user/adduser', user, {headers});   //SMRUTI BHAI
      alert('User data submitted successfully');
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        dob: null, // Reset date of birth to null or initial value
        gender: '',
        govtId: '',
        pinCode: '',
        role: { id: '' }, // Reset role to empty or initial value
        state: { id: '' }, // Reset state to empty or initial value
        city: { id: '' }, // Reset city to empty or initial value
      });
    } catch (error) {
      alert('Error submitting user data');
    }
  };

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', alignItems:'center'}}
      onSubmit={handleSubmit}
    >
      <TextField
        className='inputField'
        label="First Name"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        required
      />
      <TextField
        className='inputField'
        label="Last Name"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        required
      />
        <TextField
          className='inputField'
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      <TextField
        className='inputField'
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {/* <DatePicker
        sx={{ marginBottom: '15px' }}
        selected={formData.dob}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        isClearable
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={15}
      /> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
          className='inputField'
          label="Date of Birth"
          format="YYYY/MM/DD"
          // shouldDisableDate={shouldDisableDate}
          selected={formData.dob}
          onChange={handleDateChange}

          />
          </LocalizationProvider>

          <FormControl className='inputField' fullWidth>
  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formData.gender}
    label="Gender"
    onChange={handleChangeGender}
    required
  >
    <MenuItem value={'Male'}>Male</MenuItem>
    <MenuItem value={'Female'}>Female</MenuItem>
    <MenuItem value={'Transgender'}>Others</MenuItem>
  </Select>
</FormControl>



      <FormControl className='inputField' required>
        <InputLabel htmlFor="state">State</InputLabel>
        <Select
          label="State"
          name="state"
          value={formData.state.id || ''}
          onChange={handleChange}
          required
        >
          {states.map((state) => (
            <MenuItem key={state.id} value={state.id}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

{/* <Autocomplete
  className='inputField'
  options={states}
  getOptionLabel={(state) => state.name}
  value={
    states.find((state) => state.id === formData.state.id) || { id: '', name: '' }
  }
  onChange={(event, newValue) => handleChange('state', newValue)}
  isOptionEqualToValue={(option, value) => option.id === value.id}
  renderInput={(params) => (
    <TextField
      {...params}
      label="State"
      name="state"
      required
    />
  )}
/> */}



      <FormControl className='inputField' required>
        <InputLabel htmlFor="city">City</InputLabel>
        <Select
          label="City"
          name="city"
          value={formData.city.id || ''}
          onChange={handleChange}
          required
        >
          {cities.map((city) => (
            <MenuItem key={city.id} value={city.id}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

{/* <Autocomplete
  className='inputField'
  options={cities}
  getOptionLabel={(city) => city.name}
  value={
    cities.find((city) => city.id === formData.city.id) || { id: '', name: '' }
  }
  onChange={(event, newValue) => handleChange('city', newValue)}
  isOptionEqualToValue={(option, value) => option.id === value.id}
  renderInput={(params) => (
    <TextField
      {...params}
      label="City"
      name="city"
      required
    />
  )}
/> */}



<TextField
 className='inputField'
  select
  label="Government ID Type"
  value={governmentIdType}
  onChange={handleChangeGovernmentIdType}
  fullWidth
  required
>
  <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
  <MenuItem value="PAN Card">PAN Card</MenuItem>
</TextField>
<TextField
 className='inputField'
  label="Government ID"
  value={formData.govtId} // Make sure this is set to formData.govtId
  onChange={handleChangeGovernmentId}
  fullWidth
  required
  error={Boolean(error)}
  helperText={error || warning}
  inputProps={{
    maxLength: governmentIdType === 'Aadhar Card' ? 12 : 10,
    pattern: governmentIdType === 'Aadhar Card' ? '^[0-9]*$' : '^[A-Z0-9]*$',
    onInput: (event) => {
      let value = event.target.value;
      if (governmentIdType === 'Aadhar Card') {
        value = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        if (value.length > 12) {
          value = value.slice(0, 12); // Truncate to 12 characters if it exceeds the limit
        }
      } else if (governmentIdType === 'PAN Card') {
        value = value.replace(/[^A-Z0-9]/g, ''); // Remove non-alphanumeric characters
        if (value.length > 10) {
          value = value.slice(0, 10); // Truncate to 10 characters if it exceeds the limit
        }
      }
      setFormData({
        ...formData,
        govtId: value, // Update formData.govtId as you type
      });
    },
  }}
  
/>



      <FormControl className='inputField' required>
        <InputLabel htmlFor="role">Role</InputLabel>
        <Select
          label="Role"
          name="role"
          value={formData.role.id || ''}
          onChange={handleChange}
          required
        >
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

{/* <Autocomplete
  className='inputField'
  options={roles}
  getOptionLabel={(role) => role.name}
  value={
    roles.find((role) => role.id === formData.role.id) || { id: '', name: '' }
  }
  onChange={(event, newValue) => handleChange('role', newValue)}
  isOptionEqualToValue={(option, value) => option.id === value.id}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Role"
      name="role"
      required
    />
  )}
/> */}
      <TextField
        className='inputField'
        label="PIN Code"
        name="pinCode"
        value={formData.pinCode}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{width:'25%', height:'44px', mt:'15px'}}>
        Submit
      </Button>
    </form>
  );
}

export default UserForm;