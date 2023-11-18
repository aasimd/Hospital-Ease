/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

const PatientsList = ({ patients }) => {
	return (
		<div>
			<ul>
				{patients.map((p) => (
					<li key={p._id}>
						<NavLink to={`/patients/${p._id}`}>{p.name}</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PatientsList;
