/* eslint-disable @typescript-eslint/no-explicit-any */
import { Web3} from "web3";
import {  ZKsyncPlugin } from "web3-plugin-zksync";
import ABI_ZKSYNC from "./abiZksync"
import { keccak256 } from 'ethers';

const web3 = new Web3("wss://sepolia.era.zksync.dev/ws");
web3.registerPlugin(new ZKsyncPlugin("wss://sepolia.era.zksync.dev/ws"));

async function interactWithContract(privateKey: string) {
  console.log(ABI_ZKSYNC);
  try {
    const formattedPrivateKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
    const wallet = new web3.ZKsync.Wallet(formattedPrivateKey);

    if (!wallet.provider) {
      throw new Error("Provider is undefined");
    }
    
    const contract = new wallet.provider.eth.Contract(
      ABI_ZKSYNC,
      "0x467A58E95E2295f35778cF9974B46cBEf00909bd"
    );

    console.log(contract.methods);
    console.log("sending");

    const receipt = await contract.methods
      .contributeEth(6)
      .send({ from: wallet.getAddress(), value: web3.utils.toWei("0.06", "ether") });

    console.log("receipt", receipt);

    const receive = await contract.methods
      .convertPointandTransfer(wallet.getAddress(), 200)
      .send({ from: wallet.getAddress() });

    console.log("receive", receive);

    return "Contract interaction successful!";
  } catch (error: any) {
    console.error('Error:', error);
    throw new Error(`Error: ${error.message}`);
  }
}

export { interactWithContract };


// Define the TypeScript interface for the ABI
async function createGofundme(
  privateKey: string,
  creator: string,
  title: string,
  description: string,
  fundingGoal: number,
  durationTime: number
): Promise<any> {
  try {
    // Format the private key
    const formattedPrivateKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;

    // Initialize Web3 and register the ZKSync plugin
    const web3 = new Web3("wss://sepolia.era.zksync.dev/ws");
    web3.registerPlugin(new ZKsyncPlugin("wss://sepolia.era.zksync.dev/ws"));

    // Create the contract instance
    const contract = new web3.eth.Contract(ABI_ZKSYNC as any, "0x467A58E95E2295f35778cF9974B46cBEf00909bd");

    // Validate duration and funding goal
    if (durationTime < 86400) {
      throw new Error("Duration must be at least 1 day (86,400 seconds)");
    }

    if (fundingGoal < Number(web3.utils.toWei("0.02", "ether"))) {
      throw new Error("Funding goal must be at least 0.02 Ether");
    }

    // Create wallet using private key
    const account = web3.eth.accounts.privateKeyToAccount(formattedPrivateKey);
    web3.eth.accounts.wallet.add(account);

    // Call the contract method
    const receipt = await contract.methods.createGofundme(
      creator,
      title,
      description,
      fundingGoal,
      durationTime
    ).send({ from: account.address });

    // Convert BigInt values in receipt to strings
    const formatBigInt = ( value: any) => {
      if (typeof value === 'bigint') {
        return value.toString();
      }
      return value;
    };

    // Serialize the receipt with BigInt values converted to strings
    const formattedReceipt = JSON.stringify(receipt, formatBigInt);

    console.log("createGofundme transaction sent");
    return formattedReceipt;
  } catch (error: any) {
    console.error('Error in createGofundme:', error);
    throw new Error(`Error: ${error.message}`);
  }
}

export { createGofundme };

interface ZKSyncContract {
  methods: {
    voteOnProposal(id: number, proposal: string): {
      send(options: { from: string }): Promise<any>;
    };
    createProposal(id: number, proposal: string): {
      send(options: { from: string }): Promise<any>;
    };
    getAllCampaignsCount(): {
      call(): Promise<string>;
    };
    getContribution(id: number, contributor: string): {
      call(): Promise<number>;
    };
    activeCampaignsIds(id: number): {
      call(): Promise<string>;
    };
    funder(id: number): {
      call(): Promise<FunderOutput>;
    };
  };
}


const contract = new web3.eth.Contract(ABI_ZKSYNC, "0x467A58E95E2295f35778cF9974B46cBEf00909bd") as unknown as ZKSyncContract;

