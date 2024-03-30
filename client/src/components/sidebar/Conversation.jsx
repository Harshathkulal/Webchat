import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-black p-2 py-1 cursor-pointer ${
          isSelected ? "bg-black" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={` relative `}>
          <div className="w-12 h-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
            <span
              className={`top-0 left-8 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full ${
                isOnline ? "" : "hidden"
              }`}
            ></span>
          </div>
        </div>

        <div className="flex flex-col flex-1 text-white truncate">
          <div className="flex gap-3 justify-between">
            <p className="truncate">{conversation.fullName}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Conversation;
