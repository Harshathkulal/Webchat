import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-teal-800 " : "bg-gray-700";

  return (
    <div className={`chat ${chatClassName}`}>
      <div
        class={`flex flex-col  p-2  rounded-e-xl rounded-es-xl whitespace-normal ${bubbleBgColor}`}
      >
        <p
          class={`text-sm font-normal py-1 dark:text-white text-wrap ${bubbleBgColor}`}
        >
          {message.message}
        </p>
		<div className="grid place-items-end">
        <div className=" opacity-50 text-xs flex gap-1 items-end">
          {formattedTime}
        </div>
		</div>
      </div>
    </div>
  );
};
export default Message;
