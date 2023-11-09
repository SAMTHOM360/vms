import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import LoginForm from './components/LoginFormNK'; // Nikhil
import Employee from './components/EmployeeSB'; // Sandeep
import UserForm from './components/UserFormSB'; // Sandeep
// import Dashboard from './components/Dashboard';
import { useAuth } from './routes/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NotFound from './components/NotFound';
import Loader from './components/Loader';

//HARSHITA STARTS
import CompanyReg from './components/company/CompanyReg';
import CompanyTable from './components/company/CompanyTable';
import EditCompanyForm from './components/company/EditCompanyForm';
import Dashboardd from './components/company/Dashboardd';
import ReceptionistDashboard from './components/company/ReceptionistDashboard';


import DashboardReceptionist from './components/company/DashboardReceptionist';
import MeetingDetails from './components/company/MeetingDetails';
import EmpDashboard from './components/EmpDashboard';
import MeetingNotices from './components/MeetingNotices';
import Dashboard from './components/Dashboard';
import EmpMeeting from './components/EmpMeeting';
import Profile from './components/Profile';
// import ExcelUpload from './components/experimentals/ExcelUpload';
import FileDropArea from './components/experimentals/FileDropArea';
// HARSHITA ENDS

const PrivateRoute = ({ element, allowedRoles, ...rest }) => {
  const { authenticated, userRole } = useAuth();

  if (!authenticated) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <NotFound />;
  }

  return element;
};

function App() {

  return (
    <>
      <CssBaseline />
      <Box className="App">
        <Box className="content">
          <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/loader" element={<Loader />} />
          {/* <Route path="/empdashboard" element={<EmpDashboard />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/userform" element={<UserForm />} /> */}
          {/* <Route path="/excelupload" element={<ExcelUpload />} /> */}
          {/* <Route path="/filedrop" element={<FileDropArea />} /> */}
          {/* <Route path="/meetingDetails" element={<MeetingDetails />} /> */}
            {/* <Route path="/userform" element={<PrivateRoute element={<UserForm />} allowedRoles={['SUPERADMIN','ADMIN']} />} /> */}
            <Route path="/employee" element={<PrivateRoute element={<Employee />} allowedRoles={['SUPERADMIN','ADMIN']} />} />
            {/* <Route path="/meetingupdates" element={<PrivateRoute element={<MeetingNotices />} allowedRoles={['EMPLOYEE']} />} /> */}

            //HARSHITA STARTS
            <Route path="/companyreg" element={<PrivateRoute element={<CompanyReg />} allowedRoles={['SUPERADMIN']} />} />
            <Route path="/companyDetails" element={<PrivateRoute element={<CompanyTable />} allowedRoles={['SUPERADMIN']} />}/>
            <Route path="/edit/:companyId" element={<PrivateRoute element={<EditCompanyForm />} allowedRoles={['SUPERADMIN']} />} />
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboardd />} allowedRoles={['SUPERADMIN','ADMIN']} />} />
            <Route path="/receptionistdashboard" element={<PrivateRoute element={<ReceptionistDashboard />} allowedRoles={['RECEPTIONIST']} />} />

            {/* mycode */}
            <Route path="/dashboardreceptionist" element={<PrivateRoute element={<DashboardReceptionist/>} allowedRoles={['RECEPTIONIST']} />} />


            <Route path="/meetingDetails" element={<PrivateRoute element={<MeetingDetails />} allowedRoles={['RECEPTIONIST']} />} />
            <Route path="/empmeeting" element={<PrivateRoute element={<EmpMeeting />} allowedRoles={['EMPLOYEE']} />} />

            <Route path="/userform" element={<PrivateRoute element={<UserForm />} allowedRoles={['ADMIN','SUPERADMIN']} />} />
            <Route path="/empdashboard" element={<PrivateRoute element={<EmpDashboard />} allowedRoles={['EMPLOYEE','ADMIN']} />} />

            <Route path="/profile" element={<PrivateRoute element={<Profile />} allowedRoles={['EMPLOYEE','RECEPTIONIST', 'ADMIN']} />} />

            //HARSHITA ENDS

          </Routes>
          
        </Box>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Box>
    </>
  );
}

export default App;












// import React, { useState } from 'react';
// import { Route, Routes, Navigate } from 'react-router-dom';
// import { Box, CssBaseline } from '@mui/material';

// import '../src/App.css'

// // import LoginForm from './components/LoginForm';  ///Smruti
// // import LoginForm from './components/LoginFormSB';    //Sandeep
// import LoginForm from './components/LoginFormNK';     //Nikhil

// // import Employee from './components/Employee';    //Smruti
// import Employee from './components/EmployeeSB';     //Sandeep

// // import UserForm from './components/UserForm';    //Smruti
// import UserForm from './components/UserFormSB';    //Sandeep

// import Dashboard from './components/Dashboard';

// import PrivateRoute from './routes/PrivateRoute';

// function App() {
//   const [authenticated, setAuthenticated] = useState(false);

//   return (
// <>
// <CssBaseline />
// {/* <Navbar /> */}
// <Box className='App'>
// {/* <Sidebar /> */}
// {/* <Box component={'main'}> */}
// <Box className='content'>
// <Routes>
//         <Route
//           path="/"
//           element={<LoginForm setAuthenticated={setAuthenticated} />}
//         />
//         <Route
//           path="/userform"
//           element={<UserForm  />}
//         />
//         <Route
//         path="/employee"
//         element={<PrivateRoute >
//         <Box className='content'>
// <Employee />
//         </Box>
//         </PrivateRoute>}
//       />
//       <Route
//         path="/dashboard"
//         element={<Dashboard  />}
//       />

//         <Route path="/" element={<Navigate to="/login" />} />
//         {/* <Route path="/employee" element={<Employee />} /> */}
        
//       </Routes>
//       {/* <Box>
//       <Headers /> 
//       </Box> */}
// </Box>
// </Box>
// </>

//   );
// }

// export default App;
