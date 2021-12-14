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
			<div className="px-10">
				<div className="m-3">
					<Button label="Trash" handleClick={ChangeToTrashVersion} />
				</div>
				<div className="m-3">
					<Button
						label="Trash Version"
						handleClick={ChangeToTrashCan}
					/>
				</div>
				<TrashVersions />
			</div>
		);
	} else if (menu === "TrashVersions") {
		return (
			<div className="px-10">
				<div className="m-3">
					<Button label="Trash" handleClick={ChangeToTrashVersion} />
				</div>
				<div className="m-3">
					<Button
						label="Trash Version"
						handleClick={ChangeToTrashCan}
					/>
				</div>
				<TrashCan />
			</div>
		);
	}
};

export default DashboardAdmin;
