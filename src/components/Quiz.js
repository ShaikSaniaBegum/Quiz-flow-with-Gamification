import React, { useState, useEffect } from "react";
import { fetchQuizData } from "../api";
import "../styles/Quiz.css";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
        const loadQuestions = async () => {
            const data = await fetchQuizData();
            setQuestions(data);
        };
        loadQuestions();
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            handleAnswer(false);
            return;
        }
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) setScore(score + 1);
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setTimeLeft(10);
        } else {
            setQuizCompleted(true);
        }
    };

    const getEmojiForScore = (score) => {
        if (score === 2) {
            return "🎉"; 
        } else if (score === 0) {
            return "😞"; 
        } else if (score === 1) {
            return "😊"; 
        }
        return "";
    };
   
    const getMessageForScore = (score) => {
        if (score === 0) {
            return "Good luck for next time!";
        }
        else if(score===2){
            return "Congratulations!";
        }else{
            return "Good!"
        }
    };

    if (questions.length === 0) {
        console.log("Questions array is empty. Waiting for data...");
        return <p>Loading questions...</p>;
    }

    return (
        <div className="quiz-container">
            {quizCompleted ? (
                <div className="results">
                    <h2>Quiz Completed!</h2>
                    <p>Your Score: {score} / {questions.length}</p>
                    <div className="emoji">{getEmojiForScore(score)}</div>
                    <p>{getMessageForScore(score)}</p>
                </div>
            ) : (
                <div>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${(currentQuestion + 1) / questions.length * 100}%` }}></div>
                    </div>
                    <h2>{questions[currentQuestion]?.description}</h2>
                    <p className="timer">Time Left: {timeLeft}s</p>
                    {questions[currentQuestion]?.options.map((option, index) => (
                        <button key={index} className="option-btn" onClick={() => handleAnswer(option.is_correct)}>
                            {option.description}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Quiz;
