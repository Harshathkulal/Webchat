// Sidebar.js
import React, { useState } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Sidebar = ({ toggleMessageContainer, openMessageContainer }) => {
  const [navOpen, setNavOpen] = useState(false);

  // Function to toggle the navigation menu
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col bg-green-800">
      <div className="flex items-center justify-between">
        <button onClick={toggleNav}>
          {navOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
        <SearchInput />
      </div>
      <div className="divider px-3"></div>
      {/* Pass openMessageContainer function to Conversations */}
      <Conversations openMessageContainer={openMessageContainer} />

      {navOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/80 z-20">
          <div className="fixed top-0 left-0 w-[70%] h-full bg-white z-30 shadow-lg dark:bg-slate-900 dark:text-white">
            <div className="flex justify-between items-center p-4 bg-slate-100 dark:bg-black">
              <div className="flex">
                <p className="p-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-extrabold">
                  WebChat
                </p>
              </div>
              <button onClick={toggleNav}>
                <AiOutlineClose size={24} />
              </button>
            </div>
            <nav>
              <ul className="flex flex-col p-4 text-gray-800 dark:text-white font-semibold">
                <li className="py-2">
                  <LogoutButton />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

