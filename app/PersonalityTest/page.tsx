'use client';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const questions = [
  "Question 1: I enjoy setting goals for the future.",
  "Question 2: I often seek out opportunities to influence others",
  "Question 3: I enjoy expressing myself through music.",
  "Question 4: I enjoy helping others.",
  "Question 5: I often find myself guiding others.",
  "Question 6: I enjoy solving puzzles.",
  "Question 7: I prefer working with numbers.",
  "Question 8: I enjoy expressing maself through writing",
  "Question 9: I prefer to work independently on tasks that require analysis",
  "Question 10: I often seek new ways to do things in a unique manner.",
  "Question 11: I prefer working with data.",
  "Question 12: I am interested in careers that involve office work.",
  "Question 13: I am interested in business.",
  "Question 14: I get excited when given the freedom to express my personal ideas through my work.",
  "Question 15: I often find myself drawn to cultural or artistic experiences.",
  "Question 16: I prefer jobs that involve direct interaction with people.",
  "Question 17: I prefer working with organized tasks.",
  "Question 18: I enjoy solving complex problems.",
  "Question 19: I like exploring new ideas and theories.",
  "Question 20: I am drawn to scientific subjects.",
  "Question 21: I see myself as someone that others can count on",
  "Question 22: I enjoy managing things.",
  "Question 23: l often find myself teaching others. ",
  "Question 24: I prefer working with tools.", 
  "Question 25: When I face conflict, I usually try to resolve it to maintain harmony.",
  "Question 26: I prefer working with machines.",
  "Question 27: l am interested in entrepreneurship.",
  "Question 28: I am curious about how things work or why they happen.",
  "Question 29: I am interested in careers that involve administrative work.",
  "Question 30: I find satisfaction in organizing information or managing details.",
  "Question 31: I enjoy expressing myself through art.",
  "Question 32: I feel motivated by competitive challenges that involve achievement.",
  "Question 33: I feel energized and motivated after spending time with people, rather than drained.",
  "Question 34: I prefer to work independently on doing research.",
  "Question 35: I am interested in taking care of or working with animals.",
  "Question 36: I am drawn to academic subjects.",
  "Question 37: l prefer working with physical objects.",
  "Question 38: l am more interested in self-expression than following set rules",
  "Question 39: I am comfortable working in a team or group setting.",
  "Question 40: I enjoy taking charge and leading others.",
  "Question 41: I am comfortable in performing tasks that require mechanical skills.",
  "Question 42: I feel energized when can freely explore my imagination.",
  "Question 43: I prefer to work with concrete tasks rather than abstract ideas.",
  "Question 44: I am confident in my negotiating skills.",
  "Question 45: I enjoy following established procedures and routines.",
  "Question 46: I see myself performing tasks that require technical skills.",
  "Question 47: I often seek out opportunities to drive changes.",
  "Question 48: I feel more engaged when solving problems with practical solutions"]


const PersonalityTest = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(null));
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [personalityResult, setPersonalityResult] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<string | null>(null);
  const [svmResult, setSvmResult] = useState<string | null>(null);
  const [knnResult, setKnnResult] = useState<string | null>(null);


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

  const handleSubmit = async () => {
    setShowConfirmation(false);

    // Convert Agree/Disagree to 1/0
    const processedAnswers = answers.map(ans => ans === 'Agree' ? 1 : 0);

    try {
      const response = await fetch('https://pathfinder-2-vhjw.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: processedAnswers }),
      });
      const result = await response.json();
      setSvmResult(result.svm_result);
      setKnnResult(result.knn_result);
      setConfidence(result.confidence);
      setShowResult(true);
    } catch (error) {
      console.error('Error submitting personality test:', error);
    }
  };

  const isNextDisabled = () => !selectedAnswer;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-8">
      {showNotification ? (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Steps to Complete</h2>
            <ul className="list-decimal pl-6 mb-6 text-lg">
              <li className="mb-3 flex items-center gap-2">
                <FaCheckCircle className="text-green-600" /> Step 1: Scholastic Record
              </li>
              <li className="mb-3 flex items-center gap-2">
                <span className="font-bold">2</span> Step 2: Personality Test
              </li>
              <li className="mb-3 flex items-center gap-2">
                <span className="font-bold">3</span> Step 3: Knowledge Test
              </li>
            </ul>
            <div className="flex justify-end">
              <button
                onClick={() => setShowNotification(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      ) : showResult ? (
        <div className="bg-white p-10 rounded shadow max-w-xl text-center">
          <h1 className="text-3xl font-bold mb-4">Your Personality Result</h1>
          <p className="text-xl mb-2">
            <strong>SVM Prediction:</strong> {svmResult}
          </p>
          <p className="text-xl mb-2">
            <strong>KNN Recommendation:</strong> {knnResult}
          </p>
          <p className="text-md text-gray-600">Confidence: {confidence}%</p>
          <button
            onClick={() => router.push('/KnowledgeTest')}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Proceed to Knowledge Test
          </button>
        </div>
      ) : (
        <div className="bg-white p-10 rounded shadow max-w-xl w-full relative">
          <h1 className="text-2xl font-bold text-center mb-6">Personality Test</h1>
          <div className="absolute top-4 left-4 text-gray-700 font-medium">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
          <p className="text-lg mb-8 text-center">{questions[currentQuestionIndex]}</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex justify-center gap-10 mb-10">
            <label className="flex flex-col items-center">
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value="Agree"
                checked={selectedAnswer === 'Agree'}
                onChange={() => handleAnswerSelection('Agree')}
                className="w-6 h-6"
              />
              <span className="mt-2">Agree</span>
            </label>
            <label className="flex flex-col items-center">
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value="Disagree"
                checked={selectedAnswer === 'Disagree'}
                onChange={() => handleAnswerSelection('Disagree')}
                className="w-6 h-6"
              />
              <span className="mt-2">Disagree</span>
            </label>
          </form>
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded ${currentQuestionIndex === 0 ? 'bg-gray-300' : 'bg-gray-500 text-white'}`}
            >
              Back
            </button>
            <button
              onClick={currentQuestionIndex === questions.length - 1 ? handleFinish : handleNext}
              disabled={isNextDisabled()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      )}
      {showConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-sm">
            <h2 className="text-xl font-bold mb-6">Submit Test?</h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalityTest;
