import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// Custom hook to use the AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// Provider component
// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const user = localStorage.getItem("chat-user");
    return user ? JSON.parse(user) : null;
  });

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("chat-user");
      if (!token) {
        setAuthUser(null);
        return;
      }

      const { exp } = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      const isExpired = Date.now() >= exp * 1000; // Check if expired

      if (isExpired) {
        localStorage.removeItem("chat-user"); // Remove expired token
        setAuthUser(null); // Update context state
      }
    };

    checkTokenExpiration();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
