import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(!!sessionStorage.getItem('token'));
  // const [userRole, setUserRole] = useState(Cookies.get('userRole') || '');
  const [userRole, setUserRole] = useState(sessionStorage.getItem('loggedUserRole') || '');
  const [addLimit, setAddLimit] = useState(sessionStorage.getItem('limit') || '');
  const [currEmpLength, setCurrEmpLength] = useState(sessionStorage.getItem('currEmpLength') || '');
  const [isLimitReached, setIsLimitReached] = useState(false)
  const [ isNavBar, setIsNavBar ] = useState(false)
  const [ isSideBar, setIsSideBar ] = useState(false)
  // const [ autoStatusChange, setAutoStatusChange ] = useState(sessionStorage.getItem('autoStatusChange' || ''))
  const [ autoStatusChange, setAutoStatusChange ] = useState()
  const [ activeListItem, setActiveListItem ] = useState()
  const [ isSideBarPinned, setIsSideBarPinned ] = useState(sessionStorage.getItem('isSideBarPinned') === 'false' || false)
  const [isHoverOpen, setIsHoverOpen] = useState(sessionStorage.getItem('isHoverOpen') === 'true' || true)
  const [ bellItemChanged, setBellItemChanged ] = useState(false)
  // const [ isntComSelection, setIsntComSelection ] = useState(true)
  const [ isOpenforGridTable, setIsOpenForGridTable] = useState()
  // const [ selectedCompanyIdForNotification ,setSelectedCompanyIdForNotification] = useState(null)

  const [selectedCompanyIdForNotification, setSelectedCompanyIdForNotification] = useState(sessionStorage.getItem("CompanyIdSelected") ? JSON.parse(sessionStorage.getItem("CompanyIdSelected")).id || null : null);


  console.log("Parent call", selectedCompanyIdForNotification)


  // useEffect(() => {
  //   if (
  //      parseInt(currEmpLength, 10) < parseInt(addLimit, 10)) {
  //     setIsLimitReached(false);
  //   } else {
  //     setIsLimitReached(true);
  //   }
  // }, [addLimit, currEmpLength]);

  useEffect(() => {
    if (addLimit !== null) {
      if (parseInt(currEmpLength, 10) >= parseInt(addLimit, 10)) {
        setIsLimitReached(true);
      } else {
        setIsLimitReached(false);
      }
    }
  }, [addLimit, currEmpLength, authenticated]);

  useEffect(() => {
    setAddLimit(sessionStorage.getItem('limit'))
    setCurrEmpLength(sessionStorage.getItem('currEmpLength'))
  },[authenticated])

  // useEffect(() => {
  //   if (addLimit !== null) {
  //     if (parseInt(currEmpLength, 10) >= parseInt(addLimit, 10)) {
  //       setIsLimitReached(true);
  //     } else {
  //       setIsLimitReached(false);
  //     }
  //   }
  // }, [addLimit, currEmpLength, authenticated]);

  
  
  // console.log("currEmpLength", currEmpLength)
  // console.log("addLimit", addLimit)
  // console.log("isLimitReached", isLimitReached)



  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      setAuthenticated(false);
      setUserRole('');
    } else {
      const role = sessionStorage.getItem('loggedUserRole');
      if (role) {
        setUserRole(role);
        // Cookies.set('userRole', role); 
      }
    }


    // setAutoStatusChange((prev) => !prev);
    // setAutoStatusChange(sessionStorage.getItem('autoStatusChange'))
  }, [authenticated]);

  useEffect(() => {
    setIsSideBarPinned(sessionStorage.getItem('isSideBarPinned') === 'true')
  }, [sessionStorage.getItem('isSideBarPinned')])

  useEffect(() => {
    setIsHoverOpen(sessionStorage.getItem('isHoverOpen') === 'true')
  }, [sessionStorage.getItem('isHoverOpen')])

  const setUserRoleAndAuth = (role) => {
    setUserRole(role);
    Cookies.set('userRole', role);
    setAuthenticated(true);
  };

  // useEffect(() => {
  //   setSelectedCompanyIdForNotification((sessionStorage.getItem("CompanyIdSelected") ? JSON.parse(sessionStorage.getItem("CompanyIdSelected")).id || null : null))
  // },[sessionStorage.getItem("CompanyIdSelected")])

  // useEffect(() => {
  //   setSelectedCompanyIdForNotification(prevCompanyId => {
  //     console.log("Prev Company ID:", prevCompanyId);
  //     const newCompanyId = sessionStorage.getItem("CompanyIdSelected")
  //       ? JSON.parse(sessionStorage.getItem("CompanyIdSelected")).id || null
  //       : null;
  //     console.log("New Company ID:", newCompanyId);
  //     return newCompanyId;
  //   });
  // }, [sessionStorage.getItem("CompanyIdSelected")]);
  // useEffect(() => {
  //   setSelectedCompanyIdForNotification(companyIdFromSession);
  // }, [companyIdFromSession]);

  const logout = () => {
    setUserRole('');
    Cookies.remove('userRole');
    setAuthenticated(false);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('loggedUserRole');
    sessionStorage.removeItem('loggedUserName');
    sessionStorage.removeItem('loggedUserUsername');
    sessionStorage.removeItem('companyId')
    sessionStorage.removeItem('companyName')
    sessionStorage.removeItem('limit')
    sessionStorage.removeItem('currEmpLength')
    sessionStorage.removeItem('activeListItem')
    sessionStorage.removeItem('isSideBarPinnedValue')
    sessionStorage.removeItem('isSideBarPinned')
    sessionStorage.removeItem('isHoverOpen')
    

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('adminId')
    sessionStorage.removeItem('companyId')
    sessionStorage.removeItem('buildingId')
    sessionStorage.removeItem('selectedCompanyId')

  };

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, userRole, setUserRoleAndAuth, logout, isLimitReached, isNavBar, setIsNavBar, isSideBar, setIsSideBar, autoStatusChange, setAutoStatusChange, activeListItem, setActiveListItem, isSideBarPinned, setIsSideBarPinned, bellItemChanged, setBellItemChanged, isHoverOpen, setIsHoverOpen, isOpenforGridTable, setIsOpenForGridTable, selectedCompanyIdForNotification, setSelectedCompanyIdForNotification,}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
