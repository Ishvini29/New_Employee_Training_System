import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import moment from "moment";
import jwt_decode from "jwt-decode";

const QuizPopup = ({ id, chapId }) => {
  const userDocument = jwt_decode(
    JSON.parse(localStorage.getItem("user")).token
  ).userData;

  const userid = userDocument._id;
  const depid = userDocument.department;
  const chapterId = chapId;

  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({});
  const [startTime] = useState(+new Date());
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [showSubmission, setshowSubmission] = useState(true);

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const [attemptedTime, setAttemptedTime] = useState(0);
  const [submitted, setSubmitted] = useState(false); // Add a state to track the submission status
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE +`/units/${id}`)
      .then((response) => {
        setQuizData(response.data.quiz);
        setTimeLeft(response.data.quiz.timeLimit * 60); // Convert minutes to seconds
        setSelectedAnswers(
          new Array(response.data.quiz.questions.length).fill(null)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // user can access the quiz only once
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE +`/submissions/find/${id}/${userid}`)
      .then((response) => {
        const existingSubmission = response.data;
        if (existingSubmission) {
          setSubmitted(true); // Set the hasSubmitted state to true if a submission exists
        }
      })
      .catch((error) => {
        console.log(error);
        // swal("Oops!", "Something went wrong. Please try again.", "error");
      });
  }, [id, userid]);

  const handleAttemptQuiz = useCallback(() => {
    axios
      .get(process.env.REACT_APP_API_BASE +`/units/${id}`)
      .then((response) => {
        const quiz = response.data.quiz;

        if (quiz.questions.length < 5) {
          // Redirect the user to a different page or show an error message
          swal(
            "Error",
            "The quiz does not have enough questions.",
            "error"
          ).then(() => {
            window.location.reload(); // Refresh the window after user clicks "OK"
          });
          //setSubmitted(true);
          setShowQuiz(true);
          setSubmitted(false);
          setshowSubmission(false);
          setShowConfirmation(false); // Set showConfirmation to false to prevent the modal from showing
          return;
        }

        setQuizData(quiz);
        setTimeLeft(quiz.timeLimit * 60); // Convert minutes to seconds
        setSelectedAnswers(new Array(quiz.questions.length).fill(null));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, navigate]);

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(updatedAnswers);
  };

  const saveQuizSubmission = useCallback(() => {
    const questions = quizData.questions.map((question, questionIndex) => {
      const selectedAnswer =
        selectedAnswers[questionIndex] !== null
          ? selectedAnswers[questionIndex]
          : -1;

      return {
        questionValue: question.question,
        answers: question.options,
        correctAnswer: question.correctAnswer,
        submittedAnswer: selectedAnswer,
        attemptedTime: attemptedTime, // Add the attempted time to the quiz submission
      };
    });

    const submittedTime = moment().format("YYYY-MM-DD HH:mm:ss");

    axios
      .post(
        process.env.REACT_APP_API_BASE +`/submissions/${id}/${userid}/${chapterId}/${depid}`,
        {
          questions,
          submittedTime,
          attemptedTime,
        }
      )
      .then((response) => {
        // console.log(response.data);
        swal(
          "Quiz submitted!",
          "Your quiz has been submitted.",
          "success"
        ).then(() => {
          navigate("/result", { state: { unitId: id } });
          window.location.reload();
          setSubmitted(true);
        });
      })
      .catch((error) => {
        console.log(error);
        swal("Oops!", "Something went wrong. Please try again.", "error");
      });
  }, [
    attemptedTime,
    chapterId,
    depid,
    id,
    navigate,
    quizData.questions,
    selectedAnswers,
  ]);

  const calculateTimeLeft = () => {
    const fullTime = quizData.timeLimit * 60 * 1000; // Convert minutes to milliseconds
    const difference = fullTime - (+new Date() - startTime);
    let timeLeft = {};

    if (difference > 0) {
      const totalSeconds = Math.floor(difference / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      timeLeft = {
        hours: hours < 10 ? `0${hours}` : hours.toString(),
        minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
        seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]); // Add timeLeft as a dependency to the useEffect hook

  const timerComponents = [];

  if (timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0) {
    timerComponents.push(
      <span>
        {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
      </span>
    );
  } else {
    timerComponents.push(<span>Time's up!</span>);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Check if time is up and submit the quiz
    if (!submitted) {
      if (
        timeLeft.hours === "00" &&
        timeLeft.minutes === "00" &&
        timeLeft.seconds === "00"
      ) {
        const endTime = +new Date(); // Get the current time
        const attemptedTime = moment(endTime).format("YYYY-MM-DD hh:mm:ss A"); // Calculate the attempted time and format it
        saveQuizSubmission(attemptedTime); // Pass the attempted time to saveQuizSubmission function
      }
    }

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleSubmit = () => {
    const endTime = +new Date(); // Get the current time
    const remainingTime =
      Number(timeLeft.minutes) * 60 + Number(timeLeft.seconds); // Convert to numbers
    const attemptedTime = moment(endTime - remainingTime).format(
      "YYYY-MM-DD hh:mm:ss A"
    ); // Calculate the attempted time and format it

    setAttemptedTime(attemptedTime); // Store the attempted time in state
    setShowConfirmation(false);
  };

  const handleConfirm = () => {
    setshowSubmission(false);

    // Submit the quiz only if it hasn't been submitted yet
    if (!submitted) {
      swal({
        title: "Are you sure you want to submit the quiz?",

        buttons: ["No", "Yes"],
        dangerMode: true,
      }).then((confirmed) => {
        if (confirmed) {
          saveQuizSubmission(attemptedTime);
        }
      });
    }
  };

  return (
    <div>
      {showQuiz ? (
        <div>
          <p>You can't access the quiz right now.</p>
          {/* Add a loading indicator or a message while redirecting */}
        </div>
      ) : (
        <div>
          {submitted ? (
            <div>
              <p>Quiz submitted!</p>
              {/* Add a loading indicator or a message while redirecting */}
            </div>
          ) : (
            <div>
              <button
                style={{ width: "650px" }}
                className="btn btn-secondary"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#confirm-modaltest"
                onClick={handleAttemptQuiz}
              >
                Attempt Quiz
              </button>
              <div
                className="modal fade"
                data-bs-backdrop="static"
                id="confirm-modaltest"
                tabIndex="-1"
                aria-labelledby="confirm-modal-label"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-xl"
                  style={{ maxWidth: "2000px", width: "95%", height: "100%" }}
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        {quizData.quizName}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      {showConfirmation ? (
                        <div>
                          <p>Are you sure you want to attempt the quiz?</p>
                          <div className="d-grid gap-2 col-6 mx-auto">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleSubmit}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p>{quizData.quizDesc}</p>
                          <p>Remaining Time: {timerComponents}</p>
                          <br />
                          {quizData.questions &&
                            quizData.questions.map((question, index) => (
                              <div key={question._id}>
                                <div className="card">
                                  <div className="container">
                                    <h5 className="card-title">
                                      Question {index + 1}
                                    </h5>
                                    <p>{question.question}</p>
                                    {question.options.map(
                                      (option, optionIndex) => (
                                        <div
                                          className="input-group mb-3"
                                          key={optionIndex}
                                        >
                                          <div className="input-group-text">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              name={`question${question._id}`}
                                              id={`flexRadioDefault${optionIndex}`}
                                              value={option}
                                              checked={
                                                selectedAnswers[index] ===
                                                optionIndex
                                              }
                                              onChange={() =>
                                                handleAnswerChange(
                                                  index,
                                                  optionIndex
                                                )
                                              }
                                            />
                                          </div>
                                          <label
                                            type="text"
                                            className="form-control"
                                            htmlFor={`flexRadioDefault${optionIndex}`}
                                            aria-label="Text input with radio button"
                                          >
                                            {option}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          <br />
                          {showSubmission ? (
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleConfirm}
                              >
                                Submit
                              </button>
                            </div>
                          ) : (
                            <div>
                              <p>Are you sure you want to submit the quiz?</p>
                              <div className="d-grid gap-2 col-6 mx-auto">
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={saveQuizSubmission}
                                  data-bs-dismiss="modal"
                                >
                                  Yes
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                >
                                  No
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPopup;
