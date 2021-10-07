import React from "react";

const Card = () => {
	return (
		<div
			className="bg-transparent w-full h-96 bg-white bg-opacity-50 rounded-3xl"
			style="backdrop-filter: blur(20px);"
		>
			<h1 className="text-center pt-6 text-5xl text-white">
				Amazing card title
			</h1>
			<div>some amazing content chart</div>
		</div>
	);
};

export default Card;
