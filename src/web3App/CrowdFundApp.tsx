/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeWeb3 } from '@/states-manager/web3Slice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function CrowdFundApp() {
  const dispatch = useDispatch();
  const { web3, accounts, isLoading, error } = useSelector((state:any) => state.web3);

  useEffect(() => {
    dispatch(initializeWeb3());
  }, [dispatch]);

  return (
    <div>
      <h1>Web3 Crowdfunding App</h1>
      {isLoading && <p>Loading Web3...</p>}
      {error && <p>Error: {error}</p>}
      {web3 && (
        <div>
          <p>Web3 is initialized</p>
          <p>Connected Account: {accounts[0]}</p>
          {/* Render your crowdfunding components here */}
        </div>
      )}
    </div>
  );
};

export default CrowdFundApp;
