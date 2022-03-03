import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

import Fallback from "../components/Fallback";

declare global {
	interface Window {
		ethereum: any;
	}
}
interface IAppContext {
	isMetamaskInstalled: boolean;
	connectWallet: () => void;
	selectedAccount: string;
}

const AppContext = createContext<IAppContext>({
	isMetamaskInstalled: false,
	connectWallet: () => {},
	selectedAccount: "",
});

const AppContextProvider: React.FC = ({ children }) => {
	const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState("");

	useEffect(() => {
		if (window.ethereum) {
			setIsMetamaskInstalled(true);
		}
		_initializeContract();
	}, [selectedAccount]);

	const connectWallet = async () => {
		const [selectedAccount] = (await window.ethereum.request({
			method: "eth_requestAccounts",
		})) as string[];

		if (selectedAccount) {
			setSelectedAccount(selectedAccount);
		}
	};

	const _initializeContract = async () => {
		let provider: any;

		if (window.ethereum) {
			provider = new ethers.providers.Web3Provider(window.ethereum);
		} else {
			provider = new ethers.providers.JsonRpcProvider(
				process.env.REACT_APP_POLYGON_URL
			);
		}

		const signer = provider.getSigner(
			selectedAccount ? selectedAccount : undefined
		);

		const accounts = await provider.listAccounts();
		if (accounts !== null && accounts.length > 0) {
			setSelectedAccount(accounts[0]);
		}
	};

	const value = {
		isMetamaskInstalled,
		connectWallet,
		selectedAccount,
	};

	return (
		<AppContext.Provider value={value}>
			{!isMetamaskInstalled ? <Fallback /> : children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
