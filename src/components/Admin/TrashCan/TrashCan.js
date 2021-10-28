import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Button from "../Parts/Button";

const TrashCan = () => {
	const [menu, setMenu] = useState("TrashCans");

	if (menu === "TrashVersions") {
		return (
			<div>
				<Button label="Trash Version" />
				<Button label="Trash" />
			</div>
		);
	} else {
		return <div>Hellow</div>;
	}
};

export default TrashCan;
