import React from 'react'
import DonationModal from './DonationModal'
import RecentDontation from './RecentDonation'
import Donationparent from './Donationparent'
import PreviousCampaigns from './PreviousCampaigns'
import InviteRewardCard from './InviteRewardCard'
import { cardData } from './Web3Utils'
import CrowdFundingCategory from './CrowdFundingCategory'
import wallet from '/wallet.png'
function CrowdFunding() {
    const handleInvite = () => {
        console.log('Invite button clicked');
      };
      const walletBalance = 26.65
  return (
    <section className="text-white">
       <div className='pt-[2.5rem]'>
        <RecentDontation />
        </div>
        <div className="container justify-between flex  mx-auto px-4 md:w-[70%] pt-[1.5rem]">
          
        <span className="border border-white rounded-full game-color px-4  flex items-center justify-center">
  <p className="m-0">L</p>
</span>

                <h2 className=" font-bold game-color px-2 py-1 rounded-full flex flex-row  ">  <img src={wallet} className='h-6 w-10 object-contain' alt="" />  <p className='text-sm font-sans'>GMV {walletBalance}</p></h2>
            
        </div>
        <div>
            <CrowdFundingCategory/>
        </div>
        <div className='mt-[1.5rem] flex items-center justify-center md:mb-6  mb-[2rem] '>
            <DonationModal/>
        </div>
        <div>
            <Donationparent/>
        </div>
        <div className='flex flex-wrap gap-6 mt-[1.5rem] justify-center items-center'>
        <PreviousCampaigns/>
        </div>
        <div className="p-4 flex md:gap-8 gap-4 items-center justify-center flex-wrap">
      {cardData.map((card) => (
        <InviteRewardCard
          key={card.id}
          amount={card.amount}
          description={card.description}
          onInvite={handleInvite}
          id={card.id}
        />
      ))}
    </div>
    </section>
  )
}

export default CrowdFunding