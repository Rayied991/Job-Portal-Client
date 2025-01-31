import axios from "axios";
import Lottie from "lottie-react";
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignInLottieData from "../../assets/Lottie/SignIn.json";
import AuthContext from "../../Context/AuthContext/AuthContext";
import SocialLogin from "../Shared/SocialLogin";
const SignIn = () => {
  const { SignInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log("In signin page:", location);
  const from = location.state || "/";
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log({ email, password });

    SignInUser(email, password)
      .then((result) => {
        console.log("Sign in", result.user.email);
        const user = { email: email };
        axios
          .post("https://career-portal-one.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          });
        //navigate(from);
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96">
          <Lottie animationData={SignInLottieData}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-5xl font-bold text-center">SignIn now!</h1>
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6 flex justify-center">
              <button className="btn btn-primary text-center">SignIn</button>
            </div>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
