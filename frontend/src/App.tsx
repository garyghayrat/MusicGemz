import React from "react";
import { ButtonConnectWallet } from "./components/ButtonConnectWallet"
import { ButtonUploadImage } from "./components/ButtonUploadImage"
import { ButtonUploadSong } from "./components/ButtonUploadSong"

function App() {
	return (
	<div className="App">
		<ButtonConnectWallet />
		<ButtonUploadImage />
		<ButtonUploadSong />
	</div>
	);
}

export default App;
