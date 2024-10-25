import { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext();

// Custom hook to use the AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

// Provider component
// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [cookies] = useCookies(["jwt"]);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("chat-user");
    const token = cookies.jwt;

    if (token) {
      // Assuming you store the user data in local storage after login
      if (user) {
        setAuthUser(JSON.parse(user)); // Set user data
      } else {
        // Optionally: handle cases where the user is not found
        setAuthUser(null);
      }
    } else {
      setAuthUser(null); // No user is logged in
    }
  }, [cookies.jwt]); 

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
