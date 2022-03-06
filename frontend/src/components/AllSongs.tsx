import * as React from "react";
import Song from "../components/Song";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const fakeSongData = [
	{
		id: 1,
		artistName: "artistName1",
		songTitle: "songTitle1",
		genre: "genre1",
		songFile: "file",
		coverPhoto: "file",
	},
	{
		id: 2,
		artistName: "artistName2",
		songTitle: "songTitle2",
		genre: "genre2",
		songFile: "file",
		coverPhoto: "file",
	},
	{
		id: 3,
		artistName: "artistName3",
		songTitle: "songTitle3",
		genre: "genre3",
		songFile: "file",
		coverPhoto: "file",
	},
	{
		id: 4,
		artistName: "artistName4",
		songTitle: "songTitle4",
		genre: "genre4",
		songFile: "file",
		coverPhoto: "file",
	},
	{
		id: 5,
		artistName: "artistName5",
		songTitle: "songTitle5",
		genre: "genre5",
		songFile: "file",
		coverPhoto: "file",
	},
	{
		id: 6,
		artistName: "artistName6",
		songTitle: "songTitle6",
		genre: "genre6",
		songFile: "file",
		coverPhoto: "file",
	},
];

// Grid to display uploaded songs from
export default function AllSongs() {
	React.useEffect(() => {
		// TODO: Read music chain data here and construct song objects
	});

	return (
		<Container sx={{ py: 8 }} maxWidth="md">
			<Grid container spacing={5}>
				{fakeSongData.map((song) => (
					<Grid item key={song.id} xs={12} sm={6} md={4}>
						<Song
							artistName={song.artistName}
							songTitle={song.songTitle}
							genre={song.genre}
							//songFile= songFileHere
							//coverPhoto= coverPhotoHere
						/>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
