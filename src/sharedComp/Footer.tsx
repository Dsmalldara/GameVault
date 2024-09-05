import logo from '/Logo.png'
function Footer(){
  return (
    <footer className="bg-[#171748] text-white py-6 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Logo */}
        <div className="flex items-center mb-4 md:mb-0">
          <img src={logo} alt="GameVault Logo" className="h-8 w-auto mr-2" />
          <span className="text-xl font-bold">GAMEVAULT</span>
        </div>

        {/* Center Section: Navigation Links */}
        <nav className="flex space-x-4 text-sm">
          <a href="#" className="hover:underline">Overview</a>
          <a href="#" className="hover:underline">Features</a>
          <a href="#" className="hover:underline">Tokens</a>
          <a href="#" className="hover:underline">Games</a>
          <a href="#" className="hover:underline">Help</a>
          <a href="#" className="hover:underline">Privacy</a>
        </nav>

        {/* Right Section: Copyright */}
        <div className="text-sm mt-4 md:mt-0">
          © 2024 Vaultinc
        </div>
      </div>
    </footer>
  );
};

export default Footer;
