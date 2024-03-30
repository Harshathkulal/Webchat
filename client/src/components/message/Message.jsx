import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "flex-row-reverse" : "";

  const bubbleBgColor = fromMe
    ? "bg-teal-800 p-2 rounded-s-xl rounded-ee-xl"
    : "bg-gray-700 rounded-e-xl rounded-es-xl";

  return (
    <div className={`flex p-1 ${chatClassName}`}>
      <div
        className={`flex p-2 flex-col ${bubbleBgColor}`}
        style={{ maxWidth: "90%", wordWrap: "break-word" }}
      >
        <p
          className={`text-sm font-normal  dark:text-white`}
          style={{ overflowWrap: "break-word" }}
        >
          {message.message}
        </p>
        <div className="grid place-items-end">
          <div className="opacity-50 text-xs flex gap-1 items-end">
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Message;
