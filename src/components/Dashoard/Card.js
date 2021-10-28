import React from "react";
import Chart from "./Chart";

const Card = () => {
	return (
		<div className="bg-transparent w-full h-96 bg-white bg-opacity-50 rounded-3xl backdrop-blur-lg">
			<h1 className="text-center pt-6 text-5xl text-white">
				Amazing card title
			</h1>
			<div>
				<Chart />
			</div>
		</div>
	);
};

export default Card;
