/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Web3, Contract } from "web3";
// import { ContractFactory, types, Web3ZKsyncL2, ZKsyncPlugin, ZKsyncWallet } from "web3-plugin-zksync";
// import ABI_ZKSYNC from "./abiZKsync.mjs";

// const web3 = new Web3("wss://sepolia.era.zksync.dev/ws");
// web3.registerPlugin(new ZKsyncPlugin("wss://sepolia.era.zksync.dev/ws"));

// async function main() {
//   const wallet = new web3.ZKsync.Wallet("PRIVATE KEY");
 
//   const contract = new wallet.provider.eth.Contract(ABI_ZKSYNC, "0x467A58E95E2295f35778cF9974B46cBEf00909bd");
//   console.log(contract.methods);

//   console.log("sending");
//   const receipt = await contract.methods.contributeEth(6).send({ from: wallet.getAddress(), value: web3.utils.toWei("0.06", "ether") });
//   console.log("receipt", receipt);
//   const receive = await contract.methods.convertPointandTransfer(wallet.getAddress(), 200).send({ from: wallet.getAddress() });
//   console.log("receive", receive);
// }

// main();

// web3Setup.js
// web3Setup.js

import Web3 from 'web3';
import { ZKsyncPlugin } from 'web3-plugin-zksync';
import ABI_ZKSYN from "./abi.json"


const web3 = new Web3('wss://sepolia.era.zksync.dev/ws');
web3.registerPlugin(new ZKsyncPlugin('wss://sepolia.era.zksync.dev/ws'));

export const getContract = async (privateKey:any) => {
  const formattedPrivateKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;

  const wallet = new web3.ZKsync.Wallet(formattedPrivateKey);
  const contract = new wallet.provider.eth.Contract(ABI_ZKSYN, '0x467A58E95E2295f35778cF9974B46cBEf00909bd');
  return { wallet, contract };
};

export const interactWithContract = async (privateKey: any, name: string, purpose: string, amount: string) => {
  try {
    
    const { wallet, contract } = await getContract(privateKey);

    console.log("Contract methods:", contract.methods);

    const amountInWei = web3.utils.toWei(amount, 'ether');

    console.log("Sending transaction...");
    const receipt = await contract.methods.contributeEth(6).send({ from: await wallet.getAddress(), value: amountInWei });
    console.log("Receipt:", receipt);

    const receive = await contract.methods.convertPointandTransfer(await wallet.getAddress(), 200).send({ from: await wallet.getAddress() });
    console.log("Receive:", receive);

    return "Transaction successful!";
  } catch (error) {
    console.error("Error interacting with the contract:", error);
    throw error;
  }
};


 
