import React, { useState, useEffect } from "react";
import axios from "axios";

const Question = (props) => (
  <tr>
    <td>{props.question.unitName}</td>
    <td>{props.question.quizname}</td>
    <td>{props.question.question}</td>
    <td>{props.question.options.join(", ")}</td>
    <td>{props.question.correctAnswer}</td>
    <td>
      {props.question.createdBy?.firstName +
        " " +
        props.question.createdBy?.lastName}
    </td>
    <td>
      {props.question.deletedBy?.firstName +
        " " +
        props.question.deletedBy?.lastName}
    </td>

    <td>{props.question.updated_at}</td>
  </tr>
);

const QuestionHistory = () => {
  const [deletequestions, setquestions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/deletequestions/")
      .then((response) => {
        setquestions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteQuestionsList = () =>
    deletequestions.map((currentQuestion, i) => (
      <Question question={currentQuestion} key={i} />
    ));

  return (
    <React.Fragment>
      <div>
        <div className="container p-4">
          <h3>Questions Delete History</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Unit Name</th>
                <th>Quiz Name</th>
                <th>Question</th>
                <th>Options</th>
                <th>Correct Answer</th>
                <th>Created By</th>
                <th>Deleted By</th>
                <th>Deleted Time</th>
              </tr>
            </thead>
            <tbody>{deleteQuestionsList()}</tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default QuestionHistory;
