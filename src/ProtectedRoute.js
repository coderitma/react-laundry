import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoutes = ({ component }) => {
  const isAuthenticated = useState(localStorage.getItem("isAuthenticated"))

  return isAuthenticated
    ? {component}
    : <Navigate to="/login" />;

    
}

export default ProtectedRoutes