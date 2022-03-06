import * as React from "react";
import coverPlaceHolder from "../components/ui/assets/APPLEMUSICLOGO.png";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

interface SongProps {
	artistName: string;
	songTitle: string;
	genre: string;
	//songFile: File,
	//coverPhoto: File,
}

export default function Song(props: SongProps) {
	const theme = useTheme();
	return (
		<Card sx={{ display: "flex" }}>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<CardContent sx={{ flex: "1 0 auto" }}>
					<Typography component="div" variant="h5">
						Live From Space
					</Typography>
					<Typography
						variant="subtitle1"
						color="text.secondary"
						component="div"
					>
						Mac Miller
					</Typography>
				</CardContent>
				<Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
					<IconButton aria-label="play/pause">
						<PlayArrowIcon sx={{ height: 38, width: 38 }} />
					</IconButton>
					<IconButton aria-label="tip">
						<AttachMoneyIcon />
					</IconButton>
				</Box>
			</Box>
			<CardMedia
				component="img"
				sx={{ width: 151 }}
				image={coverPlaceHolder}
				alt="Live from space album cover"
			/>
		</Card>
	);
}
