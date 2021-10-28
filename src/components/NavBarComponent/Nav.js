import React from "react";

function Nav({ children }) {
	return (
		<div className=" bg-gray-800">
			<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				<div className="relative flex items-center justify-between h-16">
					<nav className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
						{children}
					</nav>
				</div>
			</div>
		</div>
	);
}

export default Nav;
