/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Web3 from 'web3';

// Extend the Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<void>;
    };
    web3?: any;
  }
}

interface Web3State {
  web3: Web3 | null;
  accounts: string[];
  isLoading: boolean;
  error: string | null;
}

interface Web3Payload {
  web3: Web3;
  accounts: string[];
}

// Async thunk to initialize Web3
export const initializeWeb3 = createAsyncThunk<Web3Payload, void, { rejectValue: string }>(
  'web3/initializeWeb3',
  async (_, { rejectWithValue }) => {
    try {
      let web3: Web3;
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access
      } else if (window.web3) {
        // Legacy dapp browsers...
        web3 = new Web3(window.web3.currentProvider);
      } else {
        // Non-dapp browsers...
        const provider = new Web3.providers.HttpProvider('http://localhost:5173');
        web3 = new Web3(provider);
      }

      const accounts = await web3.eth.getAccounts();
      return { web3, accounts };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: Web3State = {
  web3: null,
  accounts: [],
  isLoading: false,
  error: null,
};

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeWeb3.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeWeb3.fulfilled, (state, action: PayloadAction<Web3Payload>) => {
        state.isLoading = false;
        // state.web3 = action.payload.web3;
        state.accounts = action.payload.accounts;
      })
      .addCase(initializeWeb3.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'An unknown error occurred';
      });
  },
});

export default web3Slice.reducer;