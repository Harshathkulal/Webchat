import React, { useState } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useAuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const [nav, setNav] = useState(false);
  const { authUser } = useAuthContext();

  return (
    <div className="flex flex-col">
      <div className="flex p-2 bg-slate-900 sticky top-0 z-20 justify-between text-white">
        <button onClick={() => setNav(!nav)}>
          {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
        <SearchInput />
      </div>

      {nav && (
        <div className="fixed top-0 w-9/12 lg:w-64 h-full  z-30 shadow-lg bg-zinc-900 text-white">
          <div className=" flex justify-between items-center p-2 bg-slate-900">
            <div className="flex">
              <div className="w-10 h-10 rounded-full ">
                <img src={authUser.profilePic} alt="user avatar" />
              </div>
              <div className="whitespace-normal">
                <p className="p-2 font-extrabold break-all">
                  {authUser.fullName}
                </p>
              </div>
            </div>
            <button onClick={() => setNav(!nav)}>
              <AiOutlineClose size={24} />
            </button>
          </div>
          <LogoutButton />
        </div>
      )}

      <div>
        <Conversations />
      </div>
    </div>
  );
};
export default Sidebar;
