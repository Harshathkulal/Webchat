import MessageContainer from "../components/message/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";

const Home = () => {
  // State to manage navigation
  const [showMessageContainer, setShowMessageContainer] = useState(false);

  // Handler function to toggle the message container visibility
  const toggleMessageContainer = () => {
    setShowMessageContainer(!showMessageContainer);
  };

  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      {/* Pass the toggle function as a prop to Sidebar */}
      <Sidebar toggleMessageContainer={toggleMessageContainer} />
      
      {/* Conditionally render MessageContainer based on the state */}
      {showMessageContainer && <MessageContainer />}
    </div>
  );
};

export default Home;