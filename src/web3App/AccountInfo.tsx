/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from 'react-redux';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Wallet, AlertCircle } from "lucide-react";


const AccountInfo = () => {
  const accounts = useSelector((state:any) => state.web3.accounts);


  return (
    <Card className="w-full max-w-md mx-auto game-color mb-[2rem]">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wallet className="w-6 h-6 text-white" />
          <span className='text-white font-bold'>Account Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {accounts.length > 0 ? (
          <Alert className='game-color'>
            <Wallet className="h-4 w-4 text-green-600" />
            <AlertTitle>Connected Account</AlertTitle>
            <AlertDescription className="mt-2 font-mono text-sm break-all">
              {accounts[0]}
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className='game-color'>
            <AlertCircle className="h-4 w-4" style={{ color: 'red' }} />
            <AlertTitle className='text-white'>No Account Connected</AlertTitle>
            <AlertDescription className='text-white'>
              Please connect your wallet to view account information.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountInfo;