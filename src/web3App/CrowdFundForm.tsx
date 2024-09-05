/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { z } from 'zod';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createGofundme } from '@/Web3/Contract1';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

// Schemas remain the same
const crowdfundingSchema = z.object({
  creator: z.string().min(1, 'Creator is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  fundingGoal: z.string().min(1, 'Funding goal is required'),
  durationTime: z.string().min(1, 'Duration time is required'),
});

const proposalSchema = z.object({
  title: z.string().min(1, 'Proposal title is required'),
  description: z.string().min(1, 'Proposal description is required'),
  amount: z.string().min(1, 'Proposal amount is required'),
  recipient: z.string().min(1, 'Recipient address is required'),
});

const CrowdfundingForm = () => {
  // State remains the same
  const [creator, setCreator] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');
  const [durationTime, setDurationTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [proposalAmount, setProposalAmount] = useState('');
  const [proposalRecipient, setProposalRecipient] = useState('');
  const [txHash, setTxHash] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage('');

    const result = crowdfundingSchema.safeParse({
      creator,
      title,
      description,
      fundingGoal,
      durationTime,
    });

    if (!result.success) {
      const validationErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err: any) => {
        validationErrors[err.path[0]] = err.message;
      });
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const privateKey = import.meta.env.VITE_LOCAL;
      if (!privateKey) {
       
        throw new Error('Private key is not set in environment variables');
       
      }

      const fundingGoalInWei = Number(fundingGoal) * Math.pow(10, 18);
      const durationTimeInSeconds = Number(durationTime) * 86400;

      const receiptString = await createGofundme(
        privateKey,
        creator,
        title,
        description,
        fundingGoalInWei,
        durationTimeInSeconds
      );
      const receipt = JSON.parse(receiptString);
      console.log(receipt)
      setTxHash(receipt.transactionHash);
      setMessage(`GoFundMe campaign created successfully. Transaction hash: ${receipt.transactionHash}`);
      setShowProposalForm(true);
    } catch (error: any) {
      console.error('Error:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const onProposalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage('');

    const result = proposalSchema.safeParse({
      title: proposalTitle,
      description: proposalDescription,
      amount: proposalAmount,
      recipient: proposalRecipient,
    });

    if (!result.success) {
      const validationErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err: any) => {
        validationErrors[err.path[0]] = err.message;
      });
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const privateKey = import.meta.env.VITE_LOCAL;
      if (!privateKey) {
        throw new Error('Private key is not set in environment variables');
      }
    

    } catch (error: any) {
      console.error('Error:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (<div>
        {message && (
          <Alert variant={message.startsWith('Error') ? 'destructive' : 'default'} className="w-full">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
    {!showProposalForm ? (
    <Card className="w-full max-w-md mx-auto game-color">
      <CardHeader>
        <CardTitle className='text-white font-bold'>Create Crowdfunding Goal</CardTitle>
        <CardDescription className='text-white font-light'>Fill in the details to start your crowdfunding campaign</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="creator" className='text-white font-bold'>Creator Address</Label>
            <Input
              id="creator"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              placeholder="0x123...abc"
              className='text-white  placeholder:text-slate-400'
            />
            {errors.creator && <p className="text-red-500">{errors.creator}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="title" className='text-white font-bold'>Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Campaign Title"
              className='text-white  placeholder:text-slate-400'
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className='text-white font-bold'>Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Campaign Description"
              className='text-white placeholder:text-slate-400'
            />
            {errors.description && <p className="text-red-500">{errors.description}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="fundingGoal" className='text-white font-bold'>Funding Goal (ETH)</Label>
            <Input
              id="fundingGoal"
              type="number"
              step="0.01"
              value={fundingGoal}
              onChange={(e) => setFundingGoal(e.target.value)}
              placeholder="0.00"
              className='text-white  placeholder:text-slate-400'
            />
            {errors.fundingGoal && <p className="text-red-500">{errors.fundingGoal}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="durationTime" className='text-white font-bold'>Duration (days)</Label>
            <Input
              id="durationTime"
              type="number"
              value={durationTime}
              onChange={(e) => setDurationTime(e.target.value)}
              placeholder="30"
              className='text-white  placeholder:text-slate-400'
            />
            {errors.durationTime && <p className="text-red-500">{errors.durationTime}</p>}
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
    </Card>)
:     <Card className="w-full max-w-md mx-auto game-color">
<CardHeader>
  <CardTitle>Create Proposal</CardTitle>
  <CardDescription className="text-white">Fill in the details to create a new proposal</CardDescription>
</CardHeader>

  <CardContent className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="proposalTitle"  className="text-white">Proposal Title</Label>
      <Input
        id="proposalTitle"
        value={proposalTitle}
        onChange={(e) => setProposalTitle(e.target.value)}
        className="border-[#e8eaec] focus:ring-[#c1c3c4] text-white"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
    </div>
    <div className="space-y-2">
      <Label htmlFor="proposalDescription"  className="text-white">Proposal Description</Label>
      <Textarea
        id="proposalDescription"
        value={proposalDescription}
        onChange={(e) => setProposalDescription(e.target.value)}
        className="border-[#3498db] focus:ring-[#2980b9] text-white"
      />
      {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
    </div>
    <div className="space-y-2">
      <Label htmlFor="proposalAmount" className="text-white">Proposal Amount (ETH)</Label>
      <Input
        id="proposalAmount"
        type="number"
        step="0.01"
        value={proposalAmount}
        onChange={(e) => setProposalAmount(e.target.value)}
        className="border-[#e6e8e9] focus:ring-[#e4e8ea] text-white"
      />
      {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
    </div>
    <div className="space-y-2">
      <Label htmlFor="proposalRecipient"  className="text-white">Recipient Address</Label>
      <Input
        id="proposalRecipient"
        value={proposalRecipient}
        onChange={(e) => setProposalRecipient(e.target.value)}
        className="border-[#f2f4f6] focus:ring-[#eff1f2] text-white"
      />
      {errors.recipient && <p className="text-red-500 text-sm">{errors.recipient}</p>}
      {txHash}
    </div>
  </CardContent>
  <CardFooter>
    <Button type="submit" onClick={onProposalSubmit} disabled={loading} className="w-full bg-[#3498db] hover:bg-[#2980b9] text-white">
      {loading ? 'Creating Proposal...' : 'Create Proposal'}
    </Button>
  </CardFooter>
</Card>
}
    </div>
  );
};

export default CrowdfundingForm;

