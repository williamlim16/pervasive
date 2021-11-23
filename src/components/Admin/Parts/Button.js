import React from "react";

const Button = (props) => {
	return (
		<button
			onClick={props.handleClick}
			className="bg-dark-blue text-gray-100 p-4 rounded-lg"
		>
			{props.label}
		</button>
	);
};

export default Button;
