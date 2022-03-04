import React from "react";
import { ButtonConnectWallet } from "./components/ButtonConnectWallet";
import { ButtonUploadImage } from "./components/ButtonUploadImage";
import { ButtonUploadSong } from "./components/ButtonUploadSong";
import UploadSongForm from "./components/UploadSongForm";

function App() {
	return (
		<div className="App">
			<ButtonConnectWallet />

			{/* FORM */}
			<div style={{ marginTop: "10rem" }}>
				<UploadSongForm />
			</div>
		</div>
	);
}

export default App;
