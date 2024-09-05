import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Art from '/Art.png';
import Health from '/Health.png';
import StartUp from '/Startup.png';
import Education from '/Education.png';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAllCampaignsCount } from '@/Web3/Contract1';
const images = [
  Art,
  Health,
  StartUp,
  Education,
]

function CrowdFundingCategory() {
  const [totalCampaigns, setTotalCampaigns] = useState<number | null>(null);
  // const [currentCampaignId, setCurrentCampaignId] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCampaignCount = async () => {
      try {
        setLoading(true);
        const count = await getAllCampaignsCount();
        setTotalCampaigns(count);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignCount();
  }, []);
  return (
    <div className='md:space-y-8 space-y-4 mt-8 md:mt-[2rem]'>
      <div className='hidden'>
        {loading} {error}
      </div>
     <div className='text-center justify-center items-center flex'>
     <h1 >
        We have   <Label htmlFor="campaignCount">Total Campaigns:</Label>
          <Input
            id="campaignCount"
            value={totalCampaigns !== null ? totalCampaigns.toString() : 'Loading...'}
            readOnly
            className="w-fit"
          />
      </h1>
    
     </div>
     <Button className="w-fit rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center mx-auto">
          <Link to="/crowdfunding-form">
          Create GoFundMe
          </Link>
          </Button>
     <p className='text-start pl-[0.6rem] md:pl-[3rem] text-white text-base font-bold mt-4'>
        CrowdFunding category
      </p>
      <div className='mb-[2rem] items-center justify-center md:pl-[1rem] overflow-x-auto custom-scrollbar'>
        <div className='flex gap-4 md:gap-8 items-center md:justify-center justify-start cursor-pointer'>
          {images.map((image, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[8rem] md:w-[12rem] overflow-hidden"
            >
              <img 
                src={image} 
                className='w-full h-auto object-cover' 
                alt='Crowdfunding category' 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CrowdFundingCategory;
