// import React, { useContext } from 'react';
// import { Route, Navigate } from 'react-router-dom';
// // import AuthContext from './AuthContext';
// import { useAuth } from './AuthContext';

// const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
//   const { authenticated, userRole } = useContext(useAuth);

//   if (!authenticated) {
//     return <Navigate to="/" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(userRole)) {
//     return <Navigate to="*" />;
//   }

//   return <Component {...rest} />;
// };

// export default PrivateRoute;

import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import NotFound from "../components/NotFound";

const PrivateRoute = ({ element, allowedRoles, ...rest }) => {
  const { authenticated, userRole, logout } = useAuth();

  if (!authenticated) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <NotFound />;

    // alert("Unauthorisez Access !!!")
    // logout()

    //NOT IN USE STARTS

    // return <Navigate to="lost" />;

    //NOT IN USE ENDS
  }

  return element;
};

export default PrivateRoute;
