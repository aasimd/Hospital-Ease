/** @format */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
const WardForm = ({ ward, type, submitFunction, setShow }) => {
	const dispatch = useDispatch();
	const {
		mortalityRate,
		occupancy,
		patientSatisfaction,
		resourcesUtilization,
		speciality,
		wardNumber,
		capacity
	} = ward;
	const [wardDetails, setWardDetails] = useState({
		mortalityRate,
		occupancy,
		patientSatisfaction,
		resourcesUtilization,
		speciality,
		wardNumber,
		capacity
	});
	return (
		<div>
			<h3>{type === "add" ? "Add New Ward" : "Edit Ward"}</h3>
			<form
				onSubmit={(event) => {
					console.log(wardDetails);
					event.preventDefault();
					type === "add"
						? submitFunction(dispatch, wardDetails)
						: submitFunction(dispatch, wardDetails, ward._id);
					setShow(false);
				}}
			>
				<div>
					<label htmlFor="ward-number">
						Ward Number:{" "}
						<input
							min={1}
							max={20}
							type="number"
							value={wardDetails.wardNumber}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="ward-speciality">
						Speciality:{" "}
						<input
							onChange={(event) =>
								setWardDetails((p) => ({
									...p,
									speciality: event.target.value
								}))
							}
							required
							type="text"
							value={wardDetails.speciality}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="ward-capacity">
						Capacity:{" "}
						<input
							onChange={(event) =>
								setWardDetails((p) => ({ ...p, capacity: event.target.value }))
							}
							required
							type="number"
							min={0}
							value={wardDetails.capacity}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="ward-occupancy">
						Occupancy:{" "}
						<input
							onChange={(event) =>
								setWardDetails((p) => ({ ...p, occupancy: event.target.value }))
							}
							required
							type="number"
							min={0}
							value={wardDetails.occupancy}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="ward-mortalityRate">
						Mortality Rate:{" "}
						<input
							onChange={(event) =>
								setWardDetails((p) => ({
									...p,
									mortalityRate: event.target.value
								}))
							}
							required
							type="number"
							min={0}
							value={wardDetails.mortalityRate}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="ward-patientSatisfaction">
						Patient Satisfaction:{" "}
						<input
							onChange={(event) =>
								setWardDetails((p) => ({
									...p,
									patientSatisfaction: event.target.value
								}))
							}
							required
							type="number"
							min={0}
							value={wardDetails.patientSatisfaction}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="ward-resourcesUtilization">
						Resources Utilization:{" "}
						<input
							onChange={(event) =>
								setWardDetails((p) => ({
									...p,
									resourcesUtilization: event.target.value
								}))
							}
							required
							type="number"
							min={0}
							value={wardDetails.resourcesUtilization}
						/>
					</label>
				</div>
				<div>
					<div>
						<input type="submit" />
					</div>
					<div>
						<input
							type="reset"
							value="Discard"
							onClick={() => setShow(false)}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default WardForm;
