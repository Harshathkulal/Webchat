import { useState, useRef } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
    resetTextareaHeight();
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    autoAdjustTextareaHeight();
  };

  const autoAdjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  return (
    <form className="px-4 my-3 sticky bottom-0" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <textarea
          ref={textareaRef}
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white resize-none"
          placeholder="Send a message"
          value={message}
          onChange={handleInputChange}
          rows={1} // Start with one row
          style={{ minHeight: "2.5rem" }}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
