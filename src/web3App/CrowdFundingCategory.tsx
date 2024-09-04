import React from 'react';
import Art from '/Art.png';
import Health from '/Health.png';
import StartUp from '/Startup.png';
import Education from '/Education.png';

const images = [
  Art,
  Health,
  StartUp,
  Education,
]

function CrowdFundingCategory() {
  return (
    <div className='md:space-y-8 space-y-4 mt-8 md:mt-[2rem]'>
      <p className='text-start pl-[0.6rem] md:pl-[3rem] text-white text-base font-bold'>
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
