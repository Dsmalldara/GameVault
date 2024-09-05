/* eslint-disable @typescript-eslint/no-explicit-any */
// src/App.jsx
import  { useState } from 'react';
import TriviaGame from './Games';
function App() {
  const [featuresUnlocked, setFeaturesUnlocked] = useState(false);

  const handleTriviaCompletion = (isUnlocked:any) => {
    setFeaturesUnlocked(isUnlocked);
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center">
      <header className="w-full py-6 text-white text-center">
        <div className="hidden">
            {featuresUnlocked}
          </div>
        <h1 className="text-3xl font-bold">GameVault Trivia </h1>
        <p className='text-balance bg-gradient-to-b from-[#a255d8] to-[#0a5ee5] font-semibold bg-clip-text text-transparent mt-4'>
          Play and answer Questions Correctly to Earn GRV  😊 
        </p>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <TriviaGame onCompletion={handleTriviaCompletion} />
      </main>
    </div>
  );
}

export default App;
