import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "../../components/NavBar";

const Question = (props) => (
  <tr>
    <td>
      {props.question.unitName}
    </td>
    <td>
      {props.question.quizname}
    </td>
    <td>
      {props.question.question}
    </td>
    <td>
    {props.question.options.join(', ')}
    </td>
    <td>
      {props.question.correctAnswer}
    </td>
    <td>
      {props.question.old_data.question}
    </td>
    <td>
    {props.question.old_data.options.join(', ')}
    </td>
    <td>
       {props.question.old_data.correctAnswer}
    </td>
    <td>
       {props.question.updatedby}
    </td>
    <td>
       {props.question.updated_at}
    </td>
  </tr>
);

const UnitHistory = () => {
  const [editquestions, setquestions] = useState([]);
   
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE+'/editquestions/')
      .then((response) => {
        setquestions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const editQuestionsList = () =>
  editquestions.map((currentQuestion, i) => <Question question={currentQuestion} key={i} />);

  return (
     
    <React.Fragment>
            <div>
             <NavBar></NavBar>
             <div className="container p-4"> 
     
      <h3>Questions Edit History</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
          <th>Unit Name</th>
          <th>Quiz Name</th>
            <th>Question</th>
            <th>Options</th>
            <th>Correct Answer</th>
            <th>Previous Question</th>
            <th>Previous Options</th>
            <th>Previous Correct Answer</th>
            <th>Updated By</th>
            <th>Updated Time</th>
          </tr>
        </thead>
        <tbody>{editQuestionsList()}</tbody>
      </table>
    </div>
    </div>
        </React.Fragment>
        
  );
};

export default UnitHistory;
