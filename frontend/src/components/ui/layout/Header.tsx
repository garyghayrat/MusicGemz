import React from "react";
import { Button } from "../atoms/Button";
import { useAppContext } from "../../../context/AppContext";
import { HeaderNotification } from "./HeaderNotification";

export const Header = () => {
	const { connectWallet, selectedAccount } = useAppContext();

	/*
	<nav>
		<ul>
			<li>
				<a href="#">Browse Songs</a>
			</li>
			<li>
				<a href="#">Upload song</a>
			</li>
		</ul>
	</nav>
	*/
	return (
		<>
			<HeaderNotification text="" />
			<header className="menu__header">
				{selectedAccount.length === 0 ? (
					<Button
						onClick={connectWallet}
						title="Connect Wallet"
						buttonClass="btn-primary"
						fontWeight="500"
						fontSize="1.318rem"
					/>
				) : (
					<Button
						onClick={() => {}}
						title="Wallet Is Connected"
						buttonClass="btn-primary"
						fontWeight="500"
						fontSize="1.318rem"
					/>
				)}
			</header>
		</>
	);
};
