import React from "react";
import { useState } from "react";
import Card from "../components/Dashoard/Card";

const Dashboard = () => {
	return (
		<div className="bg-dark-blue h-screen pt-10">
			<div className="grid grid-cols-2 mx-16 h-full gap-5">
				<Card />
				<Card />
				<div className="col-span-2">
					<Card />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
