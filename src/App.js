// PRIMARY STARTS

// import { Routes, Route, Navigate } from 'react-router-dom';
// import { CssBaseline, Box } from '@mui/material';
// import LoginForm from './components/LoginFormNK'; // Nikhil
// import Employee from './components/EmployeeSB'; // Sandeep
// import UserForm from './components/UserFormSB'; // Sandeep
// // import Dashboard from './components/Dashboard';
// import { useAuth } from './routes/AuthContext';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import NotFound from './components/NotFound';
// import Loader from './components/Loader';

// import CompanyReg from './components/company/CompanyReg';
// import CompanyTable from './components/company/CompanyTable';
// import EditCompanyForm from './components/company/EditCompanyForm';
// import Dashboardd from './components/company/Dashboardd';
// import ReceptionistDashboard from './components/company/ReceptionistDashboard';

// import DashboardReceptionist from './components/company/DashboardReceptionist';
// import MeetingDetails from './components/company/MeetingDetails';
// import EmpDashboard from './components/EmpDashboard';
// import MeetingNotices from './components/MeetingNotices';
// import Dashboard from './components/Dashboard';
// import EmpMeeting from './components/EmpMeeting';
// import Profile from './components/Profile';
// // import ExcelUpload from './components/experimentals/ExcelUpload';
// import FileDropArea from './components/experimentals/FileDropArea';
// import PrivateRoute from './routes/PrivateRoute';

// import DynamicIdCard from './components/experimentals/DynamicIdCard';
// import UpdateDialogue from './components/unused/UpdateDialogue';
// // import BulkUserForm from './components/BulkUserForm';

// function App() {

//   return (
//     <>
//       <CssBaseline />
//       <Box className="App">
//         <Box className="content">
// <Routes>
// <Route path="/" element={<LoginForm />} />
// <Route path ="/demoland" element={<UpdateDialogue />} />
// {/* <Route path ="/vertical" element={<BulkUserForm />} /> */}
// <Route path="*" element={<NotFound />} />
// <Route path="/filedrop" element={<FileDropArea />} />
// <Route path="/dynamicidcard/:id" element={<DynamicIdCard />} />
// {/* <Route path="/loader" element={<Loader />} /> */}
// {/* <Route path="/empdashboard" element={<EmpDashboard />} /> */}
// {/* <Route path="/profile" element={<Profile />} /> */}
// {/* <Route path="/userform" element={<UserForm />} /> */}
// {/* <Route path="/empmeeting" element={<EmpMeeting />} /> */}
// {/* <Route path="/meetingDetails" element={<MeetingDetails />} /> */}
// {/* <Route path="/dashboardreceptionist" element={<DashboardReceptionist />} /> */}
// {/* <Route path="/receptionistdashboard" element={<ReceptionistDashboard />} /> */}
// {/* <Route path="/dashboard" element={<Dashboardd />} /> */}
// {/* <Route path="/companyDetails" element={<CompanyTable />} /> */}
// {/* <Route path="/companyreg" element={<CompanyReg />} /> */}
// {/* <Route path="/employee" element={<Employee />} /> */}
// {/* <Route path="/excelupload" element={<ExcelUpload />} /> */}

//   {/* <Route path="/userform" element={<PrivateRoute element={<UserForm />} allowedRoles={['SUPERADMIN','ADMIN']} />} /> */}
//   <Route path="/employee" element={<PrivateRoute element={<Employee />} allowedRoles={['SUPERADMIN','ADMIN']} />} />
//   {/* <Route path="/meetingupdates" element={<PrivateRoute element={<MeetingNotices />} allowedRoles={['EMPLOYEE']} />} /> */}

//   <Route path="/companyreg" element={<PrivateRoute element={<CompanyReg />} allowedRoles={['SUPERADMIN']} />} />
//   <Route path="/companyDetails" element={<PrivateRoute element={<CompanyTable />} allowedRoles={['SUPERADMIN']} />}/>
//   <Route path="/edit/:companyId" element={<PrivateRoute element={<EditCompanyForm />} allowedRoles={['SUPERADMIN']} />} />
//   <Route path="/dashboard" element={<PrivateRoute element={<Dashboardd />} allowedRoles={['ADMIN', 'EMPLOYEE']} />} />
//   <Route path="/receptionistdashboard" element={<PrivateRoute element={<ReceptionistDashboard />} allowedRoles={['RECEPTIONIST']} />} />

