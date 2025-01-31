import React from "react";
import { NavLink } from "react-router-dom";
import errorImage from "../../assets/error.png";
const ErrorPage = () => {
  return (
    <div>
      <img className=" mx-auto" src={errorImage}></img>
      <div className="grid grid-cols-1 text-center">
        <h2 className="m-2 text-3xl">404 Page Not Found</h2>
        <NavLink to={"/"}>
          <button className="btn btn-neutral rounded-3xl">
            Back to Home page
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
