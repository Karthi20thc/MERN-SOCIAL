import axios from "axios";
import { axiosInstance } from "./config"


export const LoginCall = async (userCredentials, dispatch) => {
 dispatch({ type: 'LOGIN_START' })
 try {
  const response = await axiosInstance.post("/auth/login", userCredentials);
  dispatch({ type: 'LOGIN_SUCCESS', payload: response.data })
 }
 catch (error) {
  dispatch({ type: 'LOGIN_FAILURE', payload: error })
 }
}