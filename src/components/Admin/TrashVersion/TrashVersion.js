import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DataTable from "react-data-table-component";
import Button from "../Parts/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import "react-tabs/style/react-tabs.css";
import qs from "qs";

const TrashVersion = () => {
	const axios = require("axios");
	const qs = require("qs");
	const Swal = require("sweetalert2");

	/**
	 * Data tab
	 **/
	const [tabIndex, setTabIndex] = useState(0);

	/**
	 * Data table
	 **/
	const [data, setData] = useState([]);
	const updateTrashVersion = () => {
		setData([]);
		axios.get("/api/getAllTrashVersion").then((responses) => {
			for (let response of responses.data.data) {
				let responseFormat = {
					id: response.Id,
					versionname: response.Version_name,
					inorganicmax: response.Inorganic_max_height,
					organicmax: response.Organic_max_height,
				};
				setData((old) => [...old, responseFormat]);
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
		version: "",
		inorganicmax: "",
		organicmax: "",
	});

	const formChangeHandler = (e) => {
		const newdata = { ...formData };
		newdata[e.target.id] = e.target.value;
		setFormData(newdata);
	};

	const formSubmitter = (e) => {
		e.preventDefault();
		const submitData = {
			version_name: formData.version,
			organic_max: parseInt(formData.organicmax),
			inorganic_max: parseInt(formData.inorganicmax),
		};
		axios
			.post("/api/addTrashVersion", qs.stringify(submitData))
			.then((res) => {
				updateTrashVersion();
				setTabIndex(0);
				setFormData({
					version: "",
					inorganicmax: "",
					organicmax: "",
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

	/**
	 * Delete Version stuff
	 * */
	const [selectedRows, setSelectedRows] = useState([]);
	const [toggledClearRows, setToggledClearRows] = useState(false);
	const handleChange = (selectedItem) => {
		console.log(toggledClearRows);
		setSelectedRows(selectedItem.selectedRows);
	};

	const deleteTrashVersion = (selectedRows, callback) => {
		for (let select of selectedRows) {
			let url = "api/deleteTrashVersion/" + select.id;
			axios.delete(url);
		}
		callback();
	};

	const DeleteSelected = () => {
		if (selectedRows !== undefined && selectedRows.length > 0) {
			deleteTrashVersion(selectedRows, () => {
				setSelectedRows([]);
				Swal.fire({
					title: "Success",
					icon: "success",
					confirmButtonText: "OK",
				});
				updateTrashVersion();
				setToggledClearRows(!toggledClearRows);
			});
		} else {
			Swal.fire({
				title: "Delete failed",
				text: "Please select atleast one record",
				icon: "error",
				confirmButtonText: "OK",
			});
		}
	};

	const ClearSelected = () => {
		setSelectedRows([]);
		setToggledClearRows(!toggledClearRows);
	};

	/**
	 * Edit table stuff
	 * */
	const editVersion = (row) => {
		console.log("hellow", row);
	};

	//Data table config
	const columns = [
		{
			name: "ID",
			selector: (row) => row.id,
		},
		{
			name: "Version",
			selector: (row) => row.versionname,
		},
		{
			name: "Inorganic Max Cap",
			selector: (row) => row.inorganicmax,
		},
		{
			name: "Organic Max Cap",
			selector: (row) => row.organicmax,
		},
		{
			button: true,
			width: "56px",
			cell: (row) => (
				<Button label="Edit" handleClick={editVersion(row)} />
			),
		},
	];
	//Selected data table config
	const selectedColumns = [
		{
			name: "ID",
			selector: (row) => row.id,
		},
		{
			name: "Version",
			selector: (row) => row.versionname,
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
						<div className="flex flex-row-reverse my-4">
							<div className="space-x-4">
								<Button
									label="Clear"
									handleClick={ClearSelected}
								/>
								<Button
									label="Delete"
									handleClick={DeleteSelected}
								/>
							</div>
						</div>
						<DataTable
							title="Selected"
							columns={selectedColumns}
							data={selectedRows}
							onSelectedRowsChange={handleChange}
						/>
						<br></br>
						<DataTable
							columns={columns}
							data={data}
							selectableRows
							onSelectedRowsChange={handleChange}
							clearSelectedRows={toggledClearRows}
							pagination
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
										Version
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="version"
										type="text"
										placeholder="Version"
										onChange={(e) => formChangeHandler(e)}
										value={formData.version}
									/>
								</div>
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="text"
									>
										Anorganic Max Capacity
									</label>
									<input
										id="inorganicmax"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="number"
										value={formData.inorganicmax}
										onChange={(e) => formChangeHandler(e)}
									/>
								</div>
								<div className="mb-6">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="text"
									>
										Organic Max Capacity
									</label>
									<input
										id="organicmax"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="number"
										value={formData.organicmax}
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
