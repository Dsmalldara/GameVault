/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { interactWithContract } from '@/Web3/Contract1';
import { crowdfundingSchema } from './validationSchema'

// const Web3 = require('web3');
// const web3 = new Web3();

// // Generate a new account
// const account = web3.eth.accounts.create();

// console.log("Private Key:", account.privateKey);
// console.log("Public Address:", account.address);
const CrowdfundingForm: React.FC = () => {
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [amount, setAmount] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form inputs using Zod
    const result = crowdfundingSchema.safeParse({
      name,
      purpose,
      amount,
      timeframe,
    });

    if (!result.success) {
      // If validation fails, set errors and stop form submission
      const validationErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err:any) => {
        validationErrors[err.path[0]] = err.message;
      });
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const privateKey =  `${import.meta.env.VITE_LOCAL}`; // Replace with actual private key
      const resultMessage = await interactWithContract(privateKey, name, purpose, amount);
      setMessage(resultMessage);
    } catch (error: any) {
      console.error('Error:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto game-color">
      <CardHeader>
        <CardTitle className='text-white font-bold'>Create Crowdfunding Goal</CardTitle>
        <CardDescription className='text-white font-light'>Fill in the details to start your crowdfunding campaign</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className='text-white font-bold'>Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Campaign Name" className='text-white placeholder:text-white' />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="purpose" className='text-white font-bold'>Purpose</Label>
            <Input id="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Campaign Purpose" className='text-white placeholder:text-white' />
            {errors.purpose && <p className="text-red-500">{errors.purpose}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount" className='text-white font-bold'>Amount (ETH)</Label>
            <Input id="amount" type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className='text-white placeholder:text-white' />
            {errors.amount && <p className="text-red-500">{errors.amount}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeframe" className='text-white font-bold'>Timeframe (days)</Label>
            <Input id="timeframe" type="number" value={timeframe} onChange={(e) => setTimeframe(e.target.value)} placeholder="30" className='text-white placeholder:text-white' />
            {errors.timeframe && <p className="text-red-500">{errors.timeframe}</p>}
          </div>
          <Button type="submit" className="w-full button-progress" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Goal'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {message && (
          <Alert variant={message.startsWith('Error') ? 'destructive' : 'default'} className="w-full">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
};

export default CrowdfundingForm;
