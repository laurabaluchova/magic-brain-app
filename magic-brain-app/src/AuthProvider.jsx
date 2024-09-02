// import React, {useContext} from 'react'

// const AuthContext = React.createContext()

// export function AuthProvider({children, value}) {
//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuthValue(){
//   return useContext(AuthContext)
// }

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./App";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registrationError, setRegistrationError] = useState({});
  const [loginError, setLoginError] = useState({});



  const createUser = async (email, password, name) => {
    try {
      if (email !== "" && password !== "" && name !== "") {
        console.log("creating user")
        setRegistrationError({})
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user; 
      const userWithName = await updateProfile(user, { displayName: name });   
      setLoading(true);
      
      return userWithName
    } else {
      console.log("not creating user")
      setRegistrationError({message: "Some inputs seem to be empty"})
      return registrationError
    }
      
    } catch (error) {      
      console.error("Error signing in: ", error);  
      setRegistrationError(error)    
    }  finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const logggedInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(true);
      setLoginError({})
      return logggedInUser;
    } catch (error) {      
      console.error("Error logging in: ", error);
      setLoginError(error)
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authValue = {
    createUser,
    user,
    loginUser,
    logOut,
    loading,
    registrationError,
    setRegistrationError,
    loginError, 
    setLoginError
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
