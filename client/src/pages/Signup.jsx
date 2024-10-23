import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const { loading, signup } = useSignup();

  const handleSignUp = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex  w-full h-screen   overflow-auto bg-slate-800 justify-center">
      <div className="flex flex-col w-full p-6 shadow-md  max-w-lg bg-gradient-to-l from-sky-950 to-slate-900 text-white pt-24">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          <span className="text-blue-500">WebChat</span> Sign Up
        </h1>

        <form className="mt-10" onSubmit={handleSignUp}>
          <div>
            <label className="label">
              <span className="text-base label-text font-medium">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className="block w-full rounded-md border-0 p-1.5 h-10 bg-gray-700"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div className="mt-2">
            <label className="label ">
              <span className="text-base label-text font-medium">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="block w-full rounded-md border-0 p-1.5 h-10 bg-gray-700"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div className="mt-2">
            <label className="label">
              <span className="text-base label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="block w-full rounded-md border-0 p-1.5 h-10 bg-gray-700"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div className="mt-2">
            <label className="label">
              <span className="text-base label-text font-medium">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="block w-full rounded-md border-0 p-1.5 h-10 bg-gray-700"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <Link
            to={"/login"}
            className="text-sm hover:underline text-blue-600 mt-2 inline-block"
            href="#"
          >
            Already have an account?Login
          </Link>

          <div>
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
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
