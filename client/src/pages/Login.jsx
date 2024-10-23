import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex  w-full h-screen  overflow-auto bg-slate-800 justify-center">
      <div className="flex flex-col w-full p-6 shadow-md bg-gradient-to-l from-sky-950 to-slate-900 text-white pt-24 max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          <span className="text-blue-500 "> WebChat</span> Login
        </h1>

        <form className="mt-10" onSubmit={handleLogin}>
          <div>
            <label className="label mt-">
              <span className="text-base label-text font-medium">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="block w-full rounded-md border-0 p-1.5 h-10 bg-gray-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="label">
              <span className="text-base label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="block w-full rounded-md border-0 p-1.5 h-10 bg-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 mt-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={loading}
          >
            {loading ? (
              <div
                className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
            ) : (
              "Login"
            )}
          </button>

          <div>
            <Link
              to="/signup"
              className="text-sm  hover:underline text-blue-600 mt-2 inline-block"
            >
              {"Don't"} have an account?Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
