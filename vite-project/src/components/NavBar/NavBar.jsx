/** @format */

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { setActiveLinks } from "../../utils";
import "./NavBar.css";
const NavBar = () => {
	const navigate = useNavigate();
	return (
		<div className="nav-bar">
			<div>
				<h2 onClick={() => navigate("/")}>HospitalEase</h2>
			</div>
			<div>
				<ul>
					<li>
						<NavLink style={setActiveLinks} to="/">
							Hospital
						</NavLink>
					</li>
					<li>
						<NavLink style={setActiveLinks} to="/patients">
							Patients
						</NavLink>
					</li>
					<li>
						<NavLink style={setActiveLinks} to="/wards">
							Wards
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default NavBar;
