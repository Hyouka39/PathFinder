'use client';
import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const questions = [
  {
    category: "Numerical Reasoning",
    question: "What is 15 + 27?",
    choices: ["42", "40", "45", "50"],
    correctAnswer: "42",
  },
  {
    category: "Reading and Writing",
    question: "Which word is a synonym of 'happy'?",
    choices: ["Sad", "Joyful", "Angry", "Tired"],
    correctAnswer: "Joyful",
  },
  {
    category: "Science",
    question: "What is the chemical symbol for water?",
    choices: ["H2O", "O2", "CO2", "NaCl"],
    correctAnswer: "H2O",
  },
  {
    category: "Logic and Reasoning",
    question: "If all roses are flowers and some flowers fade quickly, which is true?",
    choices: ["All roses fade quickly", "Some roses fade quickly", "Some flowers fade quickly", "No roses fade quickly"],
    correctAnswer: "Some flowers fade quickly",
  },
  {
    category: "Technical Knowledge",
    question: "What does HTML stand for?",
    choices: ["HyperText Markup Language", "HighText Machine Language", "HyperTool Multi Language", "None of the above"],
    correctAnswer: "HyperText Markup Language",
  },
  {
    category: "Spatial Awareness",
    question: "Which shape has the most sides?",
    choices: ["Triangle", "Square", "Hexagon", "Pentagon"],
    correctAnswer: "Hexagon",
  },
  {
    category: "General Knowledge",
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
    correctAnswer: "William Shakespeare",
  },
];

