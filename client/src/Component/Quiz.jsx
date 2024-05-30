import React, { useState } from 'react';
import axios from 'axios'
import { useParams,Link } from 'react-router-dom';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const QuizApp = () => {

  const {id}=useParams();
  useEffect(()=>{
    axios.get("/api/oneworkshop/"+id)
      .then((res)=>{
        onopen(res.data.titre)
      }
    )  
    .catch()
  },[])
  const navigate=useNavigate()
  const [quizData,setquiz]=useState()
  const onopen =(titre)=>{
    console.log(titre)
    switch(titre) {
      case 'marketing':
        setquiz([
          {
            question: "Which language runs in a web browser?",
            a: "Java",
            b: "C",
            c: "Python",
            d: "JavaScript",
            correct: "d",
          },
          {
            question: "s language runs in a web browser?",
            a: "Java",
            b: "C",
            c: "Python",
            d: "JavaScript",
            correct: "d",
          }
        ]);
        break;
      case 'ss':
        setquiz([
          {
            question: "hahaha?",
            a: "babab",
            b: "C",
            c: "Python",
            d: "JavaScript",
            correct: "d",
          }
        ]);
        break;
      
    }
  }
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  console.log(score)

  const handleAnswerClick = (selectedAnswer) => {
    const isCorrect = selectedAnswer === quizData[currentQuiz].correct;
    if (isCorrect) {
      setScore(score + 1);
    }
    setUserAnswers([...userAnswers, { question: quizData[currentQuiz].question, answer: selectedAnswer, isCorrect }]);
    const nextQuiz = currentQuiz + 1;
    if (nextQuiz < quizData.length) {
      setCurrentQuiz(nextQuiz);
      
    } else if(nextQuiz == quizData.length && score>=2) {
      setShowScore(true);
      navigate(`/certif/${id}`)
    }
    else{
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setScore(0);
    setShowScore(false);
    setUserAnswers([]);
  };

  return (
    <>
    
    <div className="max-w-md mx-auto my-8 bg-transparent">
      {showScore ? (
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">You scored {score}/{quizData.length}!</h2>
          <h3 className="text-lg mb-4">Your Answers:</h3>
          <ul className="text-black">
            {userAnswers.map((answer, index) => (
              <li key={index} className={answer.isCorrect ? "text-green-600" : "text-red-600"}>
                <span className="font-semibold">{answer.question}</span> - {answer.answer}
              </li>
            ))}
          </ul>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={resetQuiz}>Try Again</button>
        </div>
      ) : (
        <>
        {
        quizData?

        <div className="bg-white bg-opacity-70 shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4 text-red-600">{quizData[currentQuiz].question}</h2>
          <ul>
            {['a', 'b', 'c', 'd'].map((option) => (
              <li key={option} className="flex items-center mb-2">
                <input
                type="radio"
                name="answer"
                id={option}
                className="mr-2 appearance-none bg-green-500 rounded-full w-4 h-4 checked:bg-green-500 checked:border-transparent focus:outline-none"
                onClick={() => handleAnswerClick(option)}
                />
                <label htmlFor={option} id={`${option}_text`} className="select-none text-black">{quizData[currentQuiz][option]}</label>
                </li>
              ))}
           </ul>
              </div>
              :null
            }
            </>
      )}
    </div>
 
      </>
    );
  };
  
export default QuizApp;
