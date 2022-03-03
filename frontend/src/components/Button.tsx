import React from "react";
import { useAppContext } from "../context/AppContext";

export const Button = () => {
	const { connectWallet, selectedAccount } = useAppContext();
	return (
		<div className="Button">
			<button onClick={connectWallet}>Connect Wallet</button>
			{selectedAccount.length === 0 ? (
				<p>please connect your wallet </p>
			) : (
				<p>wallet is connected to {selectedAccount}</p>
			)}
		</div>
	);
};
