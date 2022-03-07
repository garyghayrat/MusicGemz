import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from '@mui/icons-material/Pause';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { ethers } from "ethers";
import { useAppContext } from "../context/AppContext";

interface SongProps {
	id: string;
	artistAddr: string;
	artistName: string;
	songTitle: string;
	genre: string;
	songFile: string;
	coverPhoto: string;
}

export default function Song(props: SongProps) {
	const [playing, setPlaying] = useState(false);
	const audio = useRef(new Audio(`https://${props.songFile}.ipfs.dweb.link`));
	const { gemz, sendTip } = useAppContext();

	function playSong() {
		setPlaying(!playing);
		//play song
		if (!playing) {
			console.log("play");
			audio.current.play();
		}
		// pause song
		else {
			audio.current.pause();
		}
	}

	const tip = async () => {
		console.log("beginning tip");
		if (gemz) {
			const response = await gemz.donate(1, {value: ethers.utils.parseUnits("0.1", "ether")});
			console.log("response");
		}
	}

	const theme = useTheme();
	return (
		<Card sx={{ display: "flex" }}>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<CardContent sx={{ flex: "1 0 auto" }}>
					<Typography component="div" variant="h5">
						{props.songTitle}
					</Typography>
					<Typography
						variant="subtitle1"
						color="text.secondary"
						component="div"
					>
						{props.artistName}
					</Typography>
				</CardContent>
				<Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
					<IconButton aria-label="play/pause" onClick={playSong}>
						{playing 
						    ? <PauseIcon sx={{ height: 38, width: 38 }} />
							: <PlayArrowIcon sx={{ height: 38, width: 38 }} />
						}
					</IconButton>
					<IconButton aria-label="tip" onClick={tip}>
						<AttachMoneyIcon />
					</IconButton>
				</Box>
			</Box>
			<CardMedia
				component="img"
				sx={{ width: 151 }}
				image={`https://${props.coverPhoto}.ipfs.dweb.link`}
				alt="Song Cover"
			/>
		</Card>
	);
}
