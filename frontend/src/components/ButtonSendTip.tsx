import { ethers } from "ethers";

function SendTransaction() {
   (async () => {
       //use rinkeby faucet
       const connection = new ethers.providers.JsonRpcProvider("getFromQUickNode");

       const gasPrice = connection.getGasPrice();
       const wallet = ethers.Wallet.fromMnemonic('wallet seed phrase');
   })
};