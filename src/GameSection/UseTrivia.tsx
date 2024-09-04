/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useTrivia.js
import { useState } from 'react';
const useTrivia = (questions: string | any[], onCompletion: (arg0: boolean) => void) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selectedOption: any) => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResult(true);
      onCompletion(score + 1 >= 7);
    }
  };

  return {
    currentQuestionIndex,
    score,
    showResult,
    handleAnswer,
  };
};

export default useTrivia;
