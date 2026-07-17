import React from 'react';
import { Navigate } from 'react-router-dom';
import useAdminAuthStore from '../store/adminAuthStore';

const ProtectedAdminRoute = ({ children }) => {
  const { isAdminLoggedIn } = useAdminAuthStore();

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
