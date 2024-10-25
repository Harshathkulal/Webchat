import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router for navigation

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include", // Ensure cookies are sent
      });

      if (!res.ok) {
        // Handle server errors
        const errorData = await res.json();
        throw new Error(errorData.error || "Login failed, please try again.");
      }

      const data = await res.json();
      setAuthUser(data); // Set user info in context or local storage
      localStorage.setItem("chat-user", JSON.stringify(data)); // Store in local storage
      toast.success("Login successful!", { duration: 1000 });
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.", { duration: 1000 });
    } finally {
      setLoading(false);
    }
  };

  const handleUnauthorized = () => {
    setAuthUser(null); // Clear auth context
    localStorage.removeItem("chat-user"); // Clear local storage
    navigate("/login"); // Redirect to login
  };

  return { loading, login, handleUnauthorized };
};

export default useLogin;

// Input validation function
function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields", { duration: 1000 });
    return false;
  }
  return true;
}
