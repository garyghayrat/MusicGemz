import { Web3Storage } from "web3.storage";

const useWeb3Storage = () => {
	const storageClient = new Web3Storage({
		token: process.env.REACT_APP_WEB3_STORAGE!,
	});

	const uploadFiles = async (files: File[]) => {
		const cid = await storageClient.put(files);
		// this returns cid for the directory containing the files
		return cid;
	};

	const getFiles = async (cid: string) => {
		const res = await storageClient.get(cid);
		if (res && !res.ok) {
			console.log("Error getting files");
			return;
		}

		return res?.files();
	};

	return {
		getFiles,
		uploadFiles,
		storageClient,
	};
};

export default useWeb3Storage;
