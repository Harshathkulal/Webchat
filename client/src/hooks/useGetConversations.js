import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useCookies } from "react-cookie";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { authUser, setAuthUser } = useAuthContext(); // Access the auth context
  const [cookies] = useCookies(["jwt"]);
  const token = cookies.jwt;

  useEffect(() => {
    const getConversations = async () => {
      if (!authUser) return; // Prevent fetching if the user is not authenticated

      setLoading(true);
      try {
        const res = await fetch("/api/users", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add a space after Bearer
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          if (res.status === 401) {
            setAuthUser(null); // Clear auth user if unauthorized
            toast.error("Session expired. Please log in again.", {
              duration: 1000,
            });
          } else if (res.status >= 500) {
            console.error("Internal Server Error:", errorData); // Log internal server error
            setAuthUser(null); // Clear auth user on internal server error
            toast.error("An internal server error occurred. Please try again later.", {
              duration: 1000,
            });
          } else {
            throw new Error(errorData.error || "Failed to fetch conversations.");
          }
        } else {
          const data = await res.json();
          setConversations(data);
        }
      } catch (error) {
        console.error("Fetch error:", error); // Log fetch errors
        toast.error(error.message, {
          duration: 1000,
        });
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [authUser, setAuthUser, token]); // No need to add router as a dependency now

  return { loading, conversations };
};

export default useGetConversations;
