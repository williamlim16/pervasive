import React, { useState, useEffect } from "react";
//Local component
import Button from "../Parts/Button";
import UserInput from "../Parts/UserInput";

//Ext library
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DataTable from "react-data-table-component";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import "react-tabs/style/react-tabs.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import qs from "qs";

const CustomLoader = () => (
	<div className="py-6">
		<ScaleLoader />
	</div>
);

const TrashVersion = () => {
	const axios = require("axios");
	const qs = require("qs");
	const Swal = require("sweetalert2");

	/**
	 * Request header config
	 * */
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
	};

	/**
	 * Data tab
	 **/
	const [tabIndex, setTabIndex] = useState(0);

	/**
	 * View version data table
	 **/
	const [pending, setPending] = useState(true);
	const [data, setData] = useState([]);
	const updateTrashVersion = () => {
		setData([]);
		axios.get("/api/getAllTrash").then((responses) => {
			console.log(responses)
			for (let response of responses.data.data) {
				let responseFormat = {
					id: response.id,
					trash_code: response.trash_code,
					user_id: response.user_id,
					location: response.location,
					trash_version_id: response.trash_version_id
				};
				setData((old) => [...old, responseFormat]);
				setPending(false);
			}
		});
	};
	useEffect(() => {
		updateTrashVersion();
	}, []);

	/**
	 * Add Version stuff
	 **/
	const [formData, setFormData] = useState({
		trash_code: "",
		trash_version_name: ""
	});

	const formChangeHandler = (e) => {
		const newdata = { ...formData };
		newdata[e.target.id] = e.target.value;
		setFormData(newdata);
	};

	const formSubmitter = (e) => {
		e.preventDefault();
		const submitData = {
			trash_code: formData.trash_code,
			trash_version_name: formData.trash_version_name,
		};
		console.log(submitData)
		axios
			.post("/api/addTrash", qs.stringify(submitData))
			.then((res) => {
				updateTrashVersion();
				setTabIndex(0);
				setFormData({
					trash_code: "",
					trash_version_name: ""
				});
				Swal.fire({
					title: "Success",
					icon: "success",
					confirmButtonText: "OK",
				});
			})
			.catch((err) => {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					confirmButtonText: "OK",
				});
			});
	};

	////Debug
	//useEffect(() => {
	//	console.log(editState);
	//}, [editState]);

	//Data table config
	const columns = [
		{
			name: "ID",
			selector: (row) => row.id,
		},
		{
			name: "Trash_code",
			selector: (row) => row.trash_code,
		},
		{
			name: "User_id",
			selector: (row) => row.user_id,
		},
		{
			name: "Location",
			selector: (row) => row.location,
		},
		{
			name: "Trash_version_id",
			selector: (row) => row.trash_version_id,
		},
	];

	return (
		<div>
			<h1 className="mt-20 text-3xl m-12">Trash Versions</h1>
			<div className="w-8/12 w-full px-12">
				<Tabs
					selectedIndex={tabIndex}
					onSelect={(index) => setTabIndex(index)}
				>
					<TabList>
						<Tab>View</Tab>
						<Tab>Add</Tab>
					</TabList>
					<TabPanel>
						<DataTable
							columns={columns}
							data={data}
							pagination
							progressPending={pending}
							progressComponent={<CustomLoader />}
						/>
					</TabPanel>
					<TabPanel>
						<div className="w-full ">
							<form
								className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
								onSubmit={(e) => formSubmitter(e)}
							>
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="text"
									>
										Trash_code
									</label>
									<input
										id="trash_code"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text"
										onChange={(e) => formChangeHandler(e)}
									/>
								</div>
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="text"
									>
										Trash_version_name
									</label>
									<input
										id="trash_version_name"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text"
										onChange={(e) => formChangeHandler(e)}
									/>
								</div>
								<div className="flex items-center justify-between">
									<Button label="Submit" />
								</div>
							</form>
						</div>
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
};

export default TrashVersion;
