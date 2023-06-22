import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

import Buttons from './Buttons';
import AddQuiz from './AddQuiz';
import QuestionList from './QuestionList';

function Quizpage(props) {
  const { id, chapName, unitName } = useParams();
  const [showAddTask, setShowAddTask] = useState(false);
  const [questionCount, setQuestionCount] = useState(0); // State to hold the number of questions

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE + `/units/${id}`)
      .then((response) => {
        const quiz = response.data.quiz;
        const count = quiz.questions.length;
        setQuestionCount(count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#ffffff" }}>
        <div className='container' style={{ backgroundColor: "ffffff" }}>
          <div className="container my-5">
            <h4 className="heading rounded p-3">
              {chapName + ': ' + unitName + ": Quiz"}
            </h4>
          </div>
          <div className="container">
            <Buttons showForm={() => setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask} />
            {showAddTask && <AddQuiz id={id} />}
          </div>
          <div>
            Total Questions: {questionCount}
            <p>You can add up to 30 questions.</p>
          </div> {/* Display the number of questions */}
          <br></br>
          <QuestionList id={id} />
          <br />

          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Quizpage;