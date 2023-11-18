/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	patients: [],
	status: "idle",
	error: null
};

export const fetchPatients = createAsyncThunk(
	`patients/fetchPatients`,
	async () => {
		const response = await axios.get(
			`https://hospital-management.aasimd.repl.co/patients`
		);
		console.log(response.data);
		return response.data.data;
	}
);

export const addPatient = createAsyncThunk(
	`wards/addPatient`,
	async (patient) => {
		const response = await axios.post(
			`https://hospital-management.aasimd.repl.co/patients`,
			patient
		);
		console.log(response.data);
		return response.data.data;
	}
);

export const editPatient = createAsyncThunk(
	`wards/editPatient`,
	async ({ id, patient }) => {
		const response = await axios.put(
			`https://hospital-management.aasimd.repl.co/patients/${id}`,
			patient
		);
		console.log(response.data);
		return response.data.data;
	}
);

export const deletePatient = createAsyncThunk(
	`wards/deletePatient`,
	async ({ id }) => {
		const response = await axios.delete(
			`https://hospital-management.aasimd.repl.co/patients/${id}`
		);
		console.log(response.data);
		return response.data.data;
	}
);

const PatientsSlice = createSlice({
	name: "patients",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchPatients.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchPatients.fulfilled]: (state, action) => {
			state.status = "success";
			state.patients = action.payload;
		},
		[fetchPatients.rejected]: (state, action) => {
			state.status = "error";
			console.error(action.error);
			state.error = action.error.message;
		},
		[addPatient.pending]: (state, action) => {
			state.status = "loading";
		},
		[addPatient.fulfilled]: (state, action) => {
			state.status = "success";
			state.patients.push(action.payload);
		},
		[addPatient.rejected]: (state, action) => {
			state.status = "error";
			console.error(action.error);
			state.error = action.error.message;
		},
		[editPatient.pending]: (state, action) => {
			state.status = "loading";
		},
		[editPatient.fulfilled]: (state, action) => {
			state.status = "success";
			const updatedPatient = action.payload;
			const index = state.patients.findIndex(
				(p) => p._id === updatedPatient._id
			);
			state.patients[index] = updatedPatient;
		},
		[editPatient.rejected]: (state, action) => {
			state.status = "error";
			console.error(action.error);
			state.error = action.error.message;
		},
		[deletePatient.pending]: (state, action) => {
			state.status = "loading";
		},
		[deletePatient.fulfilled]: (state, action) => {
			state.status = "success";
			state.patients = state.patients.filter(
				(p) => p._id !== action.payload._id
			);
		},
		[deletePatient.rejected]: (state, action) => {
			state.status = "error";
			console.error(action.error);
			state.error = action.error.message;
		}
	}
});

export default PatientsSlice;