//   {/* mycode */}
//   <Route path="/dashboardreceptionist" element={<PrivateRoute element={<DashboardReceptionist/>} allowedRoles={['RECEPTIONIST']} />} />

//   <Route path="/meetingDetails" element={<PrivateRoute element={<MeetingDetails />} allowedRoles={['RECEPTIONIST']} />} />
//   <Route path="/empmeeting" element={<PrivateRoute element={<EmpMeeting />} allowedRoles={['EMPLOYEE']} />} />

//   <Route path="/userform" element={<PrivateRoute element={<UserForm />} allowedRoles={['ADMIN','SUPERADMIN']} />} />
//   <Route path="/empdashboard" element={<PrivateRoute element={<EmpDashboard />} allowedRoles={['EMPLOYEE','ADMIN']} />} />

//   <Route path="/profile" element={<PrivateRoute element={<Profile />} allowedRoles={['EMPLOYEE','RECEPTIONIST', 'ADMIN']} />} />

// </Routes>

//         </Box>
//         <ToastContainer
//           position="top-right"
//           autoClose={4000}
//           hideProgressBar={false}
//           newestOnTop
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />
//       </Box>
//     </>
//   );
// }

// export default App;

//PRIMARY ENDS

// import React, { lazy, Suspense, useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { CssBaseline, Box } from '@mui/material';
// import { useAuth } from './routes/AuthContext';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import NotFound from './components/NotFound';
// import Loader from './components/Loader';
// import Navbar from './global/Navbar';
// import Sidebar from './global/Sidebar';
// import Grid from '@mui/material/Grid';
// // import LoginForm from './components/LoginFormNK'

// const LoginForm = lazy(() => import('./components/LoginFormNK'));
// const Employee = lazy(() => import('./components/EmployeeSB'));
// const UserForm = lazy(() => import('./components/UserFormSB'));
// const CompanyReg = lazy(() => import('./components/company/CompanyReg'));
// const CompanyTable = lazy(() => import('./components/company/CompanyTable'));
// const EditCompanyForm = lazy(() => import('./components/company/EditCompanyForm'));
// const Dashboardd = lazy(() => import('./components/company/Dashboardd'));
// const ReceptionistDashboard = lazy(() => import('./components/company/ReceptionistDashboard'));
// const DashboardReceptionist = lazy(() => import('./components/company/DashboardReceptionist'));
// const MeetingDetails = lazy(() => import('./components/company/MeetingDetails'));
// const EmpDashboard = lazy(() => import('./components/EmpDashboard'));
// const MeetingNotices = lazy(() => import('./components/MeetingNotices'));
// const Dashboard = lazy(() => import('./components/Dashboard'));
// const EmpMeeting = lazy(() => import('./components/EmpMeeting'));
// const Profile = lazy(() => import('./components/Profile'));
// const FileDropArea = lazy(() => import('./components/experimentals/FileDropArea'));

// const PrivateRoute = ({ element, allowedRoles, ...rest }) => {
//   const { authenticated, userRole } = useAuth();

//   if (!authenticated) {
//     return <Navigate to="/" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(userRole)) {
//     return <NotFound />;
//   }

//   return element;
// };

// function App() {

//   const {authenticated, isNavBar, isSideBar} = useAuth()

//   const [sidebarOpen, setSidebarOpen,] = useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };
//   return (
//     <>
//       <CssBaseline />
//       {isNavBar ? <Navbar toggleSidebar={toggleSidebar}/> : null }
//       {/* <Box className="App" sx={{display:"flex", flexGrow: 1, p: 3}}> */}
//         {isSideBar ? <Sidebar open={sidebarOpen} /> : null}
//       <Grid container spacing={2}>
//   <Grid item xs={12} md={12} lg={12}>
//           <Suspense fallback={<Loader />}>
//             <Routes>
//             <Route path="/" element={<LoginForm />} />
//           <Route path="*" element={<NotFound />} />
//           <Route path="/filedrop" element={<FileDropArea />} />
//           {/* <Route path="/loader" element={<Loader />} /> */}
//           {/* <Route path="/empdashboard" element={<EmpDashboard />} /> */}
//           {/* <Route path="/profile" element={<Profile />} /> */}
//           {/* <Route path="/userform" element={<UserForm />} /> */}
//           {/* <Route path="/empmeeting" element={<EmpMeeting />} /> */}
//           {/* <Route path="/meetingDetails" element={<MeetingDetails />} /> */}
//           {/* <Route path="/dashboardreceptionist" element={<DashboardReceptionist />} /> */}
//           {/* <Route path="/receptionistdashboard" element={<ReceptionistDashboard />} /> */}
//           {/* <Route path="/dashboard" element={<Dashboardd />} /> */}
//           {/* <Route path="/companyDetails" element={<CompanyTable />} /> */}
//           {/* <Route path="/companyreg" element={<CompanyReg />} /> */}
//           <Route path="/employee" element={<Employee />} />
//           {/* <Route path="/excelupload" element={<ExcelUpload />} /> */}

