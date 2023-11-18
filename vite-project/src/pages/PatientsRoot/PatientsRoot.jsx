/** @format */

import React from "react";
import { Outlet } from "react-router-dom";

const PatientsRoot = () => {
	return (
		<div>
			<Outlet />
		</div>
	);
};

export default PatientsRoot;
