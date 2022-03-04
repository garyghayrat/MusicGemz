import React from "react";
import { useAppContext } from "../context/AppContext";

// Temporarily test persistent wallet connections via this button
export const ButtonConnectWallet = () => {
	const { connectWallet, selectedAccount } = useAppContext();
    
	return (
		<div className="Button">
			<button onClick={connectWallet} >Connect Wallet</button>
			{selectedAccount.length === 0 ? (
				<p>please connect your wallet </p>
			) : (
				<p>wallet is connected to {selectedAccount}</p>
			)}
        </div>
	);
};
