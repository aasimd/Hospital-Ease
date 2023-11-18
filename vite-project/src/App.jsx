/** @format */

import { RouterProvider } from "react-router-dom";
import "./App.css";
import MyBrowserRouter from "./MyRouter/MyBrowserRouter";

function App() {
	return (
		<>
			<RouterProvider router={MyBrowserRouter} />
		</>
	);
}

export default App;
