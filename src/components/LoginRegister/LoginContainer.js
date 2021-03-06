import React from "react";
import Illustration from "../assets/Illustration";

function LoginContainer({ children, onSubmit }) {
	return (
		<>
			<div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover">
				<div className="z-10 absolute top-56 left-3">
					<Illustration />
				</div>
				<div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
					<div className="text-center">
						<h2 className="mt-6 text-3xl font-bold text-gray-900">
							Welcome Back!
						</h2>
						<p className="mt-2 text-sm text-gray-600">
							Please sign in to your account
						</p>
					</div>

					<div className="flex items-center justify-center space-x-2">
						<span className="h-px w-32 bg-gray-300"></span>
					</div>
					<form className="mt-8" onSubmit={onSubmit}>
						{children}
					</form>
					<p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
						<span>Don't have an account?</span>
						<a
							href="./register"
							className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300"
						>
							Sign up
						</a>
					</p>
				</div>
			</div>
		</>
	);
}

export default LoginContainer;
