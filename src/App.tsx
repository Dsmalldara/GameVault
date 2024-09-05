import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameApp from './GameSection/GameApp';
import CrowdfundingForm from './web3App/CrowdFundForm';
import CrowdFunding from './web3App/CrowdFunding';
import Footer from './sharedComp/Footer';
import LandingPage from './LandingPage/LandingPage';
import './App.css'
function App() {
  return (
    <Router>
      <div className=''>
        <Routes>
          {/* Landing Page as the default route */}
          <Route path="/" element={<LandingPage />} />
          {/* Other routes accessible from the Landing Page */}
          <Route path="/game" element={<GameApp />} />
          <Route path="/crowdfunding-form" element={<CrowdfundingForm />} />
          <Route path="/crowdfunding" element={<CrowdFunding />} />
          <Route path="/play-for-good"  element={<GameApp/> }/>
         
          
        </Routes>

        {/* Footer component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
