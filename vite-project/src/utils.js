/** @format */

import { addPatient, editPatient } from "./pages/Patients/PatientsSlice";
import { addWard, editWard } from "./pages/Wards/WardsSlice";

export const setActiveLinks = ({ isActive }) =>
	isActive ? { color: "red", fontWeight: 700 } : { fontWeight: 500 };

export const addWardHandler = (dispatch, ward) => {
	const wardToSave = {
		mortalityRate: Number(ward.mortalityRate),
		occupancy: Number(ward.occupancy),
		patientSatisfaction: Number(ward.patientSatisfaction),
		resourcesUtilization: Number(ward.resourcesUtilization),
		speciality: ward.speciality,
		wardNumber: Number(ward.wardNumber),
		capacity: Number(ward.capacity)
	};
	dispatch(addWard((ward = wardToSave)));
};

export const editWardHandler = (dispatch, ward, wardId) => {
	const wardToSave = {
		_id: wardId,
		mortalityRate: Number(ward.mortalityRate),
		occupancy: Number(ward.occupancy),
		patientSatisfaction: Number(ward.patientSatisfaction),
		resourcesUtilization: Number(ward.resourcesUtilization),
		speciality: ward.speciality,
		wardNumber: Number(ward.wardNumber),
		capacity: Number(ward.capacity)
	};
	dispatch(editWard({ id: wardId, ward: wardToSave }));
};

export const addPatientHandler = (dispatch, patient) => {
	const patientToSave = {
		age: Number(patient.age),
		assignedWard: Number(patient.assignedWard),
		contactNumber: Number(patient.contactNumber),
		expectedStay: Number(patient.expectedStay),
		gender: patient.gender,
		medicalHistory: patient.medicalHistory,
		name: patient.name
	};
	dispatch(addPatient((patient = patientToSave)));
};

export const editPatientHandler = (dispatch, patient, patientId) => {
	const patientToSave = {
		age: Number(patient.age),
		assignedWard: Number(patient.assignedWard),
		contactNumber: Number(patient.contactNumber),
		expectedStay: Number(patient.expectedStay),
		gender: patient.gender,
		medicalHistory: patient.medicalHistory,
		name: patient.name
	};
	dispatch(editPatient({ id: patientId, patient: patientToSave }));
};

export const getWardsOccupancyRate = (wards) =>
	Math.floor(
		(wards.reduce((acc, curr) => acc + curr.occupancy, 0) * 100) /
			wards.reduce((acc, curr) => acc + curr.capacity, 0)
	);

export const getAvgLengthOfStay = (patients) =>
	(
		patients.reduce((acc, curr) => acc + curr.expectedStay, 0) / patients.length
	).toFixed(1);

// Performance Rating=(w1⋅Patient Satisfaction+w2⋅(1−Mortality Rate)+w3⋅Resource Utilization)

export const getTopPerformingWard = (wards) => {
	const w1 = 0.6;
	const w2 = 0.8;
	const w3 = 0.9;
	const wardsWithPerformanceRatings = wards.map((w) => {
		const t1 = w1 * w.patientSatisfaction;
		const t2 = w2 * (1 - w.mortalityRate);
		const t3 = w3 * w.resourcesUtilization;
		const performanceRating = t1 + t2 + t3;
		return { ...w, performanceRating };
	});
	const ward = wardsWithPerformanceRatings.reduce(
		(acc, curr) =>
			acc.performanceRating < curr.performanceRating ? (acc = curr) : acc,
		{ performanceRating: 0 }
	);
	return ward;
};
