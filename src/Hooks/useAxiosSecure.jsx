import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "https://career-portal-one.vercel.app",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { SignOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log("api response error status:", error.status);
        if (error.status === 401 || error.status === 403) {
          SignOutUser()
            .then(() => {
              console.log("Successful Sign out");
              navigate("/signin");
            })
            .catch((error) =>
              console.log("Failed to sign out.", error.message)
            );
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosInstance;
};

export default useAxiosSecure;

/**
 * axios:get,post,put/patch,delete -->easier
 * interceptor: client--------|--------->server
 * client <---------------|------------ server
 * in the interceptor: for response == needs two function: good response,error response
 */
