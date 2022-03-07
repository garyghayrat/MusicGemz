import React from "react";
import Song from "../components/Song";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useAppContext } from "../context/AppContext";

// Grid to display uploaded songs from
export default function AllSongs() {
	const { allSongs } = useAppContext();

	return (
		<Container sx={{ py: 8 }} maxWidth="md">
			<Grid container spacing={5}>
				{allSongs.map((song) => (
					<Grid item key={song.id} xs={12} sm={6} md={4}>
						<Song
						    id={song.id}
							artistAddr={song.artistAddr}
							artistName={song.artistName}
							songTitle={song.songTitle}
							genre={song.genre}
							songFile= {song.songFile}
							coverPhoto= {song.coverPhoto}
						/>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
