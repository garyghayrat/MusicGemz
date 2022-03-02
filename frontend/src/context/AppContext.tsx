import React, { createContext, useContext, useState, useEffect } from "react";

import { ethers } from "ethers";

import Fallback from "../components/Fallback";

declare global {
	interface Window {
		ethereum: any;
	}
}

const AppContext = createContext({});

const AppContextProvider: React.FC = ({ children }) => {
	const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState<string>();

	useEffect(() => {
		if (window.ethereum) {
			setIsMetamaskInstalled(true);
		}
	}, []);

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

	return (
		<AppContext.Provider value={{}}>
			{!isMetamaskInstalled ? <Fallback /> : children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
