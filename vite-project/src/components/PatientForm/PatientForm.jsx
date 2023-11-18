/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWards } from "../../pages/Wards/WardsSlice";
const PatientForm = ({ patient, type, submitFunction, setShow }) => {
	const dispatch = useDispatch();
	const {
		age,
		assignedWard,
		contactNumber,
		expectedStay,
		gender,
		medicalHistory,
		name
	} = patient;
	const [patientDetails, setPatientDetails] = useState({
		age,
		assignedWard,
		contactNumber,
		expectedStay,
		gender,
		medicalHistory,
		name
	});
	const { wards, status: wardStatus, error } = useSelector((s) => s.wards);
	useEffect(() => {
		if (wardStatus === "idle") dispatch(fetchWards());
	}, [dispatch, wardStatus]);
	if (wardStatus === "loading") return <h1>Loading...</h1>;
	return (
		<div>
			<h3>{type === "add" ? "Add New" : "Edit"} Patient</h3>
			<form
				onSubmit={(event) => {
					console.log(patientDetails);
					event.preventDefault();
					type === "add"
						? submitFunction(dispatch, patientDetails)
						: submitFunction(dispatch, patientDetails, patient._id);
					setShow(false);
				}}
			>
				<div>
					<label htmlFor="patient-name">
						Name:{" "}
						<input
							onChange={(event) =>
								setPatientDetails((p) => ({
									...p,
									name: event.target.value
								}))
							}
							required
							type="text"
							value={patientDetails.name}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="patient-age">
						Age:{" "}
						<input
							required
							min={1}
							max={120}
							type="number"
							value={patientDetails.age}
							onChange={(event) =>
								setPatientDetails((p) => ({ ...p, age: event.target.value }))
							}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="patient-gender">
						Gender:{" "}
						<select
							name="patient-gender"
							onChange={(event) =>
								setPatientDetails((p) => ({ ...p, gender: event.target.value }))
							}
							id="patient-gender"
						>
							{["Male", "Female", "Other"].map((e) => (
								<option
									key={e}
									value={e}
									selected={e === patientDetails.gender}
								>
									{e}
								</option>
							))}
						</select>
					</label>
				</div>
				<div>
					<label htmlFor="patient-assignedWard">
						Assigned Ward:{" "}
						<input
							onChange={(event) =>
								setPatientDetails((p) => ({
									...p,
									assignedWard: event.target.value
								}))
							}
							required
							type="number"
							min={1}
							max={wards.length}
							value={patientDetails.assignedWard}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="patient-contactNumber">
						Contact Number:{" "}
						<input
							onChange={(event) =>
								setPatientDetails((p) => ({
									...p,
									contactNumber: event.target.value
								}))
							}
							required
							type="number"
							min={1}
							minLength={10}
							maxLength={10}
							value={patientDetails.contactNumber}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="patient-expectedStay">
						Expected Stay:{" "}
						<input
							onChange={(event) =>
								setPatientDetails((p) => ({
									...p,
									expectedStay: event.target.value
								}))
							}
							required
							type="number"
							min={1}
							max={365}
							value={patientDetails.expectedStay}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="patient-medicalHistory">
						Medical History:{" "}
						<input
							onChange={(event) =>
								setPatientDetails((p) => ({
									...p,
									medicalHistory: event.target.value
								}))
							}
							required
							type="text"
							value={patientDetails.medicalHistory}
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

export default PatientForm;
