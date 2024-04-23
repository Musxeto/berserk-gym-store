import React, { createContext, useState, useEffect, useContext } from "react";
import {
  auth,
  signIn,
  logout,
  updateUserProfile,
  sendPassResetEmail,
} from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    logout,
    signIn,
    updateUserProfile,
    sendPassResetEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
