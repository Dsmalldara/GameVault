import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { reviews } from './LandingPageUtils';
import { Button } from '@/components/ui/button';
import { Link } from "react-router-dom";

const ReviewCard = ({ quote, name, role, company, avatarSrc }: { quote: string, name: string, role: string, company: string, avatarSrc: string }) => (
  <Card className="review-color text-white m-4 w-80 shadow-lg border-transparent flex-shrink-0">
    <CardContent className="pt-6">
      <p className="text-lg mb-4">"{quote}"</p>
    </CardContent>
    <CardFooter className="flex items-center">
      <Avatar className="mr-4">
        <AvatarImage src={avatarSrc} alt={name}  />
        <AvatarFallback className="text-purple-700">{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-sm text-gray-300">{role}, {company}</p>
      </div>
    </CardFooter>
  </Card>
);

const ReviewCards = () => {


  return (
   <div>
    <div className='flex items-center justify-between md:w-[70%] mx-auto  w-[95%] mb-4'>
    <h1 className="font-bold text-base md:text-2xl text-white">
    What Our Users Say 
    </h1>
    <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-[500px] hover:from-purple-600 hover:to-blue-600 transition duration-300">
    <Link to="/play-for-good">
          Play for good  😊
          </Link>
        </Button>
    </div>
     <div className="flex overflow-x-auto custom-scrollbar items-center md:justify-center">
      {reviews.map((review, index) => (
        <ReviewCard key={index} {...review} />
      ))}
    </div>
   </div>
  );
};

export default ReviewCards;
