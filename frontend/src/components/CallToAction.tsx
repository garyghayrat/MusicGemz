// import { Button } from "../components/ui/atoms/Button";
import Button from "@mui/material/Button";
import UploadSongModal from "../components/UploadSongModal";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// Contains title (Music Gemz), a description, and upload song & scroll buttons
export default function CallToAction() {
	const scrollToSongs = () => {
		window.scroll({
			top: 500,
			behavior: "smooth",
		});
	};

	return (
		<Box
			sx={{
				pt: 8,
				pb: 6,
			}}
		>
			<Container maxWidth="sm">
				<Typography variant="h2" align="center" gutterBottom>
					Music Gemz
				</Typography>
				<Typography align="center" paragraph>
					Discover and share music. <br /> Tip artists directly in ethers.
				</Typography>
				<Stack
					sx={{ pt: 4 }}
					direction="row"
					spacing={2}
					justifyContent="center"
				>
					<UploadSongModal />
					<Button variant="contained" onClick={scrollToSongs} color="warning">
						Browse Music
					</Button>
				</Stack>
			</Container>
		</Box>
	);
}
