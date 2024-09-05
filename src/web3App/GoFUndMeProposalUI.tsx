/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { createGofundme } from '@/Web3/Contract1';
import { crowdfundingSchema } from './validationSchema';

const CrowdfundingForm: React.FC = () => {
  const [creator, setCreator] = useState(''); // Creator's address
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');
  const [durationTime, setDurationTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form inputs using Zod
    const result = crowdfundingSchema.safeParse({
      creator,
      title,
      description,
      fundingGoal,
      durationTime,
    });
    console.log(result);
    if (!result.success) {
      // If validation fails, set errors and stop form submission
      const validationErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err: any) => {
        validationErrors[err.path[0]] = err.message;
      });
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const privateKey = import.meta.env.VITE_LOCAL; // Ensure this is set in your environment variables
      if (!privateKey) {
        throw new Error('Private key is not set in environment variables');
      }

      // Convert fundingGoal to Wei
      const fundingGoalInWei = Number(fundingGoal) * Math.pow(10, 18); // Convert ETH to Wei
      const durationTimeInSeconds = Number(durationTime) * 86400; // Convert days to seconds

      const receiptString = await createGofundme(
        privateKey,
        creator,
        title,
        description,
        fundingGoalInWei, // Ensure this is in Wei
        durationTimeInSeconds // Ensure this is in seconds
      );
        setMessage(`Goal created successfully. Transaction receipt: ${receiptString}`);
        const txHash = JSON.parse(receiptString).transactionHash;
    } catch (error: any) {
      console.error('Error:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };f