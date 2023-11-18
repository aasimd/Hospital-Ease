/** @format */

import { configureStore } from "@reduxjs/toolkit";
import PatientsSlice from "./pages/Patients/PatientsSlice";
import WardsSlice from "./pages/Wards/WardsSlice";
export default configureStore({
	reducer: {
		patients: PatientsSlice.reducer,
		wards: WardsSlice.reducer
	}
});
