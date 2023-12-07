const Config = Object.freeze({
  baseUrl: "http://192.168.12.54:8080/",
  ownerSiteLink: "https://www.rapidsofttechnologies.com/",

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
    dynamicIdCardMeetDetails: "api/meeting/meeting-details",


    //MeetTimeLine.jsx
    meetingTimeLineFetchData: "api/meeting/getbyid",
    meetingTimeLineMeetUpdate: "api/meeting/update/meeting",


    //VisitorMeetTimeLine.jsx
    visitorTimeLineFetchData: "api/meeting/getbyid",


    //BulkUserForm.jsx
    bulkUserFormSaveUpload: "api/user/excel/upload",


    //EmpDashBoard.jsx
    empDashboardFetchDashboard: "api/meeting/userdashboard",
    empDashboardFetchTimeline: "api/meeting/meetingfordashboard",


    //EmployeeSB.jsx
    employeeSBAxiosInstance: "api/user",
    employeeSbBDelete: "api/user/delete",
    employeeSBUserGetById: "api/user/getbyid",
    employeeSBAddUser: "api/user/adduser",
    employeeSBFetchData: "api/user/getall",
    employeeSBGetAllRole: "api/role/getall",
    employeeSBGetAllDept: "api/department/companyId",


    //LoginFormNK.jsx
    loginFormNKSubmit: "token",
    loginFormNKGetOtp: "api/user/getotp",
    loginFormNKSaveForgot: "api/user/forgot",



    //Profile.jsx
    profileAxiosInstance: "api/user",
    profileGetById: "api/user/getbyid",
    profilePresent: "api/user/present",
    profileAddUser: "api/user/adduser",
    profileConvertImg: "vis/upload",


    //RolesAndDepartments.jsx
    rolesAndDeptsAxiosInstance: "api/user",
    rolesAndDeptsGetAllRole: "api/role/getall",
    rolesAndDeptsGetAllDept: "api/department/companyId",
    rolesAndDeptsCreateDept: "api/department/create",
    rolesAndDeptsCreateRole: "api/add",



    //BasicTable.jsx

    roomDetailsEndPointdashboard: "api/room/getroomfordashboard/",
    // companyTable.jsx

    fetchCompanyEndPoint: "com/all",
    activeDeactiveEndPoint:"com/active",
    editEndPoint:"com/update/",
    

    // companyReg.jsx
    addCompanyEndPoint: "com/add",
    statesEndPoint: "sc/states",
    cityEndPoint:"sc/all", 
    getBuildingEndPoint:"api/building/getAll",


    //DashboardReceptionist.jsx
    RecepDashboardEndPoint:"api/meeting/paginateDashBoard",


    //EditCompanyForm.jsx
    editCompanyEndPoint:"com/get/",



    //Meetings.jsx
    getRoomEndPoint:"api/room/all",
    statusEndPoint:"vis/meetstatus",
    exportEndPoint:"api/meeting/exportdata",
    getVisitorEndPoint:"api/meeting/paginate",
    addMeetingEndPoint:"api/meeting/update/meeting",



    //ReceptionistAddRoom.jsx
    addRoomEndPoint:"api/room/save",
    updateRoomEndPoint:"api/room/update",
    isActiveRoomEndPoint:"api/room/isActive",
    roomDetailsEndPoint:"api/room/all",


    //ReceptionistCompanyScreen.jsx
    buildingEndPoint:"com/getByBuildingId",


    //ReceptionistDashboard.jsx
    statusRecepEndPoint:"vis/meetstatus",
    statusAdminEndPoint:"vis/meetstatusadmin",
    hostEndPoint:"api/user/alluser",
    roomDetailsRecepEndPoint:"api/room/all",
    addMeetingEndPoint:"api/meeting/update/meeting",
    exportRecepEndPoint:"api/meeting/exportdata",
    getVisitorRecepEndPoint:"api/meeting/paginate",
    passApiEndPoint:"api/meeting/downloadPass",







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