//             {/* <Route path="/userform" element={<PrivateRoute element={<UserForm />} allowedRoles={['SUPERADMIN','ADMIN']} />} /> */}
//             {/* <Route path="/meetingupdates" element={<PrivateRoute element={<MeetingNotices />} allowedRoles={['EMPLOYEE']} />} /> */}

//             {/* <Route path="/employee" element={<PrivateRoute element={<Employee />} allowedRoles={['SUPERADMIN','ADMIN']} />} /> */}
//             <Route path="/companyreg" element={<PrivateRoute element={<CompanyReg />} allowedRoles={['SUPERADMIN']} />} />
//             <Route path="/companyDetails" element={<PrivateRoute element={<CompanyTable />} allowedRoles={['SUPERADMIN']} />}/>
//             <Route path="/edit/:companyId" element={<PrivateRoute element={<EditCompanyForm />} allowedRoles={['SUPERADMIN']} />} />
//             <Route path="/dashboard" element={<PrivateRoute element={<Dashboardd />} allowedRoles={['SUPERADMIN','ADMIN']} />} />
//             <Route path="/receptionistdashboard" element={<PrivateRoute element={<ReceptionistDashboard />} allowedRoles={['RECEPTIONIST']} />} />

//             {/* mycode */}
//             <Route path="/dashboardreceptionist" element={<PrivateRoute element={<DashboardReceptionist/>} allowedRoles={['RECEPTIONIST']} />} />

//             <Route path="/meetingDetails" element={<PrivateRoute element={<MeetingDetails />} allowedRoles={['RECEPTIONIST']} />} />
//             <Route path="/empmeeting" element={<PrivateRoute element={<EmpMeeting />} allowedRoles={['EMPLOYEE']} />} />

//             <Route path="/userform" element={<PrivateRoute element={<UserForm />} allowedRoles={['ADMIN','SUPERADMIN']} />} />
//             <Route path="/empdashboard" element={<PrivateRoute element={<EmpDashboard />} allowedRoles={['EMPLOYEE','ADMIN']} />} />

//             <Route path="/profile" element={<PrivateRoute element={<Profile />} allowedRoles={['EMPLOYEE','RECEPTIONIST', 'ADMIN']} />} />

//             </Routes>
//           </Suspense>
//           </Grid>
//           </Grid>
//       {/* </Box> */}
//         <ToastContainer
//           position="top-right"
//           autoClose={4000}
//           hideProgressBar={false}
//           newestOnTop
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />
//     </>
//   );
// }

// export default App;




import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import LoginForm from './components/LoginFormNK'; // Nikhil
import Employee from './components/EmployeeSB'; // Sandeep
import UserForm from './components/UserFormSB'; // Sandeep
import { useAuth } from './routes/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NotFound from './components/NotFound';
import Loader from './components/Loader';

import CompanyReg from './components/company/CompanyReg';
import CompanyTable from './components/company/CompanyTable';
import EditCompanyForm from './components/company/EditCompanyForm';
import Dashboardd from './components/company/Dashboardd';
import ReceptionistDashboard from './components/company/ReceptionistDashboard';

import DashboardReceptionist from './components/company/DashboardReceptionist';
import MeetingDetails from './components/company/MeetingDetails';
import EmpDashboard from './components/EmpDashboard';
import MeetingNotices from './components/unused/MeetingNotices';

import EmpMeeting from './components/EmpMeeting';
import Profile from './components/Profile';
// import ExcelUpload from './components/experimentals/ExcelUpload';
import PrivateRoute from './routes/PrivateRoute';

import DynamicIdCard from './components/experimentals/DynamicIdCard';
import Navbar from './global/Navbar';

import Sidebar from './global/Sidebar';
import DemoDashboardV2 from './components/experimentals/DemoDashboardV2';
import BulkUserForm from './components/BulkUserForm';

// import BulkUserForm from './components/BulkUserForm';

