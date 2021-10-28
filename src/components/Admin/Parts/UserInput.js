import React from "react";

const UserInput = (props) => {
	return (
		<input
			id={props.idHandler}
			type={props.typeHandler}
			placeholder={props.placeholderHandler}
			value={props.valueHandler}
			onChange={(e) => props.onchangeHandler(e)}
			className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
		/>
	);
};

export default UserInput;
