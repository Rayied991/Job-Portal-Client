import axios from "axios";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import auth from "../../Firebase/firebase.init";
import AuthContext from "./AuthContext";

const GoogleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const SignInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const SignOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProvider);
  };
  const sendSignInLink = () => {};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      console.log("State captured", currUser?.email);
      if (currUser?.email) {
        const user = { email: currUser.email };

        axios
          .post("https://career-portal-one.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("Login token", res.data);
            setLoading(false);
          });
      } else {
        axios
          .post(
            "https://career-portal-one.vercel.app/logout",
            {},
            { withCredentials: true }
          )
          .then((res) => {
            console.log("Logout", res.data);
            setLoading(false);
          });
      }
    });
    return () => unsubscribe();
  }, []);
  const authInfo = {
    user,
    loading,
    createUser,
    SignInUser,
    SignOutUser,
    signInWithGoogle,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
