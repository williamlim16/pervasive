import React from "react";

function SubmitButton() {
	return (
		<div>
			<button
				type="submit"
				className="w-3/4 mr-auto ml-auto flex justify-center bg-dark-blue text-gray-100 p-4  rounded-full tracking-wide
                    font-semibold  focus: outline-none focus: shadow-outline hover:bg-light-blue shadow-lg cursor-pointer transition ease-in duration-300"
			>
				Sign in
			</button>
		</div>
	);
}

export default SubmitButton;
