import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const initialUserFullName = {
    userName: "",
    userLastname: "",
  };

  const [userFullName, setUserFullName] = useState(initialUserFullName);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://www.mockachino.com/06c67c77-18c4-45/login")
        .then((response) => {
          const { name, lastname } = response.data;
          setUserFullName({ userName: name, userLastname: lastname });
        })
        .catch((error) => {
          console.error("Error al obtener la información del usuario:", error);
        });
    };

    fetchData();
  }, []);


  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, login, logout, userFullName }}
    >
      {children}
    </AuthContext.Provider>
  );
};
