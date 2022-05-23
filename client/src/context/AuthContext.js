import { createContext, useEffect, useReducer } from "react";
import React from 'react'
import AuthReducer from "./AuthReducer";


const INITIAL_STATE = {
 user: JSON.parse(localStorage.getItem("user")) || null,
 // user: {
 //  _id: "62398e7795c96bbc5db5ea2f",
 //  username: "peter",
 //  email: "peter@gmail.com",
 //  profilePicture: "",
 //  coverPicture: "",
 //  followers: [],
 //  followings: [],
 //  isAdmin: false,
 //  description: "Hi this is Peter",
 //  city: "poland",
 //  from: "mercury",
 //  relationShip: "single"
 // },
 isFetching: false,
 error: false
}

export const AuthContext = createContext(INITIAL_STATE);

// this component will wrap the entire application, i.e in index.js
export const AuthContextProvider = ({ children }) => {
 const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

 useEffect(() => {
  localStorage.setItem("user", JSON.stringify(state.user))
 }, [state.user])

 return (
  <AuthContext.Provider value={{
   user: state.user,
   isFetching: state.isFetching,
   error: state.error,
   dispatch
  }}>
   {children}
  </AuthContext.Provider>)

};