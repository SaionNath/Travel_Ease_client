import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const useAxios = () => {
  const { user } = useContext(AuthContext);

  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error:", error);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
