const path = require("path");
const hre = require("hardhat");

async function main() {
	// We get the contract to deploy
	const Gemz = await hre.ethers.getContractFactory("Gemz");
	const gemz = await Gemz.deploy();

	await gemz.deployed();

	console.log("MusicGemz deployed to:", gemz.address);
	saveFrontendFiles(gemz);
}

function saveFrontendFiles(gemz) {
	const fs = require("fs");
	const contractsDir = path.join(__dirname, "..", "frontend", "contracts");

	if (!fs.existsSync(contractsDir)) {
		fs.mkdirSync(contractsDir);
	}

	fs.writeFileSync(
		contractsDir + "/contract-address.json",
		JSON.stringify({ Gemz: gemz.address }, undefined, 2)
	);

	const GemzArtifacts = hre.artifacts.readArtifactSync("Gemz");

	fs.writeFileSync(
		contractsDir + "/Gemz.json",
		JSON.stringify(GemzArtifacts, null, 2)
	);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
