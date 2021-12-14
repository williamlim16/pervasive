import React from "react";

function WelcomePage() {
	return (
		<div className="grid grid-cols-2">
			<div>
				<h1 className="font-medium text-6xl">
					Data to enrich your recylcing experience
				</h1>
			</div>
			<div>
				<img src="./assets/recycle.jpg" alt="" />
			</div>
		</div>
	);
}

export default WelcomePage;
