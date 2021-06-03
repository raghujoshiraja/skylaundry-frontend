import React, { createContext, useState, useEffect } from 'react'
import axios from './axios'
import userAPI from './api/UserAPI'


export const GlobalState = createContext()

export default function DataProvider({children}) {
  const [token, setToken] = useState(false)
  const [callback, setCallback] = useState(false)

  useEffect(() => {
      const previousLogin = localStorage.getItem('previousLogin')

      if (previousLogin) {
          const refreshToken = async () => {
              const res = await axios.get('/users/refresh_token')
      
              setToken(res.data.accessToken)

              setTimeout(() => {
                  refreshToken()
              }, 10 * 60 * 1000)
          }
          refreshToken()
      }
  }, [callback])

  const refresh = () => setCallback(!callback)

  const state = {
    userAPI: userAPI(token),
    refresh
  }

  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  )
}
