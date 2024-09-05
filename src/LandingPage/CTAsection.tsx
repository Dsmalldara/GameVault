import { Button } from '@/components/ui/button'
import heroImg from '/herosection.png'
import { Link } from 'react-router-dom'
function CTAsection() {
  return (
    <div className='mt-[2rem]'>
        <p className='text-4xl  py-1 text-center text-balance bg-gradient-to-b from-[#a255d8] to-[#0a5ee5] font-semibold   bg-clip-text text-transparent'>
            Play.Fund.Empower
        </p>
      <div className='flex items-center justify-center mt-6'>
      <Button className='f h-fit w-fit rounded-full border border-blue-100/20 bg-blue-200/10 px-4 py-2 text-blue-200 outline-none ring-yellow-300 transition-colors after:absolute after:-z-10 after:animate-pulse after:rounded-full after:bg-yellow-100 after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-blue-200/40 hover:text-blue-300 after:hover:bg-opacity-15 focus:ring-2'>
      <Link to="/play-for-good">
          Play for good  😊 
          </Link>
        </Button>
      </div>
      <p className='text-center mt-4 text-base text-white w-[95%] md:w-[60%] mx-auto'>
         Turn gameplay into real-wrold impact. Join our decentralized platform where every move brings projects to life. Play to crowdfund and shape the future, one game at a time.
      </p>
      <div className="w-full md:px-0 px-2 flex items-center justify-center mt-[4rem] overflow-hidden">
        <img src={heroImg} alt="cta" className="w-[60rem] h-[20rem] md:h-auto   mt-[-4rem] md:object-cover object-contain overflow-hidden rounded-[0.2rem]" />
      </div>
    </div>
  )
}

export default CTAsection