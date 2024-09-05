
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
function RecentDonation() {
  const donations = [
    { id: 1, donor: '0x4328...6c2b', amount: 4.72, cause: 'food relief package' },
    { id: 2, donor: '0x7891...3d4e', amount: 6.50, cause: 'medical supplies' },
    { id: 3, donor: '0x2345...9f0g', amount: 5.95, cause: 'education fund' },
  ];
  return (
    <div>
      <div className='flex flex-row gap-8 overflow-hidden mb-[2rem] items-center justify-center pl-[0.5rem] md:pl-[1rem] cursor-pointer'>
        <div className='flex flex-row gap-8'>
          <p className=''> <p className='flex flex-row gap-2 text-[0.7rem] flex-wrap'>
          {donations.map((donation) => (
              <div key={donation.id} className="flex items-center space-x-2 text-sm p-border">
                <Badge  className="flex-shrink-0 bg-transparent text-[0.7rem]">
                  @{donation.donor}
                </Badge>
                <span className='text-[0.7rem] '>donated GMV {donation.amount.toFixed(2)}</span>
                <ArrowRight className="h-4 w-4" />
                <span className="font-medium text-[0.7rem] hidden md:block">{donation.cause}</span>
              </div>
            ))}
          </p>
          </p>
      </div>
      </div>
    </div>
  )
}

export default RecentDonation