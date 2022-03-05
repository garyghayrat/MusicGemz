import React, { createContext, useContext, useState, useEffect } from "react";
import { Contract, ethers } from "ethers";

import Fallback from "../components/Fallback";
import contractAddress from "../contracts/contract-address.json";
import gemzArtifacts from "../contracts/Gemz.json";

declare global {
	interface Window {
		ethereum: any;
	}
}
interface IAppContext {
	isMetamaskInstalled: boolean;
	connectWallet: () => void;
	selectedAccount: string;
	gemz?: Contract;
}

const AppContext = createContext<IAppContext>({
	isMetamaskInstalled: false,
	connectWallet: () => {},
	selectedAccount: "",
});

const AppContextProvider: React.FC = ({ children }) => {
	const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState("");
	const [gemz, setGemz] = useState<Contract>();

	useEffect(() => {
		const getData = async () => {
			if (gemz) {
				const data = await gemz.owner();
				console.log(data);
			}
		};

		getData();
	}, [gemz]);

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

	console.log(gemz);

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

		// get gemz contract instance
		const gemzContract = new ethers.Contract(
			contractAddress.Gemz,
			gemzArtifacts.abi,
			signer._address ? signer : provider
		);

		setGemz(gemzContract);

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
