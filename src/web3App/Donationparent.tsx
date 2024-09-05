
import DonationCard from './DonationCard'
import { DonationArray } from './Web3Utils'

function Donationparent() {
  return (
    <div className='flex pl-[1rem] pr-[1rem] flex-row items-center justify-center gap-7 flex-wrap'>
       {DonationArray.map((value, index) => (
        <DonationCard key={index} {...value} />
      ))}
    </div>
  )
}

export default Donationparent