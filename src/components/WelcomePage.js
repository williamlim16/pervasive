import React from "react";
import TopTrashCanList from "./TopTrashCanList";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAPI } from "../context/ApiContext";

function WelcomePage() {
	//Axios
	const [topTrashCans, setTopTrashCans] = useState([]);
	const { fetchTopTrashCans } = useAPI();

	useEffect(() => {
		async function fetchData() {
			const result = await fetchTopTrashCans();
			setTopTrashCans(result.data);
		}
		fetchData();
	}, []);
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
