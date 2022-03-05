import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { ButtonUploadSong } from "./ButtonUploadSong";
import { ButtonUploadImage } from "./ButtonUploadImage";
import React from "react";

const IMAGE_SUPPORTED_FORMATS = [
	"image/jpg",
	"image/jpeg",
	"image/gif",
	"image/png",
];
const SONG_SUPPORTED_FORMATS = ["audio/mpeg", "audio/mp3"];

const validationSchema = Yup.object({
	artistName: Yup.string()
		.max(15, "Must be 15 characters or less")
		.required("Please fill artist name"),
	songTitle: Yup.string()
		.max(100, "Must be 100 characters or less")
		.required("Please fill song title"),
	genre: Yup.string(),
	coverImage: Yup.mixed()
		.nullable()
		.notRequired()
		.test(
			"fileType",
			"Unsupported File Format",
			(value) => value && IMAGE_SUPPORTED_FORMATS.includes(value.type)
		),
	song: Yup.mixed()
		.required()
		.test(
			"fileType",
			"Unsupported File Format",
			(value) => value && SONG_SUPPORTED_FORMATS.includes(value.type)
		)
		.nullable(),
});

interface IValues {
	artistName: string;
	songTitle: string;
	genre: string;
	coverImage: File | string | null;
	song: File | string | null;
}

const initialValues: IValues = {
	artistName: "",
	songTitle: "",
	genre: "",
	coverImage: "",
	song: "",
};

const UploadSongForm = () => {
	const [selectedSong, setSelectedSong] = React.useState<File>();
	const [selectedImage, setSelectedImage] = React.useState<File>();

	const onSubmit = (values: IValues) => {
		console.log(values);
	};

	function playSong() {
		if (selectedSong) {
			let audio = new Audio(URL.createObjectURL(selectedSong));
			if (audio.paused) {
				audio.play();
			}
		}
	}

	return (
		<div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ setFieldValue }) => (
					<Form>
						<div>
							<label htmlFor="name">Artist Name</label>
							<Field
								name="artistName"
								type="text"
								id="name"
								placeholder="Artist Name"
							/>
						</div>

						<div>
							<label htmlFor="song-title">Song Title</label>
							<Field
								name="songTitle"
								type="text"
								id="song-title"
								placeholder="Song Title"
							/>
						</div>

						<div>
							<label htmlFor="genre">Genre</label>
							<Field name="genre" type="text" id="genre" placeholder="Genre" />
						</div>

						<div>
							<label htmlFor="song">Upload Song: </label>
							<input
								type="file"
								name="song"
								id="song"
								accept="audio/mpeg, audio/mp3"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									if (e.target.files && e.target.files.length > 0) {
										setSelectedSong(e.target.files[0]);
										setFieldValue("song", e.target.files[0]);
									}
								}}
							/>
							{selectedSong && <button onClick={playSong}>play song</button>}
						</div>

						<div>
							<label htmlFor="image">Upload cover image: </label>
							<input
								type="file"
								name="coverImage"
								id="image"
								accept="image/jpg, image/jpeg, image/png"
								onChange={(e) => {
									if (e.target.files && e.target.files.length > 0) {
										setSelectedImage(e.target.files[0]);
										setFieldValue("coverImage", e.target.files[0]);
									}
								}}
							/>
							{selectedImage && (
								<img
									src={URL.createObjectURL(selectedImage)}
									style={{ width: "15vw", height: "15vh" }}
									alt="Thumb"
								/>
							)}
						</div>

						<div>
							{/* <ButtonUploadImage />
							<ButtonUploadSong /> */}
						</div>

						<button type="submit">Submit</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default UploadSongForm;
