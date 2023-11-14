import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(!!sessionStorage.getItem('token'));
  const [userRole, setUserRole] = useState(Cookies.get('userRole') || '');
  const [addLimit, setAddLimit] = useState(sessionStorage.getItem('limit') || '');
  const [currEmpLength, setCurrEmpLength] = useState(sessionStorage.getItem('currEmpLength') || '');
  const [isLimitReached, setIsLimitReached] = useState(false)
  const [ isNavBar, setIsNavBar ] = useState(false)
  const [ isSideBar, setIsSideBar ] = useState(false)

  // console.log("Parent call", isNavBar)


  // useEffect(() => {
  //   // Check if addLimit is not null and currEmpLength is less than addLimit
  //   if (
  //      parseInt(currEmpLength, 10) < parseInt(addLimit, 10)) {
  //     setIsLimitReached(false);
  //   } else {
  //     setIsLimitReached(true);
  //   }
  // }, [addLimit, currEmpLength]);

  useEffect(() => {
    if (addLimit !== null) {
      // Check if currEmpLength is less than addLimit
      if (parseInt(currEmpLength, 10) >= parseInt(addLimit, 10)) {
        setIsLimitReached(true);
      } else {
        setIsLimitReached(false);
      }
    }
  }, [addLimit, currEmpLength]);

  
  
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
        Cookies.set('userRole', role);
      }
    }
  }, []);

  const setUserRoleAndAuth = (role) => {
    setUserRole(role);
    Cookies.set('userRole', role);
    setAuthenticated(true);
  };

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

    localStorage.removeItem('token');
    localStorage.removeItem('adminId')
    localStorage.removeItem('companyId')

  };

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, userRole, setUserRoleAndAuth, logout, isLimitReached, isNavBar, setIsNavBar, isSideBar, setIsSideBar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
