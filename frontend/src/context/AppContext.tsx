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
	allSongs: Array<any>;
}

const AppContext = createContext<IAppContext>({
	isMetamaskInstalled: false,
	connectWallet: () => {},
	selectedAccount: "",
	allSongs: [],
});

const AppContextProvider: React.FC = ({ children }) => {
	const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState("");
	const [gemz, setGemz] = useState<Contract>();
	let allSongs: any[] = [];

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

	useEffect(() => {
		const getFile = async () => {
			if (gemz) {
				// couldn't figure out how to find the number of objects in the contract
				// so just ecaped loop once we get out of bounds
				let stillReading = true;
				let i = 0;
				while (stillReading) {
					try {
						const file = await gemz.files(i);
						console.log(file);
						const currentSong = {
							id: file.fileID.toNumber(),
							artistAddr: file.artistAddr,
							artistName: file.artistName,
							songTitle: file.fileName,
							genre: file.genre,
							songFile: file.coverHash,
							coverPhoto: file.fileHash,
						}
						allSongs.push(currentSong);
						i++;
					} catch (error) {
						stillReading = false;
					}
					
				}
			}
		};
		getFile();
	}, [gemz]);

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
		gemz,
		isMetamaskInstalled,
		connectWallet,
		selectedAccount,
		allSongs,
	};

	return (
		<AppContext.Provider value={value}>
			{!isMetamaskInstalled ? <Fallback /> : children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
