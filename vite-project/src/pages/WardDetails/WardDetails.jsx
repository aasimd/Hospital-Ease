/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteWard } from "../Wards/WardsSlice";
import WardForm from "../../components/WardForm/WardForm";
import { editWardHandler } from "../../utils";

const WardDetails = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { wardId } = useParams();
	const { wards, error, status } = useSelector((s) => s.wards);
	const ward = wards.find((w) => w._id === wardId);
	const {
		mortalityRate,
		occupancy,
		patientSatisfaction,
		resourcesUtilization,
		speciality,
		wardNumber,
		capacity,
		_id
	} = ward;
	const t1 = 0.6 * ward.patientSatisfaction;
	const t2 = 0.8 * (1 - ward.mortalityRate);
	const t3 = 0.9 * ward.resourcesUtilization;
	const performanceRating = t1 + t2 + t3;
	const [showWardEdit, setShowWardEdit] = useState(false);
	if (status === "loading") return <h1>Loading...</h1>;
	if (status === "error") return <p>{error}</p>;
	return (
		<div>
			<div>
				<button onClick={() => navigate(-1)}>{"< Back"}</button>
			</div>
			<h1>Ward Details</h1>
			{showWardEdit ? (
				<div>
					<WardForm
						ward={ward}
						type={"edit"}
						submitFunction={editWardHandler}
						setShow={setShowWardEdit}
					/>
				</div>
			) : (
				<div>
					{" "}
					<div>
						<h2>
							Ward Number: {wardNumber} || {speciality} Ward
						</h2>
						<div>
							<p>
								Speciality: <b>{speciality}</b>
								<br />
								Capacity: <b>{capacity}</b>
								<br />
								Occupancy: <b>{occupancy}</b>
								<br />
								Resources Utilization: <b>{resourcesUtilization}</b>
								<br />
								Patient Satisfaction: <b>{patientSatisfaction}</b>
								<br />
								Mortality Rate: <b>{mortalityRate}</b> <br />
								Performance Rating: <b>{performanceRating}</b>
							</p>
						</div>
					</div>
					<div>
						<div>
							<button onClick={() => setShowWardEdit(true)}>Edit</button>
						</div>
						<div>
							<button
								onClick={() => {
									dispatch(deleteWard({ id: _id }));
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

export default WardDetails;