export async function voteOnProposal(privateKey: string, id: number, proposalHash: string): Promise<any> {
  try {
    const wallet = new web3.ZKsync.Wallet(privateKey);
    const vote = await contract.methods.voteOnProposal(id, proposalHash).send({ from: await wallet.getAddress() });
    console.log("vote", vote);
    return vote;
  } catch (error: any) {
    console.error('Error in voteOnProposal:', error);
    throw new Error(`Error in voteOnProposal: ${error.message}`);
  }
}

// export async function createProposal(privateKey: string, id: number, proposalHash: string): Promise<any> {
//   try {
//     const formattedPrivateKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
//     const wallet = new web3.ZKsync.Wallet(formattedPrivateKey);
  

//     const props = await contract.methods.createProposal(id, proposalHash).send({ 
//       from: await wallet.getAddress() 
//     });

//     console.log("props", props);
//     return props;
//   } catch (error: any) {
//     console.error('Error in createProposal:', error);
//     throw new Error(`Error in createProposal: ${error.message}`);
//   }
// }
export async function createProposal(privateKey: string, id: number, proposalHash: string): Promise<any> {
  try {
    const formattedPrivateKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
    const wallet = new web3.ZKsync.Wallet(formattedPrivateKey);
  
    const props = await contract.methods.createProposal(id, proposalHash).send({ 
      from: await wallet.getAddress() 
    });

    console.log("props", props);
    return props;
  } catch (error: any) {
    console.error('Error in createProposal:', error);
    throw new Error(`Error in createProposal: ${error.message}`);
  }
}









//read functions
async function getContribution(
  id: number,
  contributor: string
): Promise<number> {

  const contract = new web3.eth.Contract(ABI_ZKSYNC, "0x467A58E95E2295f35778cF9974B46cBEf00909bd") as unknown as ZKSyncContract;

  try {
    const contribution = await contract.methods.getContribution(id, contributor).call();
    return contribution
  } catch (error) {
    console.error('Error:', error);
    throw new Error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export { getContribution };




export async function getAllCampaignsCount(): Promise<number> {
  try {
    const count = await contract.methods.getAllCampaignsCount().call();
    console.log("Total campaigns count:", count);
    return parseInt(count, 10);
  } catch (error: unknown) {
    console.error('Error in getAllCampaignsCount:', error);
    if (error instanceof Error) {
      throw new Error(`Error in getAllCampaignsCount: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred in getAllCampaignsCount');
    }
  }
}

async function getActiveCampaignIds(id: number): Promise<string> {


  const contract = new web3.eth.Contract(ABI_ZKSYNC, "0x467A58E95E2295f35778cF9974B46cBEf00909bd") as unknown as ZKSyncContract;

  try {
    const result = await contract.methods.activeCampaignsIds(id).call();
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(`Error in getActiveCampaignIds: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export { getActiveCampaignIds };

interface FunderOutput {
  id_: string;
  title: string;
  description: string;
  fundingGoal: string;
  owner: string;
  startTime: string;
  durationTime: string;
  isActive: boolean;
  fundingBalance: string;
}


async function getFunderInfo(id: number): Promise<FunderOutput> {

  const contract = new web3.eth.Contract(ABI_ZKSYNC, "0x467A58E95E2295f35778cF9974B46cBEf00909bd") as unknown as ZKSyncContract;

  try {
    const result = await contract.methods.funder(id).call();
    return {
      id_: result.id_.toString(),
      title: result.title,
      description: result.description,
      fundingGoal: result.fundingGoal.toString(),
      owner: result.owner,
      startTime: result.startTime.toString(),
      durationTime: result.durationTime.toString(),
      isActive: result.isActive,
      fundingBalance: result.fundingBalance.toString()
    };
  } catch (error) {
    console.error('Error:', error);
    throw new Error(`Error in getFunderInfo: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export type { FunderOutput };
export { getFunderInfo };





export function generateProposalHash(
  title: string,
  description: string,
  amount: number,
  recipient: string
): string {
  try {
    // Convert amount to wei
    const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

    // Concatenate the proposal details
    const proposalDetails = web3.utils.encodePacked(
      { type: 'string', value: title },
      { type: 'string', value: description },
      { type: 'uint256', value: amountInWei },
      { type: 'address', value: recipient }
    );

    // Generate keccak256 hash of the proposal details
    const proposalHash = keccak256(proposalDetails);

    return proposalHash;
  } catch (error: any) {
    console.error('Error in generateProposalHash:', error);
    throw new Error(`Failed to generate proposal hash: ${error.message}`);
  }
}

// Us