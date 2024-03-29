
import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import MessageContainer from "../components/message/MessageContainer";
import useConversation from "../zustand/useConversation";

const Home = () => {
 const { selectedConversation } = useConversation();
console.log(selectedConversation)
  return (
    <div className="flex flex-col w-full h-screen  sm:w-[380px] sm:h-[640px] rounded-lg overflow-auto bg-slate-800 ">
      
      {!selectedConversation ? (
        <Sidebar/>
      ) : (
        <MessageContainer/>)}
    </div>    
  );
};
export default Home;


