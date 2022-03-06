import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "./ui/atoms/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

// import { ButtonUploadSong } from "./ButtonUploadSong";
// import { ButtonUploadImage } from "./ButtonUploadImage";
import React from "react";
import useWeb3Storage from "../hooks/useWeb3Storage";
import { useAppContext } from "../context/AppContext";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children: React.ReactElement<any, any>; }, 
	ref: React.Ref<unknown>,
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

    const uploadNewSong = () => {
		//TODO: Sid how can I submit the form here? I don't know the details of formik
		//The "Submit" button and onSubmit function may need to go here
        handleClose();
    }

    const handleClose = () => {
        setOpen(false);
    };

	return (
		<div>
            <Button
                onClick={handleClickOpen}
                title="Upload Song"
                buttonClass="btn-primary"
                fontWeight="500"
                fontSize="1.318rem"
            />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <p style={{fontSize: "25px", fontWeight: "500", paddingTop:"10px", display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>Upload your song here</p>
                <DialogContent>
					<div style={{margin:"0 auto"}}>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={onSubmit}
						>
							{({ isSubmitting, setFieldValue }) => (
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
									<button disabled={isSubmitting} type="submit" style={{textAlign: "center"}}>
										Submit
									</button>
								</Form>
							)}
						</Formik>
					</div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={uploadNewSong}
                        title="Upload Song"
                        buttonClass="btn-primary"
                        fontWeight="500"
                        fontSize="1.318rem"
                    />
                </DialogActions>
            </Dialog>
        </div>
	);
};

export default UploadSongForm;
