import React, { createContext, useContext, useState, useEffect } from "react";

import { ethers } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";

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

			const checkConnection = async () => {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const accounts = await provider.listAccounts();
				if (accounts !== null && accounts.length > 0) {
					setSelectedAccount(accounts[0]);
				}
			};
			if (selectedAccount.length === 0) {
				checkConnection();
			}
		}
	}, [selectedAccount.length]);

	const connectWallet = async () => {
		const [selectedAccount] = (await window.ethereum.request({
			method: "eth_requestAccounts",
		})) as string[];

		if (selectedAccount) {
			setSelectedAccount(selectedAccount);
		}
	};

	// const _initializeEthers = async () => {
	// 	const _provider = new ethers.providers.Web3Provider(window.ethereum);
	// 	const _signer = _provider.getSigner(selectedAccount);

	// 	console.log(_provider);
	// 	console.log(_signer);

	// 	const _zinx = new ethers.Contract(
	// 		contractAddress.Zinx,
	// 		ZinxArtifact.abi,
	// 		_signer._address ? _signer : _provider
	// 	);

	// 	setZinx(_zinx);
	// };

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