function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentPath = window.location.pathname;
  const shouldShowSidebar = !["/", "/dynamicidcard/:id", "/lost"].includes(currentPath);

  const isExcludedRoute = ['/', '/dynamicidcard/:id', '/lost'].some(route => location.pathname === route);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <CssBaseline />
      

      {shouldShowSidebar && <Navbar toggleSidebar={toggleSidebar} /> }
      <Box
      // className='app'
      sx={{
         display: "flex", // Comment it for overlay Sidebar
        //  display:'',  // Uncomment for overlay Sidebar
         flexGrow: 1, 
        //  p: 3, 
        //  pl:'5em',    // Uncomment for overlay Sidebar
        bgcolor:'green',
        // width:'100vw',
        // height:'auto'
         }}>

{shouldShowSidebar && <Sidebar open={sidebarOpen} /> }
<Routes>
<Route path="/" element={<LoginForm />} />
{/* <Route path ="/vertical" element={<BulkUserForm />} /> */}
<Route path="*" element={<Navigate to="/lost" />} />
              <Route path="/lost" element={<NotFound />} />
<Route path="/dynamicidcard/:id" element={<DynamicIdCard />} />
{/* <Route path="/loader" element={<Loader />} /> */}
{/* <Route path="/empdashboard" element={<EmpDashboard />} /> */}
<Route path="/profile" element={<Profile />} />
<Route path="/userform" element={<UserForm />} />
{/* <Route path="/empmeeting" element={<EmpMeeting />} /> */}
<Route path="/meetingDetails" element={<MeetingDetails />} />
<Route path="/dashboardreceptionist" element={<DashboardReceptionist />} />
<Route path="/receptionistdashboard" element={<ReceptionistDashboard />} />
<Route path="/dashboard" element={<Dashboardd />} />
<Route path="/companyDetails" element={<CompanyTable />} />
<Route path="/companyreg" element={<CompanyReg />} />
<Route path="/employee" element={<Employee />} />
{/* <Route path="/excelupload" element={<ExcelUpload />} /> */}
<Route path='/demodashboard' element={<DemoDashboardV2 />} />
<Route path='/bulkform' element={<BulkUserForm />} />

  {/* <Route path="/userform" element={<PrivateRoute element={<UserForm />} allowedRoles={['SUPERADMIN','ADMIN']} />} /> */}
  {/* <Route path="/employee" element={<PrivateRoute element={<Employee />} allowedRoles={['SUPERADMIN','ADMIN']} />} /> */}
  {/* <Route path="/meetingupdates" element={<PrivateRoute element={<MeetingNotices />} allowedRoles={['EMPLOYEE']} />} /> */}

  {/* <Route path="/companyreg" element={<PrivateRoute element={<CompanyReg />} allowedRoles={['SUPERADMIN']} />} /> */}
  {/* <Route path="/companyDetails" element={<PrivateRoute element={<CompanyTable />} allowedRoles={['SUPERADMIN']} />}/> */}
  <Route path="/edit/:companyId" element={<PrivateRoute element={<EditCompanyForm />} allowedRoles={['SUPERADMIN']} />} />
  {/* <Route path="/dashboard" element={<PrivateRoute element={<Dashboardd />} allowedRoles={['ADMIN', 'EMPLOYEE']} />} /> */}
  {/* <Route path="/receptionistdashboard" element={<PrivateRoute element={<ReceptionistDashboard />} allowedRoles={['RECEPTIONIST']} />} /> */}

  {/* mycode */}
  {/* <Route path="/dashboardreceptionist" element={<PrivateRoute element={<DashboardReceptionist/>} allowedRoles={['RECEPTIONIST']} />} /> */}

  {/* <Route path="/meetingDetails" element={<PrivateRoute element={<MeetingDetails />} allowedRoles={['RECEPTIONIST']} />} /> */}
  <Route path="/empmeeting" element={<PrivateRoute element={<EmpMeeting />} allowedRoles={['EMPLOYEE']} />} />

  <Route path="/userform" element={<PrivateRoute element={<UserForm />} allowedRoles={['ADMIN','SUPERADMIN']} />} />
  <Route path="/empdashboard" element={<PrivateRoute element={<EmpDashboard />} allowedRoles={['EMPLOYEE','ADMIN']} />} />

  {/* <Route path="/profile" element={<PrivateRoute element={<Profile />} allowedRoles={['EMPLOYEE','RECEPTIONIST', 'ADMIN']} />} /> */}

</Routes>

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