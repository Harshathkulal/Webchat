import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { setAuthUser } = useAuthContext(); // Access the auth context

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users", {
          method: "GET",
          credentials: "include", // Ensure cookies are included in the request
        });

        if (!res.ok) {
          // Check if the response is not ok (e.g., 401 Unauthorized)
          const errorData = await res.json();
          if (res.status === 401) {
            setAuthUser(null); // Clear auth user if unauthorized
            toast.error("Session expired. Please log in again.", {
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
        toast.error(error.message, {
          duration: 1000,
        });
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [setAuthUser]); // Add setAuthUser as a dependency

  return { loading, conversations };
};

export default useGetConversations;
