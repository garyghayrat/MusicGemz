import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useAppContext } from "../../../context/AppContext";
import { Box } from "@mui/system";

import logo from "../assets/logo.png";
import AboutDialog from "../AboutDialog";

export const Header = () => {
	const { connectWallet, selectedAccount } = useAppContext();

	return (
		<>
			{/* <HeaderNotification text="" /> */}
			<header className="menu__header">
				<Box sx={{ width: "10rem" }}>
					<img src={logo} alt="logo" width="100%" />
				</Box>
				<Stack direction="row" spacing={4} alignItems="center">
					<AboutDialog />
					{selectedAccount.length === 0 ? (
						<Button onClick={connectWallet} variant="contained">
							Connect Wallet
						</Button>
					) : (
						<>
							<Typography>Wallet is connected</Typography>
						</>
					)}
				</Stack>
			</header>
		</>
	);
};
