/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	wards: [],
	status: "idle",
	error: null
};

export const addWard = createAsyncThunk(`wards/addWard`, async (ward) => {
	console.log(ward);
	const response = await axios.post(
		`https://hospital-management.aasimd.repl.co/wards`,
		ward
	);
	console.log(response.data);
	return response.data.data;
});

export const fetchWards = createAsyncThunk(`wards/fetchWards`, async () => {
	const response = await axios.get(
		`https://hospital-management.aasimd.repl.co/wards`
	);
	console.log(response.data);
	return response.data.data;
});

export const editWard = createAsyncThunk(
	`wards/editWard`,
	async ({ id, ward }) => {
		const response = await axios.put(
			`https://hospital-management.aasimd.repl.co/wards/${id}`,
			ward
		);
		console.log(response.data);
		return response.data.data;
	}
);

export const deleteWard = createAsyncThunk(
	`wards/deleteWard`,
	async ({ id }) => {
		const response = await axios.delete(
			`https://hospital-management.aasimd.repl.co/wards/${id}`
		);
		console.log(response.data);
		return response.data.data;
	}
);

const WardsSlice = createSlice({
	name: "wards",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchWards.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchWards.fulfilled]: (state, action) => {
			state.status = "success";
			state.wards = action.payload;
		},
		[fetchWards.rejected]: (state, action) => {
			state.status = "error";
			console.error(action.error);
			state.error = action.error.message;
		},
		[addWard.pending]: (state, action) => {
			state.status = "loading";
		},
		[addWard.fulfilled]: (state, action) => {
			state.status = "success";
			state.wards.push(action.payload);
		},
		[addWard.rejected]: (state, action) => {
			state.status = "error";
			console.error(action.error);
			state.error = action.error.message;
		},
		[editWard.pending]: (state, action) => {
			state.status = "loading";
		},
		[editWard.fulfilled]: (state, action) => {
			state.status = "success";
			const updatedWard = action.payload;
			const index = state.wards.findIndex((w) => w._id === updatedWard._id);
			state.wards[index] = updatedWard;
		},
		[editWard.rejected]: (state, action) => {
			state.status = "error";
			console.error(action.error);
			state.error = action.error.message;
		},
		[deleteWard.pending]: (state, action) => {
			state.status = "loading";
		},
		[deleteWard.fulfilled]: (state, action) => {
			state.status = "success";
			state.wards = state.wards.filter((w) => w._id !== action.payload._id);
		},
		[deleteWard.rejected]: (state, action) => {
			state.status = "error";
			console.error(action.error);
			state.error = action.error.message;
		}
	}
});

export default WardsSlice;
