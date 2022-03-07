import { FC, useState } from "react";
import {
	Avatar,
	Button,
	ButtonGroup,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box } from "@mui/system";

const team: ITeamMember[] = [
	{
		name: "Grant Dennany",
		image:
			"https://media.discordapp.net/attachments/947729885529509978/949909643449204806/IMG_5932.JPG?width=359&height=670",
		twitter: "https://twitter.com/grantdennany",
		github: "https://github.com/gdennany",
	},

	{
		name: "Mohd Shahid",
		image:
			"https://lh3.googleusercontent.com/2boIkcUgLCTwpq4gEDaDFEwr6_uYLAdsMcT2YCztmlubcA6ryBv5Pd8RVrBaaJapW0Gsx6MfvNcF_y96PC0vCl-un1hNHerR2YsTFXHHYE5dIUnbxS49zLMcliMsYmy0oZ_chwGtZzfKaOHEKYpMUgZ3_ZCdyP1DGoIJkxwXfDW2hs_zNDDJ5pUse_apUXRHTdYJcEpT8J9ZkVoNtCGlniZFj_4gPXg3E1AhE9U11e9K-rtJxfyZJZcjLZDiYlqEgC_z7GNC1O21jyEKKYfIK32moFL7EnwNdC-PUE5QA3yCRdHpnMZeAji0Pz3RnBBBr5m-W9adTvzLhCOE0zm4Cc680-TTAX_GB-CE0jIl0B5eftKyQ53lmgACmQoyN2nAJtjmWFR6ahgOZMtrItTdAiQo_6-5PPWqFb8y3DVrCO_WUaJiSYbdTWJnU4O8hTLLKw9ueN2NhhhCbdRp9Reo4EY3A51hV5yM12UgnME6ISfH-7XwJ34vcQVXt1qHWGzrhMCv4-ySjh7H1yCicHQiiRElbZjmJnD6slmFw5c7wpJWIcuAxU308hfQC0Fj71v1s7N33RU5SviR2-KGMnoyb44SpvFf3fY4Jp_d8qgyueLBUIcRVzqJcVCEAx1qJN-Nk-MOnSyxFezlwERTm-7VrTAWF6GpBc2FoFU6iPrZlS6yI0uLit5sB304QsIcTP4FpXueKGM84sEWlG0DtErbhfc=w1394-h929-no?authuser=0",
		twitter: "https://twitter.com/sidmirza4",
		github: "https://github.com/sidmirza4",
	},

	{
		name: "Gary Ghayrat",
		image:
			"https://media.discordapp.net/attachments/947729885529509978/949918137812389998/uq0u0cOq_400x400.jpg",
		twitter: "https://twitter.com/garyghayrat",
		github: "https://github.com/garyghayrat",
	},
];

interface ITeamMember {
	name: string;
	image: string;
	twitter: string;
	github: string;
}

const AboutDialog = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				sx={{ cursor: "pointer" }}
				color="warning"
			>
				Team
			</Button>
			<Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
				<DialogTitle>About the team</DialogTitle>
				<DialogContent>
					<Grid container spacing={10} sx={{ p: 4 }}>
						{team.map((member) => (
							<TeamMember key={member.name} member={member} />
						))}
					</Grid>
				</DialogContent>
			</Dialog>
		</>
	);
};

const TeamMember: FC<{ member: ITeamMember }> = ({ member }) => {
	const { name, image, twitter, github } = member;

	return (
		<Grid
			container
			item
			flexDirection="column"
			alignItems="center"
			sx={{ width: "fit-content" }}
		>
			<Avatar src={image} alt={name} sx={{ height: 128, width: 128, mb: 2 }} />
			<Typography>{name}</Typography>
			<ButtonGroup>
				<IconButton href={twitter} target="_blank" rel="noopener noreferrer">
					<TwitterIcon />
				</IconButton>
				<IconButton href={github} target="_blank" rel="noopener noreferrer">
					<GitHubIcon />
				</IconButton>
			</ButtonGroup>
		</Grid>
	);
};

export default AboutDialog;
