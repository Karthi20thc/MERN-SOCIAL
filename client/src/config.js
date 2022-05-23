import axios from "axios";

export const axiosInstance = axios.create({
 // baseURL: "https://nowcast-04apr2022.herokuapp.com/api"
 baseURL: "https://nowcast-social.herokuapp.com/api"
})