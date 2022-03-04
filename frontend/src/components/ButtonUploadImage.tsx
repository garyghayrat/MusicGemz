import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

// Temporarily test getting image files and displaying them
export const ButtonUploadImage = () => {
	const { selectedAccount } = useAppContext();
	
	const [selectedImage, setSelectedImage] = useState<File>();
	const [imgSrc, setImgSrc] = useState('')

	function onChangeHandler(upload: React.ChangeEvent<HTMLInputElement>) {
		if (upload.target.files && upload.target.files.length > 0) {
			setSelectedImage(upload.target.files[0]);
		}
	};

	return (
		<div className="Button">
			<p>Upload Image:</p>
			<input type="file" name="image" onChange={(e) => onChangeHandler(e)} />
			{selectedImage && (
            		<img
						src={URL.createObjectURL(selectedImage)}
						style={{width:'15vw', height:'15vh'}}
						alt="Thumb"
					/>
		)}
		</div>
	)
};
