/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

const WardsList = ({ wards }) => {
	return (
		<div>
			<ol>
				{wards.map((w) => (
					<li key={w._id}>
						<NavLink to={`/wards/${w._id}`}>{w.speciality}</NavLink>
					</li>
				))}
			</ol>
		</div>
	);
};

export default WardsList;
