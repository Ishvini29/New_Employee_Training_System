import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import QuizPopup from "./QuizPopup";
import { useState } from "react";
const QuizDisplay = () => {
  const navigate = useNavigate();
  const { id, chapId } = useParams();
  const [content, setContent] = useState("");
  const handleShow = () => {
    setContent(<QuizPopup id={id} chapId={chapId}></QuizPopup>)
  }
  return (
    <>
      {
        (content === "") ?
          <div>
            <p>Do you want to attempt the quiz ?</p>
            <div>
              <button onClick={handleShow}>YES</button>
              <br></br>
              <button onClick={() => { navigate(-1) }} to="">No</button>
            </div>
          </div>
          :
          content
      }
    </>
  );
};

export default QuizDisplay;
