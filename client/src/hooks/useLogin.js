import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        // Check if the response is not ok (network error or server error)
        const errorData = await res.json();
        throw new Error(errorData.error || "Login failed, please try again.");
      }

      const data = await res.json();
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Login successful!", {
        duration: 1000,
      });
    } catch (error) {
      // Handle any errors that occur during login
      toast.error(error.message || "An unexpected error occurred.", {
        duration: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("chat-user");
    setAuthUser(null);
    toast.success("Logout successful!", {
      duration: 1000,
    });
  };

  return { loading, login, logout }; // Return logout function
};

export default useLogin;

// Input validation function
function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields", {
      duration: 1000,
    });
    return false;
  }
  return true;
}
