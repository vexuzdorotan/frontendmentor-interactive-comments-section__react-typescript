import React, { createContext, useContext, useReducer } from 'react'

import IUser from '../@types/user'
import userAPI from '../shared/api/currentUser'

interface UserProviderProps {
  children: React.ReactNode
}

export const UserContext = createContext<IUser | null>(null)

export const UserProvider = ({ children }: UserProviderProps) => {
  return <UserContext.Provider value={userAPI}>{children}</UserContext.Provider>
}

export const useContextUser = () => useContext(UserContext)
