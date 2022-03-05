import React from "react";
import { Header } from "./components/ui/layout/Header";

import { ButtonConnectWallet } from "./components/ButtonConnectWallet";
import UploadSongForm from "./components/UploadSongForm";

function App() {
	return (
		<div className="App">
			<Header />
			<ButtonConnectWallet />

			{/* FORM */}
			<div style={{ marginTop: "10rem" }}>
				<UploadSongForm />
			</div>

			<div style={{ marginTop: "10rem" }}></div>
		</div>
	);
}

export default App;
