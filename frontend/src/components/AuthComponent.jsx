import React, { useContext } from 'react'
import { dataProvider } from '../context/ContextProvider'
import { Navigate, Outlet } from 'react-router-dom'

const AuthComponent = () => {
  const { isloggedin, loading } = useContext(dataProvider)

  if (loading) {
    return <div className="spinner-border text-primary" role="status"></div> // or show spinner
  }

  return isloggedin ? <Outlet /> : <Navigate to="/login" />
}

export default AuthComponent
