import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="cursor-pointer flex m-2 mt-5" onClick={logout}>
      {!loading ? (
        <BiLogOut className="w-6 h-6 text-white " />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
      Logout
    </div>
  );
};
export default LogoutButton;
