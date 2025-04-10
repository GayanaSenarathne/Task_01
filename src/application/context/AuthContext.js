import React, { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../infrastructure/api/AuthAPI"; // Assuming this is your API interaction file

// Create a new context
const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  login: (credentials) => Promise.resolve(null),
  logout: () => {},
  register: (registrationData) => Promise.resolve(null),
  authLoading: false,
  authError: null,
  loginSuccess: false,
});

// Create a new provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const login = async (credentials) => {
    setAuthLoading(true);
    setAuthError(null);
    setLoginSuccess(false);
    try {
      const response = await authApi.login(credentials);
      setUser(response.data);
      setIsLoggedIn(true);
      localStorage.setItem("token", response.data.token);
      setLoginSuccess(true);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setAuthError(error.message || "Login failed");
      setLoginSuccess(false);
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    setLoginSuccess(false);
    // navigate("/login");
  };

  const register = async (registrationData) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const response = await authApi.register(registrationData);
      // navigate("/login");
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      setAuthError(error.message || "Registration failed");
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        register,
        authLoading,
        authError,
        loginSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a new custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;