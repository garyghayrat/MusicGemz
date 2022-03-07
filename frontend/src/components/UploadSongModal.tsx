import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import { Button } from "./ui/atoms/Button";
import {
	DialogTitle,
	Dialog,
	DialogActions,
	DialogContent,
	Button,
	Stack,
	Box,
} from "@mui/material";
import { TextField } from "formik-mui";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

// import { ButtonUploadSong } from "./ButtonUploadSong";
// import { ButtonUploadImage } from "./ButtonUploadImage";
import React from "react";
import useWeb3Storage from "../hooks/useWeb3Storage";
import { useAppContext } from "../context/AppContext";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children: React.ReactElement<any, any> },
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

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
	coverImage: File | null;
	song: File | null;
}

const initialValues: IValues = {
	artistName: "",
	songTitle: "",
	genre: "",
	coverImage: null,
	song: null,
};

const UploadSongForm = () => {
	const [selectedSong, setSelectedSong] = React.useState<File>();
	const [selectedImage, setSelectedImage] = React.useState<File>();
	const [open, setOpen] = React.useState(false);

	const { gemz } = useAppContext();
	const { uploadFiles, getFiles } = useWeb3Storage();

	const onSubmit = async (values: IValues) => {
		// upload files and get the cid
		if (values.coverImage && values.song) {
			const cid = await uploadFiles([values.coverImage, values.song]);

			// getting uploaded files using the cid
			const files = await getFiles(cid);
			if (files && files?.length) {
				const [image, song] = files;

				// if files are there send the data to the blockchain
				console.log("giving data to the blockchain");
				if (gemz) {
					const response = await gemz.uploadFile(
						song.cid,
						image.cid,
						values.songTitle,
						values.artistName,
						values.genre
					);

					console.log("response", response);
				}
			}
		}
	};

	function playSong() {
		if (selectedSong) {
			let audio = new Audio(URL.createObjectURL(selectedSong));
			if (audio.paused) {
				audio.play();
			}
		}
	}

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button onClick={handleClickOpen} variant="contained">
				Upload song
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				onClose={handleClose}
				maxWidth="lg"
				aria-describedby="upload-song-dialog"
			>
				{/* <p
					style={{
						fontSize: "25px",
						fontWeight: "500",
						paddingTop: "10px",
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					Upload your song here
				</p> */}
				<DialogTitle sx={{ fontSize: "1.6rem" }}>
					Upload your song here
				</DialogTitle>

				<DialogContent sx={{ p: 3, mt: 2 }}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{({ isSubmitting, setFieldValue }) => (
							<Stack component={Form} spacing={3} my={2}>
								<Stack direction="row" spacing={2}>
									<Field
										component={TextField}
										fullWidth
										required
										name="songTitle"
										type="text"
										id="song-title"
										label="Song Title"
									/>

									<Field
										component={TextField}
										fullWidth
										required
										variant="outlined"
										name="artistName"
										type="text"
										id="name"
										label="Artist Name"
									/>
								</Stack>

								<Field
									component={TextField}
									name="genre"
									type="text"
									id="genre"
									label="Genre"
								/>

								<div>
									<label htmlFor="song">Upload Song*: </label>
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
									{selectedSong && (
										<button onClick={playSong}>play song</button>
									)}
								</div>

								<div>
									<label htmlFor="image">Upload cover image*: </label>
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
										<Box>
											<img
												src={URL.createObjectURL(selectedImage)}
												style={{ width: "100%", height: "100%" }}
												alt="Thumb"
											/>
										</Box>
									)}
								</div>
								<Button
									disabled={isSubmitting}
									type="submit"
									variant="contained"
									fullWidth
								>
									Submit
								</Button>
							</Stack>
						)}
					</Formik>
					{/* </div> */}
				</DialogContent>
				<DialogActions>
					<Button variant="contained" color="warning" onClick={handleClose}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default UploadSongForm;
