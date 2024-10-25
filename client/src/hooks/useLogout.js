import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useCookies } from "react-cookie"; // Import useCookies
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const [ setCookie] = useCookies(["jwt"]); // Set up cookies
  const navigate = useNavigate(); // Get the navigate function

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Clear user data and JWT
      localStorage.removeItem("chat-user"); // Clear user from localStorage
      setCookie("jwt", "", { path: '/' }); // Clear the JWT cookie

      toast.success("Logout successful!", {
        duration: 1000,
      });
      setAuthUser(null); // Clear authUser in context
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      toast.error(error.message, {
        duration: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;

