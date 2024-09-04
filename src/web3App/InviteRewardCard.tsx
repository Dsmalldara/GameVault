import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InviteRewardCardProps {
  amount: number;
  description: string;
  onInvite: () => void;
  id: number; // Unique id for each card to apply different background colors  // Your implementation here
}
// Function to determine background color based on the card id
const getBackgroundColor = (id: number) => {
  switch (id) {
    case 1:
      return "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600";
    case 2:
      return "bg-gradient-to-br from-green-500 via-green-600 to-teal-600";
    case 3:
      return "bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600";
    default:
      return "bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700";
  }
};

const InviteRewardCard: React.FC<InviteRewardCardProps> = ({ amount, description, onInvite, id}) => {
  return (
    <Card className={` ${getBackgroundColor(id)}} w-64 h-48 rounded-3xl overflow-hidden text-white shadow-lg `}>
      <CardContent className="h-full flex flex-col justify-between p-6">
        <div>
          <h2 className="text-4xl font-bold mb-2">${amount}</h2>
          <p className="text-sm opacity-90">{description}</p>
        </div>
        <Button 
          onClick={onInvite}
          variant="secondary" 
          className="w-fit bg-white text-blue-600 hover:bg-blue-50 transition-colors rounded-full"
        >
          Invite
        </Button>
      </CardContent>
    </Card>
  );
};

export default InviteRewardCard;