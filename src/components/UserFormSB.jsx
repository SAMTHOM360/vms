import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify';



import Navbar from '../global/Navbar';
import Sidebar from '../global/Sidebar';
import Loader from './Loader';




function UserForm({authenticated,closeDialog, fetchData}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    image:'',
    email: '',
    phone: '',
    dob: new Date(),
    gender: '',
    govtId: '',
    pincode: '',
    company: {
      id: '',
      name: '',
    },
    role: {
      id: '',
      name: '',
    },
    state: {
      id: '',
      name: '', 
    },
    city: {
      id: '',
      name: ''
    },
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [roles, setRoles] = useState([]);
  const [companies, setCompanies] = useState([]);
  // const [addUserDialogOpen, setAddUserDialogOpen] = useState();
  const [dobDate, setDobDate] = useState('');
  const [cleared, setCleared] = React.useState(false);

  const [loading, setLoading] = useState(false)


  const token = sessionStorage.getItem('token');
  const loggedUserRole = sessionStorage.getItem('loggedUserRole')
  const companyId = sessionStorage.getItem('companyId')
  const companyName = sessionStorage.getItem('companyName')

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const shouldDisableDate = (date) => {
    return date > new Date().setDate(new Date().getDate());
  };

  //ADHAAR STARTS
  const [governmentIdType, setGovernmentIdType] = useState('');
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  
  const handleChangeGovernmentIdType = (event) => {
    setGovernmentIdType(event.target.value);
    setError('');
    setWarning('');
    setFormData({
      ...formData,
      govtId: '',
    });
  };

  const handleChangeGender = (event) => {
    const value = event.target.value;

    setFormData({
      ...formData,
      gender: value,
    });
  };

  const handleChangeGovernmentId = (event) => {
    let value = event.target.value;
  
    let errorMessage = '';
    let warningMessage = '';
  
    if (governmentIdType === 'Aadhar Card') {
      if (/^\d{0,12}$/.test(value)) {
        if (value.length === 12) {
          warningMessage = '';
        } else if (value.length < 12) {
          warningMessage = 'Aadhar Card must be 12 digits only.';
        } else {
          warningMessage = '';
        }
      } else {
        errorMessage = 'Aadhar Card must be 12 digits only.';
      }
    } else if (governmentIdType === 'PAN Card') {
      if (/^[A-Z0-9]{0,10}$/.test(value)) {
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
    else if (governmentIdType === ''){
      errorMessage = 'First Choose Your ID Type.'
    }
  
    if (value.length > (governmentIdType === 'Aadhar Card' ? 12 : 10)) {
      value = value.slice(0, governmentIdType === 'Aadhar Card' ? 12 : 10);
    }
  
    if (governmentIdType === 'Aadhar Card') {
      value = value.replace(/[^0-9]/g, '');
    }
  
    if (governmentIdType === 'PAN Card') {
      value = value.replace(/[^A-Z0-9]/g, '');
    }
  
    setFormData({
      ...formData,
      govtId: value,
    });
  
    setError(errorMessage);
    setWarning(warningMessage);
  };

  //ADHAAR ENDS


  useEffect(() => {

    axios
    .get('http://192.168.12.54:8080/api/state/all',)
    .then((response) => {
        setStates(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching states', error);
      });

    axios
      .get('http://192.168.12.54:8080/api/role/getall')
      .then((response) => {
        setRoles(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching roles', error);
      });

      if (loggedUserRole === 'SUPERADMIN') {
        axios
          .get('http://192.168.12.54:8080/com/all', { headers })
          .then((response) => {
            setCompanies(response.data.data);
          })
          .catch((error) => {
            console.error('Error fetching roles', error);
          });
      }

  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

  
    if (name === 'gender') {
      setFormData({
        ...formData,
        [name]: value,
      });
    } 
    
    if(name === 'govtId') {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  
    if (name === 'state') {
      const selectedState = states.find((state) => state.id === value);
      setFormData({
        ...formData,
        [name]: {
          id: value,
          name: selectedState ? selectedState.name : '', 
        },
        city: {
          id: '',
        },
      });
  
      fetchCities(value);
    } else if (name === 'city') {
      const selectedCity = cities.find((city) => city.id === value);
      setFormData({
        ...formData,
        [name]: {
          id: value,
          name: selectedCity ? selectedCity.name : '',
        },
      });
    } else if (name === 'role') {
      const selectedRole = roles.find((role) => role.id === value);
      setFormData({
        ...formData,
        [name]: {
          id: value,
          name: selectedRole ? selectedRole.name : '',
        },
      });
    } 
    // else if (name === 'company') {
    //   const selectedCompany = companies.find((company) => company.id === value);
    //   setFormData({
    //     ...formData,
    //     [name]: {
    //       id: value,
    //       name: selectedCompany ? selectedCompany.name : '',
    //     },
    //   });
    // } 

    else if (name === 'company') {
      if (loggedUserRole === 'SUPERADMIN') {
        const selectedCompany = companies.find((company) => company.id === value);
        setFormData({
          ...formData,
          [name]: {
            id: value,
            name: selectedCompany ? selectedCompany.name : '',
          },
        });
      } 
      // else if (loggedUserRole === 'ADMIN') {
      //   setFormData({
      //     ...formData,
      //     [name]: {
      //       id: companyId,
      //       name: companyName,
      //     },
      //   });
      // }
    }

    
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const fetchCities = async (stateId) => {
    try {
      console.log("state id", stateId)
      let response = await axios.get(
        `http://192.168.12.54:8080/api/city/${stateId}`
      );
      setCities(response.data.data);
    } catch (error) {
      console.error('Error fetching cities', error);
      setCities([]); 
    }
  };

  const handleDateChange = (date) => {

    const adjustedDate = date ? date.add(1, 'day') : null

    console.log("adjusted date", adjustedDate)

    setFormData({
      ...formData,
      dob: adjustedDate,
    });
    console.log("selected date", formData.dob)
  };

  const handleSubmit = async (e) => {
    console.log("I GOT HITTTT  !!!!!!")
    e.preventDefault();
    if (!formData.dob) {
      alert('Date of birth is required');
      return;
    }

    const user = {
      id: null,
      firstName: formData.firstName,
      image:'alt img',
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob.toISOString().split('T')[0],
      gender: formData.gender,
      govtId: formData.govtId,
      pincode: formData.pincode,
      company: {
        id: loggedUserRole === 'SUPERADMIN' ? formData.company.id : companyId,
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

    console.log("PAYLOAD USER", user)

    // debugger
    try{
      setLoading(true)
      let response = await axios.post('http://192.168.12.54:8080/api/user/adduser', user, {headers}); 
      if (response.status === 200 ){

        closeDialog()
        fetchData()
      // setAddUserDialogOpen(false)
      setGovernmentIdType('')
      setDobDate('')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: new Date(),
        gender: '',
        govtId: '',
        pincode: '',
        company: {id: ''},
        role: { id: '' }, 
        state: { id: '' }, 
        city: { id: '' }, 
      });
      toast.success('New Employee Added Successfully.', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
      }
      else {
        alert('Error in submitting data: ' + JSON.stringify(response.data.response));
      }
    }catch (error) {
      alert('Error submitting user data',error);
    }
    setLoading(false)
  };

  return (
<>
<Loader isLoading={loading} />
<form
      style={{ display: 'flex', flexDirection: 'column', alignItems:'center', width:'100%', height:'35em', gap:'2em', }}
      onSubmit={handleSubmit}
    >

<Grid container spacing={2} sx={{mt:'10px'}}>

  <Grid item xs={12} sm={4} md={4} lg={4}>
    <TextField
        sx={{width:'100%', mt:'10px'}}
        label="First Name"
        name="firstName"
        value={formData.firstName}
        inputProps={{ maxLength: 26 }}
        onChange={handleChange}
        required
      />
    </Grid>

    <Grid item xs={12} sm={4} md={4} lg={4}>
    <TextField
        sx={{width:'100%', mt:'10px'}}
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        inputProps={{ maxLength: 26 }}
        onChange={handleChange}
        required
      />
    </Grid>

    <Grid item xs={12} sm={4} md={4} lg={4}>
    <TextField
  sx={{ width: '100%', mt: '10px' }}
  label="Phone"
  name="phone"
  value={formData.phone}
  inputProps={{
    pattern: '^[0-9]*',
    onInput: (event) => {
      let value = event.target.value;
      value = value.replace(/\D/g, ''); 
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
      setFormData({
        ...formData,
        phone: value,
      });
    },
  }}
  required
/>
    </Grid>

    <Grid item xs={12} sm={4} md={4} lg={4}>
    <TextField
        sx={{width:'100%', mt:'10px'}}
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        inputProps={{ maxLength: 126 }}
        onChange={handleChange}
        required
      />
    </Grid>

    <Grid item xs={12} sm={4} md={4} lg={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
          sx={{width:'100%', mt:'10px'}}
          label="Date of Birth"
          format="YYYY/MM/DD"
          shouldDisableDate={shouldDisableDate}
          onChange={handleDateChange}
          slotProps={{
            field: { clearable: true, onClear: () => setCleared(true) },
          }}

          />
          </LocalizationProvider>
    </Grid>

    <Grid item xs={12} sm={4} md={4} lg={4}>
    <FormControl sx={{width:'100%', mt:'10px'}} fullWidth>
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
    <MenuItem value={'Others'}>Others</MenuItem>
  </Select>
</FormControl>
    </Grid>

    <Grid item xs={12} sm={6} md={6} lg={6}>
    <FormControl sx={{width:'100%', mt:'10px'}} required>
        <InputLabel htmlFor="state">State</InputLabel>
        <Select
          label="State"
          name="state"
          value={formData.state.id || ''}
          onChange={handleChange}
          required
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '150px',
              },
            },
          }}
        >
          {states.map((state) => (
            <MenuItem key={state.id} value={state.id}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12} sm={6} md={6} lg={6}>
    <FormControl sx={{width:'100%', mt:'10px'}} required>
        <InputLabel htmlFor="city">City</InputLabel>
        <Select
          label="City"
          name="city"
          value={formData.city.id || ''}
          onChange={handleChange}
          required
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '150px',
              },
            },
          }}
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
    </Grid>

    <Grid item xs={12} sm={6} md={6} lg={6}>
    <TextField
 sx={{width:'100%', mt:'10px'}}
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
    </Grid>

    <Grid item xs={12} sm={6} md={6} lg={6}>
    <TextField
 sx={{width:'100%', mt:'10px'}}
  label="Government ID"
  value={formData.govtId}
  onChange={handleChangeGovernmentId}
  inputProps={{ maxLength: governmentIdType === 'Aadhar Card' ? 12 : 10 }}
  fullWidth
  required
  error={Boolean(error)}
  helperText={error || warning}
  
/>
    </Grid>

    <Grid item xs={12} sm={4} md={4} lg={4}>
    <FormControl sx={{width:'100%', mt:'10px'}} required>
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
    </Grid>

    <Grid item xs={12} sm={4} md={4} lg={4}>
    {/* <FormControl sx={{width:'100%', mt:'10px'}} required>
        <InputLabel htmlFor="company">Company</InputLabel>
        <Select
          label="company"
          name="company"
          value={formData.company.id || ''}
          onChange={handleChange}
          disabled={loggedUserRole !== 'SUPERADMIN'}
          required
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '150px',
                maxWidth:'150px'
              },
            },
          }}
        >
          {companies.map((company) => (
            <MenuItem key={company.id} value={company.id}>
              {company.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}


<FormControl sx={{ width: '100%', mt: '10px' }} required>
  {loggedUserRole === 'SUPERADMIN' ? (
    
    <>
    <InputLabel htmlFor="company">Company</InputLabel>
    <Select
      label="company"
      name="company"
      value={formData.company.id || ''}
      onChange={handleChange}
      // disabled={loggedUserRole !== 'SUPERADMIN'}
      required
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: '150px',
            maxWidth: '150px',
          },
        },
      }}
    >
      {companies.map((company) => (
        <MenuItem key={company.id} value={company.id}>
          {company.name}
        </MenuItem>
      ))}
    </Select>
    </>
  ) : (
    <TextField
      label="company"
      value={companyName}
      // onChange={handleChange}
      aria-readonly
    />
  )}
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
    </Grid>

    <Grid item xs={12} sm={4} md={4} lg={4}>
    <TextField
        sx={{width:'100%', mt:'10px'}}
        label="PIN Code"
        name="pincode"
        value={formData.pincode}
        inputProps={{
          pattern: '^[0-9]*',
          onInput: (event) => {
            let value = event.target.value;
            value = value.replace(/\D/g, ''); 
            if (value.length > 6) {
              value = value.slice(0, 6);
            }
            setFormData({
              ...formData,
              pincode: value,
            });
          },
        }}
        required
      />
    </Grid>

    </Grid>
{/* <Box sx={{display:'flex', flexDirection:'row', gap:'3em', width:'100%'}}>
</Box > */}

<Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', mt:'3em'}}>

<Button  variant="contained" color="secondary" sx={{width:'9em', height:'44px',mb:'2em'}} onClick={() =>closeDialog()}>
        Cancel
      </Button>


      <Button type="submit" variant="contained" color="primary" sx={{width:'9em', height:'44px', mb:'2em' }}>
        Submit
      </Button>
</Box>
    </form>
</>
  );
}

export default UserForm;
