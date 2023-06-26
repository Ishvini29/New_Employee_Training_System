import Edit from "./EditQ";
import Delete from "./DeleteQ";
import { useState } from "react";

const Questions = ({ quiz, unitid, onQuestionSubmit, questionNumber }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const { _id, question, options } = quiz;

  const handleOptionChange = (event, index) => {
    setSelectedAnswer(event.target.value);
    onQuestionSubmit(_id, index);
  };

  return (
    <div>
      <div className="card mt-2">
        <div className="card-header bg-dark text-white">
          <h5>Question {questionNumber}</h5>
        </div>
        <div className="card-body">
          <p>{question}</p>
          {options.map((option, index) => (
            <div className="input-group mb-3 " key={index}>
              <div className="input-group-text">
                <input
                  className="form-check-input mt-0"
                  type="radio"
                  name={`question${_id}`}
                  id={`flexRadioDefault${index}`}
                  value={option}
                  onChange={(event) => handleOptionChange(event, index)}
                />
              </div>
              <br></br>
              <label
                type="text"
                className="form-control"
                htmlFor={`flexRadioDefault${index}`}
                aria-label="Text input with radio button"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className="card-footer bg-secondary">
          <div className="container-fluid d-grid gap-2 d-md-flex justify-content-md-end">
            <Edit key={_id} quiz={quiz} id={unitid} />
            <Delete key={_id} quiz={quiz} id={unitid} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
