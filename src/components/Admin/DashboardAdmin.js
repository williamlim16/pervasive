import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import TrashVersions from "./TrashVersion/TrashVersion";
import TrashCan from "./TrashCan/TrashCan";
import Button from "./Parts/Button";

const DashboardAdmin = () => {
	const ChangeToTrashCan = () => {
		setMenu("TrashCans");
	};
	const ChangeToTrashVersion = () => {
		setMenu("TrashVersions");
	};
	const [menu, setMenu] = useState("TrashCans");

	if (menu === "TrashCans") {
		return (
			<div>
				<Button
					label="Trash Version"
					handleClick={ChangeToTrashVersion}
				/>
				<Button label="Trash" handleClick={ChangeToTrashCan} />
				<TrashVersions />
			</div>
		);
	} else if (menu === "TrashVersions") {
		return (
			<div>
				<Button
					label="Trash Version"
					handleClick={ChangeToTrashVersion}
				/>
				<Button label="Trash" handleClick={ChangeToTrashCan} />
				<TrashCan />
			</div>
		);
	}
};

export default DashboardAdmin;
