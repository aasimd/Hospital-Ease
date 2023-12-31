/** @format */

import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
const Root = () => {
	return (
		<div>
			<header>
				<h3>
					Source Code:{" "}
					<a href="https://github.com/aasimd/Hospital-Ease" target="_blank">
						Github
					</a>
				</h3>
				<nav>
					<NavBar />
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Root;
