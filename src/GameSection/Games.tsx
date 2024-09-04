/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/TriviaGame.jsx
import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import { questions } from './utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { incrementAnsweredCount, incrementCorrectAnswers } from '@/states-manager/triviaSlice';


const TriviaGame = ({ onCompletion }:{onCompletion:any}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(0);
 const [count,setCount] = useState(0);
    const correctAnswersCount = useSelector((state: any) => state.trivia.correctAnswers);
 const dispatch = useDispatch();
  const handleAnswer = (selectedOption: any) => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore((prev) => prev + 1);
      dispatch(incrementCorrectAnswers());
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setCount(count+1);
      setProgress(((nextQuestionIndex) / questions.length) * 100);
      dispatch(incrementAnsweredCount())
    } else {
      setShowResult(true);
      setProgress(((15) / questions.length) * 100);
      setCount(15)
      handleCompletion(score>= 7 )
      onCompletion(score + 1 >= 7); //  7 correct answers are needed to unlock the features

    }
  };

  const handleCompletion = (passed: boolean) => {
    if (passed) {
      toast.success('Congratulations! You unlocked new features!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('Try again to unlock new features.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    
  };
  return (
    <div className="p-10 md:max-w-[40rem] min-w-[10rem]  md:min-w-[30rem] mx-auto rounded-xl backdrop-blur-md   space-y-6 shadow-xl  game-color">
         <ToastContainer />
      <ProgressBar progress={progress} value={count} totalValue={questions.length}/>
      {showResult ? (
        <Alert
          variant='default'
          className="text-center space-y-4"
        >
          <AlertTitle>Your Score: {score}</AlertTitle>
          <AlertDescription>
          {correctAnswersCount >= 7 ? (
  <span className='flex flex-col gap-[2rem]'>
    <p className='text-muted-foreground text-normal text-center'>
      🎉 You have successfully answered {score} {score > 1 ? "questions" : "question"} correctly this time! 🏆
    </p>
    <p className='text-muted-foreground text-normal text-center'>
      ⭐️ You have answered {correctAnswersCount} questions correctly in total! Keep it up! 🚀📈
    </p>
  </span>
) : (
  <span className='flex flex-col gap-[2rem]'>
    <p className='text-muted-foreground text-normal text-center'>
      Keep trying! 💪 You have answered {score} {score > 1 ? "questions" : "question"} correctly this time.
    </p>
    <p className='text-muted-foreground text-normal text-center'>
      😊 You have answered {correctAnswersCount} questions correctly in total. Keep going! 🔥
    </p>
  </span>
)}

          </AlertDescription>
        </Alert>
      ) : (
        <QuestionCard 
          question={questions[currentQuestionIndex]} 
          handleAnswer={handleAnswer} 
        />
      )}
    </div>
  );
};

export default TriviaGame;
