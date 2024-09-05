import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FunderOutput, getFunderInfo } from '@/Web3/Contract1';


interface FunderInfoProps {
  funderId: number;
}

const FunderInfo: React.FC<FunderInfoProps> = ({ funderId }) => {
  const [funderInfo, setFunderInfo] = useState<FunderOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFunderInfo = async () => {
      try {
        setLoading(true);
        const info = await getFunderInfo(funderId);
        setFunderInfo(info);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setFunderInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFunderInfo();
  }, [funderId]);

  if (loading) {
    return <div>Loading funder information...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!funderInfo) {
    return <div>No funder information available.</div>;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Funder Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <Label>ID:</Label>
            <div>{funderInfo.id_}</div>
          </div>
          <div>
            <Label>Title:</Label>
            <div>{funderInfo.title}</div>
          </div>
          <div>
            <Label>Description:</Label>
            <div>{funderInfo.description}</div>
          </div>
          <div>
            <Label>Funding Goal:</Label>
            <div>{funderInfo.fundingGoal} ETH</div>
          </div>
          <div>
            <Label>Owner:</Label>
            <div>{funderInfo.owner}</div>
          </div>
          <div>
            <Label>Start Time:</Label>
            <div>{new Date(parseInt(funderInfo.startTime) * 1000).toLocaleString()}</div>
          </div>
          <div>
            <Label>Duration:</Label>
            <div>{parseInt(funderInfo.durationTime) / 86400} days</div>
          </div>
          <div>
            <Label>Status:</Label>
            <div>{funderInfo.isActive ? 'Active' : 'Inactive'}</div>
          </div>
          <div>
            <Label>Current Balance:</Label>
            <div>{funderInfo.fundingBalance} ETH</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FunderInfo;