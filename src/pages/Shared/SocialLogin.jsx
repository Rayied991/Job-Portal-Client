import axios from "axios";
import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import AuthContext from "../../Context/AuthContext/AuthContext";
const SocialLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log("Sign in", result.user.email);
        const user = { email: result.user.email };
        axios
          .post("https://career-portal-one.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          });
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="m-4 text-center">
      <div className="divider">OR</div>

      <button onClick={handleGoogleSignIn} className="btn">
        <FcGoogle />
        Sign in With Google
      </button>
    </div>
  );
};

export default SocialLogin;