const KnowledgeTest = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(null));
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [categoryScores, setCategoryScores] = useState<Record<string, number>>({});

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = selectedAnswer;
      setAnswers(updatedAnswers);
      setSelectedAnswer(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1]);
    }
  };

  const handleFinish = () => {
    setShowConfirmation(true);
  };

  const handleConfirmFinish = () => {
    const calculatedScore = answers.reduce((acc, answer, index) => {
      return answer === questions[index].correctAnswer ? acc + 1 : acc;
    }, 0);

    const scoresByCategory = questions.reduce((acc, question, index) => {
      const category = question.category;
      if (!acc[category]) acc[category] = 0;
      if (answers[index] === question.correctAnswer) acc[category] += 1;
      return acc;
    }, {} as Record<string, number>);

    setScore(calculatedScore);
    setCategoryScores(scoresByCategory);
    setShowConfirmation(false);
    setShowResult(true);
  };

  const handleCancelFinish = () => {
    setShowConfirmation(false);
  };

  const isNextDisabled = () => {
    return !selectedAnswer;
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-8">
      {showNotification ? (
        <div className="fixed inset-0 flex justify-center items-center text-black bg-black bg-opacity-50">
          <div className="bg-white pt-20 pb-16 pl-16 pr-16 rounded-lg shadow-lg w-full max-w-lg md:max-w-xl lg:max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-10 text-center">Steps to Complete</h2>
            <ul className="list-decimal pl-8 mb-10 text-xl md:text-2xl lg:text-2xl">
              <li className="mb-4 flex items-center gap-4">
                <FaCheckCircle className="text-brown-6" size={26} />
                Step 1: Scholastic Record
              </li>
              <li className="mb-4 flex items-center gap-4">
                <FaCheckCircle className="text-brown-6" size={26} />
                Step 2: Personality Test
              </li>
              <li className="mb-4 flex items-center gap-4">
                <span className="w-11 h-11 border-2 border-brown-6 rounded-full flex items-center justify-center text-brown-6">
                  3
                </span>
                Step 3: Knowledge Test
              </li>
            </ul>
            <div className="flex justify-end">
              <button
                onClick={() => setShowNotification(false)}
                className="btn btn-primary bg-brown-6 border-brown-6 text-white rounded text-xl px-8 py-2 hover:bg-brown-700 hover:border-brown-700"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      ) : showResult ? (
        <div className="p-16 bg-brown-1 shadow-lg rounded w-full max-w-screen-lg min-h-[70vh] flex flex-col justify-between items-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 md:mb-24 lg:mb-36 mt-2 text-center text-black">Your Knowledge Test Result</h1>
          <p className="text-3xl md:text-4xl lg:text-5xl text-center text-black mb-5">{score} out of {questions.length}</p>
          <div className="mt-6 w-full">
            <div className="hidden sm:block">
              <table className="border-collapse border border-black w-full text-center">
                <thead>
                  <tr>
                    {Object.keys(categoryScores).map((category, index) => (
                      <th key={index} className="border border-black px-4 py-2 md:text-2xl lg:text-3xl text-black">{category}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {Object.entries(categoryScores).map(([category, categoryScore], index) => {
                      const totalQuestionsInCategory = questions.filter(q => q.category === category).length;
                      const percentage = ((categoryScore / totalQuestionsInCategory) * 100);
                      return (
                        <td key={index} className="border border-black px-4 py-2 text-3xl text-black">{percentage}%</td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="block sm:hidden">
              <table className="border-collapse border border-black w-full text-left">
                <tbody>
                  {Object.entries(categoryScores).map(([category, categoryScore], index) => {
                    const totalQuestionsInCategory = questions.filter(q => q.category === category).length;
                    const percentage = ((categoryScore / totalQuestionsInCategory) * 100);
                    return (
                      <tr key={index} className="border-b border-black">
                        <td className="border border-black px-2 py-2 text-lg font-bold text-black">{category}</td>
                        <td className="border border-black px-2 py-2 text-lg text-black">{percentage}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <button
            onClick={() => router.push('/result')}
            className="mt-auto lg:mt-16 mb-4 md:mb-10 lg:mb-16 btn btn-primary bg-brown-6 h-10 md:h-16 lg:h-16 w-36 md:w-44 lg:w-48 text-lg md:text-xl lg:text-2xl border-brown-6 text-white rounded-lg px-6 py-3 hover:bg-brown-700 hover:border-brown-700"
          >
            Finish
          </button>
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-screen-md">
          <div className="p-12 bg-brown-1 shadow-lg rounded min-h-[50vh] flex flex-col justify-between relative">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center text-black">Knowledge Test</h1>
            <div className="absolute top-4 left-4 text-3xl md:text-3xl lg:text-4xl text-black font-bold">
              {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="relative flex flex-col items-center justify-center mt-16 mb-10">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-black">
                {questions[currentQuestionIndex].question}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-28 lg:justify-items-center md:justify-items-center">
              {questions[currentQuestionIndex].choices.map((choice, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 h-12"
                >
                  <div className="flex items-center justify-center w-10 h-10 shrink-0">
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={choice}
                      checked={selectedAnswer === choice}
                      onChange={() => handleAnswerSelection(choice)}
                      className="radio w-8 md:w-9 lg:w-10 h-8 md:h-9 lg:h-10 border-black checked:bg-brown-1"
                    />
                  </div>
                  <div className="flex-1 flex items-center">
                    <label className="text-xl md:text-2xl lg:text-3xl text-black leading-tight">{choice}</label>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4 absolute bottom-4 right-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className={`btn-sm btn-secondary text-black bg-transparent border border-brown-6 rounded-lg text-[10px] md:text-[15px] lg:text-[16px] w-[80px] md:w-[120px] lg:w-[130px] h-[28px] md:h-[35px] lg:h-[35px] hover:bg-brown-6 hover:scale-95 active:scale-95 transition-transform duration-300 transform-gpu hover:text-white ${
                  currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Back
              </button>
              <button
                type="button"
                onClick={currentQuestionIndex === questions.length - 1 ? handleFinish : handleNext}
                disabled={isNextDisabled()}
                className={`btn-sm btn-primary text-white bg-brown-6 rounded-lg border-brown-6 text-[10px] md:text-[15px] lg:text-[16px] w-[80px] md:w-[120px] lg:w-[130px] h-[28px] md:h-[35px] lg:h-[35px] hover:bg-brown-6 hover:scale-95 active:scale-95 transition-transform duration-300 transform-gpu ${
                  isNextDisabled() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </form>
      )}
      {showConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center text-black bg-black bg-opacity-50">
          <div className="bg-white pt-16 pb-10 pl-12 pr-10 rounded-lg shadow-md w-full max-w-lg md:max-w-xl lg:max-w-xl">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 items-center pr-0">Are you sure you want to submit?</h2>
            <div className="flex justify-end gap-5">
              <button
                onClick={handleCancelFinish}
                className="btn btn-secondary bg-transparent border border-brown-6 text-black rounded-lg text-lg md:text-xl lg:text-xl w-28  px-8 py-2 hover:bg-brown-6 hover:text-white hover:border-brown-6"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmFinish}
                className="btn btn-primary bg-brown-6 border-brown-6 text-white rounded-lg text-lg md:text-xl lg:text-xl px-8 py-2 w-28 hover:bg-brown-700 hover:border-brown-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeTest;
