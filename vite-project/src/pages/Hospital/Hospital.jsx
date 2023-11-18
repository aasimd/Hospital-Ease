/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchWards } from "../Wards/WardsSlice";
import { fetchPatients } from "../Patients/PatientsSlice";
import {
	getAvgLengthOfStay,
	getTopPerformingWard,
	getWardsOccupancyRate
} from "../../utils";
const Hospital = () => {
	const dispatch = useDispatch();
	const {
		wards,
		status: wardsStatus,
		error: wardsError
	} = useSelector((s) => s.wards);
	const {
		patients,
		status: patientsStatus,
		error: patientsError
	} = useSelector((s) => s.patients);

	useEffect(() => {
		if (wardsStatus === "idle") dispatch(fetchWards());
		if (patientsStatus === "idle") dispatch(fetchPatients());
	}, [wardsStatus, patientsStatus, dispatch]);
	const totalPatients = patients.length;
	const totalWards = wards.length;
	const occupancyRate = getWardsOccupancyRate(wards);
	const avgLengthOfStay = getAvgLengthOfStay(patients);
	const topPerformingWard = getTopPerformingWard(wards);
	if (wardsStatus === "loading" || patientsStatus === "loading") {
		return <h1>Loading...</h1>;
	}
	if (wardsStatus === "error" || patientsStatus === "error") {
		return <p>{wardsError ?? patientsError}</p>;
	}
	return (
		<div>
			<h1>Hospital</h1>
			<div>
				<p>
					Total Patients: <b>{totalPatients}</b>
					<br />
					Total Wards: <b>{totalWards}</b> <br />
					Wards Current Occupancy Rate: <b>{occupancyRate}%</b>
					<br />
					Average Length of Patient's Stay: <b>{avgLengthOfStay} Days</b>
					<br />
					Top Performing Ward:{" "}
					<b>
						<NavLink to={`/wards/${topPerformingWard._id}`}>
							{topPerformingWard.speciality}
						</NavLink>
					</b>
				</p>
			</div>
		</div>
	);
};

export default Hospital;
