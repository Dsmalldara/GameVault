import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import coinImage from '/image 1.png'
import { CircleX } from 'lucide-react';
const DonationModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(true);

    const handleClose = () => {
      setIsModalVisible(false);
    };
  return (
   <div>
     {isModalVisible && (
    <Card className="md:w-80 element text-white rounded-3xl relative">
        <div>
            <Button  onClick={handleClose}  className='absolute top-2 right-4 bg-transparent hover:bg-transparent text-white text-2xl'><CircleX/></Button>
        </div>
      <CardContent className="pt-6 pb-2 px-6 flex flex-col items-center">
        <div className="p-4 rounded-full mb-4">
          <img src={coinImage} className='w-40 h-40' alt='coin Logo' />
        </div>
        <h2 className="text-2xl font-bold mb-2">Vuecoin For Good</h2>
        <p className="text-center text-sm mb-4">
          Donate to a social cause of your choice, be a social impact leader
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full rounded-[1024px]"   >
         <p className='text-black font-bold'>Close</p>
        </Button>
      </CardFooter>
    </Card>)
    }
   </div>
  );
};

export default DonationModal;