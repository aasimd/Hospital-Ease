/** @format */

import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Root = lazy(() => import("../pages/Root/Root"));
const Hospital = lazy(() => import("../pages/Hospital/Hospital"));
const PatientsRoot = lazy(() => import("../pages/PatientsRoot/PatientsRoot"));
const Patients = lazy(() => import("../pages/Patients/Patients"));
const PatientDetails = lazy(() =>
	import("../pages/PatientDetails/PatientDetails")
);
const WardsRoot = lazy(() => import("../pages/WardsRoot/WardsRoot"));
const Wards = lazy(() => import("../pages/Wards/Wards"));
const WardDetails = lazy(() => import("../pages/WardDetails/WardDetails"));

const LoadingFrag = () => <h1>Loading...</h1>;
const ErrorFrag = () => <h1>Some Error Occurred / Route Not Found</h1>;

const MyBrowserRouter = createBrowserRouter([
	{
		path: "/",
		errorElement: <ErrorFrag />,
		element: (
			<Suspense fallback={<LoadingFrag />}>
				<Root />
			</Suspense>
		),
		children: [
			{
				path: "",
				element: (
					<Suspense fallback={<LoadingFrag />}>
						<Hospital />
					</Suspense>
				)
			},
			{
				path: "patients",
				element: (
					<Suspense fallback={<LoadingFrag />}>
						<PatientsRoot />
					</Suspense>
				),
				children: [
					{
						path: "",
						element: (
							<Suspense fallback={<LoadingFrag />}>
								<Patients />
							</Suspense>
						)
					},
					{
						path: "/patients/:patientId",
						element: (
							<Suspense fallback={<LoadingFrag />}>
								<PatientDetails />
							</Suspense>
						)
					}
				]
			},
			{
				path: "wards",
				element: (
					<Suspense fallback={<LoadingFrag />}>
						<WardsRoot />
					</Suspense>
				),
				children: [
					{
						path: "",
						element: (
							<Suspense fallback={<LoadingFrag />}>
								<Wards />
							</Suspense>
						)
					},
					{
						path: "/wards/:wardId",
						element: (
							<Suspense fallback={<LoadingFrag />}>
								<WardDetails />
							</Suspense>
						)
					}
				]
			}
		]
	}
]);

export default MyBrowserRouter;
