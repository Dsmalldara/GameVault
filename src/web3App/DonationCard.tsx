import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Reusable DonationCard component
interface DonationCardProps {
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  progress: number;
  imageSrc: string;
  className?: string;
  onDonateClick?: () => void;
  donors?: number;
  extraDonors?: number;
}

const DonationCard: React.FC<DonationCardProps> = ({
  title,
  description,
  targetAmount,
  raisedAmount,
  progress,
  imageSrc,
  className = "",
  onDonateClick = () => {}, // Default is an empty function; can be overridden
  donors = 5,  // Number of donor avatars to display
  extraDonors = 50,  // Number of extra donors to display in the "+50" badge
}) => {
  return (
    <section>
      <Card className={`md:w-80 w-[90%] mx-auto overflow-hidden rounded-3xl game-color ${className}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageSrc}
            alt="Donation campaign"
            className="object-cover w-full h-full"
          />
        </div>
        <CardContent className="p-4">
          <Progress value={progress} className="h-2 mb-4" />
          
          <h2 className="text-sm text-white font-bold mb-3 mt-3 text-center">
            {title}
          </h2>
          <p className="text-[0.7rem] text-white">
            {description}
          </p>
          <div className='flex justify-between text-white mt-6'>
            <div>
              <p className='font-bold'>Target</p>
              <p className='text-sm'>${targetAmount}</p>
            </div>
            <div>
              <p className="font-bold">Raised</p>
              <p className='text-sm'>${raisedAmount}</p>
            </div>
          </div>
        </CardContent>
        <div className='flex items-start pl-[1.5rem] md:pl-[2rem] py-[1rem]'>
          <div className="flex -space-x-4 overflow-hidden">
            {[...Array(donors)].map((_, i) => (
              <Avatar key={i} className="inline-block border-2 border-white">
                <AvatarImage src={`/api/placeholder/40/40?text=${i + 1}`} alt={`Donor ${i + 1}`} />
                <AvatarFallback className='text-sm'>{`D${i + 1}`}</AvatarFallback>
              </Avatar>
            ))}
            <Avatar className="inline-block border-2 border-white bg-purple-100">
              <AvatarFallback className="text-purple-600 text-xs font-semibold">+{extraDonors}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CardFooter>
          <Button onClick={onDonateClick} className="w-full rounded-full bg-purple-600 hover:bg-purple-700">
            Donate
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default DonationCard;
