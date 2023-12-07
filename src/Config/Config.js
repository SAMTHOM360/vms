const Config = Object.freeze({
    baseUrl: "http://192.168.12.54:8080/",
    ownerSiteLink:"https://www.rapidsofttechnologies.com/", 
  
    apiEndPoints: {
    //    buildingEndPoint:"com/getByBuildingId",


    //AppointMeetForm.jsx
    appointMeetFormFetchUsers:"api/user/alluser",
    appointMeetFormContextOptions:"vis/meetCon",
    appointMeetFormGetVisitorByPhone:"vis/getVisitorByPhone",
    appointMeetFormSubmitForm:"api/meeting/add/byuser",
    appointMeetFormGetAllCity:"api/cityByName",
    // appointMeetFormGetAllCity:"api/cityByName",
    // appointMeetFormGetAllCity:"api/cityByName",
    // appointMeetFormGetAllCity:"api/cityByName",


    //DynamicIdCard.jsx
    dynamicIdCardMeetDetails:"api/meeting/meeting-details",


    //MeetTimeLine.jsx
    meetingTimeLineFetchData:"api/meeting/getbyid",
    meetingTimeLineMeetUpdate:"api/meeting/update/meeting",


    //VisitorMeetTimeLine.jsx
    visitorTimeLineFetchData:"api/meeting/getbyid",


    //BulkUserForm.jsx
    bulkUserFormSaveUpload:"api/user/excel/upload",


    //EmpDashBoard.jsx
    empDashboardFetchDashboard:"api/meeting/userdashboard",
    empDashboardFetchTimeline:"api/meeting/meetingfordashboard",


    //EmployeeSB.jsx
    employeeSBAxiosInstance:"api/user",
    employeeSbBDelete:"api/user/delete",
    employeeSBUserGetById:"api/user/getbyid",
    employeeSBAddUser:"api/user/adduser",
    employeeSBFetchData:"api/user/getall",
    employeeSBGetAllRole:"api/role/getall",
    employeeSBGetAllDept:"api/department/companyId",


    //LoginFormNK.jsx
    loginFormNKSubmit:"token",
    loginFormNKGetOtp:"api/user/getotp",
    loginFormNKSaveForgot:"api/user/forgot",



    //Profile.jsx
    profileAxiosInstance:"api/user",
    profileGetById:"api/user/getbyid",
    profilePresent:"api/user/present",
    profileAddUser:"api/user/adduser",
    profileConvertImg:"vis/upload",


    //RolesAndDepartments.jsx
    rolesAndDeptsAxiosInstance:"api/user",
    rolesAndDeptsGetAllRole:"api/role/getall",
    rolesAndDeptsGetAllDept:"api/department/companyId",
    rolesAndDeptsCreateDept:"api/department/create",
    rolesAndDeptsCreateRole:"api/add",


    //UserFormSB.jsx
    userformSBAxiosInstance:"api/user",
    userformSBAddUser:"api/user/adduser",
    userformSBGetAllState:"api/state/all",
    userformSBGetAllCity:"api/city",
    userformSBGetAllRole:"api/role/getall",
    userformSBGetAllDept:"api/department/companyId",
    userformSBGetCompanyAll:"com/all",


    //Navbar.jsx
    navbarAxiosInstance:"api",
    navbarPendingRequest:"api/notification/pending-request",
    navbarMarkSeen:"api/notification/mark-seen",
    navbarFetchGetById:"api/user/getbyid",
    navbarChangePassword:"api/user/change",
    // navbar:"api",



    },
  });
  
  export default Config;
  