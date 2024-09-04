import { Button } from "@/components/ui/button";
import Logo from '/Logo.png'
import MobileNav from "./MobileNav";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <img src={Logo} alt="logo" className="h-8 w-auto mr-2" />
        <span className="font-bold text-xl">GAMEVAULT</span>
      </div>
      <div className=" items-center space-x-10 md:flex hidden">
        <Link to="/crowdfunding" className="hover:text-gray-300">Crowdfunding</Link>
        <a href="#" className="hover:text-gray-300">Social Enterprise</a>
        <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-[500px] hover:from-purple-600 hover:to-blue-600 transition duration-300">
          <Link to="/play-for-good">
          Play for good  😊
          </Link>
        </Button>
      </div>
      <div className='md:hidden flex'>
        <MobileNav/>
      </div>
    </nav>
  );
};

export default Navbar;