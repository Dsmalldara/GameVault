import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuestionComponentProps {
  question: {
    question: string;
    options: string[];
    answer: string;
  };
  handleAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionComponentProps> = ({
  question,
  handleAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      handleAnswer(selectedOption);
    }
    setSelectedOption(null); // Reset the selected option after submission if needed
  };

  return (
    <Card className="md:min-w-[35rem] min-w-[25rem] overflow-hidden game-color">
      <CardHeader>
        <h2 className="md:text-base text-sm font-bold md:ml-0 ml-[0.6rem] text-white">{question.question}</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-wrap">
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleOptionClick(option)}
            variant="destructive" // Use a consistent variant for all buttons
            className={`
              w-full justify-start text-left
              ${selectedOption === option ? 'bg-blue-700 border border-blue-700' : 'bg-blue-400 border border-white'} 
              hover:bg-primary-200 transition-colors input-color 
            `}
          >
            <p className={`md:text-sm text-[0.7rem] flex-wrap ${selectedOption === option && 'text-white' }`}>
              {option}
            </p>
          </Button>
        ))}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedOption}
          className="w-full button-progress"
        >
          Submit Answer ⭐️
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;


