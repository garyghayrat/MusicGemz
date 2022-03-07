import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

// Temporarily test getting music files and playing them
export const ButtonUploadSong = () => {
	const { selectedAccount } = useAppContext();

	const [selectedSong, setSelectedSong] = useState<File>();

	function onChangeHandler(upload: React.ChangeEvent<HTMLInputElement>) {
		if (upload.target.files && upload.target.files.length > 0) {
			setSelectedSong(upload.target.files[0]);
		}
	}

	// TODO: track play state & change button to play/pause based on users button press history
	function playSong() {
		if (selectedSong) {
			let audio = new Audio(URL.createObjectURL(selectedSong));
			if (audio.paused) {
				audio.play();
			}
		}
	}

	return (
		<div className="Button">
			<p>Upload Song (mp3 file):</p>
		</div>
	);
};
