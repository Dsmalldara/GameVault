import Diamond from '/Diamond.png'
import coins from '/coins.png'

function PlaySection() {
  const playElement = [
    {
      id: 1,
      heading: "Play",
      text: "Immerse yourself in a world where every game session is an adventure. Explore new territories, solve complex puzzles, and engage in epic battles. Your actions in the game not only lead to victories but also contribute to real-world projects. Play your way to a better future.",
      image: Diamond,
    },
    {
      id: 2,
      heading: "Earn",
      text: "As you progress through challenges and achieve milestones, earn rewards that extend beyond the virtual world. Collect in-game currency, unlock special items, and convert your achievements into tangible benefits. The more you play, the more you earn, both in-game and in real life.",
      image: coins,
    },
    {
      id: 3,
      heading: "Empower",
      text: "Use your gaming success to make a difference. With the rewards you’ve earned, support causes you care about, fund community projects, and drive positive change. Empower yourself by leveling up in the game, and empower others by sharing your success with those in need.",
      image: Diamond,
    },
  ];
  
  return (
    <div className="flex flex-col items-center justify-between md:w-[70%] mx-auto  w-[95%] mb-4">
      {playElement.map((item, index) => (
  <div
    key={index}
    className={`flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} justify-between items-center mx-auto mt-[2rem] py-6`}
  >
    <div className='w-[90%] md:w-[45%]'>
      <h3 className=' bg-gradient-to-b from-[#a255d8] to-[#0a5ee5] font-semibold   bg-clip-text text-transparent text-xl mb-3  md:text-start md:ml-[1rem] text-center'>
        {item.heading}
      </h3>
      <p className="text-base  text-balance font-normal text-center md:text-left text-green-50">
        {item.text}
      </p>
    </div>
    <img
      src={item.image}
      alt="diamond"
      className="w-[180px] h-[150px] md:w-[250px] md:h-[200px] object-contain md:mr-[2rem] md:block hidden"
    />
  </div>
))}
    
    <div className='grid md:grid-cols-2 mx-auto  mt-6 mb-4'>
    <h1 className="font-bold text-xl text-green-100 md:text-2xl md:text-white col-span-1 md:mb-0 mb-[1rem] text-center md:text-start">
    What Drives GameVault ?
    </h1>
    <p className="text-base text-wrap grid-cols-1 text-white text-center md:text-start font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, inventore. Illum minima ad fugiat, voluptatem eum soluta suscipit doloribus maiores
        </p>
    </div>
    </div>
  )
}

export default PlaySection