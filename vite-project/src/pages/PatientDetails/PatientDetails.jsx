/** @format */

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletePatient } from "../Patients/PatientsSlice";
import PatientForm from "../../components/PatientForm/PatientForm";
import { editPatientHandler } from "../../utils";

const PatientDetails = () => {
	const { patientId } = useParams();
	const { patients, status, error } = useSelector((s) => s.patients);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const patient = patients.find((p) => p._id === patientId);
	const {
		age,
		assignedWard,
		contactNumber,
		expectedStay,
		gender,
		medicalHistory,
		name
	} = patient;
	const [showEditForm, setShowEditForm] = useState(false);
	if (status === "loading") return <h1>Loading...</h1>;
	if (status === "error") return <p>{error}</p>;
	return (
		<div>
			<div>
				<button onClick={() => navigate(-1)}>{"< Back"}</button>
			</div>
			<h1>Patient Details</h1>
			{showEditForm ? (
				<div>
					<PatientForm
						patient={patient}
						type={"edit"}
						setShow={setShowEditForm}
						submitFunction={editPatientHandler}
					/>
				</div>
			) : (
				<div>
					<div>
						<h2>{name}</h2>
						<p>
							Age: <b>{age}</b>
							<br />
							Gender: <b>{gender}</b>
							<br />
							Assigned Ward: <b>{assignedWard}</b>
							<br />
							Contact Number: <b>{contactNumber}</b>
							<br />
							Expected Stay: <b>{expectedStay} Days</b>
							<br />
							Medical History: <b>{medicalHistory}</b>
						</p>
					</div>
					<div>
						<div>
							<button onClick={() => setShowEditForm(true)}>Edit</button>
						</div>
						<div>
							<button
								onClick={() => {
									dispatch(deletePatient({ id: patientId }));
									navigate(-1);
								}}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PatientDetails;
