import React from "react";
import {Navigate} from 'react-router-dom'

export function PrivateRoute({ children }) {
    const auth = localStorage.getItem("authToken");
    return auth ? (
      children
    ) : (
      <Navigate to={"/"} />
    );
  }
  
 
  export function PublicRoute({ children }) {
    const auth = localStorage.getItem("authToken");
  
    return auth ? <Navigate to="/dashboard" /> : children;
  }