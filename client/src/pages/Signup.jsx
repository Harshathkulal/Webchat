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
		<div className='p-4 sm:mx-auto sm:w-full sm:max-w-sm bg-gradient-to-r from-neutral-600 to-pink-500 rounded-lg'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'>WebChat</span>
				</h1>

				<form className="mt-10" onSubmit={handleSignUp}>
					<div>
						<label className='label'>
							<span className='text-base label-text font-medium'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='block w-full rounded-md border-0 p-1.5 h-10'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					<div className="mt-2">
						<label className='label '>
							<span className='text-base label-text font-medium'>Username</span>
						</label>
						<input
							type='text'
							placeholder='johndoe'
							className='block w-full rounded-md border-0 p-1.5 h-10'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					<div className="mt-2">
						<label className='label'>
							<span className='text-base label-text font-medium'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='block w-full rounded-md border-0 p-1.5 h-10'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div className="mt-2">
						<label className='label'>
							<span className='text-base label-text font-medium'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='block w-full rounded-md border-0 p-1.5 h-10'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
						href='#'
					>
						Already have an account?Login
					</Link>

					<div>
						<button className='flex w-full justify-center rounded-md bg-indigo-600 px-3 mt-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;