import Web3 from 'web3';
import { Provider, Contract } from 'zksync-web3';
import abiResponse from './abi.json'; // Ensure this path is correct

// Parse the ABI from the response
const contractABI = JSON.parse(abiResponse.result);

const zkSyncTestnetRPC = 'https://sepolia.era.zksync.dev';
const web3WS = new Web3('wss://sepolia.era.zksync.dev/ws');
const contractAddress = '0x467A58E95E2295f35778cF9974B46cBEf00909bd';

const zkSyncProvider = new Provider(zkSyncTestnetRPC);

// Use the parsed ABI
const web3Contract = new web3WS.eth.Contract(contractABI, contractAddress);
const zkSyncContract = new Contract(contractAddress, contractABI, zkSyncProvider);

async function interactWithContract() {
  try {
    const networkId = await web3WS.eth.net.getId();
    console.log('Connected to network ID:', networkId);

    const methods = Object.keys(web3Contract.methods).filter(key => typeof web3Contract.methods[key] === 'function');
    console.log('Available methods:', methods);

  } catch (error) {
    console.error('Error interacting with contract:', error);
  }
}

(async () => {
  try {
    console.log('Attempting to connect to zkSync testnet...');
    await interactWithContract();
  } catch (error) {
    console.error('Error:', error);
  }
})();

export { web3Contract, zkSyncContract, zkSyncProvider, web3WS, interactWithContract };