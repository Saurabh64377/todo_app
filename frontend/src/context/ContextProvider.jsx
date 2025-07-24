import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const dataProvider = createContext(null)

const ContextProvider = ({ children }) => {
  const [isloggedin, setIsLoggedin] = useState(false)
  const [userName, setUserName] = useState('')
  const [loading, setLoading] = useState(true) // 👈 NEW: loading state

  useEffect(() => {
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('name')

    if (token) {
      setIsLoggedin(true)
      setUserName(name || '')
    } else {
      setIsLoggedin(false)
      setUserName('')
    }

    setLoading(false) // ✅ auth check complete
  }, [])

  return (
    <dataProvider.Provider value={{ isloggedin, setIsLoggedin, userName, setUserName, loading }}>
      {children}
    </dataProvider.Provider>
  )
}

export default ContextProvider
