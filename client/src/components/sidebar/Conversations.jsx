import React from "react";
import useGetConversations from "../../hooks/useGetConversations";
import ConversationSkeleton from "../skeleton/ConversationSkeleton";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="flex flex-col overflow-auto divide-y divide-slate-600">
      {/* Render conversations */}
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {/* Conditional rendering of loading skeletons */}
      {loading &&
        [...Array(10)].map((_, idx) => <ConversationSkeleton key={idx} />)}
    </div>
  );
};

export default Conversations;
