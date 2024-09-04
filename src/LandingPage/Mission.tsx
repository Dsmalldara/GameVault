import React from "react";
import Universe from "/universe.png";

const Mission: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 mx-auto gap-[4%] mt-[2rem] md:w-[70%] py-[4rem]">
      <div className="my-auto">
        <p className="font-bold text-white text-center">Our Mission</p>
        <p className=" text-white text-center  mx-auto">
          At GameVault we believe in the power of play to drive meaningful
          change. Our mission is to merge the thrill of gaming with the purpose
          of crowdfunding, creating a platform where every player becomes a
          force for good.
        </p>
      </div>
      <div>
        <img
          src={Universe}
          alt="Universe"
          className="w-[20rem] h-[15rem] object-cover planet-animation mx-auto"
        />
      </div>
    </div>
  );
};

export default Mission;
