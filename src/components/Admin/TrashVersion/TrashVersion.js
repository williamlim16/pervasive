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
		axios.get("/api/getAllTrashVersion").then((responses) => {
			for (let response of responses.data.data) {
				let responseFormat = {
					id: response.Id,
					versionname: response.Version_name,
					inorganicmax: response.Inorganic_max_height,
					organicmax: response.Organic_max_height,
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
		setSelectedRows(selectedItem.selectedRows);
	};

	const deleteTrashVersion = (selectedRows, callback) => {
		for (let select of selectedRows) {
			let url = "/api/deleteTrashVersion/" + select.id;
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
	 * Edit version stuff
	 * */
	const [editState, setEditState] = useState({});
	const editHandler = (e) => {
		const newdata = { ...editState };
		newdata[e.target.id] = e.target.value;
		setEditState(newdata);
	};
	const submitEdit = () => {
		let url = "/api/editTrashVersion/" + editState.id + "/";
		const submitData = {
			version_name: editState.versionname,
			organic_max: parseInt(editState.organicmax),
			inorganic_max: parseInt(editState.inorganicmax),
		};

		axios.put(url, qs.stringify(submitData)).then((res) => {
			updateTrashVersion();
			setEditState({});
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
			name: "Version",
			selector: (row) => row.versionname,
			cell: (row) =>
				row.id === editState.id ? (
					<input
						id="versionname"
						type="text"
						defaultValue={editState.versionname}
						onChange={editHandler}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				) : (
					<p>{row.versionname}</p>
				),
		},
		{
			name: "Inorganic Max Cap",
			selector: (row) => row.inorganicmax,
			cell: (row) =>
				row.id === editState.id ? (
					<input
						id="inorganicmax"
						type="number"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						defaultValue={editState.inorganicmax}
						onChange={editHandler}
					/>
				) : (
					<p>{row.inorganicmax}</p>
				),
		},
		{
			name: "Organic Max Cap",
			selector: (row) => row.organicmax,
			cell: (row) => {
				return row.id === editState.id ? (
					<input
						id="organicmax"
						type="number"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						defaultValue={row.organicmax}
						onChange={editHandler}
					/>
				) : (
					<p>{row.organicmax}</p>
				);
			},
		},
		{
			button: true,
			width: "250px",
			cell: (row) => {
				if (row.id === editState.id) {
					return (
						<div className="grid grid-cols-2 gap-4">
							<Button label="Save" handleClick={submitEdit} />
							<Button
								label="Cancel"
								handleClick={() => {
									setEditState({});
								}}
							/>
						</div>
					);
				} else {
					return (
						<Button
							label="Edit"
							handleClick={() => {
								setEditState(row);
							}}
						/>
					);
				}
			},
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
										Version
									</label>
									<input
										id="version"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text"
										value={formData.version}
										onChange={(e) => formChangeHandler(e)}
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
