import Sidebar from "../components/sidebar/Sidebar";
import MessageContainer from "../components/message/MessageContainer";
import useConversation from "../zustand/useConversation";

const Home = () => {
  const { selectedConversation } = useConversation();
  return (
    <div className="flex flex-col w-full h-screen overflow-auto bg-slate-800 ">
      {!selectedConversation ? <Sidebar /> : <MessageContainer />}
    </div>
  );
};
export default Home;
