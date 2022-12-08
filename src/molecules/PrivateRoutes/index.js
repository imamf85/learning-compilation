import React from 'react'
import { Navigate, Outlet as Dashboard } from 'react-router-dom'

const PrivateRoutes = () => {
 let auth = localStorage.getItem('Token');
 
 return (
  auth ? <Dashboard /> : <Navigate to="/login" /> 
 )
}

export default PrivateRoutes