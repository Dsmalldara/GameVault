import React from 'react';
import DonationCard from './DonationCard';
// Adjust the path to where your DonationCard component is located

const PreviousCampaigns = () => {
  // Example data for previous campaigns
  const campaigns = [
    {
      id: 1,
      title: "Food Drive for Niger State",
      description: "Help provide essential food packages for those in need in Niger State. Your donations will help feed families and individuals affected by recent events.",
      targetAmount: 1000,
      raisedAmount: 750,
      progress: 75,
      imageSrc: "/working.png",
    },
    {
      id: 2,
      title: "Medical Supplies for Rural Clinics",
      description: "Support our efforts to equip rural clinics with essential medical supplies and equipment. Every donation brings us closer to saving more lives.",
      targetAmount: 5000,
      raisedAmount: 3500,
      progress: 70,
      imageSrc: "/box.png",
    },
    {
      id: 3,
      title: "Education Fund for Underprivileged Kids",
      description: "Contribute to our education fund to provide school supplies and scholarships to underprivileged children in remote areas.",
      targetAmount: 3000,
      raisedAmount: 2000,
      progress: 66,
      imageSrc: "/groceries.png",
    },
  ];

  return (
    <section>
      <h2 className="text-xl text-center font-bold mb-4">Previous Campaigns</h2>
      <div className="flex flex-wrap gap-6 items-center justify-center ">
        {campaigns.map((campaign) => (
          <DonationCard
            key={campaign.id}
            title={campaign.title}
            description={campaign.description}
            targetAmount={campaign.targetAmount}
            raisedAmount={campaign.raisedAmount}
            progress={campaign.progress}
            imageSrc={campaign.imageSrc}
          />
        ))}
      </div>
    </section>
  );
};

export default PreviousCampaigns;
