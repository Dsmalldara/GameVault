/* eslint-disable @typescript-eslint/no-explicit-any */
// import { initializeWeb3 } from '@/states-manager/web3Slice';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';


// function CrowdFundApp() {
//   const dispatch = useDispatch();
//   const { web3, accounts, isLoading, error } = useSelector((state:any) => state.web3);

//   useEffect(() => {
//     dispatch(initializeWeb3());
//   }, [dispatch]);

//   return (
//     <div>
//       <h1>Web3 Crowdfunding App</h1>
//       {isLoading && <p>Loading Web3...</p>}
//       {error && <p>Error: {error}</p>}
//       {web3 && (
//         <div>
//           <p>Web3 is initialized</p>
//           <p>Connected Account: {accounts[0]}</p>
//           {/* Render your crowdfunding components here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CrowdFundApp;
import { FunderOutput, getFunderInfo } from '@/Web3/Contract1';
import React, { useEffect, useState } from 'react';


const FunderDetails: React.FC<{ id: number }> = ({ id }) => {
  const [funder, setFunder] = useState<FunderOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFunderInfo() {
      try {
        const data = await getFunderInfo(id);
        setFunder(data);
      } catch (err) {
        setError('Failed to fetch funder information.');
        console.error(err);
      }
    }

    fetchFunderInfo();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!funder) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{funder.title}</h1>
      <p>{funder.description}</p>
      <p>Funding Goal: {funder.fundingGoal}</p>
      {/* Render other funder details */}
    </div>
  );
};

export default FunderDetails;

