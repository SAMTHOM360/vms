const Config = Object.freeze({
    baseUrl: "http://192.168.12.54:8080/",
    ownerSiteLink:"https://www.rapidsofttechnologies.com/", 
  
    apiEndPoints: {
    //    buildingEndPoint:"com/getByBuildingId",


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



    },
  });
  
  export default Config;
  