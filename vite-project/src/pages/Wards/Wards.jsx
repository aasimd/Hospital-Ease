/** @format */

import React, { useEffect, useState } from "react";
import WardsList from "../../components/WardsList/WardsList";
import { useDispatch, useSelector } from "react-redux";
import { fetchWards } from "./WardsSlice";
import WardForm from "../../components/WardForm/WardForm";
import { addWardHandler } from "../../utils";
import "./Wards.css";
const Wards = () => {
	const dispatch = useDispatch();
	const { status, wards, error } = useSelector((state) => state.wards);
	const newWard = {
		mortalityRate: 0,
		occupancy: 1,
		patientSatisfaction: 1,
		resourcesUtilization: 1,
		speciality: "",
		wardNumber: Number(wards.length + 1),
		capacity: 1
	};
	const [showWardAdd, setShowWardAdd] = useState(false);
	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchWards());
		}
	}, [status, dispatch]);
	const sortedWards = [...wards].sort((a, b) => a.wardNumber - b.wardNumber);
	if (status === "loading") return <h1>Loading...</h1>;
	if (status === "error") return <p>{error}</p>;
	return (
		<div className="wards-page">
			<h1>Wards</h1>
			<div className="flex-display-list-form">
				<WardsList wards={sortedWards} />
				{showWardAdd ? (
					<WardForm
						type={"add"}
						ward={newWard}
						submitFunction={addWardHandler}
						setShow={setShowWardAdd}
					/>
				) : (
					<div>
						<button onClick={() => setShowWardAdd(true)}>Add Ward</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Wards;
