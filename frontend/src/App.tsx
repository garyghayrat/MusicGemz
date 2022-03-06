import React from "react";
import { Header } from "./components/ui/layout/Header";
import CallToAction from "./components/CallToAction";
import AllSongs from "./components/AllSongs";
import Footer from "./components/Footer";

function App() {
	return (
		<div className="App">
			<Header />
			<CallToAction />
			<AllSongs />
			<div style={{height:"300px"}}></div>
			<Footer />
		</div>
	);
}

export default App;
