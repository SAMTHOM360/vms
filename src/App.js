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



import { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';



import Navbar from './global/Navbar';
import Sidebar from './global/Sidebar';
import Loader from './components/Loader';
import PrivateRoute from './routes/PrivateRoute';
import { useAuth } from './routes/AuthContext';
// import NotFound from './components/NotFound';
import DynamicMonthData from './components/unused/DynamicMonthData';
import RolesAndDepartments from './components/RolesAndDepartments';


// import ReceptionistAddRoom from './components/company/ReceptionistAddRoom';


const LoginForm = lazy(() => import('./components/LoginFormNK'));
const Employee = lazy(() => import('./components/EmployeeSB'));
const UserForm = lazy(() => import('./components/UserFormSB'));
const NotFound = lazy(() => import('./components/NotFound'));
const CompanyReg = lazy(() => import('./components/company/CompanyReg'));
const CompanyTable = lazy(() => import('./components/company/CompanyTable'));
const EditCompanyForm = lazy(() => import('./components/company/EditCompanyForm'));
const Meetings = lazy(() => import('./components/company/Meetings'));
const ReceptionistDashboard = lazy(() => import('./components/company/ReceptionistDashboard'));
const ReceptionistCompanyScreen = lazy(() => import('./components/company/ReceptionistCompanyScreen'));
const DashboardReceptionist = lazy(() => import('./components/company/DashboardReceptionist'));
const AppointMeetForm = lazy(() => import('./components/company/AppointMeetForm'));
const EmpDashboard = lazy(() => import('./components/EmpDashboard'));
const Profile = lazy(() => import('./components/Profile'));
const DynamicIdCard = lazy(() => import('./components/experimentals/DynamicIdCard'));
const BulkUserForm = lazy(() => import('./components/BulkUserForm'));
const DemoDashboardV2 = lazy(() => import('./components/experimentals/DemoDashboardV2'));
const Department = lazy(() => import('./components/experimentals/Department'));
const ReceptionistAddRoom = lazy(() => import('./components/company/ReceptionistAddRoom'));


function App() {
  const { isSideBarPinned,isHoverOpen } = useAuth()

  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // const [sidebarOpen, setSidebarOpen] = useState(sessionStorage.getItem('isHoverOpen') === 'true' || true);
  const [ navPlFix, setNavPlFix ] = useState()

  // const currentPath = window.location.pathname;
  // const shouldShowSidebar = !["/", "/dynamicidcard/:id", "/lost"].includes(currentPath);

  const isExcludedRouteForNavBar = !['/', '/lost',].some(route => location.pathname === route) && !location.pathname.includes("/dynamicidcard/");
  const isExcludedRouteForSidebar = !['/', '/lost','/receptionistcompanyscreen'].some(route => location.pathname === route) && !location.pathname.includes("/dynamicidcard/");

   const toggleSidebar = () => {
    setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
  };
  
  // console.log('sidebarOpen', sidebarOpen)



  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

  return (
    <>

      <CssBaseline />


      {isExcludedRouteForNavBar && <Navbar toggleSidebar={toggleSidebar} /> }
      <Box
      // className='app'
      sx={{
         display: isSideBarPinned ? 'flex' : '', // Comment it for unpinned Sidebar
        //  display:'',  // Uncomment for unpinned Sidebar
         flexGrow: 1, 
        //  p: 3, 
        pl: isExcludedRouteForSidebar ? isSideBarPinned ? '' : '4em' : '',
        mt: isSideBarPinned ? '' : 0
        //  pl:'4em',    // Uncomment for unpinned Sidebar
        // bgcolor:'green',
        // width:'100vw',
        // height:'auto'
         }}
         >

{isExcludedRouteForSidebar && <Sidebar open={sidebarOpen} /> }
<Suspense fallback={<Loader />}>
<Routes>
<Route path="/" element={<LoginForm />} />

{/* <Route path= '*' element={<NotFound />} /> */}

<Route path="*" element={<Navigate to="/lost" />} />
              <Route path="/lost" element={<NotFound />} />

<Route path="/dynamicidcard/:id" element={<DynamicIdCard />} />

{/* <Route path="/empdashboard" element={<EmpDashboard />} /> */}
{/* <Route path="/profile" element={<Profile />} /> */}
{/* <Route path="/userform" element={<UserForm />} /> */}
{/* <Route path="/appointmeeting" element={<AppointMeetForm />} /> */}
{/* <Route path="/dashboardreceptionist" element={<DashboardReceptionist />} /> */}
{/* <Route path="/receptionistdashboard" element={<ReceptionistDashboard />} /> */}
{/* <Route path="/meetings" element={<Meetings />} /> */}
{/* <Route path="/companyDetails" element={<CompanyTable />} /> */}
{/* <Route path="/companyreg" element={<CompanyReg />} /> */}
{/* <Route path="/employee" element={<Employee />} /> */}
{/* <Route path='/bulkform' element={<BulkUserForm />} /> */}

<Route path='/demodashboard' element={<DemoDashboardV2 />} />
<Route path='/demodept' element={<Department />} />
<Route path='/demodata' element={<DynamicMonthData />} />
<Route path='/rolesanddepts' element={<RolesAndDepartments />} />

  <Route path="/employee" element={<PrivateRoute element={<Employee />} allowedRoles={['SUPERADMIN','ADMIN']} />} />
  <Route path="/companyreg" element={<PrivateRoute element={<CompanyReg />} allowedRoles={['SUPERADMIN']} />} />
  <Route path="/companyDetails" element={<PrivateRoute element={<CompanyTable />} allowedRoles={['SUPERADMIN']} />}/>
  <Route path="/edit/:companyId" element={<PrivateRoute element={<EditCompanyForm />} allowedRoles={['SUPERADMIN']} />} />
  <Route path="/meetings" element={<PrivateRoute element={<Meetings />} allowedRoles={['ADMIN', 'EMPLOYEE','HR']} />} />
  <Route path="/receptionistdashboard" element={<PrivateRoute element={<ReceptionistDashboard />} allowedRoles={['RECEPTIONIST','ADMIN']} />} />

  <Route path="/dashboardreceptionist" element={<PrivateRoute element={<DashboardReceptionist/>} allowedRoles={['RECEPTIONIST']} />} />

  <Route path="/receptionistcompanyscreen" element={<PrivateRoute element={<ReceptionistCompanyScreen/>} allowedRoles={['RECEPTIONIST']} />} />

  {/* receptionist add room */}

  <Route path="/receptionistaddroom" element={<PrivateRoute element={<ReceptionistAddRoom/>} allowedRoles={['RECEPTIONIST']} />} />



  
  <Route path="/appointmeeting" element={<PrivateRoute element={<AppointMeetForm />} allowedRoles={['RECEPTIONIST','ADMIN','EMPLOYEE','HR']} />} />
  <Route path="/userform" element={<PrivateRoute element={<UserForm />} allowedRoles={['ADMIN','SUPERADMIN']} />} />
  <Route path="/bulkform" element={<PrivateRoute element={<BulkUserForm />} allowedRoles={['ADMIN',]} />} />
  <Route path="/empdashboard" element={<PrivateRoute element={<EmpDashboard />} allowedRoles={['EMPLOYEE','ADMIN','RECEPTIONIST','HR']} />} />
  <Route path="/profile" element={<PrivateRoute element={<Profile />} allowedRoles={['EMPLOYEE','RECEPTIONIST', 'ADMIN', 'HR']} />} />

</Routes>
</Suspense>

        <ToastContainer
          position="top-right"
          autoClose={1800}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={4}
          theme="light"
        />
      </Box>
    </>
  );
}

export default App;