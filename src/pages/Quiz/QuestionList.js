import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Questions from "./Questions";

const Quiz = (props) => {
  const { id } = useParams();
  const [quizs, setquizs] = useState([]);
  const [answers, setAnswers] = useState({});

  const [quizSubmission, setQuizSubmission] = useState({
    questions: [],
  });

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE + `/units/${id}`)
      .then((response) => {
        setquizs((response.data.quiz.questions).reverse());
        props.handleQuestionCount((response.data.quiz.questions).length)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id, props.refreshQuizList]);

  const handleQuestionSubmit = (questionId, submittedAnswer) => {
    const questionIndex = quizs.findIndex((todo) => todo._id === questionId);
    const questionValue = quizs[questionIndex].question;
    const answers = quizs[questionIndex].options;
    const correctAnswer = quizs[questionIndex].correctAnswer;
    const selectedOptionIndex = quizs[questionIndex].options.findIndex(
      (option) => option === submittedAnswer
    );

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOptionIndex,
    }));

    setQuizSubmission((prevSubmission) => ({
      ...prevSubmission,
      questions: [
        ...prevSubmission.questions,
        {
          questionValue: questionValue,
          answers: answers,
          correctAnswer: correctAnswer,
          submittedAnswer: submittedAnswer,
        },
      ],
    }));
  };

  return (
    <div>
      {quizs.map((quiz, index) => (
        <Questions
          key={quiz._id}
          quiz={quiz}
          unitid={id}
          onQuestionSubmit={handleQuestionSubmit}
          questionNumber={quizs.length - index}
        />
      ))}
      <br />
    </div>
  );
};

export default Quiz;
