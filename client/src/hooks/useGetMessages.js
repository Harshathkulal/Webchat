import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { setAuthUser } = useAuthContext(); // Access the auth context

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`, {
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
            throw new Error(errorData.error || "Failed to fetch messages.");
          }
        } else {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        toast.error(error.message, {
          duration: 1000,
        });
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages, setAuthUser]); // Add setAuthUser as a dependency

  return { messages, loading };
};

export default useGetMessages;
