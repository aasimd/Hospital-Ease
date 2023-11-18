/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "./PatientsSlice";
import PatientsList from "../../components/PatientsList/PatientsList";
import "./Patients.css";
import PatientForm from "../../components/PatientForm/PatientForm";
import { addPatientHandler } from "../../utils";

const newPatient = {
	age: 1,
	assignedWard: 1,
	contactNumber: 1,
	expectedStay: 1,
	gender: "Male",
	medicalHistory: "",
	name: ""
};

const Patients = () => {
	const { status, patients, error } = useSelector((state) => state.patients);
	const dispatch = useDispatch();
	const [showAddForm, setShowAddForm] = useState(false);
	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchPatients());
		}
	}, [status, dispatch]);
	if (status === "loading") return <h1>Loading...</h1>;
	if (status === "error") return <p>{error}</p>;
	return (
		<div className="patients-page">
			<h1>Patients</h1>
			<div className="flex-display-list-form ">
				{showAddForm ? (
					<PatientForm
						patient={newPatient}
						setShow={setShowAddForm}
						type={"add"}
						submitFunction={addPatientHandler}
					/>
				) : (
					<div>
						<button onClick={() => setShowAddForm(true)}>Add Patient</button>
					</div>
				)}
				<PatientsList patients={patients} />
			</div>
		</div>
	);
};

export default Patients;
