import { useContext } from "react";
import AuthContext from "../Context/AuthContext/AuthContext";

//custom hooks
const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
