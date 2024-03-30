import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { IoArrowBack } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const clickback = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="flex flex-col flex-1 bg-gradient-to-l from-sky-950 to-slate-900 text-white">
      <div className="flex p-2 bg-slate-900 sticky top-0 z-20 justify-between items-center">
        <div className="cursor-pointer" onClick={clickback}>
          <IoArrowBack size={24} />
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-10 rounded-full">
            <img src={selectedConversation.profilePic} alt="user avatar" />
          </div>
          <p className="font-bold text-white truncate max-w-60">
            {selectedConversation.fullName}
          </p>
        </div>
        <BsThreeDotsVertical size={24} />
      </div>
      <Messages />
      <MessageInput />
    </div>
  );
};
export default MessageContainer;
